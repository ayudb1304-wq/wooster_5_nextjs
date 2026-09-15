import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, graph } from "@/lib/seo";
import Audiences from "@/components/Audiences";
import GuaranteeGallery from "@/components/GuaranteeGallery";
import { guaranteeAudiences, guaranteePoints, guaranteePromise, guaranteeTitle } from "@/lib/guarantee";

export const metadata: Metadata = {
  title: "Score guarantee",
  description: guaranteeTitle,
  alternates: { canonical: "/guarantee" },
};

/* The full guarantee: the promise, then the three points as the pinned
   horizontal gallery, then the parent and student columns. */
export default function GuaranteePage() {
  return (
    <section className="page gpage" data-ui="light">
      <JsonLd data={graph(breadcrumbs([{ name: "Score guarantee", path: "/guarantee" }]))} />
      <div className="container">
        <header className="page__head reveal">
          <span className="eyebrow">The Wooster Prep score guarantee</span>
          <h1 className="display">{guaranteeTitle}</h1>
          <p className="lede">{guaranteePromise}</p>
        </header>
      </div>

      <GuaranteeGallery panels={guaranteePoints} />

      <div className="container">
        <Audiences items={guaranteeAudiences} />
      </div>
    </section>
  );
}
