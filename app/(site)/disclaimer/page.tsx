import type { Metadata } from "next";
import Doc from "@/components/Doc";

export const metadata: Metadata = {
  title: "Educational disclaimer | Wooster Prep",
  description: "What Wooster Prep does and does not promise.",
};

/* Text ported verbatim from woosterprep.com/disclaimer. Edit the source of truth
   there first, then re-port; do not reword here. */
export default function DisclaimerPage() {
  return (
    <Doc eyebrow="Legal" title="Educational disclaimer." meta="Effective date: June 5, 2026 · Last updated: June 5, 2026">
      <p>This Educational Disclaimer applies to your use of woosterprep.com and the Wooster Prep SAT diagnostic and study services. It supplements our Terms of Service and Privacy Policy.</p>
      <h2>1. No Score or Outcome Guarantee</h2>
      <p>Wooster Prep does not guarantee any SAT score, score increase, percentile, college admission, scholarship, or other result. Every student is different, and outcomes depend on factors we do not control, including effort, consistency, starting level, time before test day, and test-day conditions.</p>
      <h2>2. Estimates Are Predictions, Not Promises</h2>
      <p>Concept rankings, projected score uplift, projected SAT scores, and similar figures are informational estimates generated from your inputs and our methodology. They are intended to help prioritize study and are not commitments. Actual results may be higher or lower.</p>
      <h2>3. Study Aid Only</h2>
      <p>Wooster Prep is a self-study tool. It is not a substitute for professional tutoring, academic counseling, college-admissions advice, psychological advice, medical advice, or any other professional guidance. You remain responsible for your preparation decisions.</p>
      <h2>4. Independent From the College Board</h2>
      <p>SAT, PSAT/NMSQT, Bluebook, and related marks are trademarks of the College Board. Wooster Prep is independent and is not affiliated with, endorsed by, sponsored by, or approved by the College Board. Always confirm official test dates, rules, content, and policies directly with the College Board.</p>
      <h2>5. Accuracy of Content</h2>
      <p>We work to keep content accurate and current as the SAT evolves, but we do not warrant that all content is error-free, complete, or up to date. Content, scoring methodology, concept rankings, and question banks may change without notice.</p>
      <h2>6. Use at Your Own Risk</h2>
      <p>You use Wooster Prep at your own risk. To the maximum extent permitted by law, Wooster Prep is not liable for indirect, incidental, special, or consequential damages, or for lost results, opportunities, scholarships, or admissions arising from your use of or reliance on the service. Our total liability is limited as set out in our Terms of Service.</p>
      <h2>7. Contact</h2>
      <p>Questions about this disclaimer can be sent to <a href="mailto:hal@woosterprep.com">hal@woosterprep.com</a>.</p>
    </Doc>
  );
}
