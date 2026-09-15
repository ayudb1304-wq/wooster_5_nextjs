import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { activityDays, student } from "@/lib/app/data";

const level = (m: number) => (m === 0 ? "bg-muted" : m < 20 ? "bg-mastered/30" : m < 40 ? "bg-mastered/60" : "bg-mastered");

/** Twelve weeks of study days, GitHub style. Columns are weeks, rows are days. */
export default function StreakHeatmap() {
  const weeks = Array.from({ length: 12 }, (_, w) => activityDays.slice(w * 7, w * 7 + 7));
  const active = activityDays.filter((d) => d.minutes > 0).length;
  return (
    <Card className="gap-0 py-0 shadow-none lg:col-span-5">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="font-serif text-xl font-normal">Study days</CardTitle>
        <CardDescription className="mt-1">
          {active} active days in the last 12 weeks. Current streak: {student.streakDays} day{student.streakDays === 1 ? "" : "s"}.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <div className="flex gap-1.5" role="img" aria-label={`${active} active study days in the last twelve weeks`}>
          {weeks.map((week, i) => (
            <div key={i} className="grid flex-1 gap-1.5">
              {week.map((d) => (
                <span key={d.date} title={`${d.date}: ${d.minutes} min`} className={`aspect-square w-full rounded-[3px] ${level(d.minutes)}`} />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>12 weeks ago</span>
          <span className="flex items-center gap-1.5">
            Less
            <span className="size-2.5 rounded-[2px] bg-muted" />
            <span className="size-2.5 rounded-[2px] bg-mastered/30" />
            <span className="size-2.5 rounded-[2px] bg-mastered/60" />
            <span className="size-2.5 rounded-[2px] bg-mastered" />
            More
          </span>
          <span>Today</span>
        </div>
      </CardContent>
    </Card>
  );
}
