import PostCard from "@/components/PostCard";
import { links } from "@/lib/links";
import { posts } from "@/lib/posts";

export default function Blog() {
  return (
    <section className="blog" id="blog" data-ui="light">
      <div className="container">
        <div className="blog__top reveal">
          <div>
            <span className="eyebrow">From the blog</span>
            <h2 className="h2">Notes on studying smarter.</h2>
          </div>
          <a className="btn btn--ghost" href={links.blog}>
            See all posts
          </a>
        </div>

        <ul className="blog__grid">
          {posts.slice(0, 3).map((post, i) => (
            <li key={post.slug} className={`reveal${i ? ` reveal--delay${i > 1 ? "-2" : ""}` : ""}`}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
