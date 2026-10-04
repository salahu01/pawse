import { DOWNLOAD, REPO, VERSION, absoluteUrl, features, site } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt: concise, LLM-friendly summary (https://llmstxt.org). */
export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Platform: ${site.requirements}`,
    `- Price: free, open source (MIT)`,
    `- Latest version: ${VERSION}`,
    `- Download: ${DOWNLOAD}`,
    `- Source code: ${REPO}`,
    `- Privacy: works offline, no network requests, no analytics, no account`,
    "",
    "## Features",
    ...features.map((f) => `- ${f.title}: ${f.body}`),
    "- Hard block: optional full-screen lock for water, any habit or breaks that unlocks only when you confirm (emergency: hold Esc 5 s).",
    "- Pets: Momo the Chibi (voiced), Mochi the Cat, Pip the Penguin, Yuzu the Capybara, Boo the Ghost Bunny; any .usdz model can be added.",
    "",
    "## Optional",
    `- [Full details and FAQ](${absoluteUrl("/llms-full.txt")})`,
    `- [Website](${absoluteUrl("/")})`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
