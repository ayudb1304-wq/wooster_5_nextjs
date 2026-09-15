import Link from "next/link";
import CaseShot from "@/components/CaseShot";
import { links } from "@/lib/links";
import { methodIndex, methodSteps, shots } from "@/lib/method";

/* Landing version of /method: the four steps as a one-screen index, three
   product screenshots, and the link to the full page. Copy lives in lib/method.ts. */
export default function Method() {
  const strip = [shots.statsDashboard, shots.todaysPlan, shots.masteryBoard];
  return (
    <section className="method" id="how-it-works" data-ui="light">
      <div className="container">
        <header className="method__head reveal">
          <span className="eyebrow">{methodIndex.eyebrow}</span>
          <h2 className="h2">{methodIndex.title}</h2>
          <p className="lede">{methodIndex.lede}</p>
        </header>

        <ol className="method__index reveal reveal--delay">
          {methodSteps.map((s) => (
            <li key={s.num} className="method__item">
              <h3 className="method__title">{s.title}</h3>
              <p className="method__line">{s.short}</p>
            </li>
          ))}
        </ol>

        <div className="method__strip">
          {strip.map((shot, i) => (
            <CaseShot
              key={shot.title}
              className={`reveal${i ? ` reveal--delay${i > 1 ? "-2" : ""}` : ""}`}
              href={links.method}
              src={shot.src}
              alt={shot.alt}
              title={shot.title}
              sub={shot.sub}
            />
          ))}
        </div>

        <div className="method__actions reveal">
          <Link className="btn btn--ghost" href={links.method}>
            See the method in detail
          </Link>
        </div>
      </div>
    </section>
  );
}
