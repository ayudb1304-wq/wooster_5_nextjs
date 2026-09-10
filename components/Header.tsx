"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "@/components/Icons";
import { links } from "@/lib/links";
import { raf } from "@/lib/motion";
import logo from "@/public/assets/wooster-logo.jpg";

type Theme = "light" | "dark" | "gray";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);

  /* Swap the header theme to match the section under it. */
  useEffect(() => {
    const headerH = headerRef.current?.offsetHeight ?? 60;
    const themed = Array.from(document.querySelectorAll<HTMLElement>("[data-ui]")).filter(
      (n) => !n.classList.contains("header"),
    );

    const update = () => {
      const y = headerH + 1;
      let pick: Theme = "light";
      for (const el of themed) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) pick = (el.dataset.ui as Theme) ?? "light";
      }
      setTheme(pick);
    };

    const onScroll = raf(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock page scroll while the mobile menu is open. */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const headerClass = ["header", theme === "dark" && "header--dark", theme === "gray" && "header--gray"]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header ref={headerRef} className={headerClass} data-ui="light">
        <div className="container header__inner">
          <a className="header__brand" href="#top" aria-label="Wooster Prep home">
            <Image src={logo} alt="Wooster Prep" width={120} height={34} priority />
          </a>

          <a className="header__anchor" href="#how-it-works">
            <span>How it works</span>
            <span className="icon-circle" aria-hidden="true">
              <ArrowDown />
            </span>
          </a>

          <nav className="header__nav" aria-label="Primary">
            <a href="#how-it-works">Method</a>
            <a href="#included">Included</a>
            <a href="#pricing">Pricing</a>
            <a href={links.login}>Login</a>
            <a className="btn btn--primary btn--sm" href={links.diagnostic}>
              Start Your Diagnostic
            </a>
          </nav>

          <button
            className="header__burger"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className="menu" hidden={!menuOpen}>
        <div className="container menu__inner">
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#included" onClick={closeMenu}>What is included</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <a href={links.login} onClick={closeMenu}>Existing Student Login</a>
          <a className="btn btn--primary" href={links.diagnostic} onClick={closeMenu}>
            Start Your Diagnostic
          </a>
        </div>
      </div>
    </>
  );
}
