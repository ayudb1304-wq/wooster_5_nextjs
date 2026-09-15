"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { concepts, tierOf } from "@/lib/app/data";

const config = { upside: { label: "Points", color: "var(--color-navy)" } } satisfies ChartConfig;
const fill = { critical: "var(--color-critical)", high: "var(--color-progress)", steady: "var(--color-chart-5)" } as const;

const data = concepts
  .filter((c) => c.status !== "mastered")
  .slice(0, 8)
  .map((c) => ({ name: c.name.length > 26 ? `${c.name.slice(0, 24)}…` : c.name, upside: c.upside, fill: fill[tierOf(c)] }));

/** The eight concepts worth the most points, as horizontal bars in their tier color. */
export default function UpsideChart({ className = "" }: { className?: string }) {
  return (
    <Card className={`gap-0 py-0 shadow-none ${className}`}>
      <CardHeader className="p-5 pb-0">
        <CardTitle className="font-serif text-xl font-normal">Where the points are</CardTitle>
        <CardDescription className="mt-1">The eight unmastered concepts worth the most to your score.</CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <ChartContainer config={config} className="h-[280px] w-full !aspect-auto">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 36, bottom: 0, left: 0 }} barCategoryGap={6}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis type="category" dataKey="name" width={190} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <ChartTooltip cursor={{ fill: "var(--color-muted)" }} content={<ChartTooltipContent />} />
            <Bar dataKey="upside" radius={4}>
              <LabelList dataKey="upside" position="right" formatter={(v) => `+${String(v)}`} className="fill-foreground text-xs" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
