"use client";

import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { student, trajectory } from "@/lib/app/data";

const config = { score: { label: "Projected", color: "var(--color-navy)" } } satisfies ChartConfig;

/* Weeks 0 to 8; the projection to date plus a dotted path to the target. */
const data = Array.from({ length: 9 }, (_, week) => {
  const point = trajectory.find((t) => t.week === week);
  return { week, score: point?.score ?? null };
});

export default function TrajectoryChart() {
  return (
    <Card className="gap-0 py-0 shadow-none lg:col-span-7">
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-5 pb-0">
        <div>
          <CardTitle className="font-serif text-xl font-normal">Score trajectory</CardTitle>
          <CardDescription className="mt-1">The line moves when mastery work creates projected gains. Full exams are tracked separately.</CardDescription>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">Target {student.target}</span>
      </CardHeader>
      <CardContent className="p-5">
        <ChartContainer config={config} className="h-[230px] w-full !aspect-auto">
          <AreaChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: -12 }}>
            <defs>
              <linearGradient id="score-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-score)" stopOpacity={0.22} />
                <stop offset="100%" stopColor="var(--color-score)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `wk ${v}`} />
            <YAxis domain={[1000, 1600]} ticks={[1000, 1200, 1400, 1600]} tickLine={false} axisLine={false} tickMargin={4} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(v) => `Week ${v}`} />} />
            <ReferenceLine y={student.target} stroke="var(--color-navy)" strokeDasharray="4 4" strokeOpacity={0.5} />
            <Area dataKey="score" type="monotone" stroke="var(--color-score)" strokeWidth={2} fill="url(#score-fill)" connectNulls={false} dot={{ r: 3, fill: "var(--color-score)" }} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
