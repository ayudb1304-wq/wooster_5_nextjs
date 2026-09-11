import Image from "next/image";
import { links } from "@/lib/links";
import type { Post } from "@/lib/posts";

/** Blog post card built on the case card. Links to the blog until posts exist. */
export default function PostCard({ post }: { post: Post }) {
  return (
    <a className="case post" href={links.blog}>
      <div className="case__media case__media--shot">
        <Image src={post.image} alt={post.alt} sizes="(max-width: 960px) 100vw, 380px" placeholder="blur" />
        <div className="post__tags">
          <span className="pill">{post.tag}</span>
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
  );
}
