import type { StaticImageData } from "next/image";
import conceptLibrary from "@/public/assets/concept-library.png";
import masteryBoard from "@/public/assets/mastery-board.png";
import practiceExams from "@/public/assets/practice-exams.png";
import statsDashboard from "@/public/assets/stats-dashboard.png";
import todaysPlan from "@/public/assets/todays-plan.png";

export type Post = {
  slug: string;
  title: string;
  /* One or two sentences. Shown on cards, the index, and as the meta description. */
  description: string;
  image: StaticImageData;
  alt: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  /* Post body as HTML: p, h2, h3, ul, ol, li, strong, em, a, blockquote. */
  content: string;
};

/* Placeholder posts. Titles and tags are real enough to design against; the
   bodies are lorem ipsum with working links between posts. Replace each
   `content` with the real article and keep the heading structure. */

const lorem = {
  a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  b: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  c: "Curabitur pretium tincidunt lacus, ac lobortis lorem faucibus at. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer at nisl a magna tincidunt dictum.",
  d: "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum, urna at faucibus consequat, augue ligula rutrum lectus, nec ultricies magna eros non erat. Praesent ac sem eget est egestas volutpat.",
};

const body = (sections: { h2: string; h3?: string; link?: { slug: string; text: string }; quote?: string }[]) =>
  sections
    .map(
      (s, i) => `
<h2>${s.h2}</h2>
<p>${i % 2 ? lorem.c : lorem.a}</p>
${s.link ? `<p>${lorem.d.slice(0, 96)} <a href="/blog/${s.link.slug}">${s.link.text}</a> ${lorem.b.slice(0, 80)}.</p>` : `<p>${lorem.b}</p>`}
${s.h3 ? `<h3>${s.h3}</h3>\n<p>${lorem.d}</p>\n<ul>\n<li>Lorem ipsum dolor sit amet, consectetur.</li>\n<li>Sed do eiusmod tempor incididunt ut labore.</li>\n<li>Ut enim ad minim veniam, quis nostrud.</li>\n</ul>` : ""}
${s.quote ? `<blockquote>${s.quote}</blockquote>` : ""}`,
    )
    .join("\n");

export const posts: Post[] = [
  {
    slug: "why-10-concepts-beat-100",
    title: "Why 10 concepts beat 100",
    description: "Most of the SAT hides behind a short list. How the diagnostic finds yours, and why the rest can wait.",
    image: conceptLibrary,
    alt: "The concept library ranked by score upside",
    tags: ["Method", "Diagnostic"],
    author: "Wooster Prep",
    publishedAt: "2026-09-02",
    content: body([
      { h2: "The syllabus is not the test", h3: "What the test actually rewards" },
      { h2: "Finding your ten", link: { slug: "what-a-projected-score-measures", text: "what a projected score measures" } },
      { h2: "Why the rest can wait", quote: "Stop trying to learn everything. Find the few concepts that pay the most points per hour." },
      { h2: "What to do this week", h3: "A plan for the first seven days", link: { slug: "the-night-before", text: "the night before the test" } },
    ]),
  },
  {
    slug: "what-a-projected-score-measures",
    title: "What a projected score actually measures",
    description: "It is not a guess. It is what your mastery adds up to today, and it moves when the work does.",
    image: statsDashboard,
    alt: "The stats dashboard with a projected score",
    tags: ["For parents", "Mastery"],
    author: "Wooster Prep",
    publishedAt: "2026-08-26",
    updatedAt: "2026-09-04",
    content: body([
      { h2: "An estimate built from mastery", h3: "How each concept is weighted" },
      { h2: "Why it moves in small steps", link: { slug: "how-to-read-a-mastery-score", text: "how to read a mastery score" } },
      { h2: "Why it is allowed to go down", quote: "The number you can trust is the one that is allowed to disappoint you." },
      { h2: "What parents should watch", link: { slug: "why-10-concepts-beat-100", text: "why 10 concepts beat 100" } },
    ]),
  },
  {
    slug: "the-night-before",
    title: "The night before: what not to do",
    description: "No new concepts, no full practice test, no 11 p.m. cramming. What a good last day looks like instead.",
    image: todaysPlan,
    alt: "A day's plan with three short tasks",
    tags: ["Strategy"],
    author: "Wooster Prep",
    publishedAt: "2026-08-19",
    content: body([
      { h2: "The last day gets shorter, not longer" },
      { h2: "Three short sets and an early night", h3: "What a good last day looks like", link: { slug: "two-months-one-plan", text: "what a week on the plan looks like" } },
      { h2: "If the urge to cram is strong", quote: "That is a sign the plan should have started earlier, not that tonight should run later." },
    ]),
  },
  {
    slug: "why-the-diagnostic-is-heavy-on-math",
    title: "Why the diagnostic is heavy on math",
    description: "Points move fastest where the gaps are cleanest. A short argument for starting with the numbers.",
    image: practiceExams,
    alt: "A practice exam in progress",
    tags: ["Diagnostic", "Method"],
    author: "Wooster Prep",
    publishedAt: "2026-08-12",
    content: body([
      { h2: "Where the points move fastest", h3: "Math gaps are clean gaps" },
      { h2: "What a short diagnostic can tell you", link: { slug: "why-10-concepts-beat-100", text: "why 10 concepts beat 100" } },
      { h2: "What it cannot tell you", quote: "A diagnostic finds the gaps. It does not fill them. That part is still yours." },
      { h2: "Reading and writing come next", link: { slug: "how-to-read-a-mastery-score", text: "reading a mastery score" } },
    ]),
  },
  {
    slug: "how-to-read-a-mastery-score",
    title: "How to read a mastery score",
    description: "One number per concept, and what it means when it rises, stalls, or slips after a retake.",
    image: masteryBoard,
    alt: "The mastery sets library, one 10-question set per concept",
    tags: ["Mastery", "For parents"],
    author: "Wooster Prep",
    publishedAt: "2026-08-05",
    content: body([
      { h2: "One number per concept" },
      { h2: "When it rises", h3: "The first retake", link: { slug: "what-a-projected-score-measures", text: "what a projected score measures" } },
      { h2: "When it stalls", quote: "A stall is information. It usually means the wrong kind of practice, not too little of it." },
      { h2: "When it slips", link: { slug: "two-months-one-plan", text: "two months, one plan" } },
    ]),
  },
  {
    slug: "two-months-one-plan",
    title: "Two months, one plan: what a week looks like",
    description: "Not a schedule of hours. A short list that changes as mastery does, with the test date fixed at the end.",
    image: todaysPlan,
    alt: "A day's plan with three short tasks",
    tags: ["Strategy", "Method"],
    author: "Wooster Prep",
    publishedAt: "2026-07-29",
    content: body([
      { h2: "Monday: the diagnostic decides", h3: "Why the list is short" },
      { h2: "Midweek: mastery sets", link: { slug: "how-to-read-a-mastery-score", text: "how to read a mastery score" } },
      { h2: "Weekend: one practice exam, then rest", quote: "The test date is fixed. The plan isn't." },
      { h2: "The last week", link: { slug: "the-night-before", text: "the night before" } },
    ]),
  },
];
