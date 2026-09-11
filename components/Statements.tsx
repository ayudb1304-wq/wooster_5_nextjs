import type { ReactNode } from "react";
import { ArrowDown } from "@/components/Icons";
import { questionCount } from "@/lib/stats";

type Statement = { id?: string; text: ReactNode; sub: string; next: string };

const statements: Statement[] = [
  {
    text: "The Wooster Prep way",
    sub: "Your exam is maybe tomorrow or it is eight weeks out. You can't study the same way. Wooster Prep builds a plan around your timeline and your knowledge gaps using Math, then tells you exactly what to study now.",
    next: "#s1",
  },
  {
    id: "s1",
    text: (
      <>
        Study hard <em>or</em> study smart.
      </>
    ),
    sub: "The difference between an 1100 and a 1590 is not just effort, it is strategy.",
    next: "#s2",
  },
  {
    id: "s2",
    text: (
      <>
        {questionCount} <em>and counting.</em>
      </>
    ),
    sub: "SAT-style questions, and the bank grows every month. One complete path to a higher score. Free to try now.",
    next: "#s3",
  },
  {
    id: "s3",
    text: (
      <>
        Moneyball <em>the</em> SATs.
      </>
    ),
    sub: "Not some generic plan. A study plan tailored to you, using tactics made famous in Moneyball.",
    next: "#s4",
  },
  {
    id: "s4",
    text: "No guesswork. No wasted hours.",
    sub: "Take the free diagnostic to see exactly what to study next, and how to study it.",
    next: "#included",
  },
];

export default function Statements() {
  return (
    <section id="method" className="statements" data-ui="dark">
      {statements.map((s, i) => (
        <div key={s.id ?? i} className="statement slide" id={s.id}>
          <div className="container">
            <p className="statement__text">{s.text}</p>
            <p className="statement__sub">{s.sub}</p>
          </div>
          <a className="statement__next icon-circle icon-circle--light" href={s.next} aria-label="Next">
            <ArrowDown />
          </a>
        </div>
      ))}
    </section>
  );
}
