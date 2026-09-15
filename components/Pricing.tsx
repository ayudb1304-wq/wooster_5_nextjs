"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import { includedItems } from "@/components/Included";
import { links } from "@/lib/links";
import { questionCount } from "@/lib/stats";

type Props = { headingLevel?: "h1" | "h2" };

/** `headingLevel="h1"` when the rail is the page's own heading, as on /pricing. */
export default function Pricing({ headingLevel = "h2" }: Props) {
  const Heading = headingLevel;
  const railRef = useRef<HTMLDivElement>(null);

  const step = () => {
    const rail = railRef.current;
    if (!rail) return 0;
    const card = rail.querySelector<HTMLElement>(".price-card");
    return card ? card.offsetWidth + 32 : rail.clientWidth * 0.8;
  };
  const scroll = (dir: -1 | 1) => railRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  return (
    <section className="pricing" id="pricing" data-ui="gray">
      <div className="container">
        <div className="pricing__top reveal">
          <div>
            <span className="eyebrow">Pricing</span>
            <Heading className="h2">
              One plan. Full support.
              <br />
              {questionCount}-question bank.
            </Heading>
          </div>
          <div className="pricing__nav">
            <button
              className="icon-circle icon-circle--ghost"
              type="button"
              aria-label="Previous"
              onClick={() => scroll(-1)}
            >
              <ArrowLeft />
            </button>
            <button className="icon-circle icon-circle--ghost" type="button" aria-label="Next" onClick={() => scroll(1)}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div ref={railRef} className="rail">
        <div className="rail__track">
          <article className="price-card">
            <span className="price-card__badge">Full 2-month access</span>
            <p className="price-card__lead">
              Two months of knowing <em>exactly</em> what to do next.
            </p>
            <div className="price-card__offer">
              <p className="price-card__price">
                <b>$249.99</b> for two months. About $4 a day.
              </p>
              <p className="price-card__text">
                About the cost of a couple of tutoring sessions, for a plan that knows your child and a score
                you can watch move.
              </p>
            </div>
            <a className="btn btn--primary" href={links.diagnostic}>
              Begin with the Free Diagnostic
            </a>
          </article>

          <article className="price-card price-card--list">
            <span className="price-card__badge">Everything included</span>
            <ul className="checklist">
              {includedItems.map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
            </ul>
          </article>

          <article className="price-card price-card--quote">
            <span className="price-card__badge">The Wooster way</span>
            <p className="price-card__quote">
              Study hard or study smart. The difference between an 1100 and a 1590 is not just effort, it is
              strategy.
            </p>
            <a className="btn btn--ghost" href="#how-it-works">
              See how it works
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
