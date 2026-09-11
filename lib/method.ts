import type { StaticImageData } from "next/image";
import { questionCount } from "@/lib/stats";
import conceptLibrary from "@/public/assets/concept-library.png";
import masteryBoard from "@/public/assets/mastery-board.png";
import practiceExams from "@/public/assets/practice-exams.png";
import statsDashboard from "@/public/assets/stats-dashboard.png";
import todaysPlan from "@/public/assets/todays-plan.png";

/* The method copy. The landing page shows the index (title and short line per
   step); /method shows every step in full with its cards. */

export type Shot = { src: StaticImageData; alt: string; title: string; sub: string };

export type MethodStep = {
  num: string;
  pill: string;
  title: string;
  /* One line for the landing index. */
  short: string;
  /* The full step copy for /method. */
  text: string;
  shots: Shot[];
  /* Step 03 shows the film card next to its screenshot. */
  video?: boolean;
  /* Step 04 shows the generic-versus-Wooster plan comparison instead of shots. */
  compare?: boolean;
};

export const methodIntro = {
  eyebrow: "How it works",
  title: "Simple steps. Real progress.",
  lede: `Not some generic plan, a study plan tailored to you, using tactics made famous in Moneyball. ${questionCount} SAT-style questions, so there is always a fresh one for your weakest concept. One complete path to a higher score. Free to try now.`,
  /* The old statement-slide intro, kept here as the page's second line. */
  note: "Your exam is maybe tomorrow or it is eight weeks out. You can't study the same way. Wooster Prep builds a plan around your timeline and your knowledge gaps using Math, then tells you exactly what to study now.",
};

export const methodIndex = {
  eyebrow: "How it works",
  title: "Four steps. One plan.",
  lede: "Not a generic plan. A study plan built around your timeline and your gaps, using tactics made famous in Moneyball.",
};

export const shots = {
  statsDashboard: {
    src: statsDashboard,
    alt: "Wooster Prep performance dashboard showing current projection, diagnostic baseline and mastery progress",
    title: "Performance dashboard",
    sub: "Diagnostic baseline, projected score",
  },
  practiceExams: {
    src: practiceExams,
    alt: "Wooster Prep full length SAT format practice exams list",
    title: "Full-length SAT exams",
    sub: "98-question timed format, fresh set each attempt",
  },
  todaysPlan: {
    src: todaysPlan,
    alt: "Wooster Prep Today's Plan with the next concept to study and score path",
    title: "Today's plan",
    sub: "Study this next, ranked by score ROI",
  },
  conceptLibrary: {
    src: conceptLibrary,
    alt: "Wooster Prep concept library ranked by personal score ROI",
    title: "Concept library",
    sub: "29 SAT concepts, ordered by your upside",
  },
  masteryBoard: {
    src: masteryBoard,
    alt: "Wooster Prep concept mastery board and full-length SAT attempt history",
    title: "Mastery board",
    sub: "Every concept, every attempt, one view",
  },
} satisfies Record<string, Shot>;

export const methodSteps: MethodStep[] = [
  {
    num: "01",
    pill: "Take the diagnostic",
    title: "Assess your baseline",
    short: "A focused quant diagnostic pinpoints where your points are.",
    text: "Start with a focused quant diagnostic to pinpoint how SAT point gains happen for you specifically.",
    shots: [shots.statsDashboard, shots.practiceExams],
  },
  {
    num: "02",
    pill: "See your plan",
    title: "Get a personalized plan",
    short: "A clean roadmap that says exactly what to study next.",
    text: "Receive a clean study roadmap that tells you specifically what to study next.",
    shots: [shots.todaysPlan, shots.conceptLibrary],
  },
  {
    num: "03",
    pill: "Start training",
    title: "Train, track, improve",
    short: "Targeted practice and a projected score that moves as you do.",
    text: "Build momentum with targeted practice and progress tracking that adapts as you improve.",
    shots: [shots.masteryBoard],
    video: true,
  },
  {
    num: "04",
    pill: "Compare plans",
    title: "Precision, not generic prep",
    short: "Your own priority order, not the same chapters as everyone else.",
    text: "Generic prep gives everyone the same generic content. Wooster builds a personalized plan and content tailored to maximize your score goals.",
    shots: [],
    compare: true,
  },
];

export const genericChapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);

export const rankedConcepts: [string, string][] = [
  ["Command of Evidence", "+42 pts"],
  ["Linear Equations", "+38 pts"],
  ["Words in Context", "+35 pts"],
  ["Systems of Equations", "+31 pts"],
  ["Ratios & Proportions", "+28 pts"],
  ["Data Inference", "+26 pts"],
];
