import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getTerm, getTermSlugs } from "@/lib/glossary";
import { breadcrumbs, definedTerm, graph } from "@/lib/seo";

type Params = { term: string };

export function generateStaticParams(): Params[] {
  return getTermSlugs().map((term) => ({ term }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { term } = await params;
  const entry = getTerm(term);
  if (!entry) return {};
  return {
    title: `${entry.term}: what it means on the SAT`,
    description: entry.short,
    alternates: { canonical: `/glossary/${entry.slug}` },
  };
}

export default async function TermPage({ params }: { params: Promise<Params> }) {
  const { term } = await params;
  const entry = getTerm(term);
  if (!entry) notFound();
  const related = entry.related.map(getTerm).filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <section className="page doc" data-ui="light">
      <JsonLd
        data={graph(
          definedTerm(entry),
          breadcrumbs([
            { name: "Glossary", path: "/glossary" },
            { name: entry.term, path: `/glossary/${entry.slug}` },
          ]),
        )}
      />
      <div className="container">
        <header className="page__head reveal">
          <Link className="eyebrow" href="/glossary">
            Glossary
          </Link>
          <h1 className="display">{entry.term}</h1>
          {/* Answer first: the definition is the first thing on the page. */}
          <p className="lede">{entry.short}</p>
        </header>
        <div className="doc__body reveal reveal--delay">
          {entry.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          {related.length > 0 && (
            <>
              <h2>Related terms</h2>
              <ul className="glossary__related">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/glossary/${r.slug}`}>{r.term}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="doc__callout">
            SAT, PSAT/NMSQT and Bluebook are trademarks of the College Board, which is not affiliated with Wooster Prep.
            Confirm test rules and dates with the College Board.
          </p>
        </div>
      </div>
    </section>
  );
}
