import type { Metadata } from "next";
import ConceptGrid from "@/components/app/ConceptGrid";
import { PageHead } from "@/components/app/ui";
import { concepts } from "@/lib/app/data";

export const metadata: Metadata = { title: "Mastery sets" };

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Concept mastery practice"
        title="Mastery sets"
        lede="Choose a concept and jump straight into its 10-question mastery set. Attempts update mastery separately from full-length exams."
        aside={<span className="chip chip--stat">{concepts.length} concepts</span>}
      />
      <ConceptGrid concepts={concepts} mode={{ cta: "Start mastery set", hrefBase: "/practice-exams/mastery", unit: "concepts" }} />
    </>
  );
}
