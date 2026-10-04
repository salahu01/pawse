import { DOWNLOAD, REPO, absoluteUrl, faqs, features, installSteps, pets, site } from "@/lib/site";

export const dynamic = "force-static";

/** Everything on the site as plain text, for answer engines. */
export function GET() {
  const body = [
    `# ${site.title}`,
    "",
    site.description,
    "",
    `Website: ${absoluteUrl("/")}  Download: ${DOWNLOAD}  Source: ${REPO}`,
    `Requirements: ${site.requirements}`,
    "",
    "## Features",
    ...features.flatMap((f) => [`### ${f.title}`, f.body, ...f.bullets.map((b) => `- ${b}`), ""]),
    "## Pets",
    ...pets.map((p) => `- ${p.name}: ${p.desc}`),
    "",
    "## Install",
    ...installSteps.map((s, i) => `${i + 1}. ${s.name}: ${s.text}`),
    "",
    "## FAQ",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
