import type { Metadata } from "next";
import ConceptLibrary from "@/components/app/concepts/ConceptLibrary";
import PageHeader from "@/components/app/PageHeader";
import { Badge } from "@/components/ui/badge";
import { concepts, inProgressCount, masteredCount } from "@/lib/app/data";

export const metadata: Metadata = { title: "Concept library" };

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Personalized concept path"
        title="Concept library"
        lede="All 29 SAT concepts, ranked by your personal score upside. Open a concept to study the lesson, then move into mastery."
        aside={
          <>
            <Badge variant="outline" className="h-7 bg-card px-2.5 text-[13px] font-medium">{concepts.length} concepts</Badge>
            <Badge variant="outline" className="h-7 border-transparent bg-mastered-tint px-2.5 text-[13px] font-medium text-mastered">{masteredCount} mastered</Badge>
            <Badge variant="outline" className="h-7 border-transparent bg-progress-tint px-2.5 text-[13px] font-medium text-progress">{inProgressCount} in progress</Badge>
          </>
        }
      />
      <ConceptLibrary concepts={concepts} mode={{ cta: "Open concept", hrefBase: "/concepts", unit: "concepts" }} />
    </div>
  );
}
