import { links } from "@/lib/links";

const truths = [
  {
    title: "The not knowing",
    body: "A projected score that moves as they learn. You see progress weeks before the test does.",
  },
  {
    title: "The wasted hours",
    body: "No redoing what they already know. Every session targets the concept with the biggest upside for your child.",
  },
  {
    title: "The clock",
    body: "The test date is fixed. The plan isn't. Every week of guessing is a week they can't get back.",
  },
];

export default function Parents() {
  return (
    <section className="parents" id="parents" data-ui="light">
      <div className="container">
        <header className="parents__intro reveal">
          <span className="eyebrow">For parents</span>
          <h2 className="display">
            The hard part isn&rsquo;t the studying. It&rsquo;s not knowing if it&rsquo;s working.
          </h2>
          <p className="lede">
            Late nights. Practice books. A score that didn&rsquo;t move. Effort was never the problem. Direction
            was.
          </p>
        </header>

        <ul className="parents__grid">
          {truths.map((t, i) => (
            <li key={t.title} className={`parents__item reveal${i ? ` reveal--delay${i > 1 ? "-2" : ""}` : ""}`}>
              <span className="parents__num">0{i + 1}</span>
              <h3 className="parents__title">{t.title}</h3>
              <p className="parents__body">{t.body}</p>
            </li>
          ))}
        </ul>

        <div className="parents__close reveal">
          <p className="parents__statement">
            Most students find out from the score report. You can know <em>today</em>.
          </p>
          <div className="parents__actions">
            <a className="btn btn--primary btn--lg" href={links.diagnostic}>
              Start Your Diagnostic
            </a>
            <span className="parents__note">Free. No card.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
