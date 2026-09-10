"use client";

import { useRef, type SyntheticEvent } from "react";
import { ArrowDown } from "@/components/Icons";

export type AccordionItem = { title: string; body: string };

/** `<details>` list where opening one item closes the others. */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onToggle = (ev: SyntheticEvent<HTMLDetailsElement>) => {
    const d = ev.currentTarget;
    if (!d.open || !ref.current) return;
    ref.current.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((o) => {
      if (o !== d) o.open = false;
    });
  };

  return (
    <div ref={ref} className="accordion">
      {items.map((item, i) => (
        <details key={item.title} className="accordion__item" open={i === 0} onToggle={onToggle}>
          <summary className="accordion__heading">
            <h3>{item.title}</h3>
            <span className="icon-circle icon-circle--light" aria-hidden="true">
              <ArrowDown />
            </span>
          </summary>
          <div className="accordion__body">
            <p>{item.body}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
