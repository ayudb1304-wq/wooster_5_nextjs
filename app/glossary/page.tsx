import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { terms } from "@/lib/glossary";
import { breadcrumbs, graph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "SAT glossary",
  description: "Plain definitions of the digital SAT terms that come up while studying, from adaptive modules and scaled scores to Wooster Prep's projected score.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  return (
    <section className="page glossary" data-ui="light">
      <JsonLd data={graph(breadcrumbs([{ name: "Glossary", path: "/glossary" }]))} />
      <div className="container">
        <header className="page__head reveal">
          <span className="eyebrow">Glossary</span>
          <h1 className="display">The digital SAT, defined.</h1>
          <p className="lede">Short, plain definitions of the terms that come up while studying, and the few that are Wooster Prep&rsquo;s own.</p>
        </header>
        <ul className="glossary__list">
          {terms.map((t, i) => (
            <li key={t.slug} className={`reveal${i % 2 ? " reveal--delay" : ""}`}>
              <Link className="glossary__row" href={`/glossary/${t.slug}`}>
                <h2 className="glossary__term">{t.term}</h2>
                <p className="glossary__short">{t.short.split(". ")[0]}.</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
