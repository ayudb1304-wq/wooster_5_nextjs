import Link from "next/link";
import { guaranteePoints, guaranteePromise } from "@/lib/guarantee";
import { links } from "@/lib/links";

/* Landing version of /guarantee: one dark block with the promise as a serif
   statement, the one-sentence version, the three points as an index of title
   and lead line, and the link to the full page. Copy lives in lib/guarantee.ts. */
export default function Guarantee() {
  return (
    <section className="guarantee" id="guarantee" data-ui="dark">
      <div className="container">
        <header className="guarantee__head reveal">
          <span className="eyebrow eyebrow--light">The Wooster Prep score guarantee</span>
          <h2 className="guarantee__statement">
            100 points higher, <em>or the course again for free.</em>
          </h2>
          <p className="guarantee__promise">{guaranteePromise}</p>
        </header>

        <ul className="guarantee__index reveal reveal--delay">
          {guaranteePoints.map((p) => (
            <li key={p.title} className="guarantee__point">
              <span className="guarantee__point-title">{p.title}</span>
              <span className="guarantee__point-lead">{p.lead}</span>
            </li>
          ))}
        </ul>

        <div className="guarantee__actions reveal reveal--delay-2">
          <Link className="btn btn--ghost btn--ghost-light btn--lg" href={links.guarantee}>
            Read the full guarantee
          </Link>
          <span className="guarantee__note">Official score in, official score out. The College Board does the grading.</span>
        </div>
      </div>
    </section>
  );
}
