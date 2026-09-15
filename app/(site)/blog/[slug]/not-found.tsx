import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";
import { links } from "@/lib/links";

export default function PostNotFound() {
  return (
    <section className="page doc" data-ui="light">
      <div className="container">
        <header className="page__head">
          <span className="eyebrow">Blog</span>
          <h1 className="display">Post not found.</h1>
          <p className="lede">This post does not exist or has been removed.</p>
          <Link className="article__back" href={links.blog}>
            <span className="icon-circle">
              <ArrowLeft />
            </span>
            All posts
          </Link>
        </header>
      </div>
    </section>
  );
}
