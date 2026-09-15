# Wooster Prep Brand Card

The single source of truth for how Wooster Prep looks, moves, and speaks. Every page, screen, and component in the product should be checkable against this document. If something on screen disagrees with it, one of the two is wrong and must be fixed.

**Rule of maintenance.** Any change to UI or UX, however small, is not finished until this file reflects it. Add a line to the changelog at the bottom with the date and what moved. The stylesheet at `app/globals.css` is the implementation of this card. Tokens are named identically in both places so they can be diffed.

---

## 1. Brand essence

**What we are.** Personalized SAT prep that tells a student exactly what to study next, ranked by score upside. Precision over volume. Strategy over grind. "Moneyball the SATs."

**How it should feel.** Calm, editorial, assured. Closer to a well set book or a financial journal than to an ed-tech dashboard. Nothing shouts. Whitespace does the work. One serif statement per screen carries the emotion; everything else is quiet grotesque type.

**Reference language.** Layout and motion follow videinfra.com: white ground, tight sans type, full-bleed film, numbered sections, dark statement blocks, an accordion, a gray card rail. Copy and imagery are Wooster Prep's own.

**Three words.** Precise. Personal. Unhurried.

---

## 2. Logo

**Asset.** `public/assets/wooster-logo.jpg` (1600 by 452, aspect 3.54 to 1). Navy wordmark "WOOSTER" over a rule, with "PREP" letterspaced beneath. Navy `#14213D` on white. This is the same file served at woosterprep.com.

**Where it appears and at what size.**

| Placement | Width | Notes |
| --- | --- | --- |
| Header brand | 120px | Links to top of page. |
| CTA section | 180px | Above the closing headline. |
| Footer brand | 220px | Links to top of page. |
| Favicon | `app/icon.jpg` | Same file. |

**Rendering on colored grounds.** The file is a JPG with a white background, so it never sits raw on anything but white.

- On white and light gray grounds: `mix-blend-mode: multiply` so the white box disappears.
- On the dark header: `filter: invert(1) grayscale(1) brightness(2)` with `mix-blend-mode: screen`, which yields a pure white mark with no box.
- Never stretch, rotate, recolor, or add effects beyond those two rules.
- Always pass through `next/image` with a static import so dimensions and placeholders are automatic.

**Clear space.** Leave at least the height of the "PREP" line free on all sides.

**Text fallback.** If the logo cannot be shown, the brand name is written "Wooster Prep" in the sans face at weight 500, letterspacing -0.02em. Never "WoosterPrep", never all caps in running text.

---

## 3. Color

All values live as custom properties on `:root` in `app/globals.css`. Use the token, never the hex.

### Core palette

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#171B22` | Default text, primary buttons, numbered badges. Near black, slightly warm. |
| `--navy` | `#14213D` | Brand accent. Serif hero headline, primary button hover, ranked score chips, selection highlight. |
| `--white` | `#FFFFFF` | Default page ground. |
| `--soft` | `#F2F2F3` | Alternate light section ground, card media backgrounds, pills. |
| `--gray` | `#CDCECF` | Pricing section ground and the gray header state. |
| `--dark` | `#12161D` | Dark section ground (film, statements, included) and the dark header state. |
| `--dark-2` | `#1A1F28` | Alternating statement panels. |

### Ink alphas (text and lines on light grounds)

| Token | Value | Role |
| --- | --- | --- |
| `--ink-70` | `rgba(23,27,34,0.70)` | Secondary body copy, ledes, plan descriptions. |
| `--ink-50` | `rgba(23,27,34,0.50)` | Captions, sub-labels, the italic second line of the hero, generic plan lists. |
| `--ink-30` | `rgba(23,27,34,0.30)` | Ghost button borders, icon-circle borders, rank numerals. |
| `--ink-12` | `rgba(23,27,34,0.12)` | Hairlines and dividers on light grounds. |

### Status colors (app only)

| Token | Value | Role |
| --- | --- | --- |
| `--critical`, `--critical-tint` | `#A83A2E`, 10 percent | Concepts worth the most points, urgent moves. |
| `--progress`, `--progress-tint` | `#9A6B12`, 12 percent | In progress, high-priority, latest exam. |
| `--mastered`, `--mastered-tint` | `#2D6B4A`, 12 percent | Mastered concepts, streaks kept. |

Used only in the signed-in app for concept and exam state: chips, the top rule on tiles and concept cards, progress bars. Never on the marketing pages, never for actions. Actions are ink or navy.

### Light alphas (text and lines on dark grounds)

| Token | Value | Role |
| --- | --- | --- |
| `--light-60` | `rgba(255,255,255,0.60)` | Secondary copy on dark, italic emphasis in statements, film kicker. |
| `--light-30` | `rgba(255,255,255,0.30)` | Icon-circle borders on dark. |
| `--light-12` | `rgba(255,255,255,0.12)` | Hairlines and dividers on dark. |

### Ground sequence on the landing page

White (hero) → dark (pitch) → white (method index) → dark (film band) → dark-2 (the Wooster Prep way) → white (why it works) → soft (for parents) → gray (pricing) → dark (guarantee) → soft (testimonials) → dark (included) → white (blog) → soft (about) → white (CTA, footer). The header follows the ground beneath it (see section 7).

### Rules

- Text on light grounds is always an ink token. Text on dark grounds is always white or a light alpha. No mid-gray solid fills for text.
- Navy is an accent, not a ground. Do not paint sections navy. Inline links in reading copy are navy with a 35 percent navy underline, full navy on hover.
- Hairlines are 1px at the 12 percent alpha of the current ground.
- `::selection` is navy with white text.
- The three status colors are the only colors beyond the palette, and they stay inside the app.

---

## 4. Typography

Two families, loaded through `next/font/google` in `app/layout.tsx` and exposed as `--font-public-sans` and `--font-newsreader`. Both are variable fonts, so every weight is available. The stylesheet consumes them through `--sans` and `--serif`.

### Families

| Token | Family | Weights loaded | Role |
| --- | --- | --- | --- |
| `--sans` | Public Sans | variable | Body, UI, navigation, buttons, labels, captions. |
| `--serif` | Newsreader | variable, plus italics | Every heading (h1 to h3, `.display`, `.h2`), the hero headline, the statements, the pricing lead and quote. |

