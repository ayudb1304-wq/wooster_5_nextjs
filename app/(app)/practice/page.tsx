import type { Metadata } from "next";
import ConceptLibrary from "@/components/app/concepts/ConceptLibrary";
import PageHeader from "@/components/app/PageHeader";
import { Badge } from "@/components/ui/badge";
import { concepts, inProgressCount, masteredCount } from "@/lib/app/data";

export const metadata: Metadata = { title: "Review decks" };

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Concept review library"
        title="Review decks"
        lede="The full Wooster lesson deck for each concept, for a quick refresher or a deeper pass through the examples."
        aside={
          <>
            <Badge variant="outline" className="h-7 bg-card px-2.5 text-[13px] font-medium">{concepts.length} decks</Badge>
            <Badge variant="outline" className="h-7 border-transparent bg-mastered-tint px-2.5 text-[13px] font-medium text-mastered">{masteredCount} mastered</Badge>
            <Badge variant="outline" className="h-7 border-transparent bg-progress-tint px-2.5 text-[13px] font-medium text-progress">{inProgressCount} in progress</Badge>
          </>
        }
      />
      <ConceptLibrary concepts={concepts} mode={{ cta: "Open review deck", hrefBase: "/practice", unit: "decks", sub: "Review deck" }} />
    </div>
  );
}
