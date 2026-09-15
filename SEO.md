# Wooster Prep SEO, AEO and GEO package

What is built into this site for search engines, answer engines, and AI assistants, where each piece lives, and how to verify it. Written for the review that decides whether this wireframe replaces the live site. The strategy it implements is in `SEOAEOGEO_Wooster.md`; this file is the record of what shipped.

Every feature here is code. It moves with the repo. The off-site work that has to happen on launch day is listed at the end.

---

## 1. How the deployment stays safe until launch

Two environment variables control discoverability. See `.env.example`.

| Variable | Wireframe / preview | Production |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | the preview origin | `https://www.woosterprep.com` |
| `NEXT_PUBLIC_INDEXABLE` | unset or `false` | `true` |

When `NEXT_PUBLIC_INDEXABLE` is not `true`: every page carries `<meta name="robots" content="noindex, nofollow">`, and `/robots.txt` disallows everything. The preview cannot compete with the live site, and nothing is cached by a search engine before approval. Flipping it to `true` on the production domain is the launch switch. Nothing else changes.

All canonical URLs, the sitemap, Open Graph URLs, and every JSON-LD `@id` derive from `NEXT_PUBLIC_SITE_URL`, so the port to the live repo needs no string edits.

---

## 2. What shipped

### Site-wide (`app/layout.tsx`, `lib/seo.ts`, `components/JsonLd.tsx`)

