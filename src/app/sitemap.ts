import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/playground`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
