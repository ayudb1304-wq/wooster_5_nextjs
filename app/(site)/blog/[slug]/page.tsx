import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import TableOfContents from "@/components/TableOfContents";
import {
  addHeadingIds,
  extractHeadings,
  formatDate,
  getAllSlugs,
  getNeighbours,
  getPostBySlug,
  getReadingTime,
  getRelatedPosts,
} from "@/lib/blog";
import { links } from "@/lib/links";
import JsonLd from "@/components/JsonLd";
import { blogPosting, breadcrumbs, graph } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const html = addHeadingIds(post.content);
  const related = getRelatedPosts(post);
  const { prev, next } = getNeighbours(post);

  return (
    <section className="page article" data-ui="light">
      <JsonLd
        data={graph(
          blogPosting(post),
          breadcrumbs([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        )}
      />
      <div className="container">
        <Link className="article__back reveal" href={links.blog}>
          <span className="icon-circle">
            <ArrowLeft />
          </span>
          All posts
        </Link>

        <div className="article__grid">
          <article className="article__main">
            <header className="article__head reveal">
              <div className="article__tags">
                {post.tags.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="article__title">{post.title}</h1>
              <p className="lede">{post.description}</p>
              <div className="article__meta">
                <span>By {post.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                    </span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>{getReadingTime(post.content)} min read</span>
              </div>
            </header>

            {/* Trusted, local HTML from lib/posts.ts. */}
            <div className="prose reveal reveal--delay" dangerouslySetInnerHTML={{ __html: html }} />

            <nav className="article__nav reveal" aria-label="Previous and next">
              {prev ? (
                <Link className="article__nav-link" href={`/blog/${prev.slug}`}>
                  <span className="article__nav-label">Previous</span>
                  <span className="article__nav-title">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link className="article__nav-link article__nav-link--next" href={`/blog/${next.slug}`}>
                  <span className="article__nav-label">Next</span>
                  <span className="article__nav-title">{next.title}</span>
                </Link>
              )}
            </nav>

            {related.length > 0 && (
              <section className="related reveal" aria-label="Keep reading">
                <h2 className="h2">Keep reading</h2>
                <div className="related__grid">
                  {related.map((p) => (
                    <Link key={p.slug} className="related__card" href={`/blog/${p.slug}`}>
                      <h3 className="related__title">{p.title}</h3>
                      <p className="related__desc">{p.description}</p>
                      <div className="related__tags">
                        {p.tags.slice(0, 2).map((t) => (
                          <span key={t} className="pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="article__cta reveal">
              <h2 className="h2">Begin with the free diagnostic.</h2>
              <p className="lede">Find out exactly what to study next. Free. No card.</p>
              <Link className="btn btn--primary btn--lg" href={links.diagnostic}>
                Start Your Diagnostic
                <span className="btn__arrow">
                  <ArrowRight />
                </span>
              </Link>
            </section>
          </article>

          <aside className="article__aside">
            <div className="article__sticky">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
