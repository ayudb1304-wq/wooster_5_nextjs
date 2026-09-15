import { BookOpen, ListChecks, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, recentActivity } from "@/lib/app/data";

const icon = { mastery: ListChecks, exam: Timer, review: BookOpen } as const;

export default function RecentActivity() {
  return (
    <Card className="gap-0 py-0 shadow-none lg:col-span-12">
      <CardHeader className="p-5 pb-3">
        <CardTitle className="font-serif text-xl font-normal">Recent activity</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-2">
        {recentActivity.map((a, i) => {
          const Icon = icon[a.kind];
          return (
            <div key={a.id}>
              {i > 0 && <Separator />}
              <div className="flex items-center gap-3 py-3">
                <span className="grid size-8 place-items-center rounded-md bg-muted text-muted-foreground">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.detail}</div>
                </div>
                <time className="text-xs text-muted-foreground" dateTime={a.at}>
                  {formatDate(a.at)}
                </time>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
