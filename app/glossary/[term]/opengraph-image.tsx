import { getTerm, getTermSlugs } from "@/lib/glossary";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getTermSlugs().map((term) => ({ term }));
}

export default async function Image({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const entry = getTerm(term);
  return ogImage(entry?.term ?? "SAT glossary", "SAT glossary");
}
