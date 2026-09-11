import type { StaticImageData } from "next/image";
import conceptLibrary from "@/public/assets/concept-library.png";
import statsDashboard from "@/public/assets/stats-dashboard.png";
import todaysPlan from "@/public/assets/todays-plan.png";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: StaticImageData;
  alt: string;
  tag: string;
  author: string;
  date: string;
  readTime: string;
};

/* Placeholder posts. Titles, dates, and read times are invented; the
   images are product screenshots standing in for post art. */
export const posts: Post[] = [
  {
    slug: "why-10-concepts-beat-100",
    title: "Why 10 concepts beat 100",
    excerpt: "Most of the SAT hides behind a short list. How the diagnostic finds yours, and why the rest can wait.",
    image: conceptLibrary,
    alt: "The concept library ranked by score upside",
    tag: "Method",
    author: "Wooster Prep",
    date: "Sep 2, 2026",
    readTime: "4 min read",
  },
  {
    slug: "what-a-projected-score-measures",
    title: "What a projected score actually measures",
    excerpt: "It is not a guess. It is what your mastery adds up to today, and it moves when the work does.",
    image: statsDashboard,
    alt: "The stats dashboard with a projected score",
    tag: "For parents",
    author: "Wooster Prep",
    date: "Aug 26, 2026",
    readTime: "5 min read",
  },
  {
    slug: "the-night-before",
    title: "The night before: what not to do",
    excerpt: "No new concepts, no full practice test, no 11 p.m. cramming. What a good last day looks like instead.",
    image: todaysPlan,
    alt: "A day's plan with three short tasks",
    tag: "Strategy",
    author: "Wooster Prep",
    date: "Aug 19, 2026",
    readTime: "3 min read",
  },
];

