import type { Metadata } from "next";
import ConceptLibrary from "@/components/app/concepts/ConceptLibrary";
import PageHeader from "@/components/app/PageHeader";
import { Badge } from "@/components/ui/badge";
import { concepts, inProgressCount, masteredCount } from "@/lib/app/data";

export const metadata: Metadata = { title: "Mastery sets" };

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Concept mastery practice"
        title="Mastery sets"
        lede="Choose a concept and jump straight into its 10-question mastery set. Attempts update mastery separately from full-length exams."
        aside={
          <>
            <Badge variant="outline" className="h-7 bg-card px-2.5 text-[13px] font-medium">{concepts.length} concepts</Badge>
            <Badge variant="outline" className="h-7 border-transparent bg-mastered-tint px-2.5 text-[13px] font-medium text-mastered">{masteredCount} mastered</Badge>
            <Badge variant="outline" className="h-7 border-transparent bg-progress-tint px-2.5 text-[13px] font-medium text-progress">{inProgressCount} in progress</Badge>
          </>
        }
      />
      <ConceptLibrary concepts={concepts} mode={{ cta: "Start mastery set", hrefBase: "/practice-exams/mastery", unit: "concepts" }} />
    </div>
  );
}