Fallbacks: Public Sans → Helvetica Neue, Arial. Newsreader → Times New Roman, Georgia.

### Global defaults

Body is 15px Public Sans, line-height 1.45, letterspacing -0.01em, antialiased, ink on white. A single rule at the end of `app/globals.css` sets every heading to Newsreader at weight 500 with -0.02em tracking, overriding the tighter per-section tracking that was tuned for a grotesque.

### Scale

| Style | Family | Size | Weight | Line height | Tracking | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Hero headline `.hero__title` | Serif | `clamp(40px, 8.4vw, 110px)` | 400 | 0.98 | -0.03em | Line 1 navy, line 2 italic at `--ink-50`. Sized so the longer line fills the container. Centered. |
| Hero pitch `.hero__pitch` | Sans | `clamp(17px, 1.45vw, 20px)` | 400 | 1.35 | -0.015em | `--ink-70`, centred, max 52ch, at the foot of the hero. |
| Statement `.statement__text` | Serif | `clamp(56px, 8vw, 120px)` | 500 | 0.92 | -0.03em | White at 92 percent. `<em>` is italic at `--light-60`. Max 11ch. One per page, in "The Wooster Prep way". |
| Pitch statement `.pitch__statement` | Serif | `clamp(40px, 5.6vw, 84px)` | 500 | 0.95 | -0.03em | White at 92 percent, `<em>` at `--light-60`. Max 14ch. |
| Statement line `.statements__line` | Serif | `clamp(26px, 2.6vw, 36px)` | 500 | 1.02 | -0.025em | The three supporting lines under the statement. Max 14ch. |
| Pitch lead `.pitch__lead`, index title `.method__title` | Sans | `clamp(20px, 1.9vw, 26px)` / `clamp(20px, 1.7vw, 24px)` | 500 | 1.15 / 1.1 | -0.03em / -0.025em | One short sentence each. |
| Parents statement `.parents__statement` | Serif | `clamp(32px, 4.2vw, 60px)` | 500 | 1.02 | -0.025em | Navy, `<em>` italic at `--ink-50`. Max 22ch. |
| Gallery panel title `.guarantee__panel-title` | Serif | `clamp(44px, 5.6vw, 84px)` | 500 | 0.95 | -0.03em | White at 92 percent, the statement face at a smaller size. Max 10ch. |
| Gallery lead `.guarantee__lead` | Sans | `clamp(22px, 2.4vw, 34px)` | 500 | 1.1 | -0.03em | One sentence, max 20ch. Lines beneath are 15 to 17px `--ink-70`. |
| Pull line `.pull` | Serif | `clamp(30px, 3.6vw, 48px)` | 500 | 1.02 | -0.025em | Navy, `<em>` italic at `--ink-50`. Max 16ch. One per section, pulled out of the running copy in About and Guarantee. |
| Price lead `.price-card__lead` | Serif | `clamp(34px, 3.6vw, 52px)` | 500 | 1.02 | -0.02em | Navy, `<em>` italic at `--ink-50`. Max 16ch. |
| Pricing quote `.price-card__quote` | Serif | `clamp(30px, 3.3vw, 46px)` | 500 | 1.05 | -0.02em | |
| Display `.display` | Serif | `clamp(38px, 5.4vw, 72px)` | 500 | 1 | -0.04em | Section intro and CTA headings. Max 14ch. |
| H2 `.h2` | Serif | `clamp(30px, 3.2vw, 40px)` | 500 | 1.05 | -0.035em | Step and pricing headings. |
| Accordion heading | Serif | `clamp(24px, 2.6vw, 34px)` | 500 | 1.05 | -0.035em | |
| Why claim `.why__claim` | Serif | `clamp(26px, 2.6vw, 36px)` | 500 | 1.05 | -0.035em | Three words or fewer. |
| Parents item title | Serif | `clamp(20px, 1.7vw, 24px)` | 500 | 1.1 | -0.025em | |
| Mobile menu link | Sans | 26px | 500 | | -0.03em | |
| Lede `.lede` | Sans | `clamp(17px, 1.45vw, 20px)` | 400 | 1.35 | -0.015em | `--ink-70`, max 56ch. |
| Step body | Sans | `clamp(17px, 1.45vw, 20px)` | 400 | 1.3 | -0.02em | Max 48ch. |
| Body / accordion body | Sans | 16px | 400 | 1.4 | | |
| Hero CTA link | Sans | 16px | 500 | | -0.01em | |
| Nav, button, caption | Sans | 14px | 500 | | -0.01em | |
| Eyebrow `.eyebrow` | Sans | 13px | 500 | 1.2 | | 14px below. Not uppercase. |
| Pill, small button | Sans | 13px | 500 | | | |
| Kicker `.film__kicker`, plan name | Sans | 12px | 500 / 600 | | +0.02 to +0.04em | The only uppercase styles. |
| Numbered badge `.num` | Sans | 11px | 600 | | 0 | |

### Rules

- Headings are Newsreader at weight 500, never bold, tracked at -0.02em. 600 is reserved for tiny sans labels and badges.
- Sans tracking tightens as size grows for ledes and UI; headings are always -0.02em.
- The serif is for headings and statements, not reading. Never set body copy, buttons, or navigation in Newsreader.
- Italic serif always pairs with a softer color (`--ink-50` on light, `--light-60` on dark).
- Measure: ledes at most 56ch, body at most 46 to 48ch, statements at most 11ch.
- Uppercase is limited to 12px kickers with positive tracking.
- Use `text-wrap: balance` on multi-line display type.

---

## 5. Layout and spacing

| Token | Value | Role |
| --- | --- | --- |
| `--max` | 1180px | Content width. |
| `--pad` | `clamp(20px, 5.5vw, 110px)` | Side gutter. |
| `--header-h` | 60px | Fixed header height. |
| `--radius` | 4px | Card and media corners. Buttons and pills are fully round (999px). |
| `--section-y` | `clamp(72px, 9vw, 132px)` | Vertical padding of every landing section. |
| `--head-gap` | `clamp(32px, 4.5vw, 64px)` | Space between a section head and its content. |

**Container.** `.container` is full width, capped at `--max` plus two gutters, centered, with `--pad` inline padding. Everything sits inside one.

