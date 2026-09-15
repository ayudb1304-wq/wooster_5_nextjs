import type { Metadata } from "next";
import ConceptGrid from "@/components/app/ConceptGrid";
import { PageHead } from "@/components/app/ui";
import { concepts } from "@/lib/app/data";

export const metadata: Metadata = { title: "Review decks" };

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Concept review library"
        title="Review decks"
        lede="The full Wooster lesson deck for each concept, for a quick refresher or a deeper pass through the examples."
        aside={<span className="chip chip--stat">{concepts.length} decks</span>}
      />
      <ConceptGrid concepts={concepts} mode={{ cta: "Open review deck", hrefBase: "/practice", unit: "decks", sub: "Review deck" }} />
    </>
  );
}
