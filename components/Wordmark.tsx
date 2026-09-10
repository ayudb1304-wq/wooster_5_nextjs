"use client";

import { useEffect, useRef } from "react";
import { debounce } from "@/lib/motion";

/** The giant serif wordmark, sized by JS so it always spans the container width. */
export default function Wordmark({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const ps = getComputedStyle(parent);
      const available = parent.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      el.style.fontSize = "100px";
      const natural = el.getBoundingClientRect().width; // width: max-content, so this is the text width
      if (!natural) return;
      const size = Math.floor((available / natural) * 100 * 0.99);
      el.style.fontSize = `${Math.max(56, size)}px`;
    };

    fit();
    const onResize = debounce(fit, 80);
    window.addEventListener("resize", onResize);

    // Re-measure once the serif face is actually in use; fallback metrics differ a lot.
    if (document.fonts) {
      const family = getComputedStyle(el).fontFamily;
      document.fonts.load(`500 100px ${family}`).then(fit, fit);
      document.fonts.ready.then(fit);
      document.fonts.addEventListener("loadingdone", fit);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      document.fonts?.removeEventListener("loadingdone", fit);
    };
  }, []);

  return (
    <div ref={ref} className="hero__wordmark" aria-hidden="true">
      {children}
    </div>
  );
}
