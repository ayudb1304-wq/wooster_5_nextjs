import { guaranteeTitle } from "@/lib/guarantee";
import type { Faq } from "@/lib/seo";
import { plan } from "@/lib/seo";
import { questionCount } from "@/lib/stats";

/* Answer-first: the first sentence answers the question on its own.
   Rendered on the landing page FAQ and emitted as FAQPage JSON-LD. */
export const faqs: Faq[] = [
  {
    question: "Is the diagnostic really free?",
    answer: "Yes. The diagnostic and your ranked results are free, with no card and no commitment. The full plan is a paid two-month access you choose afterwards.",
  },
  {
    question: "How long does the diagnostic take?",
    answer: "One sitting. It is short and focused on math, because that is where SAT points move fastest, and the plan is ready as soon as you finish.",
  },
  {
    question: "What does Wooster Prep cost?",
    answer: `$${plan.price} for two months of full access, about $4 a day. There is one plan and everything is included.`,
  },
  {
    question: "What is the score guarantee?",
    answer: `${guaranteeTitle} Finish the plan and, if your score does not rise by at least 100 points, you get the course again at no charge. The full terms are on the guarantee page.`,
  },
  {
    question: "Is this for the digital SAT?",
    answer: "Yes. Practice follows the current digital SAT: adaptive modules, a Reading and Writing section, a Math section, and full-length timed exams of 98 questions.",
  },
  {
    question: "How is this different from a prep book or a generic course?",
    answer: "Generic prep gives every student the same sequence. Wooster Prep ranks all 29 SAT concepts by what each is worth to your score and reorders the plan as you master them.",
  },
  {
    question: "How many practice questions are there?",
    answer: `About ${questionCount} SAT-style questions, covering every concept, with a fresh randomized set for each full-length exam attempt.`,
  },
  {
    question: "What is a projected score?",
    answer: "An estimate of your SAT score from what you have mastered so far. It starts at your diagnostic baseline and updates after every mastery set, so you see progress before test day.",
  },
  {
    question: "Can a parent see progress?",
    answer: "Yes. The performance dashboard shows the diagnostic baseline, the projected score, and mastery progress for every concept, so a parent can see movement without asking.",
  },
  {
    question: "Is Wooster Prep affiliated with the College Board?",
    answer: "No. Wooster Prep is independent. SAT is a registered trademark of the College Board, which is not affiliated with and does not endorse this site.",
  },
];

/** The pricing subset shown on /pricing. */
export const pricingFaqs: Faq[] = faqs.filter((f) =>
  ["What does Wooster Prep cost?", "Is the diagnostic really free?", "What is the score guarantee?"].includes(f.question),
);
