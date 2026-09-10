"use client";

import { useEffect, useRef } from "react";
import { requestFilmPlayback } from "@/lib/events";
import { film } from "@/lib/links";

/** Case card that previews the film on hover and jumps to the film section on click. */
export default function CaseVideo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  return (
    <a
      className={`case case--video ${className}`.trim()}
      href="#top"
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
      onClick={(ev) => {
        ev.preventDefault();
        requestFilmPlayback();
      }}
    >
      <div className="case__media">
        <video ref={videoRef} src={film.src} poster={film.poster} muted loop playsInline preload="none" />
        <span className="case__plus" aria-hidden="true">
          +
        </span>
      </div>
      <div className="case__caption">
        <span className="case__title">Watch the 5-minute guide</span>
        <span className="case__sub">Moneyball the SATs</span>
      </div>
    </a>
  );
}
