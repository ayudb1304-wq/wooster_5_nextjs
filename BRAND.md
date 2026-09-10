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

### Light alphas (text and lines on dark grounds)

| Token | Value | Role |
| --- | --- | --- |
| `--light-60` | `rgba(255,255,255,0.60)` | Secondary copy on dark, italic emphasis in statements, film kicker. |
| `--light-30` | `rgba(255,255,255,0.30)` | Icon-circle borders on dark. |
| `--light-12` | `rgba(255,255,255,0.12)` | Hairlines and dividers on dark. |

### Ground sequence on the landing page

White (hero) → dark (film) → white / soft alternating (steps 01 to 04) → dark and dark-2 (statements, "The Wooster way") → white (why it works) → soft (for parents) → gray (pricing) → dark (included) → white (CTA, footer). The header follows the ground beneath it (see section 7).

### Rules

- Text on light grounds is always an ink token. Text on dark grounds is always white or a light alpha. No mid-gray solid fills for text.
- Navy is an accent, not a ground. Do not paint sections navy.
- Hairlines are 1px at the 12 percent alpha of the current ground.
- `::selection` is navy with white text.
- There is no success, warning, or error color yet. When one is needed, add it here first.

---

## 4. Typography

Two families, loaded through `next/font/google` in `app/layout.tsx` and exposed as `--font-inter` and `--font-cormorant`. The stylesheet consumes them through `--sans` and `--serif`.

### Families

| Token | Family | Weights loaded | Role |
| --- | --- | --- | --- |
| `--sans` | Inter | 400, 500, 600 | Everything: UI, body, headings, buttons, labels. |
| `--serif` | Cormorant Garamond | 500, 600, plus italics | Statements only: the hero headline, the dark statement blocks, the pricing quote. |

Fallbacks: Inter → Helvetica Neue, Arial. Cormorant Garamond → Times New Roman, Georgia.

### Global defaults

Body is 15px Inter, line-height 1.45, letterspacing -0.01em, antialiased, ink on white.

### Scale

| Style | Family | Size | Weight | Line height | Tracking | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Hero headline `.hero__title` | Serif | `clamp(40px, 8.4vw, 110px)` | 500 | 0.98 | -0.03em | Line 1 navy, line 2 italic at `--ink-50`. Sized so the longer line fills the container. Centered. |
| Statement `.statement__text` | Serif | `clamp(56px, 10.5vw, 160px)` | 500 | 0.92 | -0.03em | White at 92 percent. `<em>` is italic at `--light-60`. Statements max 11ch. |
| Parents statement `.parents__statement` | Serif | `clamp(32px, 4.2vw, 60px)` | 500 | 1.02 | -0.025em | Navy, `<em>` italic at `--ink-50`. Max 22ch. |
| Price lead `.price-card__lead` | Serif | `clamp(34px, 3.6vw, 52px)` | 500 | 1.02 | -0.02em | Navy, `<em>` italic at `--ink-50`. Max 16ch. |
| Pricing quote `.price-card__quote` | Serif | `clamp(30px, 3.3vw, 46px)` | 500 | 1.05 | -0.02em | |
| Display `.display` | Sans | `clamp(38px, 5.4vw, 72px)` | 500 | 1 | -0.04em | Section intro and CTA headings. Max 14ch. |
| H2 `.h2` | Sans | `clamp(30px, 3.2vw, 40px)` | 500 | 1.05 | -0.035em | Step and pricing headings. |
| Accordion heading | Sans | `clamp(24px, 2.6vw, 34px)` | 500 | 1.05 | -0.035em | |
| Why claim `.why__claim` | Sans | `clamp(26px, 2.6vw, 36px)` | 500 | 1.05 | -0.035em | Three words or fewer. |
| Parents item title | Sans | `clamp(20px, 1.7vw, 24px)` | 500 | 1.1 | -0.025em | |
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

- Headings are weight 500, never bold. 600 is reserved for tiny labels and badges.
- Tracking tightens as size grows. Large sans headings sit at -0.035 to -0.04em.
- The serif is for feeling, not reading. Never set body copy, buttons, or navigation in Cormorant.
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

**Container.** `.container` is full width, capped at `--max` plus two gutters, centered, with `--pad` inline padding. Everything sits inside one.

**Vertical rhythm.** Section padding scales with the viewport: `clamp(70px, 9vw, 130px)` for steps, up to `clamp(90px, 12vw, 180px)` for included, `clamp(100px, 13vw, 190px)` for the CTA. Internal gaps between blocks are 28 to 44px. Grid gaps between cards are 32px.

