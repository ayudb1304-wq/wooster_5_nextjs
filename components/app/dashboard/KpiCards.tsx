"use client";

import { ArrowUpRight, BookCheck, Target, Timer, TrendingUp } from "lucide-react";
import { Area, AreaChart } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { concepts, gapCovered, masteredCount, student, weekMinutes } from "@/lib/app/data";

const sparkConfig = { minutes: { label: "Minutes", color: "var(--color-navy)" } } satisfies ChartConfig;

type Kpi = { label: string; value: string; note: string; icon: React.ElementType; badge?: string; badgeTone?: "up" | "flat"; spark?: boolean };

const kpis: Kpi[] = [
  {
    label: "Projected score",
    value: String(student.projection),
    note: `${student.target - student.projection} to target`,
    icon: TrendingUp,
    badge: `+${student.projection - student.baseline}`,
    badgeTone: student.projection > student.baseline ? "up" : "flat",
  },
  { label: "Gap covered", value: `${gapCovered}%`, note: `of ${student.baseline} → ${student.target}`, icon: Target },
  { label: "Mastered", value: `${masteredCount}/${concepts.length}`, note: "concepts completed", icon: BookCheck, badge: "1 this week", badgeTone: "up" },
  { label: "Study time", value: `${student.studyMinutes} min`, note: "logged today", icon: Timer, spark: true },
];

export default function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
      {kpis.map((k) => (
        <Card key={k.label} className="gap-0 py-0 shadow-none">
          <CardContent className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[13px] font-medium">{k.label}</span>
              <k.icon className="size-4" />
            </div>
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="font-serif text-[34px] leading-none tracking-tight text-foreground">{k.value}</div>
                <div className="mt-1.5 text-xs text-muted-foreground">{k.note}</div>
              </div>
              {k.badge && (
                <Badge variant="outline" className={k.badgeTone === "up" ? "border-transparent bg-mastered-tint text-mastered" : "bg-muted text-muted-foreground"}>
                  {k.badgeTone === "up" && <ArrowUpRight className="size-3" />}
                  {k.badge}
                </Badge>
              )}
              {k.spark && (
                <ChartContainer config={sparkConfig} className="h-10 w-24 shrink-0 !aspect-auto">
                  <AreaChart data={weekMinutes} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                    <Area dataKey="minutes" type="monotone" stroke="var(--color-minutes)" fill="var(--color-minutes)" fillOpacity={0.12} strokeWidth={1.5} isAnimationActive={false} />
                  </AreaChart>
                </ChartContainer>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
