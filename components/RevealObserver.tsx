"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Adds `.is-in` to every `.reveal` element as it scrolls into view. Also watches
 * for elements added after mount (a hot reload in dev, any client-side render)
 * so nothing is left stuck at opacity 0. Renders nothing.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = !("IntersectionObserver" in window) || prefersReducedMotion();

    const io = reduce
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("is-in");
                io?.unobserve(e.target);
              }
            });
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
        );

    const observe = (n: Element) => {
      if (n.classList.contains("is-in")) return;
      if (io) io.observe(n);
      else n.classList.add("is-in");
    };
    const observeWithin = (root: Element | Document) => root.querySelectorAll(".reveal").forEach(observe);

    observeWithin(document);

    const mo = new MutationObserver((records) => {
      records.forEach((r) => {
        r.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.classList.contains("reveal")) observe(node);
          observeWithin(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io?.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