**Vertical rhythm.** Every landing section is one viewport tall (`min-height: 100svh`) with its content centred, pads with `--section-y` top and bottom, and separates its head from its content with `--head-gap`. Internal gaps between blocks are 28 to 44px. Grid gaps between cards are 32px.

**Hero snap only.** The document uses `scroll-snap-type: y proximity` and the hero is the one `scroll-snap-align: start` point, so a scroll that ends near the top settles back onto the hero; the rest of the page scrolls freely. Off under reduced motion.

**Alignment.** Left aligned by default. The hero headline, with the primary button, the "How it works" link and the "Free. No card." note directly beneath it, is the one centered block. The pitch sentence and the login button sit centred at the bottom of the hero. Step headings sit stacked under their number and pill, never in a right-hand column.

**Grid.** Two equal columns for case cards, collapsing to one under 960px.

---

## 6. Components

### Buttons `.btn`

40px tall, fully round, 18px side padding, 14px weight 500. Transitions on color, background, border, and transform at 0.3s with `--ease`.

| Variant | Ground | Text | Hover |
| --- | --- | --- | --- |
| `--primary` | `--ink` | white | `--navy`, lifts 1px |
| `--ghost` | transparent, 1px `--ink-30` border | ink | border to `--ink` |
| `--glass` | white at 14 percent, 12px backdrop blur | white | white at 24 percent |

Sizes: `--sm` 32px tall, 13px type. `--lg` 52px tall, 16px type. In the dark header state the primary button inverts to white with ink text.

Primary is for the one action we want (Start Your Diagnostic). Ghost is for the secondary path (Existing Student Login, See how it works). Glass is only for controls over video.

### Pill `.pill`

30px tall, round, 13px weight 500, `--soft` ground (white on soft sections). Hover inverts to ink with white text. Used as the step call-to-action beside the number.

### Icon circle `.icon-circle`

A 1px ring holding a 10px arrow. 18px default, 28px `--light` on dark, 30px `--lg` under the hero headline, 34px `--ghost` for the pricing arrows. Rings use the 30 percent alpha of the current ground. Arrows point down for "continue", left and right for the rail.

### Numbered badge `.num`

26px ink circle, white 11px weight 600 numeral with a leading zero. Retired from every list of points on 2026-09-11; points are titled, never numbered. The rule stays for the plan comparison cards only.

### Header

Fixed, 60px, hairline underneath. Logo left, nav right (About, Method, Blog, Testimonials, Pricing, Login, then the button). Nav links are 14px weight 500 at 90 percent opacity, 55 percent on hover. Ends with a small primary button. Under 960px the nav collapses to a two-line burger that opens a full-screen white menu with 26px links in the same order, with login written out as "Existing Student Login".

The header repaints to match the section under it: `header--dark` (dark ground, white text, white primary button) and `header--gray` (gray ground). The swap is a 0.45s color transition driven by scroll position.

### Film card `.film`

A `--dark` card with 28px corners (20px on phones) on the white ground, `clamp(28px, 3.6vw, 56px)` padding. Two columns, 0.9 to 1.5: copy on the left (uppercase 12px kicker in `--light-60`, a serif title at `clamp(28px, 2.8vw, 40px)`, a 16px `--light-60` paragraph capped at 34ch), the film on the right at 16 by 9 with 16px corners. An "Unmute" pill (40px, 12px corners, black at 78 percent with blur) sits centered at the top of the video and reads "Mute" while sound is on. Stacks to one column under 960px.

### Case card `.case`

A media box at 16 by 11.5 with 4px corners on a `--soft` ground (white on soft sections), with a product screenshot offset 9 percent from the top left, a soft navy shadow, and a fade to the ground color at the bottom. A 30px translucent "+" sits bottom right. Hover nudges the shot up-left 1.5 percent and rotates the plus 90 degrees. Caption beneath: 14px title, 14px `--ink-50` subtitle.

### Plan card `.plan`

The step 04 comparison. Uppercase 12px name, `--ink-70` description, then a list with hairline rows. The generic plan is two columns in `--ink-50`. The Wooster plan is one ranked column with leading-zero numerals in `--ink-30` and navy chips showing point gains.

### The Wooster Prep way `.statements`

One screen on `--dark-2`, `--section-y` padding. Light eyebrow "The Wooster Prep way", the statement "Study hard or study smart." in the statement style, its subline in `--light-60`, then below a `--light-12` hairline three columns (one under 960px) of serif statement lines ("10,000 and counting.", "Moneyball the SATs.", "No guesswork. No wasted hours.") each with a 15px `--light-60` note. Carries `id="method"`. This replaced the five pinned full-viewport slides.

### Accordion `.accordion`

Native `<details>`. Rows separated by `--light-12` hairlines, 26px vertical padding, heading plus a 28px light icon circle that rotates 180 degrees when open. One item open at a time. Body copy in `--light-60`, max 46ch, fades up 0.5s on open. Capped at 820px wide, left aligned.

### Pitch `.pitch`

The elevator pitch, one dark screen directly after the hero, `id="pitch"`, the target of the hero's "How it works" arrow. Two columns (one under 960px): left, light eyebrow "What Wooster Prep is" and the problem as a serif statement ("Most students study everything. The SAT only rewards a few things."); right, three points spread to the full height of the statement column, each a 20 to 26px lead ("Find the gaps.", "Rank them by points.", "Do them in order.") over a 15px `--light-60` subline, separated by `--light-12` hairlines. No numerals. Below a hairline, the actions: the primary button in its dark-header form (white on dark) beside a light ghost "See the method" to `/method`.

### Method index `.method` and the `/method` page

