import Cta from "@/components/Cta";
import Film from "@/components/Film";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Included from "@/components/Included";
import Pricing from "@/components/Pricing";
import RevealObserver from "@/components/RevealObserver";
import Statements from "@/components/Statements";
import Steps from "@/components/Steps";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Film />
        <Steps />
        <Statements />
        <Included />
        <Pricing />
        <Cta />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
