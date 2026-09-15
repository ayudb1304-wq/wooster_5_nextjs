import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Tone = "critical" | "progress" | "mastered" | "navy" | "none";
const rule: Record<Tone, string> = { critical: "bg-critical", progress: "bg-progress", mastered: "bg-mastered", navy: "bg-navy", none: "bg-transparent" };

/** A KPI tile: label, serif value, note, optional colored rule and trailing element. */
export default function StatTile({ label, value, note, tone = "none", icon, trailing }: { label: string; value: ReactNode; note?: string; tone?: Tone; icon?: ReactNode; trailing?: ReactNode }) {
  return (
    <Card className="relative gap-0 overflow-hidden py-0 shadow-none">
      <span className={`absolute inset-x-0 top-0 h-[3px] ${rule[tone]}`} aria-hidden="true" />
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-[13px] font-medium">{label}</span>
          {icon}
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="font-serif text-[34px] leading-none tracking-tight text-foreground">{value}</div>
            {note && <div className="mt-1.5 text-xs text-muted-foreground">{note}</div>}
          </div>
          {trailing}
        </div>
      </CardContent>
    </Card>
  );
}
