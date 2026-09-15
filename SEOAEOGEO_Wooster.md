# Wooster Prep — SEO / AEO / GEO Battle Plan to Lead the Test-Prep Platform Sector

## TL;DR
- **Wooster Prep's site is currently a single-page, JavaScript-animated marketing landing page (`app/page.tsx`) with essentially zero discoverability infrastructure** — no sitemap.ts, robots.ts, structured data, canonical strategy, indexable content pages, or FAQ/knowledge content were found in the repo or README. To "lead this sector" it must be rebuilt from a brochure into a content-and-entity engine, because its competitors (MentoMind, EdisonOS, LearnQ.ai, Acely) already publish dozens of ranking, AI-cited pages.
- **The single highest-leverage move is adding a real information architecture**: convert the one-pager into a multi-route site (features, use-case, pricing, comparison, glossary, and a 40–60 post knowledge hub answering digital-SAT/ACT questions), each with `generateMetadata`, JSON-LD (`Organization`, `SoftwareApplication`/`WebApplication`, `FAQPage`, `BlogPosting`, `BreadcrumbList`), and answer-first content blocks. This wins both classic SEO and AI citations, which increasingly draw from the same signals.
- **GEO/AEO wins come from entity building and citation-worthy original data, not gimmicks.** llms.txt is near-worthless as a ranking lever in 2026 — Gary Illyes, Google Search Relations analyst, confirmed at Search Central Live in July 2025 that "Google does not support llms.txt and has no plans to," and Ahrefs' June 2026 study of 137,210 domains found 97% of llms.txt files received zero requests in May 2026. Priorities instead: Bing indexing (powers ChatGPT), consistent NAP/entity facts across Wikidata/LinkedIn/Crunchbase/G2/Capterra, publishing proprietary score-improvement data, and earning mentions in edtech media and review directories.

## Key Findings

**What Wooster Prep is.** Based on the repository README, the `BRAND.md` reference, and the live sector context, Wooster Prep (woosterprep.com) is a **test-prep product in the digital SAT/ACT preparation space**. The repo `wooster_5_nextjs` is a Next.js App Router + TypeScript port of an earlier static site, whose layout and motion imitate videinfra.com. The centerpiece is a cinematic "Moneyball" film (`public/assets/moneyball-web.mp4`, 720p, ~9MB) plus product screenshots — a diagnostic-driven, data-forward pitch ("Moneyball" = using data/analytics to find undervalued gains), which mirrors how the whole sector sells: a free diagnostic → analytics → adaptive practice/tutoring funnel. The site links out to woosterprep.com for the diagnostic, login, privacy, terms, and disclaimer pages (`lib/links.ts`).

**The sector and its search leaders.** This is a crowded, fast-moving edtech/SaaS niche. Direct and adjacent competitors who currently dominate SEO/AEO/GEO include **MentoMind, EdisonOS, LearnQ.ai, Acely, Whiz (whiz.study), R.test, VEGA AI, and Albert.io.** EdisonOS in particular runs an aggressive content operation: dozens of "vs" comparison pages (vs MentoMind, vs LearnQ.ai, vs Khan Academy, vs Test Innovators), "best X" listicles, customer stories, a podcast, newsletter, help center, and free mock tests. MentoMind publishes question-bank and "white-label LMS for tutors" content. These pages are exactly what Google AI Overviews, ChatGPT, and Perplexity cite for buyer-intent queries like "best white-label SAT platform for tutors" — and Wooster Prep currently has none of them.

**Current SEO/AEO/GEO maturity — scorecard (0–5):**
- Technical foundation (Next.js rendering, images, fonts): **3/5** — good bones (App Router, `next/image` static imports with automatic dimensions + blur placeholders, self-hosted fonts via `next/font`), but a heavy hero video and GSAP/SplitText intro threaten LCP/INP.
- Metadata & canonical: **1/5** — a single root `metadata` export at best; no per-route metadata because there are no other routes.
- Structured data (JSON-LD): **0/5** — none found.
- Crawl infrastructure (robots.ts/sitemap.ts): **0/5** — none found.
- Content depth / topical authority: **0/5** — one marketing page, no blog, FAQ, glossary, or resources.
- AEO readiness (answer-first blocks, FAQ/HowTo schema): **0/5**.
- GEO / entity authority (Wikidata, directories, review sites, original data): **0–1/5**.
- Off-page / trust signals (reviews, backlinks, GBP): **unknown, presumed low**.

