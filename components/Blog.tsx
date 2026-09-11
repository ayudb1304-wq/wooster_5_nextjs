import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/blog";
import { links } from "@/lib/links";

export default function Blog() {
  const latest = getAllPosts().slice(0, 3);
  return (
    <section className="blog" id="blog" data-ui="light">
      <div className="container">
        <div className="blog__top reveal">
          <div>
            <span className="eyebrow">From the blog</span>
            <h2 className="h2">Notes on studying smarter.</h2>
          </div>
          <Link className="btn btn--ghost" href={links.blog}>
            See all posts
          </Link>
        </div>

        <ul className="blog__grid">
          {latest.map((post, i) => (
            <li key={post.slug} className={`reveal${i ? ` reveal--delay${i > 1 ? "-2" : ""}` : ""}`}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
