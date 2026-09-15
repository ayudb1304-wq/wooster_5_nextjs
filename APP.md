# Wooster Prep app screens: proof of concept

The signed-in product, rebuilt to the brand inside this repo. Eight screens behind a demo login, rendering from one fixture module, ready to be walked by reviewers and later ported into the application repo.

**How to view it.** Open `/login`, submit the form with anything, and you land on `/dashboard` as the demo student, Michael Scott. Nothing is sent anywhere. The sidebar says "Demo account" so it cannot be mistaken for live.

**What stays out of search.** Every app route is `noindex` and disallowed in `robots.txt`, on any deployment.

---

## 1. How it is built to port

| Concern | Where | Why it matters for the port |
| --- | --- | --- |
| Data | `lib/app/data.ts` | One typed module: the student, the 29 concepts with rank, section, upside, status and mastery, exam attempts, the trajectory. Every screen reads from it through props. The live app replaces this module with real data calls and leaves the components alone. |
| Shell | `app/(app)/layout.tsx`, `components/app/Sidebar.tsx` | Sidebar plus content column. Routes are the live app's routes, path for path. |
| Styles | `app/(app)/app.css` | Scoped under `.app`, built on the same tokens as the site. Nothing leaks into the marketing pages, and the marketing chrome (header, footer) does not appear in the app: those now live in `app/(site)/layout.tsx`. |
| Shared pieces | `components/app/ui.tsx`, `components/app/ConceptGrid.tsx` | Page head, card, tile, chips, progress bar, and the concept grid with search and section filters. |
| Screens | `app/(app)/*/page.tsx` | Thin: compose the shared pieces with the data. |

---

## 2. Screen by screen

| Live route | POC | What changed and why |
| --- | --- | --- |
| `/dashboard` | same | Same structure: greeting, guide prompt, "Study this next" card, score path, two tiles, top priorities. The red gradient card becomes the dark card from the brand; the blue accents become navy; serif for the greeting and the concept name. Streak and score range become quiet chips at the top right. |
| `/concepts` | same | The four concept grids on the live site are one component here with a mode. Hero tile with the logo dropped: the page head carries the count instead. Cards keep rank, section, tier, status, upside and the bar. Search and R&W/Math filters work. |
| `/flashcards` | same | Same grid, "Open flash cards", sub-label "PDF deck". |
| `/practice` | same | Same grid, "Open review deck". |
| `/practice-exams/mastery` | same | Same grid, "Start mastery set". |
| `/exams` | same | Start card plus the attempt list as rows on hairlines instead of stacked cards. |
| `/stats` | same | Four tiles with a colored top rule instead of colored dashes, quick links, the trajectory chart drawn in navy, and the "next best move" panel in status colors. |
| `/profile` | same | Account facts as a hairline list, access card, snapshot tiles. Demo data only. |

**Sidebar labels shortened.** "Practice Exams : Mastery 10 Questions by Concept" is "Mastery sets"; "Flash Cards : Refresh your concept study" is "Flash cards"; the others follow. The page heads carry the longer description.

**Status colors.** The live app uses a single red for everything urgent and blue for actions. The brand card now defines three status colors with tints: critical, in progress, mastered. Section labels (R&W, Math) are neutral chips. Actions are navy or ink, never blue.

---

## 3. What is linked but not built

These are flows, not screens, and their content lives in the question bank. The POC links to them so the navigation is complete; the routes do not exist yet.

- A concept's lesson page (`/concepts/[slug]`) and the session that starts from the dashboard.
- A mastery set (`/practice-exams/mastery/[slug]`) and its result.
- A new full-length exam (`/exams/new`) and an attempt's results (`/exams/[id]`).
- The flash card and review deck PDF readers.

---

## 4. Decisions for the team

- Whether the app keeps the marketing site's serif for titles (as here) or stays fully sans. The brand card says headings are Newsreader; the POC follows it.
- Whether "Study this next" should be the dark card (as here) or a navy one. The brand card reserves navy for accents, so dark was chosen.
- Which of the four concept grids, if any, should merge in the product itself. The POC keeps all four routes because the live app has them.

---

## 5. Porting checklist

1. Copy `app/(app)`, `components/app`, `lib/app`, and the status tokens in `app/globals.css` into the application repo.
2. Replace `lib/app/data.ts` exports with real data, keeping the exported names and types.
3. Point `Sidebar` links and the login flow at real auth.
4. Fill in the linked flows listed in section 3.
