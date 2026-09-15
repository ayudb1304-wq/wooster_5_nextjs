"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { examAttempts } from "@/lib/app/data";

const config = { rw: { label: "R&W", color: "var(--color-navy)" }, math: { label: "Math", color: "var(--color-mastered)" } } satisfies ChartConfig;
const data = [...examAttempts].reverse().map((a, i) => ({ attempt: `#${i + 1}`, rw: a.rw, math: a.math }));

/** Full-length attempts, oldest first, R&W and Math stacked. */
export default function AttemptsChart({ className = "" }: { className?: string }) {
  return (
    <Card className={`gap-0 py-0 shadow-none ${className}`}>
      <CardHeader className="p-5 pb-0">
        <CardTitle className="font-serif text-xl font-normal">Full-length attempts</CardTitle>
        <CardDescription className="mt-1">Correct answers per attempt, out of 98. Tracked apart from mastery.</CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <ChartContainer config={config} className="h-[220px] w-full !aspect-auto">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }} barCategoryGap={18}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="attempt" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis domain={[0, 98]} ticks={[0, 25, 50, 75, 98]} tickLine={false} axisLine={false} />
            <ChartTooltip cursor={{ fill: "var(--color-muted)" }} content={<ChartTooltipContent />} />
            <Bar dataKey="rw" stackId="a" fill="var(--color-rw)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="math" stackId="a" fill="var(--color-math)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
