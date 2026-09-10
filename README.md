# Wooster Prep landing (Next.js)

Landing page for woosterprep.com, ported from the static site at
https://github.com/ayudb1304-wq/wooster_5 to Next.js (App Router, TypeScript).
Layout and motion follow videinfra.com; copy and product screenshots are Wooster Prep's own.

## Run

```
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## Layout

- `app/layout.tsx`: root layout, metadata, and self-hosted Google Fonts via `next/font`
  (Inter for UI, Cormorant Garamond for the wordmark and statements). Exposes `--font-inter` and `--font-cormorant`.
- `app/globals.css`: design tokens at the top (`:root`), then one block per section. Same CSS as the original site.
- `app/page.tsx`: composes the sections in order.
- `app/icon.jpg`: favicon (the logo).
- `components/`: one file per section. Client components hold the interactive parts:
  - `Header`: swaps its theme to match the section under it, mobile burger menu.
  - `Hero`: runs the GSAP load intro (SplitText headline words land on the baseline, then the
    "How it works" link and copy follow). Skipped under reduced motion.
  - `Film`: device tilt on scroll, sound toggle, pauses while off screen.
  - `CaseVideo`: hover preview; click scrolls to the film and unmutes it (via `lib/events.ts`).
  - `Accordion`: one item open at a time.
  - `Pricing`: card rail with arrow buttons.
  - `RevealObserver`: adds `.is-in` to `.reveal` elements as they scroll into view.
- `lib/links.ts`: the external woosterprep.com URLs and the film paths, in one place.
- `public/assets/`: logo, product screenshots, poster, and the film (`moneyball-web.mp4`).

## Notes

- Screenshots and the logo go through `next/image` (static imports, so dimensions and blur placeholders are automatic).
- The film is served from `public/assets/moneyball-web.mp4` (720p, about 9 MB). The original cut is ignored by git.
  To re-encode after a new cut:

```
ffmpeg -i public/assets/moneyball.mp4 -vf scale=1280:-2 -c:v libx264 -crf 30 -preset medium -c:a aac -b:a 96k -movflags +faststart public/assets/moneyball-web.mp4
```

- Links to the diagnostic, login, privacy, terms, and disclaimer pages point at woosterprep.com (see `lib/links.ts`).
  Change them to relative paths when this app is deployed on the same domain.