**Best-practice landscape (2026), which this plan is built on:**
- **Next.js App Router** gives first-class SEO primitives: `generateMetadata`, file-based `sitemap.ts` and `robots.ts`, JSON-LD via server components, dynamic OG images (`@vercel/og`/`next/og`), and `next/image`/`next/font` optimizations. Static/ISR rendering ships crawlable HTML.
- **Core Web Vitals** thresholds (75th percentile field data): LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. INP replaced FID in March 2024 and is the hardest to pass; heavy JS animation is the main risk here.
- **AEO**: match answer format to intent — a 40–60 word answer-first paragraph under a question heading for definitions, ordered lists for processes, tables for comparisons/specs. `FAQPage` JSON-LD still feeds AI engines and voice even though Google restricted FAQ rich results in 2023.
- **GEO**: AI answers reward fact density, specific numbers, named authors with dates, and third-party corroboration. Wikipedia is ChatGPT's single most-cited source — 47.9% of citations within ChatGPT's top-10 sources and 7.8% of total citations (Profound analysis of 680M citations, Aug 2024–June 2025); per the 5W Citation Source Audit Q1 2026, Wikipedia (13.15%) and Reddit (11.97%) together drive over 25% of US ChatGPT citations (Similarweb, ~600,000 citation events, Jan–Feb 2026). Brands listed across G2, Capterra, Trustpilot, and Yelp see roughly a 3x AI-citation multiplier versus brands without those profiles (5W Citation Source Audit Q1 2026, released May 11, 2026). Bing indexing is a prerequisite for ChatGPT visibility.
- **llms.txt**: cheap to add but not a proven ranking/citation lever in 2026 — Google's June 2026 Search Central guidance states llms.txt files "won't harm (nor help) your visibility or rankings in Google Search, as Google Search ignores them," and John Mueller compared it to the discredited keywords meta tag. Treat as low-priority hygiene, not strategy.

## Details — Section-by-Section Plan

### A. Site-wide technical foundation (modifications + additions)

**1. Establish `metadataBase` and a metadata template (`app/layout.tsx`).**
The README confirms `layout.tsx` holds a `metadata` export and fonts. Modify it to define a canonical domain and title template so every future route inherits correct defaults:
```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://woosterprep.com'),
  title: { default: 'Wooster Prep — Data-Driven Digital SAT & ACT Prep', template: '%s | Wooster Prep' },
  description: '…60–155 chars, specific, benefit + proof…',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'Wooster Prep', images: ['/og/default.png'] },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
```
Deploy the app on **woosterprep.com itself** (or a subpath), not only the `wooster-5-nextjs.vercel.app` preview — the preview domain fragments authority and should be `noindex`/canonicalized to the primary domain. The README already flags that `lib/links.ts` should switch from absolute woosterprep.com URLs to relative paths once co-deployed; do that so the marketing site and app share one domain and one authority profile.

**2. Add `app/robots.ts` and `app/sitemap.ts` (currently missing).**
```ts
// app/robots.ts
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://woosterprep.com/sitemap.xml',
    host: 'https://woosterprep.com',
  };
}
```
`sitemap.ts` should enumerate every new route (home, features, pricing, use-case pages, comparison pages, glossary terms, and each blog post) with `lastModified`. Explicitly **allow** GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and Bingbot (do not block AI crawlers — blocking removes Wooster Prep from model memory and AI recommendations).

**3. Add a global JSON-LD graph (server component injected in `layout.tsx`).**
None exists today. Add an `@graph` with `Organization` (name, url, logo, `sameAs` → LinkedIn, Crunchbase, X, G2, Capterra, Wikidata), `WebSite` (with `SearchAction`), and on the homepage a `SoftwareApplication`/`WebApplication` node (`applicationCategory: "EducationalApplication"`, `operatingSystem: "Web"`, `offers`). Use `WebApplication` (the correct subtype for browser-based SaaS) rather than `Product`, and never mix `Product` + `SoftwareApplication` for the same offering. Keep `aggregateRating` out until a real review corpus exists (fabricated ratings risk a manual action).

