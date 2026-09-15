import type { Metadata } from "next";
import KpiCards from "@/components/app/dashboard/KpiCards";
import PriorityCards from "@/components/app/dashboard/PriorityCards";
import RecentActivity from "@/components/app/dashboard/RecentActivity";
import StreakHeatmap from "@/components/app/dashboard/StreakHeatmap";
import StudyNextCard from "@/components/app/dashboard/StudyNextCard";
import TrajectoryChart from "@/components/app/dashboard/TrajectoryChart";
import { Card, CardContent } from "@/components/ui/card";
import { student } from "@/lib/app/data";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <header className="flex flex-col gap-1 lg:col-span-12">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Today&rsquo;s plan</span>
        <h1 className="font-serif text-4xl leading-none tracking-tight md:text-[44px]">Welcome back, {student.firstName}.</h1>
        <p className="text-[15px] text-muted-foreground">Study the next highest-upside concept. Keep the streak alive.</p>
      </header>

      <StudyNextCard />

      <Card className="gap-0 py-0 shadow-none lg:col-span-4">
        <CardContent className="flex h-full flex-col justify-between gap-5 p-5">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Score path</span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-5xl leading-none tracking-tight">{student.projection}</span>
              <span className="text-sm text-muted-foreground">of {student.target}</span>
            </div>
          </div>
          <div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-navy" style={{ width: `${Math.max(2, ((student.projection - 1000) / (student.target - 1000)) * 100)}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Baseline {student.baseline}</span>
              <span>Target {student.target}</span>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            +{student.projection - student.baseline} points since the diagnostic. Every mastery set moves this number before test day does.
          </p>
        </CardContent>
      </Card>

      <KpiCards />
      <TrajectoryChart />
      <StreakHeatmap />
      <PriorityCards />
      <RecentActivity />
    </div>
  );
}
