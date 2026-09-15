import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { terms } from "@/lib/glossary";
import { abs } from "@/lib/seo";

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/diagnostic", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/method", priority: 0.8, changeFrequency: "monthly" },
  { path: "/guarantee", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glossary", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((r) => ({ url: abs(r.path), lastModified: now, priority: r.priority, changeFrequency: r.changeFrequency })),
    ...getAllPosts().map((p) => ({
      url: abs(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    ...terms.map((t) => ({ url: abs(`/glossary/${t.slug}`), lastModified: now, priority: 0.5, changeFrequency: "yearly" as const })),
  ];
}