**4. Core Web Vitals hardening (the hero video + GSAP are the risk).**
- The ~9MB `moneyball-web.mp4` must **not** be the LCP element or autoplay-blocking. Use a lightweight poster image (`priority`, `fetchpriority="high"`) as the LCP element; lazy-load/defer the video; keep it muted+`playsInline`; the README already pauses it off-screen (good). Consider serving an even smaller preview and only loading full 720p on interaction.
- The GSAP SplitText intro delays interactivity and can hurt INP; the README says it's skipped under reduced motion (good). Ensure the headline text is present in server-rendered HTML (not injected by JS) so crawlers and AI see it, and that animation never blocks the main thread on interaction.
- Keep reserving dimensions via `next/image` static imports (already done) to protect CLS.
- Add `@vercel/speed-insights` or the `web-vitals` library to monitor field INP/LCP.

**5. Add `llms.txt` (low priority).** A small curated `public/llms.txt` mapping key pages is cheap hygiene, but per 2026 evidence it should sit at the bottom of the roadmap — not a substitute for real content and schema.

### B. Homepage (`app/page.tsx` — Header, Hero, Film, CaseVideo, Accordion, Pricing)

**What exists:** an animated one-pager. **The problem:** almost all copy is likely inside client components with heavy motion, headings may not be a clean semantic hierarchy, and there is only one `<h1>`-level statement plus a "How it works" link.

**Modifications:**
- **Heading hierarchy:** one clear, keyword-bearing `<h1>` (e.g., "Data-Driven Digital SAT & ACT Prep for Students, Tutors, and Test-Prep Businesses"), then `<h2>`s per section (Hero → How it works → The film/proof → Features → Pricing → FAQ). Ensure they're server-rendered.
- **Hero copy:** lead with a one-sentence, extractable value proposition naming the category and differentiator ("Wooster Prep is a [white-label / adaptive] digital SAT & ACT prep platform that turns a free diagnostic into a personalized study plan"). AI engines quote sentences like this.
- **`Accordion` → make it a real `FAQPage`.** The accordion component is perfect for an on-page FAQ block with `FAQPage` JSON-LD. Populate with high-intent questions (below).
- **`Pricing` section → add `Offer` schema** and visible, crawlable plan names/prices (even "from $X" or "contact sales"). AI comparison answers need this.
- **`Film`/`CaseVideo` → add `VideoObject` JSON-LD** (name, description, thumbnailUrl, uploadDate, contentUrl) so the Moneyball film is eligible for video rich results and AI video citations. Add a transcript/caption text on the page.
- **Trust signals:** add logos of tutoring businesses/schools using it, testimonials with names, and any score-improvement stats — these are E-E-A-T and GEO fuel.
- **Internal links:** the homepage should link into the new feature, pricing, comparison, and resource routes.

**Target keywords:** "digital SAT prep platform", "adaptive SAT ACT practice", "diagnostic SAT test", "white-label SAT platform for tutors" (if applicable).

### C. New pages/sections to ADD (currently missing — this is where leadership is won)

The site is a single route. Every competitor beats it on coverage. Add, as static/ISR routes under `app/`:

