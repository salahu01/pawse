<img src="public/pawse-icon.png" width="96" align="right" alt="Pawse icon">

# Pawse — website

Source of **https://salahu01.github.io/pawse/**, the marketing site for
[Pawse](https://github.com/salahu01/pawse-app): a cute 3D pet that walks onto your Mac's screen and
reminds you to drink water, keep your habits and take breaks.

Built as one continuous motion piece: Next.js 16 (static export), GSAP with ScrollTrigger and
SplitText, and Lenis smooth scroll. All copy lives in the HTML, and the motion layer
(`components/Showreel.tsx`) only choreographs it, so crawlers and answer engines see everything.
`prefers-reduced-motion` turns the motion off.

## SEO / AEO

- Metadata, canonical, Open Graph and Twitter cards in `app/layout.tsx`
- JSON-LD: `SoftwareApplication`, `FAQPage`, `HowTo`, `WebSite`, `Person`
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, and `llms.txt` / `llms-full.txt` for AI answer engines
- All copy, FAQ and features in `lib/site.ts`: one source for the page, the JSON-LD and llms.txt

## Develop

```sh
npm install
npm run dev        # http://localhost:3000/pawse
npm run build      # static export -> out/
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/pages.yml`. To verify the site in
Google Search Console, set the repository variable `GOOGLE_SITE_VERIFICATION` to the HTML-tag token.

## Licence

MIT, same as the app.
