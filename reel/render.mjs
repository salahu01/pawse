// Deterministic frame renderer: seeks the GSAP master timeline per frame and pipes PNGs into ffmpeg.
// usage: node render.mjs            -> out/frames.mp4 (silent)
//        node render.mjs --stills 0.5,4,9.5  -> out/still-<t>.png
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const FPS = 30, W = 1080, H = 1350;
mkdirSync(path.join(dir, "out"), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.error("pageerror:", e.message));
await page.goto("file://" + path.join(dir, "index.html"));
const duration = await page.evaluate(() => window.__ready);

const si = process.argv.indexOf("--stills");
if (si > 0) {
  // seek sequentially so one-shot callbacks fire in order
  const ts = process.argv[si + 1].split(",").map(Number).sort((a, b) => a - b);
  let cur = 0;
  for (const t of ts) {
    for (; cur <= t; cur += 1 / FPS) await page.evaluate((x) => window.__seek(x), cur);
    await page.evaluate((x) => window.__seek(x), t);
    await page.screenshot({ path: path.join(dir, "out", `still-${t}.png`) });
  }
} else {
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "14", "-pix_fmt", "yuv420p", path.join(dir, "out", "frames.mp4")], { stdio: ["pipe", "inherit", "inherit"] });
  const n = Math.round(duration * FPS);
  for (let f = 0; f < n; f++) {
    await page.evaluate((x) => window.__seek(x), f / FPS);
    const buf = await page.screenshot({ type: "png" });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f % 60 === 0) process.stdout.write(`\rframe ${f}/${n}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  console.log(`\ndone ${n} frames`);
}
await browser.close();
