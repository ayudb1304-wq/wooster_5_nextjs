import type { ReactNode } from "react";
import { questionCount } from "@/lib/stats";

/* "The Wooster Prep way" in one screen: the lead statement, then the other
   three lines as a compact list. Replaces the five full-viewport slides. */
const lines: { text: ReactNode; sub: string }[] = [
  {
    text: (
      <>
        {questionCount} <em>and counting.</em>
      </>
    ),
    sub: "SAT-style questions, and the bank grows every month.",
  },
  {
    text: (
      <>
        Moneyball <em>the</em> SATs.
      </>
    ),
    sub: "Not some generic plan. A study plan tailored to you, using tactics made famous in Moneyball.",
  },
  {
    text: "No guesswork. No wasted hours.",
    sub: "Take the free diagnostic to see exactly what to study next, and how to study it.",
  },
];

export default function Statements() {
  return (
    <section id="method" className="statements" data-ui="dark">
      <div className="container">
        <header className="statements__head reveal">
          <span className="eyebrow eyebrow--light">The Wooster Prep way</span>
          <p className="statement__text">
            Study hard <em>or</em> study smart.
          </p>
          <p className="statement__sub">
            The difference between an 1100 and a 1590 is not just effort, it is strategy.
          </p>
        </header>

        <ul className="statements__list reveal reveal--delay">
          {lines.map((l) => (
            <li key={l.sub}>
              <p className="statements__line">{l.text}</p>
              <p className="statements__note">{l.sub}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