1. **Product / Features pages** (`/features`, or per-feature: `/features/diagnostic`, `/features/adaptive-practice`, `/features/analytics`, `/features/tutor-tools`). Each: `generateMetadata`, `SoftwareApplication` + `FAQPage` schema, answer-first intro, screenshots with descriptive alt text.
2. **Use-case / audience pages** (`/for-students`, `/for-tutors`, `/for-test-prep-businesses`, `/for-schools`). Mirrors how MentoMind/EdisonOS segment. If Wooster Prep offers white-label, `/for-tutors` and `/white-label` are high-commercial-intent must-haves.
3. **Pricing page** (`/pricing`) — standalone, crawlable, with `Offer`/`AggregateOffer` schema and an FAQ.
4. **Comparison / "vs" pages** (`/compare/wooster-prep-vs-mentomind`, `/vs-edisonos`, `/vs-khan-academy`, `/alternatives/...`). This is the format EdisonOS uses to dominate buyer queries and get AI-cited. Use comparison **tables** (AEO-optimal for spec/pricing queries). Be scrupulously accurate.
5. **Knowledge hub / blog** (`/resources` or `/blog`) — the biggest gap. Publish 40+ answer-first articles targeting question queries: "How to study for the digital SAT", "What is a good digital SAT score in 2026", "How long should you study for the SAT", "SAT vs ACT: which should I take", "How does the adaptive digital SAT work", "How to start an SAT tutoring business". Each: `BlogPosting` schema with named author, `datePublished`/`dateModified`, `FAQPage` where relevant, and internal links to product pages.
6. **Glossary** (`/glossary/[term]`) — programmatic pages for "superscore", "adaptive testing", "Bluebook", "digital SAT modules", "raw vs scaled score". Glossary/definition pages win featured snippets and AI definitional citations; each gets `DefinedTerm` schema.
7. **Free tools/calculators** (`/tools/sat-score-calculator`, `/tools/sat-act-concordance`, `/study-plan-generator`). Tools attract links, brand searches, and AI citations; competitors (LearnQ, R.test) lean on these.
8. **Case studies / customer stories** (`/customers/[slug]`) with real score-improvement data — E-E-A-T + GEO.
9. **About / team / E-E-A-T page** (`/about`) — the canonical entity home page with complete `Organization` JSON-LD, founding date, HQ, and named academic team (e.g., the sector norm of naming expert question-writers). Add `Person` schema with `hasCredential` for the academic team.
10. **Press / newsroom** (`/press`) — for digital-PR pickups and consistent brand facts.
11. **FAQ hub** (`/faq`) aggregating all questions with `FAQPage` schema.

### D. AEO plan (featured snippets, PAA, voice)
- Under each question `<h2>`/`<h3>`, lead with a **40–60 word direct answer**, then elaborate. Use ordered lists for "how to" processes and tables for comparisons/pricing.
- Add `FAQPage` JSON-LD on product, pricing, feature, and comparison pages; `HowTo` schema on step-based guides (e.g., "How to create a diagnostic-to-tutoring workflow"); `Speakable` on the concise answer blocks for voice.
- Mine Google's "People Also Ask" and competitor FAQ sections for the exact question phrasing; make headings match natural-language queries.
- Keep schema consistent with visible content (AI cross-checks; mismatches get deprioritized).

