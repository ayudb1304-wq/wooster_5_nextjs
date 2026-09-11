import About from "@/components/About";
import Blog from "@/components/Blog";
import Cta from "@/components/Cta";
import Film from "@/components/Film";
import Guarantee from "@/components/Guarantee";
import Hero from "@/components/Hero";
import Included from "@/components/Included";
import Method from "@/components/Method";
import Parents from "@/components/Parents";
import Pitch from "@/components/Pitch";
import Pricing from "@/components/Pricing";
import Statements from "@/components/Statements";
import Testimonials from "@/components/Testimonials";
import Why from "@/components/Why";

export default function Home() {
  return (
    <div className="stack">
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
      <Cta />
    </div>
  );
}