Landing: white ground, `id="how-it-works"`. Eyebrow "How it works", H2 "Four steps. One plan.", a one-sentence lede, then on a hairline four columns (two under 960px, one under 600px) of a 20 to 24px title and one 15px `--ink-70` line per step. No numerals. Under that a strip of three case cards at 16 by 10 (dashboard, today's plan, mastery board; one column under 960px) and a ghost "See the method in detail" with the "Free. No card." note. The page `/method` carries the page head with the full lede and the old statement intro, then the four steps in full as `.expertise` sections (white and soft alternating, `--section-y` padding, the pills, H2, body, and the two-card `.cases` grid with screenshots, the film card, and the plan comparison), then a hairline CTA block. Copy lives in `lib/method.ts`.

### Why it works `.why`

White ground, `clamp(56px, 7vw, 96px)` vertical padding, directly after the statements. Eyebrow, a reduced display heading at `clamp(34px, 4.2vw, 56px)` ("Not magic. Math."), one-sentence lede. Sized so the heading and the last row are readable together in one viewport at desktop heights: rows use `clamp(14px, 1.7vw, 22px)` vertical padding and the claim runs `clamp(22px, 2.1vw, 30px)`. Then an index: five rows on hairlines, each a two-column grid of a claim of three words or fewer and a one-line proof in `--ink-70`. No numerals. Rows stack under 960px. No paragraphs anywhere in this section.

### FAQ `.faq`

Dark ground, same padding and hairline as "What is included". Eyebrow "Questions", an h2 at H2 size in white, then the accordion capped at 820px with the ten questions from `lib/faq.ts`. Answers are answer-first, one to three sentences. This section always sits directly before the CTA and emits `FAQPage` schema; the visible text and the schema come from the same array.

### Glossary `.glossary`

Page-head pattern, then rows on hairlines: term in the serif at `clamp(22px, 2.1vw, 30px)` (navy on hover), first sentence of the definition in `--ink-70` beside it. Term pages use the Doc layout with the definition as the lede, related terms as pills, and the trademark callout at the end.

### For parents `.parents`

Soft ground (`--soft`), so it separates from the white "Why it works" above and steps down to the gray pricing below, `clamp(90px, 12vw, 180px)` vertical padding. Eyebrow "For parents", a display heading capped at 18ch, and a lede capped at 60ch. Below a hairline, three columns (one under 960px) each with a 20 to 24px title and `--ink-70` body at 34ch. No numerals and no closing statement; the section is one viewport like the others and always sits directly before pricing.

### Price card `.price-card`

White, 4px corners, `clamp(28px, 3.4vw, 48px)` padding, `min(86vw, 640px)` wide, in a horizontal snap rail with 32px gaps. Hairline badge top left. The card leads with a navy serif line about what the plan buys ("Two months of knowing exactly what to do next."), not with the number. The price itself is a 15px `--ink-50` sentence with the amount at weight 500 in ink, followed by the per-day equivalent, then a `--ink-70` sentence that ties the cost to what the family gets. There is no oversized numeral. The checklist uses 22px ink circles with a white tick.

### Testimonials `.testimonials` and the card fan `.stagger`

Soft ground, between the guarantee and the dark "What is included", `clamp(90px, 12vw, 180px)` above and a shorter `clamp(60px, 8vw, 120px)` below. Eyebrow "Testimonials", display heading, lede. Then a 600px stage (520px under 640px) holding a fan of square cards, 365px a side (290px under 640px), each a real `<button>`. Cards are white with a hairline border and 4px corners; the centre card is ink with white text and sits 65px higher, the rest step out at two thirds of a card width per position, offset 15px up or down and rotated 2 degrees alternately. A 40px hairline circle with the speaker's initial stands in for the photo, then the quote at step-body size and weight 500, then a 14px `--ink-50` attribution pinned to the foot of the card. Clicking a card brings it to the centre; two 40px white icon circles with the left and right arrows step one card at a time. Transforms ease over 0.9s, colours over 0.3s, none with reduced motion. Implemented in `components/StaggerTestimonials.tsx`. The quotes in `components/Testimonials.tsx` are placeholders and the lede says so; replace both before launch.

### Audience columns `.audiences`

Two columns (one under 960px), 32px gap, above a hairline with `clamp(40px, 5vw, 70px)` of padding and `clamp(70px, 9vw, 130px)` of space above. Each column is a "For parents" or "For students" title at 20 to 24px and `--ink-70` body at 46ch. Closes the About and Guarantee sections; always parents first.

### Excerpt sections and their pages

About and the score guarantee each exist twice: a full page (`/about`, `/guarantee`) and a landing-page excerpt. The copy lives once, in `lib/about.ts` and `lib/guarantee.ts`, and the excerpt is a slice of it, never a rewrite. Every excerpt ends with a ghost button ("Read the whole story", "Read the full guarantee") to its page. The parent and student columns appear only on the pages. Header "About" and the footer's "About us" and "Score guarantee" link to the pages.

### Score guarantee `.guarantee`

Landing block. Dark ground (`--dark`), directly after pricing and before the soft testimonials, `clamp(90px, 12vw, 180px)` vertical padding, header in its dark state over it. Light eyebrow "The Wooster Prep score guarantee", then the promise as a serif statement at `clamp(44px, 6.4vw, 96px)`, white at 92 percent with the second half in italic `--light-60` ("100 points higher, or the course again for free."), then the one-sentence promise as a `--light-60` lede at 56ch. Below a `--light-12` hairline, an index of the three points in three columns (one under 960px): the point's title at 13px `--light-60` over its lead line at 20 to 26px white. The block closes with a large light ghost button "Read the full guarantee" (white text, `--light-30` ring, white on hover) beside a 14px `--light-60` note, all inside the same dark panel. No gallery, no audience columns here.

The page `/guarantee` carries the full copy: the page head with the display title and the promise as lede, then the three points as the pinned horizontal gallery (spec below) with every line, then the audience columns.

### Guarantee gallery `.guarantee__gallery`

Lives on `/guarantee` only. The wrapper is one viewport tall per panel, the stage sticks under the header at `100svh` minus the header, painted `--dark` with panels alternating `--dark` and `--dark-2` like the statement slides, a `--light-12` hairline on top, and the header swaps to its dark state over it; the track slides sideways with the scroll so one panel is in view at a time and scrolling back reverses it. Each panel is a two-column grid (0.8fr and 1.2fr) with a 44 to 84px serif title on the left, set like the statement slides, and on the right a 22 to 34px white sans lead of one short sentence followed by short `--light-60` lines at 15 to 17px, never a paragraph longer than two sentences. The "Why 1300" panel carries the pull line ("We asked. The scale said no.") at a reduced 26 to 36px in white at 92 percent with the `<em>` at `--light-60`. A `--light-12` hairline with a white fill sits at the foot of the stage and fills as the gallery advances. Under 960px and with reduced motion the panels stack on hairlines with no pin.

### Blog index `.bloglist` and post rows `.postrow`

`/blog`. Page head (display heading and lede, no eyebrow), then a 760px column of post rows, 16px apart. A row is one link: a 13px `--ink-50` meta line (date, read time, the first tag as a small pill), a 20 to 26px title that turns navy on hover, a 15px `--ink-70` description at 60ch, and "Read article" with an arrow icon circle. Rows have a hairline border and 4px corners and go to the soft ground on hover. Modelled on the gscdaddy blog index, on the brand tokens.

### Article `.article`

`/blog/[slug]`. An "All posts" back link with the left-arrow circle, then a two-column grid (main at most 720px, a 220px aside; one column under 960px with the aside hidden). The head: tag pills, a 34 to 56px sans title at 18ch, the description as lede, and a 14px `--ink-50` meta line (author, date, updated, read time), above a hairline. The body `.prose` is a 62ch column at 17px with 1.55 leading: `--ink-70` paragraphs and lists, 24 to 30px H2s and 19 to 22px H3s with scroll margins for the table of contents, links in navy with a soft navy underline that darkens on hover (the same rule as the legal pages, so a link never reads as bold black text), and the one `<blockquote>` set as a navy serif pull line. Then previous and next links on a hairline, a "Keep reading" grid of up to three related posts ranked by shared tags (hairline cards with title, description, two tag pills), and a closing CTA card on the soft ground ("Begin with the free diagnostic." with the primary button). The aside holds the sticky "On this page" list: a 13px label, entries on a left hairline at 13px `--ink-50`, H3s indented, the heading in view marked in ink with a 2px ink rule. Posts and their HTML bodies live in `lib/posts.ts`; helpers (sorting, reading time, headings, related, neighbours) in `lib/blog.ts`. The six posts are lorem ipsum placeholders with working links between them.

### About us `.about`

Soft ground (`--soft`), between the dark "What is included" and the white CTA, `clamp(90px, 12vw, 180px)` vertical padding. Eyebrow "About us", then the opening line of the story as a sans heading at `clamp(34px, 4.2vw, 56px)`, weight 500, tracking -0.04em, capped at 20ch. Below, a two-column grid (1fr and 0.8fr, one column under 960px): the first two paragraphs of the founder story on the left as step-body paragraphs at 48ch, then the pull line ("It worked so well it was slightly annoying.") and the "Read the whole story" ghost button, and on the right the team photo in a white 4px box at 4 by 5 that sticks below the header while the story scrolls. Under 960px the photo moves above the story at 4 by 3. The page `/about` carries the whole story with the same grid on the white ground, the photo box on the soft ground, and the audience columns at the end. The photo is `public/assets/team.jpg` (1600 by 2000, 4 by 5 crop), passed through `next/image` with a static import and a blur placeholder.

### Inner pages `.page`

The header, footer, and reveal observer live in the root layout, so every route shares them; header links and footer anchors are written as `/#section` so they work from any page. An inner page starts under the header with a `.page__head`: eyebrow, display H1 capped at 16ch, optional lede, optional 13px `--ink-50` meta line (dates, author). White ground, `data-ui="light"`.

- **Document `.doc`** (privacy, terms, disclaimer): a 62ch reading column at 16px with 1.5 leading, `--ink-70` paragraphs, 22 to 28px sans H2s, underlined links, and a hairline `.doc__callout` box for the one highlighted paragraph. The text is ported verbatim from the live pages at woosterprep.com, headings and effective dates included; edit it there first. A `.doc__note` box exists for marking drafts.
- **Forms**: 13px labels, 48px inputs with a `--ink-30` hairline that goes ink on hover and navy with the focus ring on focus, 4px corners, 16px between fields, a large primary button, then a 14px `--ink-50` note. The login form is a UI shell: submitting shows a status line and sends nothing until it is wired to the auth backend.
- **Login `.auth`**: two equal columns at full viewport height (one under 960px, where the photo is dropped). Left, a 440px column centred vertically with the logo, eyebrow, heading, lede, and closing line all centred (the form fields and their labels stay left-aligned inside the column): 180px logo, eyebrow, H2 "Welcome back.", lede "Sign in to continue prep.", then the form: email, password with a 13px "Show" / "Hide" text toggle inside the field, a row with the "Keep me signed in" checkbox (18px, 4px corners, ink when checked with a white tick) and a "Forgot your password?" link to email, a full-width primary "Sign in", an "Or continue with" hairline divider, a full-width ghost "Continue with Google" with no logo, and "New to Wooster Prep? Create an account" linking to the live register page. Right, the login photo `login.jpg` inset 16px with 4px corners, filling the column, with one white quote card bottom left (15px weight 500 quote, 13px `--ink-50` attribution). The head, form, and extras reveal in three steps. Email and password mirror the live form; Google sign in is described in the privacy policy but not yet on the live form.
- **Diagnostic `.diag`**: the exam itself runs in the app at woosterprep.com/diagnostic, so this page is its front door: page head, three titled steps on a hairline, then the large primary "Begin the diagnostic" button with the "Free. No card." note, linking out to the exam.

### Footer

Hairline on top, `clamp(48px, 6vw, 80px)` above. A six-column grid (1.4fr for the brand, then five equal columns, 32px gap): the brand column holds the 220px logo over a 14px `--ink-70` tagline at 28ch; the five link columns are Product, Resources, Explore, Company, and Legal, each a 13px weight 500 heading over 14px weight 500 links in `--ink-70` that turn ink on hover. Product links the diagnostic, Included, Pricing, and the guarantee; Resources the blog, How it works, For parents, and login; Explore the film, the statements, Why it works, and Testimonials; Company About, Contact (email), and Careers; Legal the three policy pages. Below a second hairline, a bottom row with the copyright on the left and the social links (Instagram, X, YouTube, LinkedIn, TikTok, as text, no icons) on the right. Under 960px the brand column spans the row and the link columns go to three; under 600px they go to two and the bottom row stacks. Links appear once each. The film and statements sections carry `id="film"` and `id="method"` for the Explore anchors. Social handles and the careers page are placeholders in `lib/links.ts`.

---

## 6b. The app (signed-in screens)

Documented in full in `APP.md`. Rules that keep it on brand:

- **Shell.** A 240px white sidebar with a hairline on the right, the logo at 140px, text-only navigation at 14px weight 500 (`--ink-70`, active in navy on the `--soft` ground), and the student, "Demo account" and log out at the bottom. Content column on `--soft`, capped at 1240px. Under 960px the sidebar becomes a top bar.
- **Cards.** White, hairline border, 4px corners, 18 to 26px padding. The one dark card per screen ("Study this next") uses `--dark` with a white primary button. Concept cards and stat tiles carry a 3px top rule in the status color.
- **Type.** Page titles and card titles in Newsreader; numbers on tiles and the score path in Newsreader; everything else Public Sans. Eyebrows are 12px uppercase in `--ink-50`.
- **Chips.** 22px, uppercase 11px at weight 600, tinted with the status color. Section chips (R&W, Math) are neutral. Stat chips at the top of a page are white with a hairline, sentence case.
- **Bars.** 4px, `--ink-12` track, status-colored fill. The score path bar is 8px in navy.
- **Copy.** Sidebar labels are two words. The page head carries the long description.

## 7. Motion

Motion is slow, eased, and additive. Nothing bounces. Nothing loops except the film.

| Token | Value |
| --- | --- |
| `--ease` | `cubic-bezier(0.25, 0.74, 0.22, 0.99)` |

**Durations.** Hover and color changes 0.3s. Header repaint 0.45s. Reveal on scroll 0.9s. Card hover transforms 0.9s. Hero intro 1.4s per element with overlap.

**Reveal on scroll.** Elements carrying `.reveal` start at opacity 0, 24px lower, and settle when 5 percent of them enters the viewport (with a 10 percent bottom margin). `--delay` adds 0.12s, `--delay-2` adds 0.28s. Each element reveals once. Implemented in `components/RevealObserver.tsx`, which re-scans on every route change and watches for elements added after load, so a hot reload or a client-side render never leaves something stuck invisible.

**Reveal timing.** With no pinned slides, every section reveals in normal flow; the pitch, method index, and statements each reveal head first, then list, then foot.

**Hero intro (GSAP).** Implemented in `components/Hero.tsx` with GSAP 3 and SplitText.

1. Waits for the serif font to be ready and for the tab to be visible.
2. Splits the headline into words. Each word starts 0.4em above its baseline, at 94 percent scale from its foot, invisible.
3. Words land left to right with `expo.out`, 1.4s each, 0.07s stagger, starting at 0.2s.
4. The "How it works" link rises 16px and fades in from 0.9s.
5. The description and buttons rise 22px and fade in from 1.15s.
6. On completion the split is reverted so the headline is plain text again.

**Guarantee gallery.** Implemented in `components/GuaranteeGallery.tsx` with the same raf-throttled scroll handler as the film. Progress through the wrapper is split into one segment per transition; each segment holds the current panel for the first 30 percent, then eases to the next with a smoothstep. Only the track transform and the progress bar's `scaleX` change. Under 960px and with reduced motion the component adds `guarantee__gallery--static` and the panels stack.

**Header theme swap.** On scroll the header reads which `data-ui` section sits under it (`light`, `dark`, `gray`) and swaps class. Throttled to one check per animation frame.

**Film.** The film fills one viewport like every other section, no longer pinned, placed after the method index. The device (1040px wide at most, sized to fill the viewport under the header) tilts from 14 degrees and 90 percent scale to flat and full size as the band rises through the viewport, flat by the time it sits in the middle. The film autoplays muted, pauses off screen, and unmutes from the glass button or from the case card that links to it.

**Testimonial fan.** Cards move only by `transform` over 0.9s with `--ease` when the list rotates; the centre card swaps colour over 0.3s. With reduced motion the transform transition is dropped and cards jump.

**Hover.** Primary buttons lift 1px. Case shots drift up-left. Plus badges rotate a quarter turn. Icon circles drop 2 to 3px on the links that point down.

**Reduced motion.** With `prefers-reduced-motion: reduce`, reveals are shown immediately, the hero intro is skipped, the device does not tilt, and smooth scrolling is off. Every new animation must have this fallback.

**Performance rule.** Animate only `transform` and `opacity`. Do not animate `filter`, blur, or layout properties. A blur on large type was tried and stalled the renderer.

---

## 8. Imagery and media

**Product screenshots.** Real UI captures in `public/assets/`: `stats-dashboard.png`, `practice-exams.png`, `todays-plan.png`, `concept-library.png`, `mastery-board.png`. Always shown inside a case card, offset and cropped from the top-left, never edge to edge, never with a device frame. Alt text describes what the screen shows.

**Film.** `moneyball-web.mp4` (720p, about 9MB) with `moneyball-poster.jpg`. Shown inside the laptop device in the film section and as a hover preview in a case card. The 76MB original is kept locally and ignored by git. Re-encode command is in the README.

**Team photo.** `team.jpg` in the About section, the one stock photograph on the site, from Unsplash under the Unsplash License (photo by Priscilla Du Preez, unsplash.com/photos/XkKCui44iM0). Candid, warm, people mid-laugh over a laptop with books behind them. Shown edge to edge in the white 4 by 5 box, object-fit cover.

**Login photo.** `login.jpg` (1400 by 1900, portrait crop) from Unsplash under the Unsplash License (photo by season youn, unsplash.com/photos/Qzn1_t80vjI): students at long tables in a sunlit library. Fills the right column of the login page, object-fit cover.

**Style.** Two photographs are allowed on the site: the team photo and the login photo above. Everywhere else, no stock photography. No illustration. No gradients except the fade at the bottom of a case card and the device base.

---

## 9. Iconography

Only three icons exist, all 12 by 12 inline SVG, 1.2 stroke, `currentColor`, in `components/Icons.tsx`: arrow down, arrow left, arrow right. A "+" glyph is typed, not drawn. The checklist tick is a data URI in CSS. New icons must match: 1.2 stroke, no fills, square viewbox.

---

## 10. Voice and copy

**Audience.** Parents of the student are the primary reader of the landing page, but students land here too. The student is the user. The hero and every product section speak to the student in the second person ("your score", "what you study next"); a parent reads "you" as their child without friction. "Your child" appears only inside the "For parents" section, which names the feeling we solve (not knowing whether the effort is working, hours going to the wrong thing, a fixed test date). Explanatory sentences avoid the pronoun where they can ("A free diagnostic finds the gaps, then a plan says exactly what to study next").

**Tone.** Direct, confident, a little wry. Short sentences, contractions welcome. Facts over adjectives. Say it in the fewest words that still land; a body line is one or two sentences, never three. We say what the product does and what the student gets. Urgency is real but quiet: the test date does not move, the plan can start today. Never countdowns, never fake scarcity.

**Price.** The number never leads. Say what the two months buy first, then the amount in a plain sentence with its per-day equivalent, then one line that connects the cost to the family's peace of mind. Comparisons stay soft ("a couple of tutoring sessions"), never a table against competitors.

**Signature lines.**

- Personalized SAT Prep. That actually moves your score.
- Study hard or study smart.
- Moneyball the SATs.
- No guesswork. No wasted hours.
- The difference between an 1100 and a 1590 is not just effort, it is strategy.
- Not magic. Math.
- Wooster runs on a loop, not a syllabus.
- The hard part isn't the studying. It's not knowing if it's working.
- Effort was never the problem. Direction was.
- The test date is fixed. The plan isn't.
- Most students find out from the score report. You can know today.
- Two months of knowing exactly what to do next.
- It worked so well it was slightly annoying.
- 100 points higher, or the course again for free.
- We asked. The scale said no.
- Most students study everything. The SAT only rewards a few things.
- Four steps. One plan.
- 10,000 and counting.

**Rules.**

- Sentence case everywhere, including buttons and headings. Title case only in the product name.
- Numbers are written as numerals: 1100, 1590, 10,000, 98-question, 7-day, 2-month.
- The question bank size is a live figure, never typed into copy. It lives once in `lib/stats.ts` and every mention (hero paragraph, statement slide, pricing heading) renders from it. Raise it there when the bank grows. Size is framed as a means to personalisation (a fresh question for the weakest concept), not as volume for its own sake; the statement slide says "and counting".
- "SAT" is always uppercase. "Wooster Prep" is two words.
- Call-to-action verbs: Start, Begin, See, Take. The main action is always "Start Your Diagnostic".
- Do not use exclamation marks. Do not promise a specific score. The one promise we make is the score guarantee (1300 or below, at least 100 points higher on the next official score, or the course again for free), and it is stated in full only in the Guarantee section.
- Avoid ed-tech jargon: no "learners", "gamified", "AI-powered". Say student, plan, concept, mastery.

---

## 11. Accessibility

- Every interactive element is a real `<a>` or `<button>`. Toggles carry `aria-pressed` or `aria-expanded`.
- Decorative SVG and the film device are `aria-hidden`.
- The accordion is native `<details>` so it works without JavaScript.
- Reduced motion is honored everywhere (section 7).
- Contrast: ink on white and white on dark clear AA. The 50 percent alphas are for captions only, never for body copy or controls.
- Focus: form inputs show a 2px navy outline with 1px offset on `:focus-visible`. Everything else is still the browser default; when that changes, use the same ring.

---

## 12. Responsive behavior

| Breakpoint | Change |
| --- | --- |
| ≤ 960px | Nav becomes burger and full-screen menu. Card grids, plan lists, and the included section go to one column. Device base hides and the screen frame slims. Footer goes to two columns. |
| ≤ 600px | Hero top padding tightens. Statement type drops to `clamp(44px, 13vw, 72px)`. Pricing head stacks. Footer goes to one column. |

The hero headline uses viewport-relative sizing, so under about 500px the second line balances onto two lines. Side gutters never drop below 20px.

---

## 13. Do and do not

**Do**

- Let whitespace carry the layout.
- Use one serif statement per screen at most. The guarantee gallery is the one exception: its panel titles are serif, and the "Why 1300" panel also carries the pull line.
- Keep buttons round, ink, and sentence case.
- Put screenshots in case cards with the offset crop.
- Add the reduced-motion fallback with every animation.
- Update this file in the same change as the UI, and `SEO.md` when a route, a number, or a schema changes.

**Do not**

- Introduce a new color without adding it to section 3 first.
- Use bold weights for headings.
- Set body copy in the serif.
- Use box shadows outside case shots and the device.
- Use gradients as decoration.
- Animate blur or layout properties.
- Repeat a link in two places in the same component.

---

## 14. File map

| Concern | Where |
| --- | --- |
| Tokens, all component CSS | `app/globals.css` |
| Fonts, metadata | `app/layout.tsx` |
| Favicon | `app/icon.jpg` |
| Section components | `components/` |
| Icons | `components/Icons.tsx` |
| Routes and internal links | `lib/links.ts` |
| About, guarantee, and method copy | `lib/about.ts`, `lib/guarantee.ts`, `lib/method.ts` |
| Blog posts and bodies | `lib/posts.ts` |
| Blog helpers | `lib/blog.ts` |
| Inner pages | `app/about`, `app/guarantee`, `app/method`, `app/blog`, `app/blog/[slug]`, `app/login`, `app/diagnostic`, `app/privacy`, `app/terms`, `app/disclaimer` |
| Live figures (question count) | `lib/stats.ts` |
| Motion helpers | `lib/motion.ts` |
| Assets | `public/assets/` |

---

## 15. Changelog

Newest first. One line per UI or UX change. Date, what changed, where.

- 2026-09-15 · App screens added as a proof of concept (see `APP.md`): shell, dashboard, four concept grids, exams, stats, profile, on demo data, behind the login. Status colors added to the palette. Marketing pages moved into a site route group.
- 2026-09-15 · Film section rebuilt as a dark rounded card: copy left, film right with rounded corners and an Unmute pill. The tilted laptop is gone.
- 2026-09-15 · Discoverability layer added (see `SEO.md`): metadata defaults and share images, robots and sitemap, JSON-LD on every page, FAQ section before the CTA, `/pricing` and `/glossary` routes, trademark line in the footer, Speed Insights. Indexing is off until `NEXT_PUBLIC_INDEXABLE=true`.
- 2026-09-15 · Hero headline at weight 400; Newsreader loads its optical-size axis so large headings render with finer strokes.
- 2026-09-15 · Type families swapped: Newsreader for all headings and statements, Public Sans for body and UI. Heading rule added at the end of the stylesheet.
- 2026-09-11 · Scroll snapping limited to the hero.
- 2026-09-11 · Pitch loses its three proof chips; the film device grows to fill its viewport.
- 2026-09-11 · Every landing section is one viewport tall with content centred, and snaps mildly into view (proximity scroll snap on `.stack`). Numerals removed from all points (pitch, method index, parents, method page, diagnostic). Pitch points spread to the statement's height. Parents section loses its closing statement and button.
- 2026-09-11 · Landing restructured for the first three scrolls: hero gains the pitch sentence; new dark Pitch screen (problem, three steps, proofs, actions); the four steps become a one-screen Method index with the full steps on `/method`; the film is a two-thirds band; the five statement slides fold into one screen. No section is pinned any more. One spacing rhythm: `--section-y` and `--head-gap` on every section. Page height down from about 21,400px to about 13,800px at 1920 by 944.
- 2026-09-11 · Inline links in blog posts and legal pages are navy with a soft underline.
- 2026-09-11 · Blog pages added: index of post rows at `/blog` and an article template with a sticky table of contents, previous and next links, related posts, and a closing CTA, cloned from the gscdaddy blog onto the brand. Six lorem ipsum posts linked to each other. Header and landing cards now open the pages.
- 2026-09-11 · Reveal observer now picks up elements added after load (hot reloads, client renders).
- 2026-09-11 · Landing guarantee redesigned as one dark block: serif statement, promise, three-point index, and the read button inside it. The horizontal gallery moved to `/guarantee`.
- 2026-09-11 · About and the score guarantee split into full pages (`/about`, `/guarantee`) and landing excerpts with "Read" buttons; copy moved to `lib/about.ts` and `lib/guarantee.ts`; audience columns only on the pages. Header and footer link to the pages.
- 2026-09-11 · Login page: logo, head, and closing line centred over the form column; fields stay left-aligned.
- 2026-09-11 · Login page rebuilt as two columns after the 21st.dev sign-in reference: form left with password toggle, remember-me, Google option and divider; library photo with a quote card right. Second photograph added.
- 2026-09-11 · Inner pages added for the routes the original site has: login, diagnostic, privacy, terms, disclaimer. Header, footer, and reveal observer moved to the root layout; those links now point at internal routes, blog and careers stay external placeholders. Legal text ported verbatim from the live site; login mirrors the live form; the diagnostic page hands off to the live exam. Form styles and the navy focus ring added.
- 2026-09-11 · Pricing heading breaks before the question bank line.
- 2026-09-11 · Question count now renders from one source in `lib/stats.ts`. Statement slide reads "10,000 and counting." with a subline about monthly growth; hero paragraph ties the bank size to a fresh question for the weakest concept.
- 2026-09-11 · Question bank figure raised from ~6,000 to 10,000 in the hero paragraph, the statement slide, and the pricing heading.
- 2026-09-11 · Header nav cut to About, Method, Blog, Testimonials, Pricing, Login. Mobile menu mirrors the order.
- 2026-09-11 · Footer rebuilt: brand column with tagline, five link columns (Product, Resources, Explore, Company, Legal), bottom row with copyright and social links. Film and statements sections gained ids for the anchors.
- 2026-09-11 · New placeholder "Blog" section between Included and About: three post cards built on the case card, ported from the 21st.dev glass blog card onto the brand tokens. Blog link added to `lib/links.ts`.
- 2026-09-11 · New placeholder "Testimonials" section between the guarantee and Included: staggered card fan with prev and next arrows, ported from the 21st.dev pattern onto the brand tokens. Quotes are placeholders.
- 2026-09-11 · Score guarantee gallery: panel titles set in the statement serif at 44 to 84px.
- 2026-09-11 · Score guarantee gallery: numbered badges removed from the panels.
- 2026-09-11 · Score guarantee gallery painted dark, panels alternating dark and dark-2 like the statements; header goes dark over it.
- 2026-09-11 · Score guarantee: the three points are now a pinned horizontal gallery, one panel per viewport, copy cut into a lead line and short lines; progress hairline; stacked fallback under 960px and for reduced motion.
- 2026-09-11 · New "Score guarantee" section between pricing and Included: the promise as heading and lede, three hairline rows, one pull line, audience columns. Added to the nav and mobile menu. Pull line and audience columns are now shared classes used by About too.
- 2026-09-11 · About us: team photo added from Unsplash as `team.jpg`, replacing the empty slot.
- 2026-09-11 · New "About us" section between Included and the CTA: founder story, one serif pull line, a team photo slot, and "For parents" and "For students" columns. Added to the nav and mobile menu. Imagery rule now allows the one team photo.
- 2026-09-11 · First statement slide now reads "The Wooster Prep way" instead of "The Wooster way".
- 2026-09-11 · Hero: primary button, "How it works" link and "Free. No card." note now sit under the headline; login stays at the bottom. Audience wording rule added.
- 2026-09-11 · "For parents" moved onto the soft ground so it separates from "Why it works".
- 2026-09-11 · "What is included" moved to sit after pricing, before the CTA.
- 2026-09-11 · "The Wooster way" is now the first statement slide, with the intro paragraph as its subline.
- 2026-09-11 · "Why it works" compressed to fit one viewport: tighter padding, smaller heading and rows.
- 2026-09-11 · New "Why it works" section after the statements: index of five claims with one-line proofs. Statements section now headed "The Wooster way" at display size.
- 2026-09-11 · Parents section and price card copy cut to roughly half the words.
- 2026-09-11 · New "For parents" section between Included and Pricing: names the emotion, three truths, serif statement, CTA. Added to the nav and mobile menu.
- 2026-09-11 · Price card: the giant numeral is gone. Serif lead about what the plan buys, then the price as a sentence with the per-day figure and an emotional tie-in.
- 2026-09-10 · Brand card created from the shipped landing page.
- 2026-09-10 · Footer: removed the duplicate Privacy Policy link; logo enlarged from 140px to 220px.
- 2026-09-10 · Included section: stacked and left aligned, accordion capped at 820px, decorative arcs removed.
- 2026-09-10 · Header: removed the "How it works" anchor; header is logo plus nav.
- 2026-09-10 · Steps 01 to 04: heading and copy stacked under the number, left aligned.
- 2026-09-10 · Hero: replaced the giant wordmark with the centered two-line serif headline, "How it works" link beneath, GSAP word-landing intro.
- 2026-09-10 · Header and footer: brand text replaced with the logo image, with blend rules for dark and gray grounds.
- 2026-09-10 · Landing page ported from the static site to Next.js.