### E. GEO plan (be the cited source in AI answers)
- **Bing Webmaster Tools**: submit the sitemap — ChatGPT's web search uses Bing's index. Non-negotiable prerequisite.
- **Entity building / consistent facts:** publish one canonical boilerplate description and use it verbatim on the site, LinkedIn company page, Crunchbase, G2, Capterra, and a **Wikidata** item (feeds Google's Knowledge Graph; add as soon as notability allows). Ensure every `sameAs` URL is live and name-consistent.
- **Review directories:** get listed and reviewed on **G2, Capterra, TrustRadius**, and edtech-specific directories (Common Sense Education, teacher-tool round-ups). Brands with G2/Capterra/Trustpilot/Yelp profiles see roughly a 3x citation multiplier in AI answers (5W Citation Source Audit Q1 2026).
- **Original, citation-worthy data:** publish a proprietary annual "Wooster Prep Digital SAT Score Report" (e.g., average point gains, time-to-improvement by starting band). Specific numbers get quoted by AI far more than generic claims.
- **Freshness & authorship:** visible author bios + `datePublished`/`dateModified` on every content page.
- **Community signal:** authentic presence in r/SAT, r/ACT, r/edtech (where AI sources "what people actually use"; Reddit alone drives ~12% of US ChatGPT citations).

### F. Off-page & authority
- **Digital PR:** pitch founder/academic-team bylines and data stories to edtech media (EdSurge, EdTech Magazine, TeachThought) and education reporters — earned mentions move both rankings and AI citations.
- **Backlinks:** comparison/tool/glossary assets are the linkable pages; guest posts on tutoring-business blogs; scholarship/partner pages with schools and tutoring centers.
- **Reviews:** actively solicit customer reviews on G2/Capterra and Google.
- **Google Business Profile:** only if there's a physical location or local service; otherwise focus on entity directories rather than local SEO.

### G. Measurement
- **Tools:** Google Search Console + Bing Webmaster Tools (indexing, queries, CWV), GA4 (conversions), an AI-visibility tracker (Profound, Otterly, or manual monthly runs of 30 priority prompts across ChatGPT/Perplexity/Gemini/Claude), and Vercel Speed Insights for field INP/LCP.
- **KPIs:** indexed pages, non-brand organic clicks/impressions, featured-snippet & PAA ownership, "share of model"/AI citation rate on the 30 baseline prompts, CWV pass rate at p75, referral traffic from AI engines, and diagnostic sign-ups from organic/AI.
- **Baseline first:** before changes, run the 30 buyer/informational prompts through the four AI engines and record where Wooster Prep vs. competitors are cited.

## Recommendations (prioritized roadmap)

**Phase 1 — 0–30 days (quick wins, high impact / low-med effort):**
1. Deploy on the real domain; canonicalize/`noindex` the Vercel preview.
2. Add `robots.ts` + `sitemap.ts`; submit to **both** Google Search Console and Bing Webmaster Tools.
3. Add global `Organization` + `WebSite` + `WebApplication` JSON-LD and a proper `metadataBase`/title template in `layout.tsx`.
4. Fix the homepage: semantic `<h1>`/`<h2>`s in server HTML, extractable value-prop sentence, convert the `Accordion` into an on-page FAQ with `FAQPage` schema, add `VideoObject` for the film, add `Offer` schema to `Pricing`.
5. CWV: demote the video from LCP (poster image priority), defer heavy JS; measure with Speed Insights.
6. Create/claim Wikidata, LinkedIn, Crunchbase, G2, Capterra profiles with one consistent description.
*Benchmark to advance:* homepage indexed in Google + Bing, valid rich-results test, LCP ≤ 2.5s / INP ≤ 200ms at p75.

**Phase 2 — 30–90 days (build the IA and content engine):**
7. Ship `/features`, `/pricing`, `/for-tutors` (+`/white-label` if applicable), `/for-students`, `/about` (entity home), each with metadata + schema.
8. Launch the knowledge hub with the first 12–15 answer-first articles + a glossary (10–15 terms) + one free tool (score calculator).
9. Ship 3–5 comparison/"vs" pages with accurate tables.
10. Begin digital-PR outreach and review solicitation.
*Benchmark:* first featured snippets/PAA appearances; first AI citations on baseline prompts; 25+ pages indexed.

**Phase 3 — 6–12 months (dominate):**
11. Scale to 40–60 blog posts + full glossary; add case studies with data and the proprietary Score Report.
12. Add remaining use-case/tool pages; iterate comparison pages as competitors change.
13. Pursue Wikipedia notability; expand backlink/PR footprint; keep content fresh (update `dateModified`).
14. Add `llms.txt` as final hygiene.
*Benchmark:* top-3 for priority non-brand keywords, measurable "share of model" lead vs. MentoMind/EdisonOS on buyer prompts.

## Caveats
- **Direct source-file reads were blocked.** Neither I nor a dedicated sub-agent could fetch the individual repository files (`app/layout.tsx`, `page.tsx`, `package.json`, `next.config.ts`, `lib/links.ts`, `BRAND.md`, component files) or the live Vercel deployment — the fetch tool only permits URLs previously surfaced by search, and this small repo's files never appeared. **All repo-specific findings are derived from the repository's README and file listing**, which are detailed and authoritative but do not reveal exact metadata strings, dependency versions, on-page copy, alt text, or confirm the absence of files. Statements that `robots.ts`/`sitemap.ts`/JSON-LD/`llms.txt` are "missing" are **strongly inferred** (not mentioned in README or root tree) but **unconfirmed**; verify by inspecting the code before implementing.
- **Wooster Prep's exact positioning is inferred** from README + sector context. Confirm whether it is a B2C student tool, a B2B white-label platform for tutors, or both — this changes the priority of `/for-tutors`/`/white-label` vs. student-facing content.
- **Competitor and best-practice claims** are sourced to 2026 industry writeups and vendor pages, which contain marketing spin and some forward-looking predictions. For example, the "25% search decline" figure is a forecast, not a measured result: per Gartner's Feb 19, 2024 press release, "By 2026, traditional search engine volume will drop 25%, with search marketing losing market share to AI chatbots and other virtual agents" (VP Analyst Alan Antin) — and 2026 reviews note Google adapted via AI Overviews and retained 90%+ market share. Treat specific percentages as directional, not precise.
- **Trademark care:** SAT/PSAT/ACT are registered trademarks (College Board, ACT Inc.); follow the sector norm of a disclaimer of non-affiliation on all pages using those terms.