import type { Metadata } from "next";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import Film from "@/components/Film";
import Guarantee from "@/components/Guarantee";
import Hero from "@/components/Hero";
import Included from "@/components/Included";
import JsonLd from "@/components/JsonLd";
import Method from "@/components/Method";
import Parents from "@/components/Parents";
import Pitch from "@/components/Pitch";
import Pricing from "@/components/Pricing";
import Statements from "@/components/Statements";
import Testimonials from "@/components/Testimonials";
import Why from "@/components/Why";
import { graph, videoObject, webApplication } from "@/lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <div className="stack">
      <JsonLd data={graph(webApplication(), videoObject())} />
      <Hero />
      <Pitch />
      <Method />
      <Film />
      <Statements />
      <Why />
      <Parents />
      <Pricing />
      <Guarantee />
      <Testimonials />
      <Included />
      <Blog />
      <About />
      <Faq />
      <Cta />
    </div>
  );
}
