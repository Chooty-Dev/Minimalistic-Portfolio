import type { MetadataRoute } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PORTFOLIO_DATA.personal.siteUrl}/sitemap.xml`,
  };
}

