"use client";

import { useEffect, useRef } from "react";
import type { Line } from "@/lib/guarantee";
import { clamp, debounce, prefersReducedMotion, raf } from "@/lib/motion";

export type GalleryPanel = {
  title: string;
  lead: string;
  lines: Line[];
};

type Props = { panels: GalleryPanel[] };

/** Share of each scroll segment spent holding the current panel before it slides. */
const DWELL = 0.3;

/**
 * Pinned horizontal gallery. The wrapper is one viewport tall per panel; the stage
 * sticks under the header and the track slides sideways as the page scrolls, so
 * one panel is in view at a time and scrolling back reverses it. Under 960px and
 * with reduced motion the panels simply stack.
 */
export default function GuaranteeGallery({ panels }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const n = panels.length;

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!wrap || !stage || !track || !bar || n < 2) return;

    const narrow = window.matchMedia("(max-width: 960px)");
    let isStatic = false;

    const setMode = () => {
      isStatic = narrow.matches || prefersReducedMotion();
      wrap.classList.toggle("guarantee__gallery--static", isStatic);
      if (isStatic) {
        track.style.transform = "";
        bar.style.transform = "";
      }
    };

    const update = () => {
      if (isStatic) return;
      const r = wrap.getBoundingClientRect();
      const stageH = stage.offsetHeight;
      // The stage sticks below the header, so the pinned range is shorter by that offset.
      const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
      const distance = r.height - stageH - stickyTop;
      const p = distance > 0 ? clamp(-r.top / distance, 0, 1) : 0;

      // Each of the n - 1 segments holds for DWELL, then eases to the next panel.
      const seg = p * (n - 1);
      const i = Math.min(Math.floor(seg), n - 2);
      const t = clamp((seg - i - DWELL) / (1 - DWELL), 0, 1);
      const eased = t * t * (3 - 2 * t);
      const shift = i + eased;

      track.style.transform = `translate3d(${(-shift * stage.clientWidth).toFixed(1)}px, 0, 0)`;
      bar.style.transform = `scaleX(${((shift + 1) / n).toFixed(4)})`;
    };

    const onScroll = raf(update);
    const onResize = debounce(() => {
      setMode();
      update();
    }, 80);

    setMode();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    narrow.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      narrow.removeEventListener("change", onResize);
    };
  }, [n]);

  return (
    <div ref={wrapRef} className="guarantee__gallery" data-ui="dark" style={{ "--panels": n } as React.CSSProperties}>
      <div ref={stageRef} className="guarantee__stage">
        <div ref={trackRef} className="guarantee__track">
          {panels.map((p) => (
            <article key={p.title} className="guarantee__panel">
              <div className="container guarantee__panel-inner">
                <div className="guarantee__panel-head">
                  <h3 className="guarantee__panel-title">{p.title}</h3>
                </div>
                <div className="guarantee__panel-body">
                  <p className="guarantee__lead">{p.lead}</p>
                  <div className="guarantee__lines">
                    {p.lines.map((line, j) =>
                      typeof line === "string" ? (
                        <p key={j}>{line}</p>
                      ) : (
                        <p key={j} className="pull">
                          {line.pull} <em>{line.em}</em>
                        </p>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="container guarantee__progress" aria-hidden="true">
          <span ref={barRef} className="guarantee__progress-bar" />
        </div>
      </div>
    </div>
  );
}
