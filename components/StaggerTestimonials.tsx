"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/Icons";

export type Testimonial = {
  quote: string;
  by: string;
  role: string;
};

type Card = Testimonial & { id: number };

type Props = { items: Testimonial[] };

/**
 * Staggered card fan. The centre card is ink; the rest fan out to either side,
 * slightly rotated. Clicking a card brings it to the centre; the arrows step
 * one card at a time. Ported from the 21st.dev "stagger testimonials" pattern
 * onto the brand tokens, without Tailwind or lucide.
 */
export default function StaggerTestimonials({ items }: Props) {
  const [cardSize, setCardSize] = useState(365);
  const [cards, setCards] = useState<Card[]>(() => items.map((t, i) => ({ ...t, id: i })));
  const nextId = useRef(items.length);

  const move = (steps: number) => {
    setCards((list) => {
      const next = [...list];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = next.shift();
          if (!item) break;
          next.push({ ...item, id: nextId.current++ });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = next.pop();
          if (!item) break;
          next.unshift({ ...item, id: nextId.current++ });
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setCardSize(mq.matches ? 365 : 290);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const half = cards.length % 2 ? (cards.length + 1) / 2 : cards.length / 2;

  return (
    <div className="stagger">
      {cards.map((card, index) => {
        const position = index - half;
        const isCenter = position === 0;
        const dy = isCenter ? -65 : position % 2 ? 15 : -15;
        const rot = isCenter ? 0 : position % 2 ? 2 : -2;
        return (
          <button
            key={card.id}
            type="button"
            className={`stagger__card${isCenter ? " stagger__card--center" : ""}`}
            onClick={() => move(position)}
            aria-label={isCenter ? undefined : `Show the quote from ${card.by}`}
            aria-current={isCenter ? "true" : undefined}
            style={{
              width: cardSize,
              height: cardSize,
              transform: `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(${dy}px) rotate(${rot}deg)`,
            }}
          >
            <span className="stagger__avatar" aria-hidden="true">
              {card.by.charAt(0)}
            </span>
            <p className="stagger__quote">{card.quote}</p>
            <span className="stagger__by">
              {card.by}, {card.role}
            </span>
          </button>
        );
      })}

      <div className="stagger__controls">
        <button type="button" className="icon-circle icon-circle--nav" onClick={() => move(-1)} aria-label="Previous quote">
          <ArrowLeft />
        </button>
        <button type="button" className="icon-circle icon-circle--nav" onClick={() => move(1)} aria-label="Next quote">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
