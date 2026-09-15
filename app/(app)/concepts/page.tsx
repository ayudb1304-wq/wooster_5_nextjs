import type { Metadata } from "next";
import ConceptGrid from "@/components/app/ConceptGrid";
import { PageHead } from "@/components/app/ui";
import { concepts } from "@/lib/app/data";

export const metadata: Metadata = { title: "Concept library" };

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Personalized concept path"
        title="Concept library"
        lede="All 29 SAT concepts, ranked by your personal score upside. Open a concept to study the lesson, then move into mastery."
        aside={<span className="chip chip--stat">{concepts.length} concepts</span>}
      />
      <ConceptGrid concepts={concepts} mode={{ cta: "Open concept", hrefBase: "/concepts", unit: "concepts" }} />
    </>
  );
}
