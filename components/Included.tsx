import Accordion, { type AccordionItem } from "@/components/Accordion";

export const includedItems: AccordionItem[] = [
  {
    title: "Free diagnostic",
    body: "Start with a focused quant diagnostic to pinpoint how SAT point gains happen for you specifically. No card, no commitment.",
  },
  {
    title: "Personalized study modules",
    body: "A clean study roadmap that tells you specifically what to study next. Every concept is ranked by your personal score ROI.",
  },
  {
    title: "Mastery tests",
    body: "Short mastery sets for each concept. Review the lesson, retake the set, and watch the mastery score move.",
  },
  {
    title: "Adaptive progress updates",
    body: "Targeted practice and progress tracking that adapts as you improve. Your projected score updates as mastery work creates gains.",
  },
  {
    title: "7-day score-fit guarantee",
    body: "Full 2-month access, backed by a 7-day score-fit guarantee.",
  },
  {
    title: "10+ full length SAT demo exams",
    body: "98-question SAT-style timed exams with a fresh randomized set each attempt. Tracked separately from concept mastery so the two signals stay clear.",
  },
];

export default function Included() {
  return (
    <section className="included" id="included" data-ui="dark">
      <div className="container included__grid">
        <div className="included__aside">
          <span className="eyebrow eyebrow--light">
            What is
            <br />
            included
          </span>
          <svg className="included__decor" viewBox="0 0 400 260" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="120" cy="260" r="120" />
              <circle cx="170" cy="260" r="120" />
              <circle cx="220" cy="260" r="120" />
              <circle cx="270" cy="260" r="120" />
              <circle cx="320" cy="260" r="120" />
            </g>
          </svg>
        </div>

        <Accordion items={includedItems} />
      </div>
    </section>
  );
}
