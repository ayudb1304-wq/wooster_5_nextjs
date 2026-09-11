import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Wooster Prep | Personalized SAT Prep that actually moves your score",
  description:
    "Study hard or study smart. Wooster Prep builds a personalized SAT study plan around your timeline and your knowledge gaps, then tells you exactly what to study next.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`} data-scroll-behavior="smooth">
      <body>
        <Header />
        <main id="top">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
