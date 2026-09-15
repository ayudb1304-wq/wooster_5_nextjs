import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, graph } from "@/lib/seo";
import Link from "next/link";
import MethodSteps from "@/components/MethodSteps";
import { links } from "@/lib/links";
import { methodIntro } from "@/lib/method";

export const metadata: Metadata = {
  title: "How it works",
  description: methodIntro.lede,
  alternates: { canonical: "/method" },
};

export default function MethodPage() {
  return (
    <>
      <section className="page method-page" data-ui="light">
      <JsonLd data={graph(breadcrumbs([{ name: "How it works", path: "/method" }]))} />
        <div className="container">
          <header className="page__head reveal">
            <span className="eyebrow">{methodIntro.eyebrow}</span>
            <h1 className="display">{methodIntro.title}</h1>
            <p className="lede">{methodIntro.lede}</p>
            <p className="lede">{methodIntro.note}</p>
          </header>
        </div>
      </section>

      <MethodSteps />

      <section className="method-cta" data-ui="light">
        <div className="container method-cta__inner reveal">
          <h2 className="h2">Begin with the free diagnostic.</h2>
          <div className="method__actions">
            <Link className="btn btn--primary btn--lg" href={links.diagnostic}>
              Start Your Diagnostic
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
