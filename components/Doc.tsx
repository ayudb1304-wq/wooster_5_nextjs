import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  meta?: string;
  lede?: string;
  /* Shown above the body when the content is a draft. */
  note?: string;
  children: ReactNode;
};

/** Reading layout for legal pages and articles: head, optional note, narrow body. */
export default function Doc({ eyebrow, title, meta, lede, note, children }: Props) {
  return (
    <section className="page doc" data-ui="light">
      <div className="container">
        <header className="page__head reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display">{title}</h1>
          {lede && <p className="lede">{lede}</p>}
          {meta && <span className="page__meta">{meta}</span>}
        </header>
        {note && <p className="doc__note reveal">{note}</p>}
        <div className="doc__body reveal reveal--delay">{children}</div>
      </div>
    </section>
  );
}
