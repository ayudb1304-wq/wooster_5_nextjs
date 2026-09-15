import type { Metadata } from "next";
import Link from "next/link";
import { Card, PageHead, Tile } from "@/components/app/ui";
import { concepts, examAttempts, inProgressCount, latestAttempt, masteredCount, student, studyNext, trajectory } from "@/lib/app/data";

export const metadata: Metadata = { title: "Stats" };

/* Weeks 0 to 8; y from 1000 to 1600. */
function Trajectory() {
  const w = 600, h = 240, px = 40, py = 20;
  const x = (week: number) => px + (week / 8) * (w - px * 2);
  const y = (score: number) => h - py - ((score - 1000) / 600) * (h - py * 2);
  const line = trajectory.map((p, i) => `${i ? "L" : "M"}${x(p.week)},${y(p.score)}`).join(" ");
  const last = trajectory[trajectory.length - 1];
  return (
    <svg className="chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Projected score by week">
      {[1000, 1200, 1400, 1600].map((s) => (
        <g key={s}>
          <line x1={px} x2={w - px} y1={y(s)} y2={y(s)} stroke="rgba(23,27,34,0.12)" />
          <text x={px - 8} y={y(s) + 4} textAnchor="end">{s}</text>
        </g>
      ))}
      <line x1={px} x2={w - px} y1={y(student.target)} y2={y(student.target)} stroke="#14213d" strokeDasharray="4 4" />
      <text x={w - px} y={y(student.target) - 6} textAnchor="end">Target {student.target}</text>
      <path d={line} fill="none" stroke="#14213d" strokeWidth="2" />
      <line x1={x(last.week)} x2={x(8)} y1={y(last.score)} y2={y(student.target)} stroke="rgba(20,33,61,0.35)" strokeDasharray="2 4" />
      {trajectory.map((p) => (
        <circle key={p.week} cx={x(p.week)} cy={y(p.score)} r="4" fill="#14213d" />
      ))}
      {[0, 2, 4, 6, 8].map((wk) => (
        <text key={wk} x={x(wk)} y={h - 4} textAnchor="middle">
          wk {wk}
        </text>
      ))}
    </svg>
  );
}

export default function StatsPage() {
  const latestPct = Math.round((latestAttempt.correct / latestAttempt.total) * 100);
  return (
    <>
      <PageHead
        eyebrow="Performance"
        title="Stats that show what to do next."
        lede="Your projected score, mastery wins, full-length exam attempts, and the concepts most worth reviewing next."
      />

      <div className="cols-4">
        <Tile value={student.projection} label="Current projection" sub={`${student.target - student.projection} points to ${student.target}`} />
        <Tile value={student.baseline} label="Diagnostic baseline" sub="From your diagnostic report" tone="steady" />
        <Tile value={`${latestPct}%`} label="Latest full SAT" sub={`${latestAttempt.correct}/${latestAttempt.total} on latest attempt`} tone="in-progress" />
        <Tile value={`${masteredCount}/${concepts.length}`} label="Mastery progress" sub={`${inProgressCount} in progress, ${concepts.length - masteredCount - inProgressCount} not started`} tone="mastered" />
      </div>

      <div className="cols-4">
        <Link className="quick" href={`/concepts/${studyNext.slug}`}>
          <b>Review {studyNext.name}</b>
          <span>Current mastery score: {studyNext.mastery}/10.</span>
        </Link>
        <Link className="quick" href="/exams">
          <b>Take a full SAT practice exam</b>
          <span>{examAttempts.length} submitted attempts tracked here.</span>
        </Link>
        <Link className="quick" href="/flashcards">
          <b>Refresh with flash cards</b>
          <span>Use concept cards before retesting weak areas.</span>
        </Link>
        <Link className="quick" href="/dashboard">
          <b>Return to today&rsquo;s plan</b>
          <span>Jump back to the study plan and current priority.</span>
        </Link>
      </div>

      <div className="cols-2">
        <Card>
          <div className="section-head">
            <div>
              <span className="card__eyebrow">Mastery-driven projection</span>
              <h2 className="h3">Score trajectory</h2>
            </div>
            <p>Target {student.target}</p>
          </div>
          <p className="card__text" style={{ margin: "8px 0 16px" }}>
            The line moves when mastery work creates projected gains. Full SAT attempts are shown separately so the two signals stay clear.
          </p>
          <Trajectory />
        </Card>
        <Card>
          <span className="card__eyebrow">Next best move</span>
          <div className="stack-16">
            <div className="quick" style={{ borderLeft: "3px solid var(--critical)" }}>
              <span className="chip chip--critical">Most urgent concept</span>
              <b style={{ color: "var(--ink)", fontSize: 17 }}>{studyNext.name}</b>
              <span>Retake its 10-question mastery set after a quick review.</span>
            </div>
            <div className="quick" style={{ borderLeft: "3px solid var(--mastered)" }}>
              <span className="chip chip--mastered">Keep the streak</span>
              <b style={{ color: "var(--ink)", fontSize: 17 }}>{student.streakDays}-day streak</b>
              <span>One session today keeps the projection moving.</span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
