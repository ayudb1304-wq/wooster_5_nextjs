@AGENTS.md

# Project rules

- `BRAND.md` is the brand bible. Any UI or UX change must update it in the same change: tokens, component specs, motion, copy rules, and a dated line in its changelog.
- Design tokens live in `app/globals.css` and are named identically in `BRAND.md`. Add a token to both before using a new value.
- `SEO.md` records the discoverability layer. A new route needs a canonical, a `BreadcrumbList`, and a sitemap entry; a new page number goes through `lib/stats.ts` or `lib/seo.ts`; schema must match visible content. Keep `NEXT_PUBLIC_INDEXABLE` off anywhere that is not the production domain.
