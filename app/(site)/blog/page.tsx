import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, graph } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { formatDate, getAllPosts, getReadingTime } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Short posts on the method, the test, and what actually moves a score.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <section className="page bloglist" data-ui="light">
      <JsonLd data={graph(breadcrumbs([{ name: "Blog", path: "/blog" }]))} />
      <div className="container">
        <header className="page__head reveal">
          <h1 className="display">Notes on studying smarter.</h1>
          <p className="lede">Short posts on the method, the test, and what actually moves a score.</p>
        </header>

        <div className="bloglist__items">
          {posts.map((post, i) => (
            <article key={post.slug} className={`reveal${i % 3 ? ` reveal--delay${i % 3 > 1 ? "-2" : ""}` : ""}`}>
              <Link className="postrow" href={`/blog/${post.slug}`}>
                <div className="postrow__meta">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{getReadingTime(post.content)} min read</span>
                  <span aria-hidden="true">·</span>
                  <span className="pill">{post.tags[0]}</span>
                </div>
                <h2 className="postrow__title">{post.title}</h2>
                <p className="postrow__desc">{post.description}</p>
                <span className="postrow__more">
                  Read article
                  <span className="icon-circle">
                    <ArrowRight />
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
