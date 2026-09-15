import type { Metadata } from "next";
import Link from "next/link";
import { Bar, Card, PageHead, SectionChip, Tile, TierChip } from "@/components/app/ui";
import { gapCovered, masteredCount, roiOf, sessionMinutes, student, studyNext, tierOf, topPriorities, concepts } from "@/lib/app/data";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <>
      <PageHead
        eyebrow="Today's plan"
        title={`Welcome back, ${student.firstName}.`}
        lede="Study the next highest-upside concept. Keep the streak alive."
        aside={
          <>
            <span className="chip chip--stat">{student.streakDays}-day streak</span>
            <span className="chip chip--stat">
              {student.projection} → {student.target}
            </span>
          </>
        }
      />

      <Card className="card__row">
        <div>
          <b style={{ fontWeight: 500 }}>New to your study plan?</b>
          <p className="card__text">Watch the five-minute guide before your next concept session.</p>
        </div>
        <Link className="btn btn--ghost" href="/#film">
          Watch guide
        </Link>
      </Card>

      <div className="cols-2">
        <Card dark>
          <span className="card__eyebrow">Study this next</span>
          <div className="card__row">
            <h2 className="card__title">{studyNext.name}</h2>
            <div style={{ display: "flex", gap: 6 }}>
              <TierChip concept={studyNext} />
              <span className="chip">#{studyNext.rank}</span>
            </div>
          </div>
          <p className="card__text" style={{ marginTop: 10 }}>
            A focused {sessionMinutes}-minute session can unlock about {studyNext.upside} projected points.
          </p>
          <div className="card__actions">
            <Link className="btn btn--primary" href={`/concepts/${studyNext.slug}`}>
              Start session
            </Link>
            <span className="chip">{sessionMinutes} min target</span>
            <span className="chip">{roiOf(studyNext)} ROI</span>
          </div>
        </Card>

        <div className="stack-16">
          <Card>
            <div className="path">
              <div className="path__row">
                <span className="card__eyebrow" style={{ marginBottom: 0 }}>
                  Score path
                </span>
                <span className="path__target">Target {student.target}</span>
              </div>
              <span className="path__value">{student.projection}</span>
              <Bar value={gapCovered} tone="mastered" />
              <span className="card__note">
                +{student.projection - student.baseline} points improved. {gapCovered}% of the gap to target covered.
              </span>
            </div>
          </Card>
          <div className="cols-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Tile value={`${masteredCount}/${concepts.length}`} label="Mastered" sub="Concepts completed" tone="mastered" />
            <Tile value={student.studyMinutes} label="Study time" sub="Minutes logged" />
          </div>
        </div>
      </div>

      <div className="section-head">
        <div>
          <h2 className="h3">Top priorities</h2>
          <p>The highest score return for your next study sessions.</p>
        </div>
        <Link href="/concepts">View all concepts</Link>
      </div>
      <ul className="cgrid">
        {topPriorities.map((c) => (
          <li key={c.slug} className={`ccard ccard--${tierOf(c)}`}>
            <div className="ccard__top">
              <TierChip concept={c} />
              <span className="ccard__rank">#{c.rank}</span>
            </div>
            <h3 className="ccard__name">{c.name}</h3>
            <div className="ccard__chips">
              <SectionChip section={c.section} />
              <b style={{ fontSize: 13 }}>+{c.upside} pts</b>
            </div>
            <Bar value={c.upside} tone={tierOf(c)} />
            <div className="ccard__foot">
              <span className="ccard__sub">{c.tip}</span>
              <Link href={`/concepts/${c.slug}`}>Open</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
