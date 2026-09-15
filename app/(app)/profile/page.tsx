import type { Metadata } from "next";
import { Card, PageHead, Tile } from "@/components/app/ui";
import { concepts, formatDate, masteredCount, student } from "@/lib/app/data";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <>
      <PageHead
        eyebrow="Student profile"
        title="Your Wooster account."
        lede="Who is studying, what access is active, and where the product should guide you next."
        aside={<span className="chip chip--stat">Enrolled</span>}
      />

      <div className="cols-2" style={{ gridTemplateColumns: "1fr 1.6fr" }}>
        <div className="stack-16">
          <Card>
            <span className="card__eyebrow">Account</span>
            <h2 className="card__title" style={{ fontSize: 26 }}>
              {student.firstName} {student.lastName}
            </h2>
            <p className="card__text">{student.email}</p>
            <div className="facts" style={{ marginTop: 14 }}>
              <div className="fact"><span>Grade</span><b>{student.grade}</b></div>
              <div className="fact"><span>Target score</span><b>{student.target}</b></div>
              <div className="fact"><span>Phone</span><b>•••• {student.phoneLast4}</b></div>
              <div className="fact"><span>Email status</span><b>{student.emailVerified ? "Verified" : "Unverified"}</b></div>
              <div className="fact"><span>Member since</span><b>{formatDate(student.memberSince)}</b></div>
            </div>
          </Card>
          <Card>
            <span className="card__eyebrow">Access</span>
            <h2 className="card__title" style={{ fontSize: 22 }}>Enrollment and plan</h2>
            <div className="facts" style={{ marginTop: 10 }}>
              <div className="fact"><span>Plan</span><b>{student.plan}</b></div>
              <div className="fact"><span>Access ends</span><b>{formatDate(student.accessEnds)}</b></div>
              <div className="fact"><span>Full exams</span><b>{student.examsUsed} of {student.examsTotal} used</b></div>
            </div>
          </Card>
        </div>

        <Card>
          <span className="card__eyebrow">Progress snapshot</span>
          <h2 className="card__title" style={{ fontSize: 26 }}>Where you stand today.</h2>
          <p className="card__text">A quick view of your diagnostic baseline, mastery movement, and full-length exam usage.</p>
          <div className="cols-3" style={{ marginTop: 18 }}>
            <Tile value={student.projection} label="Current projection" sub={`Target ${student.target}`} />
            <Tile value={`${student.split.rw}/${student.split.math}`} label="Diagnostic split" sub="R&W / Math" tone="in-progress" />
            <Tile value={`${masteredCount}/${concepts.length}`} label="Mastery progress" sub="Concepts completed" tone="mastered" />
            <Tile value={`${student.examsUsed}/${student.examsTotal}`} label="Full SAT exams" sub={`${student.examsTotal - student.examsUsed} remaining`} />
          </div>
        </Card>
      </div>
    </>
  );
}
