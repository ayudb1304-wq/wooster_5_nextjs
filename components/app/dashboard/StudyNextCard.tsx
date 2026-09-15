import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import Ring from "@/components/app/dashboard/Ring";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { roiOf, sessionMinutes, studyNext, tierLabel, tierOf } from "@/lib/app/data";

export default function StudyNextCard() {
  const c = studyNext;
  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500 relative overflow-hidden rounded-xl bg-[#12161d] text-white lg:col-span-8">
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/[0.04]" aria-hidden="true" />
      <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/60">Study this next</span>
            <Badge className="bg-white/12 text-white hover:bg-white/12">{tierLabel[tierOf(c)]}</Badge>
            <Badge className="bg-white/12 text-white hover:bg-white/12">#{c.rank}</Badge>
          </div>
          <h2 className="font-serif text-4xl leading-none tracking-tight md:text-5xl">{c.name}</h2>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            A focused {sessionMinutes}-minute session can unlock about {c.upside} projected points. {c.tip}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Button className="h-10 rounded-full bg-white px-5 text-ink hover:bg-white/90" nativeButton={false} render={<Link href={`/concepts/${c.slug}`} />}>
              Start session <ArrowRight />
            </Button>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
              <Clock className="size-3.5" /> {sessionMinutes} min
            </span>
            <span className="text-xs text-white/60">·</span>
            <span className="text-xs text-white/60">{roiOf(c)} points per hour</span>
          </div>
        </div>
        <div className="flex items-center gap-4 self-start md:self-center">
          <Ring value={(c.mastery ?? 0) / 10} label={`${c.mastery ?? 0}/10`} sub="mastery" />
        </div>
      </div>
    </section>
  );
}
