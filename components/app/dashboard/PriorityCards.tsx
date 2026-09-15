import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { tierLabel, tierOf, topPriorities } from "@/lib/app/data";

const tone = { critical: "bg-critical-tint text-critical", high: "bg-progress-tint text-progress", steady: "bg-muted text-muted-foreground" } as const;
const bar = { critical: "[&_[data-slot=progress-indicator]]:bg-critical", high: "[&_[data-slot=progress-indicator]]:bg-progress", steady: "[&_[data-slot=progress-indicator]]:bg-foreground/40" } as const;

export default function PriorityCards() {
  return (
    <section className="lg:col-span-12">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl leading-none">Top priorities</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">The highest score return for your next sessions.</p>
        </div>
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/concepts" />}>
          View all concepts <ArrowRight />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {topPriorities.map((c) => {
          const t = tierOf(c);
          return (
            <Card key={c.slug} className="group gap-0 py-0 shadow-none transition-[transform,border-color] hover:-translate-y-0.5 hover:border-foreground/25">
              <CardContent className="flex h-full flex-col gap-4 p-5">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`border-transparent ${tone[t]}`}>
                    {tierLabel[t]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">#{c.rank}</span>
                </div>
                <h3 className="font-serif text-[22px] leading-tight">{c.name}</h3>
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="secondary">{c.section}</Badge>
                  <span className="font-semibold">+{c.upside} pts</span>
                  <span className="text-muted-foreground">· {c.tip}</span>
                </div>
                <Progress value={c.upside} className={`[&_[data-slot=progress-track]]:h-1.5 ${bar[t]} mt-auto`} />
                <Button variant="outline" size="sm" className="w-fit" nativeButton={false} render={<Link href={`/concepts/${c.slug}`} />}>
                  Open concept
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
