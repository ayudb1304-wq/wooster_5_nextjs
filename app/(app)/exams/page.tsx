import type { Metadata } from "next";
import Link from "next/link";
import { Card, PageHead } from "@/components/app/ui";
import { examAttempts, formatDateTime, latestAttempt, student } from "@/lib/app/data";

export const metadata: Metadata = { title: "Full-length exams" };

export default function ExamsPage() {
  const pct = (a: { correct: number; total: number }) => Math.round((a.correct / a.total) * 100);
  return (
    <>
      <PageHead
        eyebrow="SAT format practice"
        title="Full-length exams"
        lede="98-question SAT-style timed exams with a fresh randomized set each attempt. Tracked separately from concept mastery, so the two signals stay clear."
        aside={
          <span className="chip chip--stat">
            {student.examsUsed} of {student.examsTotal} used
          </span>
        }
      />

      <Card className="card__row">
        <div>
          <b style={{ fontWeight: 500 }}>Start a new 98-question exam</b>
          <p className="card__text">Exam attempts do not change mastery stats on the dashboard.</p>
        </div>
        <Link className="btn btn--primary" href="/exams/new">
          Start new exam
        </Link>
      </Card>

      <Card>
        <div className="section-head" style={{ marginBottom: 6 }}>
          <h2 className="h3">Attempts</h2>
          <p>
            Latest: {latestAttempt.correct}/{latestAttempt.total} ({pct(latestAttempt)}%)
          </p>
        </div>
        <div className="rows">
          {examAttempts.map((a) => (
            <div key={a.id} className="row">
              <div className="row__main">
                <span className="row__date">{formatDateTime(a.date)}</span>
                <span className="row__value">
                  {a.correct}/{a.total} ({pct(a)}%)
                </span>
                <span className="row__sub">
                  R&amp;W {a.rw}/54 · Math {a.math}/44
                </span>
              </div>
              <Link className="btn btn--ghost btn--sm" href={`/exams/${a.id}`}>
                Results
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
