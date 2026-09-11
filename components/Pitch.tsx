import Link from "next/link";
import { links } from "@/lib/links";

/* The elevator pitch in one dark screen: the problem as a statement, the
   method in three lines, and the one action. */
const steps = [
  { lead: "Find the gaps.", sub: "A free diagnostic, heavy on math, finds the concepts costing you the most points." },
  {
    lead: "Rank them by points.",
    sub: "Every concept ordered by what it is worth to your score. The top of the list is where you start.",
  },
  { lead: "Do them in order.", sub: "Short mastery sets, one concept at a time, until the test date." },
];

export default function Pitch() {
  return (
    <section className="pitch" id="pitch" data-ui="dark">
      <div className="container">
        <div className="pitch__grid">
          <header className="pitch__head reveal">
            <span className="eyebrow eyebrow--light">What Wooster Prep is</span>
            <p className="pitch__statement">
              Most students study everything. <em>The SAT only rewards a few things.</em>
            </p>
          </header>

          <ol className="pitch__steps reveal reveal--delay">
            {steps.map((s) => (
              <li key={s.lead} className="pitch__step">
                <p className="pitch__lead">{s.lead}</p>
                <p className="pitch__sub">{s.sub}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="pitch__foot reveal reveal--delay-2">
          <div className="pitch__actions">
            <Link className="btn btn--primary btn--lg pitch__cta" href={links.diagnostic}>
              Start Your Diagnostic
            </Link>
            <Link className="btn btn--ghost btn--ghost-light btn--lg" href={links.method}>
              See the method
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
