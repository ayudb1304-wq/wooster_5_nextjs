"use client";

import { useEffect, useRef, useState } from "react";
import { PLAY_FILM_EVENT } from "@/lib/events";
import { film } from "@/lib/links";
import { clamp, debounce, prefersReducedMotion, raf } from "@/lib/motion";

export default function Film() {
  const sectionRef = useRef<HTMLElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  /* Flatten the device as the section settles into view. */
  useEffect(() => {
    const section = sectionRef.current;
    const device = deviceRef.current;
    if (!section || !device) return;
    const reduce = prefersReducedMotion();

    const tilt = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 = section top at bottom of viewport, 1 = section pinned at top
      const p = clamp(1 - r.top / vh, 0, 1);
      const deg = reduce ? 0 : 14 * (1 - p);
      const zoom = reduce ? 1 : 0.9 + 0.1 * p;
      device.style.setProperty("--tilt", `${deg.toFixed(2)}deg`);
      device.style.setProperty("--zoom", zoom.toFixed(3));
    };

    const onScroll = raf(tilt);
    const onResize = debounce(tilt, 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    tilt();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Autoplay muted, and pause while off screen so a large file does not keep decoding. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // React does not always serialize `muted` into server HTML, so set it before the first play().
    v.muted = true;
    v.play().catch(() => {});

    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  /* A case card asked us to scroll into view and play with sound. */
  useEffect(() => {
    const onRequest = () => {
      sectionRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      const v = videoRef.current;
      if (v) {
        v.muted = false;
        v.play().catch(() => {});
      }
      setMuted(false);
    };
    window.addEventListener(PLAY_FILM_EVENT, onRequest);
    return () => window.removeEventListener(PLAY_FILM_EVENT, onRequest);
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next && v.paused) v.play().catch(() => {});
  };

  return (
    <section ref={sectionRef} className="film slide" data-ui="dark">
      <div className="film__stage">
        <div ref={deviceRef} className="device">
          <div className="device__screen">
            <video
              ref={videoRef}
              src={film.src}
              poster={film.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <div className="device__base"></div>
        </div>
      </div>
      <div className="container film__panel">
        <div className="film__label">
          <span className="film__kicker">Moneyball the SATs</span>
          <span className="film__title">Learn about Wooster Prep</span>
        </div>
        <button className="btn btn--glass" type="button" aria-pressed={!muted} onClick={toggleSound}>
          <span className="btn__on">Sound on</span>
          <span className="btn__off">Sound off</span>
        </button>
      </div>
    </section>
  );
}
