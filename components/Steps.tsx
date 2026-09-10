import type { ReactNode } from "react";
import CaseShot from "@/components/CaseShot";
import CaseVideo from "@/components/CaseVideo";
import { links } from "@/lib/links";
import conceptLibrary from "@/public/assets/concept-library.png";
import masteryBoard from "@/public/assets/mastery-board.png";
import practiceExams from "@/public/assets/practice-exams.png";
import statsDashboard from "@/public/assets/stats-dashboard.png";
import todaysPlan from "@/public/assets/todays-plan.png";

type StepProps = {
  num: string;
  pill: string;
  title: string;
  text: string;
  soft?: boolean;
  first?: boolean;
  intro?: ReactNode;
  children: ReactNode;
};

function Step({ num, pill, title, text, soft, first, intro, children }: StepProps) {
  const cls = ["expertise", first && "expertise--first", soft && "expertise--soft"].filter(Boolean).join(" ");
  return (
    <section className={cls} data-ui="light">
      <div className="container">
        {intro}
        <div className="expertise__head">
          <div className="expertise__aside reveal">
            <span className="num">{num}</span>
            <a className="pill" href={links.diagnostic}>
              {pill}
            </a>
          </div>
          <div className="expertise__body reveal reveal--delay">
            <h2 className="h2">{title}</h2>
            <p>{text}</p>
          </div>
        </div>
        <div className="cases">{children}</div>
      </div>
    </section>
  );
}

const genericChapters = Array.from({ length: 10 }, (_, i) => `Chapter ${i + 1}`);

const rankedConcepts: [string, string][] = [
  ["Command of Evidence", "+42 pts"],
  ["Linear Equations", "+38 pts"],
  ["Words in Context", "+35 pts"],
  ["Systems of Equations", "+31 pts"],
  ["Ratios & Proportions", "+28 pts"],
  ["Data Inference", "+26 pts"],
];

export default function Steps() {
  return (
    <div id="how-it-works" className="steps">
      <Step
        num="01"
        pill="Take the diagnostic"
        title="Assess your baseline"
        text="Start with a focused quant diagnostic to pinpoint how SAT point gains happen for you specifically."
        first
        intro={
          <header className="expertise__intro reveal">
            <span className="eyebrow">How Wooster works</span>
            <h2 className="display">Simple steps. Real progress.</h2>
            <p className="lede">
              Not some generic plan, a study plan tailored to you, using tactics made famous in Moneyball.
              ~6,000 SAT-style questions. One complete path to a higher score. Free to try now.
            </p>
          </header>
        }
      >
        <CaseShot
          className="reveal"
          href={links.diagnostic}
          src={statsDashboard}
          alt="Wooster Prep performance dashboard showing current projection, diagnostic baseline and mastery progress"
          title="Performance dashboard"
          sub="Diagnostic baseline, projected score"
        />
        <CaseShot
          className="reveal reveal--delay"
          href={links.diagnostic}
          src={practiceExams}
          alt="Wooster Prep full length SAT format practice exams list"
          title="Full-length SAT exams"
          sub="98-question timed format, fresh set each attempt"
        />
      </Step>

      <Step
        num="02"
        pill="See your plan"
        title="Get a personalized plan"
        text="Receive a clean study roadmap that tells you specifically what to study next."
        soft
      >
        <CaseShot
          className="reveal"
          href={links.diagnostic}
          src={todaysPlan}
          alt="Wooster Prep Today's Plan with the next concept to study and score path"
          title="Today's plan"
          sub="Study this next, ranked by score ROI"
        />
        <CaseShot
          className="reveal reveal--delay"
          href={links.diagnostic}
          src={conceptLibrary}
          alt="Wooster Prep concept library ranked by personal score ROI"
          title="Concept library"
          sub="29 SAT concepts, ordered by your upside"
        />
      </Step>

      <Step
        num="03"
        pill="Start training"
        title="Train, track, and improve"
        text="Build momentum with targeted practice and progress tracking that adapts as you improve."
      >
        <CaseShot
          className="reveal"
          href={links.diagnostic}
          src={masteryBoard}
          alt="Wooster Prep concept mastery board and full-length SAT attempt history"
          title="Mastery board"
          sub="Every concept, every attempt, one view"
        />
        <CaseVideo className="reveal reveal--delay" />
      </Step>

      <Step
        num="04"
        pill="Compare plans"
        title="Precision, not generic prep"
        text="Generic prep gives everyone the same generic content. Wooster builds a personalized plan and content tailored to maximize your score goals."
        soft
      >
        <div className="case case--plan reveal">
          <div className="case__media plan plan--generic">
            <div className="plan__head">
              <span className="plan__name">Generic study plan</span>
              <span className="plan__desc">Fixed chapter order. Same sequence for every student.</span>
            </div>
            <ol className="plan__list">
              {genericChapters.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
            <span className="plan__more">+19 more</span>
          </div>
          <div className="case__caption">
            <span className="case__title">Generic study plan</span>
            <span className="case__sub">Every student, same order</span>
          </div>
        </div>
        <div className="case case--plan reveal reveal--delay">
          <div className="case__media plan plan--wooster">
            <div className="plan__head">
              <span className="plan__name">Wooster study plan</span>
              <span className="plan__desc">
                Personalized priority order. Your first focus area drives the biggest score upside.
              </span>
            </div>
            <ol className="plan__list plan__list--ranked">
              {rankedConcepts.map(([name, pts]) => (
                <li key={name}>
                  <span>{name}</span>
                  <b>{pts}</b>
                </li>
              ))}
            </ol>
            <span className="plan__more">+23 more concepts unlock after your diagnostic</span>
          </div>
          <div className="case__caption">
            <span className="case__title">Wooster study plan</span>
            <span className="case__sub">Ranked by your projected point gain</span>
          </div>
        </div>
      </Step>
    </div>
  );
}
