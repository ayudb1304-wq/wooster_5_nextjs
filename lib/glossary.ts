import type { GlossaryEntry } from "@/lib/seo";

export type Term = GlossaryEntry & {
  /* Two or three short paragraphs. Plain text. */
  body: string[];
  related: string[];
};

/* Definitions stay general. Official test rules change; the disclaimer on
   each term page points readers to the College Board for specifics. */
export const terms: Term[] = [
  {
    slug: "digital-sat",
    term: "Digital SAT",
    short: "The digital SAT is the computer-based version of the SAT, taken in the College Board's Bluebook app. It has a Reading and Writing section and a Math section, each split into two adaptive modules, and is scored from 400 to 1600.",
    body: [
      "The test runs about two hours and fourteen minutes, shorter than the paper SAT it replaced. Passages are shorter, one question per passage, and a graphing calculator is available for the whole Math section.",
      "Because the second module of each section adapts to how you did on the first, two students can see different questions and still receive comparable scores.",
    ],
    related: ["adaptive-testing", "module", "bluebook", "scaled-score"],
  },
  {
    slug: "adaptive-testing",
    term: "Adaptive testing",
    short: "Adaptive testing adjusts the difficulty of later questions based on earlier answers. On the digital SAT this happens at the module level: performance on the first module of a section decides whether the second module is easier or harder.",
    body: [
      "Module-level adaptation means the test does not change question by question. You can still move back and forth within a module and revisit answers.",
      "A stronger first module unlocks a harder second module, which is where the highest scaled scores are reachable. Accuracy early in each section matters more than on a fixed test.",
    ],
    related: ["digital-sat", "module", "scaled-score"],
  },
  {
    slug: "module",
    term: "Module",
    short: "A module is one half of a digital SAT section. Each section has two timed modules, and the difficulty of the second is set by your performance on the first.",
    body: [
      "Reading and Writing modules and Math modules each have their own clock. When a module ends you cannot return to it.",
      "Pacing per module, rather than per section, is the practical skill the format rewards.",
    ],
    related: ["adaptive-testing", "digital-sat"],
  },
  {
    slug: "bluebook",
    term: "Bluebook",
    short: "Bluebook is the College Board's testing application used to take the digital SAT and PSAT. Students download it before test day, complete a device readiness check, and take the test inside it.",
    body: [
      "The app includes the built-in calculator, a reference sheet, question flagging, and answer elimination tools. Practicing inside the same interface removes surprises on test day.",
    ],
    related: ["digital-sat", "desmos-calculator"],
  },
  {
    slug: "raw-score",
    term: "Raw score",
    short: "A raw score is the number of questions answered correctly in a section. There is no penalty for wrong answers on the SAT, so a raw score only ever counts right answers.",
    body: [
      "Raw scores are converted to scaled scores. Because the digital SAT is adaptive, the conversion also accounts for the difficulty of the modules you received.",
    ],
    related: ["scaled-score", "percentile"],
  },
  {
    slug: "scaled-score",
    term: "Scaled score",
    short: "A scaled score is the reported SAT score: 200 to 800 for each section and 400 to 1600 in total. It converts a raw score to a common scale so results from different test dates and modules are comparable.",
    body: [
      "Wooster Prep's projected score is expressed on this scale, so the number you track while studying is the number a college will see.",
    ],
    related: ["raw-score", "projected-score", "percentile"],
  },
  {
    slug: "percentile",
    term: "Percentile",
    short: "A percentile tells you the share of test takers who scored at or below your score. A 90th percentile score means nine in ten students scored the same or lower.",
    body: [
      "Percentiles shift slightly year to year as the testing population changes. Use them to understand where a score sits, not as a fixed target.",
    ],
    related: ["scaled-score"],
  },
  {
    slug: "superscore",
    term: "Superscore",
    short: "A superscore combines your best section scores across multiple SAT dates into one composite. Many colleges superscore, so a strong Math on one date and a strong Reading and Writing on another can count together.",
    body: [
      "Policies vary by college. Check each school's admissions page before deciding whether to retake the test for one section.",
    ],
    related: ["score-choice", "scaled-score"],
  },
  {
    slug: "score-choice",
    term: "Score Choice",
    short: "Score Choice is the College Board option that lets you decide which SAT test dates to send to colleges. Some colleges ask for all scores regardless, so their policies take precedence.",
    body: [
      "Used together with superscoring, it lets a student plan retakes around the section that has the most room to move.",
    ],
    related: ["superscore"],
  },
  {
    slug: "desmos-calculator",
    term: "Desmos calculator",
    short: "The digital SAT includes a built-in Desmos graphing calculator that can be used on every Math question. You may also bring an approved calculator, but the built-in one is enough for the whole section.",
    body: [
      "Knowing when to graph rather than solve by hand is a scoring skill. Many algebra questions are fastest to answer by plotting.",
    ],
    related: ["bluebook", "digital-sat"],
  },
  {
    slug: "psat-nmsqt",
    term: "PSAT/NMSQT",
    short: "The PSAT/NMSQT is the preliminary SAT taken mostly by juniors in October. It uses the same digital format and is the qualifying test for the National Merit Scholarship Program.",
    body: [
      "It is scored on a slightly lower scale than the SAT, so a PSAT score is a preview of an SAT score, not the same number.",
    ],
    related: ["digital-sat"],
  },
  {
    slug: "diagnostic",
    term: "Diagnostic",
    short: "A diagnostic is a short test taken before studying to find where points are being lost. Wooster Prep's free diagnostic is focused on math and produces a ranked list of the concepts worth the most to your score.",
    body: [
      "The point of a diagnostic is direction. Without one, a student studies in the order a book presents topics, which is rarely the order that moves the score.",
    ],
    related: ["score-upside", "projected-score", "mastery"],
  },
  {
    slug: "score-upside",
    term: "Score upside",
    short: "Score upside is the number of SAT points a concept could add to your score if you mastered it. Wooster Prep ranks all 29 concepts by upside so the plan always starts with the biggest gain.",
    body: [
      "Upside depends on two things: how often the concept appears on the test and how far you currently are from mastering it. A common concept you half know ranks above a rare one you have never seen.",
    ],
    related: ["diagnostic", "mastery", "projected-score"],
  },
  {
    slug: "mastery",
    term: "Mastery",
    short: "Mastery is Wooster Prep's measure of how reliably you answer a concept correctly. Each concept has short mastery sets you retake until the concept sticks, and the mastery score moves the projected score.",
    body: [
      "Mastery is tracked separately from full-length exam results so the two signals stay clear: one shows what you know, the other shows how you perform under time.",
    ],
    related: ["score-upside", "projected-score"],
  },
  {
    slug: "projected-score",
    term: "Projected score",
    short: "A projected score is Wooster Prep's estimate of your SAT score based on what you have mastered so far. It starts at your diagnostic baseline and updates after every mastery set.",
    body: [
      "It is not a promise. It is what your current mastery adds up to on the 400 to 1600 scale, and it exists so that progress is visible before test day rather than after.",
    ],
    related: ["scaled-score", "mastery", "diagnostic"],
  },
];

export const getTerm = (slug: string) => terms.find((t) => t.slug === slug);
export const getTermSlugs = () => terms.map((t) => t.slug);
