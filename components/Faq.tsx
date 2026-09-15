import Accordion from "@/components/Accordion";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/faq";
import { faqPage, graph } from "@/lib/seo";

export default function Faq() {
  return (
    <section className="faq" id="faq" data-ui="dark">
      <JsonLd data={graph(faqPage(faqs))} />
      <div className="container faq__grid">
        <div className="faq__aside reveal">
          <span className="eyebrow eyebrow--light">Questions</span>
          <h2 className="faq__title">The questions parents and students ask first.</h2>
        </div>
        <Accordion items={faqs.map((f) => ({ title: f.question, body: f.answer }))} />
      </div>
    </section>
  );
}
