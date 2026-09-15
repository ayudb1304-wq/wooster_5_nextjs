import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Pricing from "@/components/Pricing";
import { pricingFaqs } from "@/lib/faq";
import { breadcrumbs, faqPage, graph, plan, webApplication } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  description: `One plan, everything included. $${plan.price} for two months of personalized SAT prep, about $4 a day, after a free diagnostic.`,
  alternates: { canonical: "/pricing" },
};

/* Standalone pricing page: the same rail as the landing page, plus the three
   pricing questions in prose so the price and terms are crawlable text. */
export default function PricingPage() {
  return (
    <>
      <JsonLd data={graph(webApplication(), faqPage(pricingFaqs), breadcrumbs([{ name: "Pricing", path: "/pricing" }]))} />
      <div className="page pricing-page">
        <Pricing headingLevel="h1" />
      </div>
      <section className="page doc" data-ui="light">
        <div className="container">
          <div className="doc__body reveal">
            {pricingFaqs.map((f) => (
              <div key={f.question}>
                <h2>{f.question}</h2>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
