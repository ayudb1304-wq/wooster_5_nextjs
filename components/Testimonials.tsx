import StaggerTestimonials, { type Testimonial } from "@/components/StaggerTestimonials";

/* Placeholder quotes. None of these are real. Replace them with cohort quotes
   before launch and drop the placeholder line from the lede. */
const items: Testimonial[] = [
  {
    quote: "I stopped studying everything and started studying the right things. The difference showed up in three weeks.",
    by: "Student",
    role: "class of 2027",
  },
  {
    quote: "For the first time I could see whether the hours were going somewhere. That alone was worth it.",
    by: "Parent",
    role: "of a junior",
  },
  {
    quote: "The plan told me what to do next every single day. I never had to guess.",
    by: "Student",
    role: "class of 2026",
  },
  {
    quote: "We had tried a tutor. This was the first thing that explained where the points actually were.",
    by: "Parent",
    role: "of a senior",
  },
  {
    quote: "Ten concepts. That was the whole list. I still can't believe how much of the test that covered.",
    by: "Student",
    role: "class of 2027",
  },
  {
    quote: "The mastery sets were short enough that she actually did them. Every day.",
    by: "Parent",
    role: "of a sophomore",
  },
  {
    quote: "I went in knowing exactly which questions I would get right. That is a strange and wonderful feeling.",
    by: "Student",
    role: "class of 2026",
  },
  {
    quote: "No countdown, no panic, just a list that got shorter. That is how prep should feel.",
    by: "Parent",
    role: "of a junior",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials" data-ui="light">
      <div className="container">
        <header className="testimonials__head reveal">
          <span className="eyebrow">Testimonials</span>
          <h2 className="display">In their words.</h2>
          <p className="lede">Placeholder quotes for now. Real ones land here after the first cohort reports back.</p>
        </header>
      </div>
      <div className="reveal reveal--delay">
        <StaggerTestimonials items={items} />
      </div>
    </section>
  );
}