**Full-height slides.** The hero, film, and each statement are `min-height: 100svh` and `position: sticky; top: 0` so they stack as the page scrolls. Later sections carry a higher z-index and slide over them.

**Alignment.** Left aligned by default. The hero headline, with the primary button, the "How it works" link and the "Free. No card." note directly beneath it, is the one centered block. The paragraph and the login link sit at the bottom of the hero. Step headings sit stacked under their number and pill, never in a right-hand column.

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

26px ink circle, white 11px weight 600 numeral with a leading zero: 01, 02, 03, 04.

### Header

Fixed, 60px, hairline underneath. Logo left, nav right (Method, Included, For parents, Pricing, Login, then the button). Nav links are 14px weight 500 at 90 percent opacity, 55 percent on hover. Ends with a small primary button. Under 960px the nav collapses to a two-line burger that opens a full-screen white menu with 26px links.

The header repaints to match the section under it: `header--dark` (dark ground, white text, white primary button) and `header--gray` (gray ground). The swap is a 0.45s color transition driven by scroll position.

### Case card `.case`

A media box at 16 by 11.5 with 4px corners on a `--soft` ground (white on soft sections), with a product screenshot offset 9 percent from the top left, a soft navy shadow, and a fade to the ground color at the bottom. A 30px translucent "+" sits bottom right. Hover nudges the shot up-left 1.5 percent and rotates the plus 90 degrees. Caption beneath: 14px title, 14px `--ink-50` subtitle.

### Plan card `.plan`

The step 04 comparison. Uppercase 12px name, `--ink-70` description, then a list with hairline rows. The generic plan is two columns in `--ink-50`. The Wooster plan is one ranked column with leading-zero numerals in `--ink-30` and navy chips showing point gains.

### Statement block `.statement`

Full-height dark panel, alternating `--dark` and `--dark-2`, serif statement plus a `--light-60` subline, and a 34px light icon circle bottom right that links to the next panel. The "The Wooster way" section is five of these stacked as sticky slides: the first reads "The Wooster way" with the intro paragraph as its subline, then the four statements. Each fills the screen as the reader scrolls. Keep them: the scroll is the point.

### Accordion `.accordion`

Native `<details>`. Rows separated by `--light-12` hairlines, 26px vertical padding, heading plus a 28px light icon circle that rotates 180 degrees when open. One item open at a time. Body copy in `--light-60`, max 46ch, fades up 0.5s on open. Capped at 820px wide, left aligned.

### Why it works `.why`

White ground, `clamp(56px, 7vw, 96px)` vertical padding, directly after the statements. Eyebrow, a reduced display heading at `clamp(34px, 4.2vw, 56px)` ("Not magic. Math."), one-sentence lede. Sized so the heading and the last row are readable together in one viewport at desktop heights: rows use `clamp(14px, 1.7vw, 22px)` vertical padding and the claim runs `clamp(22px, 2.1vw, 30px)`. Then an index: five rows on hairlines, each a two-column grid of a claim of three words or fewer and a one-line proof in `--ink-70`. No numerals. Rows stack under 960px. No paragraphs anywhere in this section.

### For parents `.parents`

Soft ground (`--soft`), so it separates from the white "Why it works" above and steps down to the gray pricing below, `clamp(90px, 12vw, 180px)` vertical padding. Eyebrow "For parents", a display heading capped at 18ch, and a lede capped at 60ch. Below a hairline, three columns (one under 960px) each with a leading-zero numeral in `--ink-30`, a 20 to 24px title, and `--ink-70` body at 34ch. The section closes above a second hairline with a navy serif statement, a large primary button, and a 14px `--ink-50` note ("Free. No card."). This is the emotional argument and always sits directly before pricing.

### Price card `.price-card`

White, 4px corners, `clamp(28px, 3.4vw, 48px)` padding, `min(86vw, 640px)` wide, in a horizontal snap rail with 32px gaps. Hairline badge top left. The card leads with a navy serif line about what the plan buys ("Two months of knowing exactly what to do next."), not with the number. The price itself is a 15px `--ink-50` sentence with the amount at weight 500 in ink, followed by the per-day equivalent, then a `--ink-70` sentence that ties the cost to what the family gets. There is no oversized numeral. The checklist uses 22px ink circles with a white tick.

### Footer

Hairline on top. Three columns: 220px logo, links column (Privacy Policy, Terms, Educational Disclaimer, email), primary button. A single copyright line below. Links appear once each.

