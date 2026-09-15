import type { Metadata } from "next";
import ConceptGrid from "@/components/app/ConceptGrid";
import { PageHead } from "@/components/app/ui";
import { concepts } from "@/lib/app/data";

export const metadata: Metadata = { title: "Flash cards" };

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Concept refresh library"
        title="Flash cards"
        lede="Open the flashcard deck for any concept when you want a fast rule review before practice, mastery, or a full exam."
        aside={<span className="chip chip--stat">{concepts.length} decks</span>}
      />
      <ConceptGrid concepts={concepts} mode={{ cta: "Open flash cards", hrefBase: "/flashcards", unit: "decks", sub: "PDF deck" }} />
    </>
  );
}
