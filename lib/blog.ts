import { posts, type Post } from "@/lib/posts";

export type Heading = { id: string; text: string; level: number };

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function getAllPosts(): Post[] {
  return posts.slice().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

/** Minutes at 230 words a minute, never below 1. */
export function getReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/** H2 and H3 headings from the post HTML, for the table of contents. */
export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const re = /<h([23])[^>]*>(.+?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const text = m[2].replace(/<[^>]*>/g, "");
    headings.push({ id: slugify(text), text, level: Number(m[1]) });
  }
  return headings;
}

/** Gives every H2 and H3 an id so the table of contents can link to it. */
export function addHeadingIds(content: string): string {
  return content.replace(/<h([23])([^>]*)>(.+?)<\/h\1>/gi, (_m, level, attrs, text) => {
    const id = slugify(text.replace(/<[^>]*>/g, ""));
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

/** Up to three other posts, ranked by shared tags. */
export function getRelatedPosts(current: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => current.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

/** The posts before and after this one in date order. */
export function getNeighbours(current: Post): { prev?: Post; next?: Post } {
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === current.slug);
  return { prev: all[i + 1], next: all[i - 1] };
}
