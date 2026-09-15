/* ------------------------------------------------------------------
   Demo data for the app screens. Every screen renders from this module,
   so the live app can replace it with real data calls without touching
   the components. Shapes mirror what the live dashboard shows.
   ------------------------------------------------------------------ */

export type Section = "R&W" | "Math";
export type Status = "mastered" | "in-progress" | "not-started";
export type Tier = "critical" | "high" | "steady";

export type Concept = {
  slug: string;
  name: string;
  section: Section;
  rank: number;
  /* Projected points the concept is worth to this student. */
  upside: number;
  status: Status;
  /* Mastery set score out of 10, once attempted. */
  mastery: number | null;
  tip: string;
};

export type ExamAttempt = {
  id: string;
  date: string;
  correct: number;
  total: 98;
  rw: number;
  math: number;
};

export const student = {
  firstName: "Michael",
  lastName: "Scott",
  email: "michael.scott@example.com",
  grade: "Grade 12",
  phoneLast4: "0199",
  emailVerified: true,
  memberSince: "2026-06-02",
  target: 1550,
  baseline: 1170,
  projection: 1170,
  split: { rw: 580, math: 590 },
  streakDays: 1,
  studyMinutes: 40,
  plan: "Full 2-month access",
  accessEnds: "2026-08-02",
  examsUsed: 4,
  examsTotal: 10,
} as const;

export const sessionMinutes = 30;

const tips = [
  "Review the full lesson first.",
  "Practice the key rule for this concept.",
  "Practice eliminating trap answers.",
  "Retake the mastery set after a quick review.",
];

/* The 29 concepts, in the student's priority order. */
const list: [string, Section, number][] = [
  ["Linear Equations in One Variable", "Math", 12],
  ["Boundaries", "R&W", 95],
  ["Form, Structure, and Sense", "R&W", 95],
  ["Nonlinear Functions", "Math", 90],
  ["Linear Inequalities in One or Two Variables", "Math", 80],
  ["Rhetorical Synthesis", "R&W", 65],
  ["Inferences", "R&W", 60],
  ["Words in Context", "R&W", 58],
  ["Linear Functions", "Math", 55],
  ["Nonlinear Equations in One Variable and Systems", "Math", 52],
  ["Cross-Text Connections", "R&W", 48],
  ["Command of Evidence: Quantitative", "R&W", 45],
  ["Area and Volume", "Math", 42],
  ["Systems of Two Linear Equations", "Math", 40],
  ["Transitions", "R&W", 38],
  ["Central Ideas and Details", "R&W", 36],
  ["Ratios, Rates, and Proportional Relationships", "Math", 34],
  ["Percentages", "Math", 32],
  ["Two-Variable Data: Models and Scatterplots", "Math", 30],
  ["Command of Evidence: Textual", "R&W", 28],
  ["Text Structure and Purpose", "R&W", 26],
  ["Equivalent Expressions", "Math", 24],
  ["Probability and Conditional Probability", "Math", 22],
  ["One-Variable Data: Distributions and Measures", "Math", 20],
  ["Right Triangles and Trigonometry", "Math", 18],
  ["Lines, Angles, and Triangles", "Math", 16],
  ["Inference from Sample Statistics", "Math", 14],
  ["Circles", "Math", 12],
  ["Linear Equations in Two Variables", "Math", 10],
];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const concepts: Concept[] = list.map(([name, section, upside], i) => {
  const rank = i + 1;
  const status: Status = rank === 1 ? "mastered" : rank <= 4 ? "in-progress" : "not-started";
  const mastery = rank === 1 ? 10 : rank === 2 ? 5 : rank === 3 ? 3 : rank === 4 ? 2 : null;
  return { slug: slugify(name), name, section, rank, upside, status, mastery, tip: tips[i % tips.length] };
});

