const reasons = [
  { claim: "Measure first.", proof: "A focused diagnostic finds the gaps before a single lesson." },
  { claim: "Rank by points.", proof: "All 29 concepts, ordered by what each is worth to your score." },
  { claim: "Fit the calendar.", proof: "Eight weeks out or eight days, the plan matches the time left." },
  { claim: "Master, then move.", proof: "Short mastery sets per concept. Retake until it sticks." },
  { claim: "Watch it work.", proof: "The projected score updates with every set. No waiting for test day." },
];

export default function Why() {
  return (
    <section className="why" id="why" data-ui="light">
      <div className="container">
        <header className="why__intro reveal">
          <span className="eyebrow">Why it works</span>
          <h2 className="display">Not magic. Math.</h2>
          <p className="lede">Wooster runs on a loop, not a syllabus. Every step feeds the next.</p>
        </header>

        <ul className="why__list">
          {reasons.map((r, i) => (
            <li key={r.claim} className={`why__row reveal${i % 2 ? " reveal--delay" : ""}`}>
              <h3 className="why__claim">{r.claim}</h3>
              <p className="why__proof">{r.proof}</p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
