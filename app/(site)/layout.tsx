import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";

/** Marketing pages: the fixed header, the footer, and reveal-on-scroll. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="top">{children}</main>
      <Footer />
      <RevealObserver />
    </>
  );
}