---

## 7. Motion

Motion is slow, eased, and additive. Nothing bounces. Nothing loops except the film.

| Token | Value |
| --- | --- |
| `--ease` | `cubic-bezier(0.25, 0.74, 0.22, 0.99)` |

**Durations.** Hover and color changes 0.3s. Header repaint 0.45s. Reveal on scroll 0.9s. Card hover transforms 0.9s. Hero intro 1.4s per element with overlap.

**Reveal on scroll.** Elements carrying `.reveal` start at opacity 0, 24px lower, and settle when 5 percent of them enters the viewport (with a 10 percent bottom margin). `--delay` adds 0.12s, `--delay-2` adds 0.28s. Each element reveals once. Implemented in `components/RevealObserver.tsx`.

**Hero intro (GSAP).** Implemented in `components/Hero.tsx` with GSAP 3 and SplitText.

1. Waits for the serif font to be ready and for the tab to be visible.
2. Splits the headline into words. Each word starts 0.4em above its baseline, at 94 percent scale from its foot, invisible.
3. Words land left to right with `expo.out`, 1.4s each, 0.07s stagger, starting at 0.2s.
4. The "How it works" link rises 16px and fades in from 0.9s.
5. The description and buttons rise 22px and fade in from 1.15s.
6. On completion the split is reverted so the headline is plain text again.

**Header theme swap.** On scroll the header reads which `data-ui` section sits under it (`light`, `dark`, `gray`) and swaps class. Throttled to one check per animation frame.

**Film.** The device tilts from 14 degrees and 90 percent scale to flat and full size as the section scrolls into place. The film autoplays muted, pauses off screen, and unmutes from the glass button or from the case card that links to it.

**Hover.** Primary buttons lift 1px. Case shots drift up-left. Plus badges rotate a quarter turn. Icon circles drop 2 to 3px on the links that point down.

**Reduced motion.** With `prefers-reduced-motion: reduce`, reveals are shown immediately, the hero intro is skipped, the device does not tilt, and smooth scrolling is off. Every new animation must have this fallback.

**Performance rule.** Animate only `transform` and `opacity`. Do not animate `filter`, blur, or layout properties. A blur on large type was tried and stalled the renderer.

---

## 8. Imagery and media

**Product screenshots.** Real UI captures in `public/assets/`: `stats-dashboard.png`, `practice-exams.png`, `todays-plan.png`, `concept-library.png`, `mastery-board.png`. Always shown inside a case card, offset and cropped from the top-left, never edge to edge, never with a device frame. Alt text describes what the screen shows.

**Film.** `moneyball-web.mp4` (720p, about 9MB) with `moneyball-poster.jpg`. Shown inside the laptop device in the film section and as a hover preview in a case card. The 76MB original is kept locally and ignored by git. Re-encode command is in the README.

**Style.** No stock photography. No illustration. No gradients except the fade at the bottom of a case card and the device base.

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

**Rules.**

- Sentence case everywhere, including buttons and headings. Title case only in the product name.
- Numbers are written as numerals: 1100, 1590, 6,000, 98-question, 7-day, 2-month.
- "SAT" is always uppercase. "Wooster Prep" is two words.
- Call-to-action verbs: Start, Begin, See, Take. The main action is always "Start Your Diagnostic".
- Do not use exclamation marks. Do not promise a specific score.
- Avoid ed-tech jargon: no "learners", "gamified", "AI-powered". Say student, plan, concept, mastery.

---

## 11. Accessibility

- Every interactive element is a real `<a>` or `<button>`. Toggles carry `aria-pressed` or `aria-expanded`.
- Decorative SVG and the film device are `aria-hidden`.
- The accordion is native `<details>` so it works without JavaScript.
- Reduced motion is honored everywhere (section 7).
- Contrast: ink on white and white on dark clear AA. The 50 percent alphas are for captions only, never for body copy or controls.
- Focus styles are the browser default for now. When custom focus is added, use a 2px navy ring and document it here.

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
- Use one serif statement per screen at most.
- Keep buttons round, ink, and sentence case.
- Put screenshots in case cards with the offset crop.
- Add the reduced-motion fallback with every animation.
- Update this file in the same change as the UI.

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
| External links | `lib/links.ts` |
| Motion helpers | `lib/motion.ts` |
| Assets | `public/assets/` |

---

## 15. Changelog

Newest first. One line per UI or UX change. Date, what changed, where.

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
