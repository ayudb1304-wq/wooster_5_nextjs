import Image from "next/image";
import team from "@/public/assets/team.jpg";

const story = [
  "Not “nervous on test day.” Not “a late bloomer.” Just sucked. He went to a college he still describes, without anyone asking, as one of the worst ever.",
  "Then he did something nobody in his life had planned for, least of all him: a few years later he graduated from an Ivy League university, and his old college presumably still has questions.",
  "He did not get smarter. (He most certainly did not. We’ve asked around.) He did not stumble into a magic tutor, a secret shortcut, or a generous uncle. He stumbled into Moneyball, the baseball idea that everyone was chasing the flashy stats while a handful of boring numbers were quietly winning the games.",
  "He applied it to studying. Stop trying to learn everything. Find the few concepts that pay the most points per hour, hammer those, and let the rest wait in line.",
];

const storyAfter = [
  "The rest of our founding team has the same story with different scenery. Ordinary starting points. No special access. Same method. Then degrees and careers that people from their hometowns still describe as “huh.”",
  "Somewhere along the way the team noticed something: the method never once asked anyone to be brilliant, or to know somebody, or to pay for a tutor with a waiting list. It was just a method. Anyone could use it. So it should be taught to everyone. That’s Wooster Prep.",
];

const audiences = [
  {
    title: "For parents",
    body: [
      "You’ve been told great SAT scores come from natural genius, an expensive tutor, or a family tradition of ruthless flashcards. Good news: none of those is actually on the list. What’s on the list is Math (don’t worry, we handle that for you).",
      "Knowing exactly what you need to study, in the right order, knowing exactly what errors you make, practiced by someone who shows up. That last part is where you come in. We’ll handle the rest.",
    ],
  },
  {
    title: "For students",
    body: [
      "You are not bad at the SAT. You have been studying the wrong things in the wrong order, which is like training for a marathon by getting really good at stretching. Wooster Prep fixes the order. You bring time, some of it, ideally not all of it at 11 p.m. the night before. That’s the whole deal.",
    ],
  },
];

export default function About() {
  return (
    <section className="about" id="about" data-ui="light">
      <div className="container">
        <header className="about__head reveal">
          <span className="eyebrow">About us</span>
          <h2 className="about__title">Wooster Prep exists because its founder sucked at taking exams.</h2>
        </header>

        <div className="about__grid">
          <div className="about__story reveal">
            {story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="pull">
              It worked so well it was <em>slightly annoying</em>.
            </p>
            {storyAfter.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <figure className="about__media reveal reveal--delay">
            <Image
              src={team}
              alt="Three people laughing at something on a laptop in a library"
              sizes="(max-width: 960px) 100vw, 420px"
              placeholder="blur"
            />
          </figure>
        </div>

        <div className="audiences">
          {audiences.map((a, i) => (
            <div key={a.title} className={`audience reveal${i ? " reveal--delay" : ""}`}>
              <h3 className="audience__title">{a.title}</h3>
              {a.body.map((p) => (
                <p key={p.slice(0, 24)} className="audience__body">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
