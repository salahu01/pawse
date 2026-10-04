import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: absoluteUrl("/"), lastModified: new Date("2026-10-05"), changeFrequency: "weekly", priority: 1 }];
}
