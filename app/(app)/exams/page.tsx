import type { Metadata } from "next";
import { ArrowRight, Timer } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/app/PageHeader";
import AttemptsChart from "@/components/app/stats/AttemptsChart";
import StatTile from "@/components/app/StatTile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { examAttempts, formatDateTime, latestAttempt, student } from "@/lib/app/data";

export const metadata: Metadata = { title: "Full-length exams" };

const pct = (a: { correct: number; total: number }) => Math.round((a.correct / a.total) * 100);

export default function ExamsPage() {
  const best = examAttempts.reduce((b, a) => (a.correct > b.correct ? a : b), examAttempts[0]);
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="lg:col-span-12">
        <PageHeader
          eyebrow="SAT format practice"
          title="Full-length exams"
          lede="98-question SAT-style timed exams with a fresh randomized set each attempt. Tracked separately from concept mastery, so the two signals stay clear."
          aside={
            <Badge variant="outline" className="h-7 bg-card px-2.5 text-[13px] font-medium">
              {student.examsUsed} of {student.examsTotal} used
            </Badge>
          }
        />
      </div>

      <Card className="gap-0 py-0 shadow-none lg:col-span-12">
        <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <Timer className="size-5" />
            </span>
            <div>
              <div className="font-medium">Start a new 98-question exam</div>
              <div className="text-[13px] text-muted-foreground">About two hours. Exam attempts do not change mastery stats on the dashboard.</div>
            </div>
          </div>
          <Button className="rounded-full" nativeButton={false} render={<Link href="/exams/new" />}>
            Start new exam <ArrowRight />
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
        <StatTile label="Latest attempt" value={`${pct(latestAttempt)}%`} note={`${latestAttempt.correct}/${latestAttempt.total} · ${formatDateTime(latestAttempt.date)}`} tone="progress" />
        <StatTile label="Best attempt" value={`${pct(best)}%`} note={`${best.correct}/${best.total} · R&W ${best.rw}, Math ${best.math}`} tone="mastered" />
        <StatTile label="Remaining" value={student.examsTotal - student.examsUsed} note={`of ${student.examsTotal} in the plan`} />
      </div>

      <AttemptsChart className="lg:col-span-7" />

      <Card className="gap-0 py-0 shadow-none lg:col-span-12">
        <CardHeader className="p-5 pb-2">
          <CardTitle className="font-serif text-xl font-normal">Attempts</CardTitle>
        </CardHeader>
        <CardContent className="px-2 pb-2">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-3">Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="hidden sm:table-cell">Reading and Writing</TableHead>
                <TableHead className="hidden sm:table-cell">Math</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {examAttempts.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="pl-3 text-muted-foreground">{formatDateTime(a.date)}</TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {a.correct}/{a.total}
                    </span>
                    <span className="ml-2 text-muted-foreground">{pct(a)}%</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{a.rw}/54</TableCell>
                  <TableCell className="hidden sm:table-cell">{a.math}/44</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" nativeButton={false} render={<Link href={`/exams/${a.id}`} />}>
                      Results <ArrowRight />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
