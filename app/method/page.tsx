import type { Metadata } from "next";
import Link from "next/link";
import MethodSteps from "@/components/MethodSteps";
import { links } from "@/lib/links";
import { methodIntro } from "@/lib/method";

export const metadata: Metadata = {
  title: "How it works | Wooster Prep",
  description: methodIntro.lede,
};

export default function MethodPage() {
  return (
    <>
      <section className="page method-page" data-ui="light">
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
            <span className="method__note">Free. No card.</span>
          </div>
        </div>
      </section>
    </>
  );
}
