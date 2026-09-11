import About from "@/components/About";
import Blog from "@/components/Blog";
import Cta from "@/components/Cta";
import Film from "@/components/Film";
import Guarantee from "@/components/Guarantee";
import Hero from "@/components/Hero";
import Included from "@/components/Included";
import Parents from "@/components/Parents";
import Pricing from "@/components/Pricing";
import Statements from "@/components/Statements";
import Steps from "@/components/Steps";
import Testimonials from "@/components/Testimonials";
import Why from "@/components/Why";

export default function Home() {
  return (
    <>
      <Hero />
      <Film />
      <Steps />
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
    </>
  );
}
