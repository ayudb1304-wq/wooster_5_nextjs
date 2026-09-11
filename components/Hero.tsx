"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { ArrowDown } from "@/components/Icons";
import { links } from "@/lib/links";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, SplitText);

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  /* Intro: the headline words land on the baseline, then the link and copy follow. */
  useGSAP(
    (_, contextSafe) => {
      const title = titleRef.current;
      if (!title || !contextSafe || prefersReducedMotion()) return; // CSS shows everything for reduced motion

      let split: SplitText | undefined;
      let cancelled = false;

      const play = contextSafe(() => {
        if (cancelled) return;
        split = SplitText.create(title, { type: "words", wordsClass: "hero__word" });

        gsap
          .timeline({ defaults: { ease: "expo.out" }, onComplete: () => split?.revert() })
          .set(title, { visibility: "visible" })
          .from(
            split.words,
            { autoAlpha: 0, y: "-0.4em", scale: 0.94, transformOrigin: "50% 100%", duration: 1.4, stagger: 0.07 },
            0.2,
          )
          .from("[data-intro='cta']", { autoAlpha: 0, y: 16, duration: 1 }, 0.9)
          .from("[data-intro='meta']", { autoAlpha: 0, y: 22, duration: 1.2 }, 1.15);
      });

      // Wait for the serif face so the words that land are the real ones.
      const start = () => {
        if (document.fonts) document.fonts.ready.then(play);
        else play();
      };

      // In a background tab the browser throttles frames, so hold the intro until the tab is seen.
      const onVisible = () => {
        if (document.visibilityState !== "visible") return;
        document.removeEventListener("visibilitychange", onVisible);
        start();
      };
      if (document.visibilityState === "visible") start();
      else document.addEventListener("visibilitychange", onVisible);

      return () => {
        cancelled = true;
        document.removeEventListener("visibilitychange", onVisible);
        split?.revert();
      };
    },
    { scope },
  );

  return (
    <section ref={scope} className="hero" data-ui="light">
      <div className="container">
        <div className="hero__lead">
          <h1 ref={titleRef} className="hero__title">
            <span className="hero__title-line">Personalized SAT Prep.</span>
            <span className="hero__title-line hero__title-soft">That actually moves your score.</span>
          </h1>
          <div className="hero__cta-row" data-intro="cta">
            <a className="btn btn--primary btn--lg" href={links.diagnostic}>
              Start Your Diagnostic
            </a>
            <a className="hero__cta" href="#pitch">
              <span>How it works</span>
              <span className="icon-circle icon-circle--lg" aria-hidden="true">
                <ArrowDown />
              </span>
            </a>
            <span className="hero__note">Free. No card.</span>
          </div>
        </div>
        <div className="hero__meta" data-intro="meta">
          <p className="hero__pitch">
            A free diagnostic finds the concepts costing you the most points. A plan tells you exactly what to
            study next, every day, until the test.
          </p>
          <a className="btn btn--ghost" href={links.login}>
            Existing Student Login
          </a>
        </div>
      </div>
    </section>
  );
}