export const tierOf = (c: Concept): Tier => (c.upside >= 60 ? "critical" : c.upside >= 35 ? "high" : "steady");
export const tierLabel: Record<Tier, string> = { critical: "Critical", high: "High", steady: "Steady" };
export const statusLabel: Record<Status, string> = { mastered: "Mastered", "in-progress": "In progress", "not-started": "Not started" };

export const studyNext = concepts.find((c) => c.status !== "mastered") ?? concepts[0];
export const topPriorities = concepts.filter((c) => c !== studyNext && c.status !== "mastered").slice(0, 3);
export const masteredCount = concepts.filter((c) => c.status === "mastered").length;
export const inProgressCount = concepts.filter((c) => c.status === "in-progress").length;

/** Points per session-hour, the figure the live dashboard calls ROI. */
export const roiOf = (c: Concept) => (c.upside / (sessionMinutes / 60) / 4).toFixed(1);

export const examAttempts: ExamAttempt[] = [
  { id: "a4", date: "2026-06-07T16:47:07", correct: 0, total: 98, rw: 0, math: 0 },
  { id: "a3", date: "2026-06-05T18:51:49", correct: 7, total: 98, rw: 7, math: 0 },
  { id: "a2", date: "2026-06-05T17:06:20", correct: 21, total: 98, rw: 15, math: 6 },
  { id: "a1", date: "2026-06-05T15:45:27", correct: 3, total: 98, rw: 3, math: 0 },
];

export const latestAttempt = examAttempts[0];

/** Score trajectory: weeks since the diagnostic, projected score. */
export const trajectory = [
  { week: 0, score: 1170 },
  { week: 1, score: 1170 },
];

export const gapCovered = Math.round(((student.projection - student.baseline) / (student.target - student.baseline)) * 100);

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
export const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/* Activity for the streak calendar: minutes studied per day for the last 12 weeks.
   Deterministic so server and client render the same values. */
export type ActivityDay = { date: string; minutes: number };

const dayMs = 86_400_000;
const anchor = new Date("2026-09-15T00:00:00");
export const activityDays: ActivityDay[] = Array.from({ length: 84 }, (_, i) => {
  const d = new Date(anchor.getTime() - (83 - i) * dayMs);
  const seed = (i * 37) % 11;
  const minutes = i < 60 ? 0 : seed < 3 ? 0 : seed < 6 ? 15 : seed < 9 ? 30 : 45;
  return { date: d.toISOString().slice(0, 10), minutes: i === 83 ? student.studyMinutes : minutes };
});

/** Last seven days, oldest first, for the study-time sparkline. */
export const weekMinutes = activityDays.slice(-7).map((d) => ({ day: d.date.slice(5), minutes: d.minutes }));

export type Activity = { id: string; kind: "mastery" | "exam" | "review"; title: string; detail: string; at: string };

export const recentActivity: Activity[] = [
  { id: "r1", kind: "mastery", title: "Boundaries mastery set", detail: "5/10, retake suggested", at: "2026-09-15T18:40:00" },
  { id: "r2", kind: "review", title: "Reviewed Boundaries lesson", detail: "12 minutes", at: "2026-09-15T18:20:00" },
  { id: "r3", kind: "exam", title: "Full-length exam attempt", detail: "0/98, abandoned early", at: "2026-06-07T16:47:07" },
  { id: "r4", kind: "mastery", title: "Linear Equations in One Variable", detail: "10/10, mastered", at: "2026-06-05T20:10:00" },
];

/** Concepts by section with counts, for the section split. */
export const sectionSummary = (["R&W", "Math"] as const).map((section) => {
  const list = concepts.filter((c) => c.section === section);
  return {
    section,
    total: list.length,
    mastered: list.filter((c) => c.status === "mastered").length,
    inProgress: list.filter((c) => c.status === "in-progress").length,
    upside: list.reduce((sum, c) => sum + c.upside, 0),
    score: section === "R&W" ? student.split.rw : student.split.math,
  };
});
