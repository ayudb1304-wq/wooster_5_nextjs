import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, graph } from "@/lib/seo";
import Image from "next/image";
import Audiences from "@/components/Audiences";
import { aboutAudiences, aboutPull, aboutStory, aboutStoryAfter, aboutTitle } from "@/lib/about";
import team from "@/public/assets/team.jpg";

export const metadata: Metadata = {
  title: "About us",
  description: aboutTitle,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="page about-page" data-ui="light">
      <JsonLd data={graph(breadcrumbs([{ name: "About", path: "/about" }]))} />
      <div className="container">
        <header className="page__head reveal">
          <span className="eyebrow">About us</span>
          <h1 className="about__title">{aboutTitle}</h1>
        </header>

        <div className="about__grid">
          <div className="about__story reveal">
            {aboutStory.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="pull">
              {aboutPull.text} <em>{aboutPull.em}</em>.
            </p>
            {aboutStoryAfter.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <figure className="about__media reveal reveal--delay">
            <Image
              src={team}
              alt="Three people laughing at something on a laptop in a library"
              sizes="(max-width: 960px) 100vw, 420px"
              placeholder="blur"
              priority
            />
          </figure>
        </div>

        <Audiences items={aboutAudiences} />
      </div>
    </section>
  );
}
