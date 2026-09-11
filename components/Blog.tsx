import Image, { type StaticImageData } from "next/image";
import { links } from "@/lib/links";
import conceptLibrary from "@/public/assets/concept-library.png";
import statsDashboard from "@/public/assets/stats-dashboard.png";
import todaysPlan from "@/public/assets/todays-plan.png";

type Post = {
  title: string;
  excerpt: string;
  image: StaticImageData;
  alt: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
};

/* Placeholder posts. Titles, dates, and read times are invented; the images are
   product screenshots standing in for post art. Replace with real posts and
   point each card at its article. */
const posts: Post[] = [
  {
    title: "Why 10 concepts beat 100",
    excerpt: "Most of the SAT hides behind a short list. How the diagnostic finds yours, and why the rest can wait.",
    image: conceptLibrary,
    alt: "The concept library ranked by score upside",
    tags: ["Method"],
    author: "Wooster Prep",
    date: "Sep 2, 2026",
    readTime: "4 min read",
  },
  {
    title: "What a projected score actually measures",
    excerpt: "It is not a guess. It is what your mastery adds up to today, and it moves when the work does.",
    image: statsDashboard,
    alt: "The stats dashboard with a projected score",
    tags: ["For parents"],
    author: "Wooster Prep",
    date: "Aug 26, 2026",
    readTime: "5 min read",
  },
  {
    title: "The night before: what not to do",
    excerpt: "No new concepts, no full practice test, no 11 p.m. cramming. What a good last day looks like instead.",
    image: todaysPlan,
    alt: "A day's plan with three short tasks",
    tags: ["Strategy"],
    author: "Wooster Prep",
    date: "Aug 19, 2026",
    readTime: "3 min read",
  },
];

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
          {posts.map((post, i) => (
            <li key={post.title} className={`reveal${i ? ` reveal--delay${i > 1 ? "-2" : ""}` : ""}`}>
              <a className="case post" href={links.blog}>
                <div className="case__media case__media--shot">
                  <Image src={post.image} alt={post.alt} sizes="(max-width: 960px) 100vw, 380px" placeholder="blur" />
                  <div className="post__tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="case__plus" aria-hidden="true">
                    +
                  </span>
                </div>
                <div className="post__body">
                  <h3 className="post__title">{post.title}</h3>
                  <p className="post__excerpt">{post.excerpt}</p>
                </div>
                <div className="post__meta">
                  <span className="post__avatar" aria-hidden="true">
                    {post.author.charAt(0)}
                  </span>
                  <span className="post__byline">
                    <span className="post__author">{post.author}</span>
                    <span className="post__date">{post.date}</span>
                  </span>
                  <span className="post__read">{post.readTime}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
