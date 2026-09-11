import type { Metadata } from "next";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Free diagnostic | Wooster Prep",
  description: "A short SAT diagnostic that finds your knowledge gaps and tells you exactly what to study next.",
};

/* The diagnostic itself runs in the Wooster Prep app at woosterprep.com/diagnostic.
   This page is the styled front door to it. */
const steps = [
  {
    title: "A short, focused diagnostic",
    body: "Heavy on math, because that is where points move fastest. It finds the concepts that are costing you the most.",
  },
  {
    title: "A ranked list, not a syllabus",
    body: "Every concept is ordered by how many points it is worth to you. The top of the list is where you start.",
  },
  {
    title: "A plan built around your date",
    body: "Test in four weeks or four months, the plan fits the time you have and tells you what to do today.",
  },
];

export default function DiagnosticPage() {
  return (
    <section className="page diag" data-ui="light">
      <div className="container">
        <header className="page__head reveal">
          <span className="eyebrow">Free diagnostic</span>
          <h1 className="display">Find out what to study next.</h1>
          <p className="lede">
            Most students find out from the score report. You can know today. The diagnostic is free, takes one
            sitting, and ends with a plan.
          </p>
        </header>

        <ol className="diag__steps reveal">
          {steps.map((s, i) => (
            <li key={s.title} className="diag__step">
              <span className="num">0{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="diag__actions reveal reveal--delay">
          <a className="btn btn--primary btn--lg" href={links.exam}>
            Begin the diagnostic
          </a>
          <span className="form__note">Free. No card.</span>
        </div>
      </div>
    </section>
  );
}
