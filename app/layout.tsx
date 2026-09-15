import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { graph, indexable, organization, site, siteUrl, website } from "@/lib/seo";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `Wooster Prep | ${site.tagline.replace(/\.$/, "")}`, template: "%s | Wooster Prep" },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_US", url: siteUrl },
  twitter: { card: "summary_large_image" },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${publicSans.variable} ${newsreader.variable}`} data-scroll-behavior="smooth">
      <body>
        <JsonLd data={graph(organization(), website())} />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
