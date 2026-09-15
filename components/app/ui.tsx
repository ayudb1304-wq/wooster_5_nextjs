import type { ReactNode } from "react";
import { type Concept, type Status, type Tier, statusLabel, tierLabel, tierOf } from "@/lib/app/data";

export function PageHead({ eyebrow, title, lede, aside }: { eyebrow: string; title: ReactNode; lede?: string; aside?: ReactNode }) {
  return (
    <header className="app__head">
      <div className="app__head-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="app__title">{title}</h1>
        {lede && <p className="app__lede">{lede}</p>}
      </div>
      {aside && <div className="app__head-aside">{aside}</div>}
    </header>
  );
}

export function Card({ children, className = "", dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return <div className={`card${dark ? " card--dark" : ""} ${className}`.trim()}>{children}</div>;
}

export function Tile({ value, label, sub, tone }: { value: ReactNode; label: string; sub?: string; tone?: Tier | Status }) {
  return (
    <div className={`tile${tone ? ` tile--${tone}` : ""}`}>
      <span className="tile__value">{value}</span>
      <span className="tile__label">{label}</span>
      {sub && <span className="tile__sub">{sub}</span>}
    </div>
  );
}

export function TierChip({ concept }: { concept: Concept }) {
  const tier = tierOf(concept);
  return <span className={`chip chip--${tier}`}>{tierLabel[tier]}</span>;
}

export function StatusChip({ status }: { status: Status }) {
  return <span className={`chip chip--${status}`}>{statusLabel[status]}</span>;
}

export function SectionChip({ section }: { section: Concept["section"] }) {
  return <span className="chip chip--section">{section}</span>;
}

export function Bar({ value, tone }: { value: number; tone?: Tier | Status }) {
  return (
    <span className={`bar${tone ? ` bar--${tone}` : ""}`} role="presentation">
      <span className="bar__fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </span>
  );
}
