import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/lib/seo";

/* Only the production domain may be crawled. AI crawlers are allowed on purpose:
   blocking them removes the site from model answers. */
export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/login"] },
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot", "Applebot"], allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
