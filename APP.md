# Wooster Prep app screens: proof of concept

The signed-in product, rebuilt to the brand inside this repo. Eight screens behind a demo login, rendering from one fixture module, ready to be walked by reviewers and later ported into the application repo.

**How to view it.** Open `/login`, submit the form with anything, and you land on `/dashboard` as the demo student, Michael Scott. Nothing is sent anywhere. The sidebar says "Demo account" so it cannot be mistaken for live.

**Dark mode.** Every app screen has a dark theme. The sun-and-moon toggle in the top bar switches it; the choice is stored per browser under `wooster-theme` and light is the default. The palette is in `app/(app)/theme.css` under `.dark` and documented in the brand card. The marketing site is unaffected.

**What stays out of search.** Every app route is `noindex` and disallowed in `robots.txt`, on any deployment.

---

## 1. How it is built to port

| Concern | Where | Why it matters for the port |
| --- | --- | --- |
| Data | `lib/app/data.ts` | One typed module: the student, the 29 concepts with rank, section, upside, status and mastery, exam attempts, the trajectory. Every screen reads from it through props. The live app replaces this module with real data calls and leaves the components alone. |
| Shell | `app/(app)/layout.tsx`, `components/app/AppSidebar.tsx`, `components/app/TopBar.tsx`, `components/app/ThemeProvider.tsx`, `components/app/ThemeToggle.tsx`, `components/ui/sky-toggle.tsx` | shadcn collapsible sidebar with grouped, iconed navigation and a user menu; a sticky top bar with breadcrumb, ⌘K search over pages and concepts, streak badge and the primary action. Routes are the live app's routes, path for path. |
| Styles | `app/(app)/theme.css`, `app/(app)/app.css` | Tailwind v4 and the shadcn theme, imported only by the app layout, without Tailwind's preflight so the marketing pages are untouched. Theme tokens map to the brand palette; fonts are Newsreader and Public Sans by literal name. `app.css` holds only the content column. |
| Components | `components/ui/*` (shadcn), `components/app/dashboard/*` | shadcn: sidebar, card, badge, button, progress, tooltip, dropdown-menu, avatar, separator, skeleton, chart (Recharts), breadcrumb, command, input, tabs, select, toggle-group, empty, table. Dashboard regions: StudyNextCard with the Ring, KpiCards, TrajectoryChart, StreakHeatmap, PriorityCards, RecentActivity. `components/app/concepts/ConceptLibrary.tsx` and `components/app/PageHeader.tsx` for the four library screens; `components/app/StatTile.tsx` and `components/app/stats/*` (UpsideChart, AttemptsChart) for stats, exams and profile. No legacy components remain. |
| Screens | `app/(app)/*/page.tsx` | Thin: compose the shared pieces with the data. |

---

## 2. Screen by screen

| Live route | POC | What changed and why |
| --- | --- | --- |
| `/dashboard` | same, rebuilt on shadcn | 12-column grid. "Study this next" as a dark card with a mastery ring and the primary pill; score path card; four KPI tiles (projection with delta, gap covered, mastered, study time with a 7-day sparkline); Recharts score trajectory with the dashed target; a 12-week study-days heatmap; three priority cards; recent activity. Skeleton loading state. The red and blue of the live app become navy, ink and the three status colors. |
| `/concepts` | same, rebuilt on shadcn | One `ConceptLibrary` component serves all four grids with a mode. Header badges for total, mastered and in progress. Toolbar: search, section tabs (All, R&W, Math), a sort select (priority, most points, name, status), and a grid or list toggle. Cards carry section, rank, tier, status with the mastery score, the upside bar, and the action; the study-next concept is outlined in navy. List view is a compact table. Empty state with a clear-filters action. |
| `/flashcards` | same, rebuilt | Same library, "Open flash cards", sub-label "PDF deck". |
| `/practice` | same, rebuilt | Same library, "Open review deck". |
| `/practice-exams/mastery` | same, rebuilt | Same library, "Start mastery set". |
| `/exams` | same, rebuilt | Start card with the primary action; three tiles (latest, best, remaining); a stacked bar chart of attempts (R&W and Math); the attempts as a table with a results action per row. |
| `/stats` | same, rebuilt | Four KPI tiles; the trajectory chart; a by-section card (diagnostic split, mastery per section, points available, and which section the next sessions go to); a horizontal bar chart of the eight unmastered concepts worth the most points in their tier colors; the attempts chart; and a "next best move" card with the action. |
| `/profile` | same, rebuilt | Avatar and identity, then Account and Access tabs (facts as a hairline list, access progress bar), edit actions, and the snapshot tiles beside it. Demo data only. |

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

## 4b. Component sources

Everything on the dashboard comes from free sources: the official shadcn/ui registry (Base UI primitives), Recharts through shadcn's chart wrapper, and Lucide icons. The progress ring and the study-days heatmap are small custom pieces (`Ring.tsx`, `StreakHeatmap.tsx`) written to the brand rather than pulled from a paid registry. Nothing from 21st.dev's paid tier was used.

## 5. Porting checklist

1. Copy `app/(app)`, `components/app`, `components/ui`, `hooks`, `lib/app`, `lib/utils.ts`, `components.json`, `postcss.config.mjs`, the Tailwind and shadcn dependencies, and the status tokens in `app/globals.css` into the application repo.
2. Replace `lib/app/data.ts` exports with real data, keeping the exported names and types.
3. Point `Sidebar` links and the login flow at real auth.
4. Fill in the linked flows listed in section 3.

---

## 6. Recapturing the marketing screenshots

The five product images under `public/assets/` are captures of these screens. After a visual change, rebuild, start the production server, and capture with headless Chrome (no browser download; Playwright drives the installed Chrome):

```
pnpm build && PORT=3100 pnpm start &
for pair in "dashboard:todays-plan" "stats:stats-dashboard" "concepts:concept-library" "exams:practice-exams" "practice-exams/mastery:mastery-board"; do
  pnpm dlx playwright@latest screenshot --channel chrome --device "Desktop Chrome HiDPI" \
    --viewport-size 1440,900 --color-scheme light --wait-for-timeout 3500 \
    "http://localhost:3100/${pair%%:*}" "public/assets/${pair##*:}.png"
done
```