| Feature | Where | Why |
| --- | --- | --- |
| `metadataBase` and title template `%s \| Wooster Prep` | `app/layout.tsx` | Every page gets an absolute canonical and a consistent title without repeating the suffix. |
| Default description (the boilerplate) | `lib/seo.ts` → `site.description` | One sentence used verbatim everywhere: site, directories, profiles. Entity consistency is what AI answers match on. |
| Open Graph and Twitter card defaults | `app/layout.tsx` | Shared links show a title, description, and a branded image on every platform. |
| Generated share image | `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `lib/og.tsx` | 1200 by 630 card: logo, eyebrow, Newsreader title in navy on white. Blog posts and glossary terms get their own with the page title. |
| `Organization` and `WebSite` JSON-LD | `app/layout.tsx` | The entity home. `sameAs` lists the social profiles from `lib/links.ts`. |
| `robots.txt` | `app/robots.ts` | Allows all crawlers on production, explicitly including GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Applebot. Disallows `/login`. Points to the sitemap. |
| `sitemap.xml` | `app/sitemap.ts` | Every route, every blog post with its published or updated date, every glossary term. |
| Trademark line in the footer | `components/Footer.tsx` | The College Board non-affiliation statement on every page, not only `/disclaimer`. |
| Speed Insights | `app/layout.tsx` | Field Core Web Vitals (LCP, INP, CLS) once deployed on Vercel. |

### Homepage (`app/page.tsx`)

| Feature | Where | Why |
| --- | --- | --- |
| `WebApplication` JSON-LD with `Offer` | `lib/seo.ts` → `webApplication()`, `offer()` | Tells engines what the product is (an educational web app), who it is for, what it does, and what it costs. No ratings until real reviews exist. |
| `VideoObject` JSON-LD for the film | `lib/seo.ts` → `videoObject()` | Makes the Moneyball film eligible for video results. `uploadDate` must be set to the real publish date before launch. |
| FAQ section with `FAQPage` JSON-LD | `components/Faq.tsx`, `lib/faq.ts` | Ten questions parents and students ask, answer-first, visible on the page and in schema. The exact format answer engines quote. |
| Canonical `/` | `app/page.tsx` | |

### Inner pages

| Route | Metadata | Schema |
| --- | --- | --- |
| `/pricing` (new) | title, description, canonical | `WebApplication` with `Offer`, `FAQPage` (three pricing questions in crawlable prose), `BreadcrumbList` |
| `/glossary` (new) | title, description, canonical | `BreadcrumbList` |
| `/glossary/[term]` (new, 15 terms) | title, description = the definition, canonical, own share image | `DefinedTerm` in a `DefinedTermSet`, `BreadcrumbList` |
| `/blog` | canonical | `BreadcrumbList` |
| `/blog/[slug]` | canonical, article Open Graph with published and modified times and tags, own share image | `BlogPosting` (headline, dates, image, keywords, publisher), `BreadcrumbList` |
| `/about`, `/method`, `/guarantee`, `/diagnostic` | canonical | `BreadcrumbList` |
| `/login` | canonical, `noindex, follow` | none, it is an app door |
| `/privacy`, `/terms`, `/disclaimer` | as before | left untouched by request |

### Content built for answer engines

- **FAQ** (`lib/faq.ts`): first sentence answers the question outright, 40 to 60 words total, numbers taken from the same constants the page uses (`lib/stats.ts`, `lib/seo.ts`).
- **Glossary** (`lib/glossary.ts`): 15 digital SAT terms. The definition is the first sentence and is also the meta description, so the snippet and the page say the same thing. Includes Wooster Prep's own terms (diagnostic, score upside, mastery, projected score) so the product vocabulary becomes citable.
- **Pricing page**: price and terms in plain text, not only inside a card.

---

## 3. How to verify

Open these on the deployment and paste where indicated.

| Check | Do this | Expect |
| --- | --- | --- |
| Robots | open `/robots.txt` | On preview: `Disallow: /`. On production: allow rules, AI crawlers listed, sitemap line. |
| Sitemap | open `/sitemap.xml` | 32 URLs today: 11 routes, 6 posts, 15 terms. Grows with every post and term. |
| Noindex on preview | view source of any page | `<meta name="robots" content="noindex, nofollow">` while `NEXT_PUBLIC_INDEXABLE` is not `true`. |
| Canonicals | view source of `/pricing` | `<link rel="canonical" href="…/pricing">` |
| Share card | open `/opengraph-image` | The branded 1200 by 630 image. Also `/blog/<slug>/opengraph-image`. |
| Share preview | paste a page URL into opengraph.xyz or the LinkedIn Post Inspector | Title, description, image. |
| Structured data | paste the homepage, `/pricing`, a post, and a glossary term into validator.schema.org and Google's Rich Results Test | No errors. Rich Results detects FAQ, Breadcrumb, Article, Video. |
| Headings | Rich Results Test or a browser extension | One `h1` per page. |
| Web Vitals | Vercel dashboard, Speed Insights tab, after real traffic | LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at the 75th percentile. |

---

## 4. Decisions to make before launch

- **Author.** Posts are attributed to the organization. When a named author is chosen, add a `Person` node in `lib/seo.ts`, point `blogPosting()` at it, and set `post.author` in `lib/posts.ts`. A named author with a bio is a stronger trust signal than a company name.
- **Film upload date.** Set `uploadDate` in `videoObject()` to the day the current cut went live.
- **Social handles.** The `sameAs` list and `lib/links.ts` hold placeholder handles. Create the profiles or remove the entries; a dead `sameAs` URL is worse than none.
- **Comparison pages.** Not built. Pages that name competitors need a decision on tone and accuracy first.
- **Blog bodies.** The 6 posts are placeholder text. Schema and metadata are ready; the content is not.

---

## 5. Launch day, off-site

1. Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_INDEXABLE=true` on the production deployment. Confirm `/robots.txt` and the robots meta tag flipped.
2. Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Bing's index feeds ChatGPT.
3. Create or claim the LinkedIn company page, Crunchbase, G2, and Capterra profiles using `site.description` verbatim. Later, a Wikidata item.
4. Run the 30 baseline prompts (buyer and informational questions about SAT prep) through ChatGPT, Perplexity, Gemini, and Claude, and record who is cited. Repeat monthly.
5. Replace placeholder blog bodies with real posts, answer-first, dated.
6. When real reviews exist, add `aggregateRating` to `webApplication()`. Not before.

---

## 6. Maintenance rules

- New route: add it to `app/sitemap.ts`, give it a canonical, and add a `BreadcrumbList`.
- New number on the page (question count, price): change the constant in `lib/stats.ts` or `lib/seo.ts`. The FAQ, schema, and copy all read from there.
- New FAQ: add to `lib/faq.ts`. It renders and emits schema automatically.
- New glossary term: add to `lib/glossary.ts`. Page, sitemap entry, and share image follow.
- Never emit schema for something not visible on the page. Engines cross-check.
