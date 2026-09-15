"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bar, SectionChip, StatusChip, TierChip } from "@/components/app/ui";
import { type Concept, type Section, studyNext, tierOf } from "@/lib/app/data";

export type GridMode = {
  /* Link label on each card, e.g. "Open concept". */
  cta: string;
  /* Route prefix the card links to. */
  hrefBase: string;
  /* Secondary label under the name, e.g. "PDF deck". Falls back to the status. */
  sub?: string;
  /* Unit word for the count, e.g. "concepts", "PDFs". */
  unit: string;
};

type Props = { concepts: Concept[]; mode: GridMode };

/** The concept library grid with search and section filters. Shared by four screens. */
export default function ConceptGrid({ concepts, mode }: Props) {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<Section | "All">("All");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return concepts.filter((c) => (section === "All" || c.section === section) && (!q || c.name.toLowerCase().includes(q)));
  }, [concepts, query, section]);

  return (
    <>
      <div className="toolbar">
        <label className="toolbar__search">
          <span className="sr-only">Search concepts</span>
          <input className="input" type="search" placeholder="Search concepts…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="toolbar__filters" role="group" aria-label="Section">
          {(["All", "R&W", "Math"] as const).map((s) => (
            <button key={s} type="button" className={`pill${section === s ? " is-active" : ""}`} aria-pressed={section === s} onClick={() => setSection(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid__meta">
        <h2 className="h3">All {mode.unit}</h2>
        <span>
          {shown.length} of {concepts.length} {mode.unit}
        </span>
      </div>

      <ul className="cgrid">
        {shown.map((c) => (
          <li key={c.slug} className={`ccard ccard--${tierOf(c)}${c === studyNext ? " ccard--next" : ""}`}>
            <div className="ccard__top">
              <SectionChip section={c.section} />
              <span className="ccard__rank">#{c.rank}</span>
            </div>
            <h3 className="ccard__name">{c.name}</h3>
            <div className="ccard__chips">
              <TierChip concept={c} />
              {c === studyNext && <span className="chip chip--next">Study next</span>}
              {mode.sub ? <span className="ccard__sub">{mode.sub}</span> : <StatusChip status={c.status} />}
            </div>
            <Bar value={c.upside} tone={tierOf(c)} />
            <div className="ccard__foot">
              <Link href={`${mode.hrefBase}/${c.slug}`}>{mode.cta}</Link>
              <b>+{c.upside} pts</b>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
