"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Adds `.is-in` to every `.reveal` element as it scrolls into view. Renders nothing. */
export default function RevealObserver() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      reveals.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    reveals.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return null;
}
