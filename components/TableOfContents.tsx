"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";

/** "On this page" list for a post. Tracks the heading in view. Hidden under 960px by CSS. */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-80px 0px -75% 0px", threshold: 0 },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav className="toc" aria-label="On this page">
      <span className="toc__label">On this page</span>
      <ul className="toc__list">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              className={`toc__link${h.level === 3 ? " toc__link--sub" : ""}${activeId === h.id ? " toc__link--active" : ""}`}
              href={`#${h.id}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
