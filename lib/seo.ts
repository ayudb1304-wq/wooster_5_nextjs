import type { Post } from "@/lib/posts";
import { film } from "@/lib/links";
import { questionCount } from "@/lib/stats";

/* ------------------------------------------------------------------
   Site-wide SEO configuration and JSON-LD builders.
   One file so the whole discoverability layer ports with the wireframe.
   ------------------------------------------------------------------ */

/** The canonical origin. Set NEXT_PUBLIC_SITE_URL per deployment. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.woosterprep.com").replace(/\/$/, "");

/** Only the production domain is indexable. Previews and the wireframe stay out of search. */
export const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export const site = {
  name: "Wooster Prep",
  tagline: "Personalized SAT prep that actually moves your score.",
  /* The boilerplate. Use this exact sentence on LinkedIn, Crunchbase, G2, Capterra and Wikidata. */
  description: `Wooster Prep is an online SAT prep platform for high-school students and their parents. A free diagnostic finds the concepts costing the most points, then a personalized plan ranks what to study next by score upside, backed by mastery sets, a projected score that updates as you learn, and full-length practice exams drawn from ${questionCount} SAT-style questions.`,
  email: "hal@woosterprep.com",
  logo: "/assets/wooster-logo.jpg",
  ogImage: "/opengraph-image",
  /* Placeholder handles until the accounts exist; must match lib/links.ts. */
  sameAs: [
    "https://instagram.com/woosterprep",
    "https://x.com/woosterprep",
    "https://youtube.com/@woosterprep",
    "https://linkedin.com/company/woosterprep",
    "https://tiktok.com/@woosterprep",
  ],
} as const;

export const plan = {
  name: "Full 2-month access",
  price: "249.99",
  currency: "USD",
  description: "Two months of the personalized plan, mastery sets, projected score, and full-length practice exams.",
} as const;

export const abs = (path: string) => (path.startsWith("http") ? path : `${siteUrl}${path}`);

/* Node ids so the graph can cross-reference. */
const ids = {
  org: `${siteUrl}/#organization`,
  site: `${siteUrl}/#website`,
  app: `${siteUrl}/#app`,
};

export function organization() {
  return {
    "@type": "Organization",
    "@id": ids.org,
    name: site.name,
    url: siteUrl,
    logo: { "@type": "ImageObject", url: abs(site.logo), width: 1600, height: 452 },
    description: site.description,
    email: site.email,
    sameAs: site.sameAs,
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": ids.site,
    name: site.name,
    url: siteUrl,
    publisher: { "@id": ids.org },
    inLanguage: "en-US",
  };
}

export function offer() {
  return {
    "@type": "Offer",
    name: plan.name,
    price: plan.price,
    priceCurrency: plan.currency,
    description: plan.description,
    url: abs("/pricing"),
    availability: "https://schema.org/InStock",
    category: "Subscription",
  };
}

export function webApplication() {
  return {
    "@type": "WebApplication",
    "@id": ids.app,
    name: site.name,
    url: siteUrl,
    description: site.description,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser",
    audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "High-school students preparing for the SAT" },
    publisher: { "@id": ids.org },
    offers: offer(),
    featureList: [
      "Free SAT diagnostic",
      "Personalized study plan ranked by score upside",
      "Mastery sets for every concept",
      "Projected score that updates as you learn",
      "Full-length timed SAT-style practice exams",
    ],
  };
}

export function videoObject() {
  return {
    "@type": "VideoObject",
    name: "Moneyball the SATs: how Wooster Prep works",
    description: "A five-minute guide to how Wooster Prep turns a free diagnostic into a personalized SAT study plan.",
    thumbnailUrl: [abs(film.poster)],
    contentUrl: abs(film.src),
    embedUrl: abs("/#film"),
    /* TODO before launch: set to the date the current cut was published. */
    uploadDate: "2026-09-10",
    duration: "PT5M",
    publisher: { "@id": ids.org },
    inLanguage: "en-US",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbs(items: Crumb[]) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export type Faq = { question: string; answer: string };

export function faqPage(items: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function blogPosting(post: Post) {
  return {
    "@type": "BlogPosting",
    "@id": abs(`/blog/${post.slug}#post`),
    headline: post.title,
    description: post.description,
    image: [abs(post.image.src)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@id": ids.org },
    publisher: { "@id": ids.org },
    mainEntityOfPage: abs(`/blog/${post.slug}`),
    keywords: post.tags.join(", "),
    inLanguage: "en-US",
    isPartOf: { "@id": ids.site },
  };
}

export type GlossaryEntry = { slug: string; term: string; short: string };

export function definedTerm(entry: GlossaryEntry) {
  return {
    "@type": "DefinedTerm",
    "@id": abs(`/glossary/${entry.slug}#term`),
    name: entry.term,
    description: entry.short,
    url: abs(`/glossary/${entry.slug}`),
    inDefinedTermSet: { "@type": "DefinedTermSet", name: "Wooster Prep SAT glossary", url: abs("/glossary") },
  };
}

/** Wrap nodes in a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
