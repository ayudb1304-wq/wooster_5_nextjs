"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

/* The brand palette as a mesh: whites and the soft ground with two pale navy tints.
   Kept light so the navy headline and ink copy stay readable without a dark overlay. */
const colors = ["#ffffff", "#e4e9f3", "#bcc9e3", "#7f95c3", "#f0f3f8", "#a3b3d6"];

/** Slow-moving mesh gradient behind the marketing hero. Pauses under reduced motion. */
export function HeroShader() {
  const [speed, setSpeed] = useState(0.18);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setSpeed(mq.matches ? 0 : 0.18);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return (
    <div className="hero__bg" aria-hidden="true">
      {/* A smooth gradient does not need device pixels; capping the canvas keeps the hero cheap to paint. */}
      <MeshGradient className="hero__shader" colors={colors} distortion={0.8} swirl={0.12} grainMixer={0} grainOverlay={0.04} speed={speed} maxPixelCount={1_200_000} />
      <div className="hero__wash" />
    </div>
  );
}
