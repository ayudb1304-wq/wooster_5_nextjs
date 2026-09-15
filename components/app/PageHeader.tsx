import type { ReactNode } from "react";

/** App page header: eyebrow, serif title, one-line lede, optional badges on the right. */
export default function PageHeader({ eyebrow, title, lede, aside }: { eyebrow: string; title: ReactNode; lede?: string; aside?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">{eyebrow}</span>
        <h1 className="font-serif text-4xl leading-none tracking-tight md:text-[44px]">{title}</h1>
        {lede && <p className="mt-1 max-w-2xl text-[15px] text-muted-foreground">{lede}</p>}
      </div>
      {aside && <div className="flex flex-wrap items-center gap-2">{aside}</div>}
    </header>
  );
}
