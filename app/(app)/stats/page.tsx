import type { Metadata } from "next";
import { ArrowRight, BookCheck, Target, Timer, TrendingUp } from "lucide-react";
import Link from "next/link";
import TrajectoryChart from "@/components/app/dashboard/TrajectoryChart";
import PageHeader from "@/components/app/PageHeader";
import AttemptsChart from "@/components/app/stats/AttemptsChart";
import UpsideChart from "@/components/app/stats/UpsideChart";
import StatTile from "@/components/app/StatTile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { concepts, inProgressCount, latestAttempt, masteredCount, sectionSummary, student, studyNext } from "@/lib/app/data";

export const metadata: Metadata = { title: "Stats" };

export default function StatsPage() {
  const latestPct = Math.round((latestAttempt.correct / latestAttempt.total) * 100);
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="lg:col-span-12">
        <PageHeader
          eyebrow="Performance"
          title="Stats that show what to do next."
          lede="Your projected score, mastery wins, full-length exam attempts, and the concepts most worth reviewing next."
          aside={
            <Badge variant="outline" className="h-7 bg-card px-2.5 text-[13px] font-medium">
              Target {student.target}
            </Badge>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
        <StatTile label="Current projection" value={student.projection} note={`${student.target - student.projection} points to ${student.target}`} tone="navy" icon={<TrendingUp className="size-4" />} />
        <StatTile label="Diagnostic baseline" value={student.baseline} note="From your diagnostic report" icon={<Target className="size-4" />} />
        <StatTile label="Latest full SAT" value={`${latestPct}%`} note={`${latestAttempt.correct}/${latestAttempt.total} on the latest attempt`} tone="progress" icon={<Timer className="size-4" />} />
        <StatTile label="Mastery progress" value={`${masteredCount}/${concepts.length}`} note={`${inProgressCount} in progress, ${concepts.length - masteredCount - inProgressCount} not started`} tone="mastered" icon={<BookCheck className="size-4" />} />
      </div>

      <TrajectoryChart className="lg:col-span-7" />

      <Card className="gap-0 py-0 shadow-none lg:col-span-5">
        <CardHeader className="p-5 pb-0">
          <CardTitle className="font-serif text-xl font-normal">By section</CardTitle>
          <CardDescription className="mt-1">Diagnostic split and mastery, Reading and Writing against Math.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 p-5">
          {sectionSummary.map((s) => (
            <div key={s.section} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className="font-medium">{s.section === "R&W" ? "Reading and Writing" : "Math"}</span>
                <span className="font-serif text-2xl leading-none">{s.score}</span>
              </div>
              <Progress value={((s.score - 200) / 600) * 100} className="[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-indicator]]:bg-navy" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {s.mastered} of {s.total} mastered · {s.inProgress} in progress
                </span>
                <span>+{s.upside} pts available</span>
              </div>
            </div>
          ))}
          <div className="rounded-lg border border-dashed p-4 text-[13px] text-muted-foreground">
            The section with more points available is where the next sessions go. Right now that is{" "}
            <span className="font-medium text-foreground">{sectionSummary[0].upside >= sectionSummary[1].upside ? "Reading and Writing" : "Math"}</span>.
          </div>
        </CardContent>
      </Card>

      <UpsideChart className="lg:col-span-7" />

      <div className="flex flex-col gap-4 lg:col-span-5">
        <AttemptsChart />
        <Card className="gap-0 py-0 shadow-none">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Next best move</span>
              <div className="mt-1 font-serif text-xl leading-tight">{studyNext.name}</div>
              <div className="mt-1 text-[13px] text-muted-foreground">Retake its 10-question mastery set after a quick review. Mastery {studyNext.mastery}/10.</div>
            </div>
            <Button size="sm" className="shrink-0 rounded-full" nativeButton={false} render={<Link href={`/concepts/${studyNext.slug}`} />}>
              Start <ArrowRight />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
