"use client";

import { useEffect, useRef, useState } from "react";
import { PLAY_FILM_EVENT } from "@/lib/events";
import { film } from "@/lib/links";
import { prefersReducedMotion } from "@/lib/motion";

export default function Film() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

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
    <section ref={sectionRef} className="film" id="film" data-ui="light">
      <div className="container">
        <div className="film__card reveal">
          <div className="film__copy">
            <span className="film__kicker">Moneyball the SATs</span>
            <h2 className="film__title">Five minutes on how Wooster Prep works.</h2>
            <p className="film__text">
              The free diagnostic, the ranked plan, the projected score. Watch a student go from a baseline to a
              plan that moves.
            </p>
          </div>
          <div className="film__media">
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
            <button className="film__mute" type="button" aria-pressed={!muted} onClick={toggleSound}>
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
