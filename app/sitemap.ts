import type { MetadataRoute } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PORTFOLIO_DATA.personal.siteUrl,
      lastModified: "2026-11-11",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

