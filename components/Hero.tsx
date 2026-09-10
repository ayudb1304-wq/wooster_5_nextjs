import Wordmark from "@/components/Wordmark";
import { links } from "@/lib/links";

export default function Hero() {
  return (
    <section className="hero slide" data-ui="light">
      <div className="container">
        <h1 className="hero__tagline">
          <span className="reveal">Personalized SAT Prep.</span>
          <span className="reveal reveal--delay hero__tagline-soft">That actually moves your score.</span>
        </h1>
        <Wordmark>Wooster Prep</Wordmark>
        <div className="hero__meta reveal reveal--delay-2">
          <p>
            Study hard or study smart. The difference between an 1100 and a 1590 is not just effort, it is
            strategy. Wooster Prep is tailored to you.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={links.diagnostic}>
              Start Your Diagnostic
            </a>
            <a className="btn btn--ghost" href={links.login}>
              Existing Student Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
