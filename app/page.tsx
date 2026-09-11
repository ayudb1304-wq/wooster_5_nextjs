import About from "@/components/About";
import Blog from "@/components/Blog";
import Cta from "@/components/Cta";
import Film from "@/components/Film";
import Footer from "@/components/Footer";
import Guarantee from "@/components/Guarantee";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Included from "@/components/Included";
import Parents from "@/components/Parents";
import Pricing from "@/components/Pricing";
import RevealObserver from "@/components/RevealObserver";
import Statements from "@/components/Statements";
import Steps from "@/components/Steps";
import Testimonials from "@/components/Testimonials";
import Why from "@/components/Why";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
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
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
