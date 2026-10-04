import type { Metadata, Viewport } from "next";
import { Fredoka, Instrument_Serif, Nunito } from "next/font/google";
import { DOWNLOAD, REPO, SITE_URL, VERSION, absoluteUrl, faqs, installSteps, site } from "@/lib/site";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-round" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-sans" });

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  // Origin only: Next prepends basePath to file-based metadata images itself.
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.author.name, url: site.author.url }],
  creator: site.author.name,
  category: "Health & Fitness",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0912",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Structured data: lets Google show the app as a rich result (free, rating-free SoftwareApplication),
// expand the FAQ, and gives answer engines clean facts to quote.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: absoluteUrl("/"),
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#author` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: site.author.name,
      url: site.author.url,
      sameAs: [site.author.github],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: site.name,
      alternateName: ["Pawse for Mac", "Pawse water reminder"],
      description: site.description,
      url: absoluteUrl("/"),
      downloadUrl: DOWNLOAD,
      installUrl: DOWNLOAD,
      codeRepository: REPO,
      softwareVersion: VERSION,
      operatingSystem: "macOS 13 or later",
      applicationCategory: "HealthApplication",
      applicationSubCategory: "Reminder, Habit tracker, Break timer",
      isAccessibleForFree: true,
      license: "https://opensource.org/licenses/MIT",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      image: absoluteUrl("/pawse-icon.png"),
      screenshot: [absoluteUrl("/media/screen-today.jpg"), absoluteUrl("/media/screen-habits.jpg"), absoluteUrl("/media/screen-break.jpg")],
      featureList: [
        "Drink water reminders with daily goal and streaks",
        "Custom habit reminders on any interval (e.g. stretch every 30 minutes)",
        "Screen-time tracking and break reminders",
        "Full-screen break countdown with 20-20-20 eye tips",
        "Optional hard block until you confirm",
        "Five animated 3D pets with voices",
        "Works offline, no data collection",
      ],
      author: { "@id": `${SITE_URL}/#author` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_URL}/#install`,
      name: "How to install Pawse on a Mac",
      totalTime: "PT1M",
      step: installSteps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${serif.variable} ${nunito.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
