"use client";

import Image from "next/image";
import Link from "next/link";
import HashLink from "@/components/HashLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { links } from "@/lib/links";
import { raf } from "@/lib/motion";
import logo from "@/public/assets/wooster-logo.jpg";

type Theme = "light" | "dark" | "gray";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
  }, [pathname]);

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
          <HashLink className="header__brand" href="/#top" aria-label="Wooster Prep home">
            <Image src={logo} alt="Wooster Prep" width={120} height={34} priority />
          </HashLink>

          <nav className="header__nav" aria-label="Primary">
            <Link href={links.about}>About</Link>
            <Link href={links.method}>Method</Link>
            <Link href={links.blog}>Blog</Link>
            <HashLink href="/#testimonials">Testimonials</HashLink>
            <HashLink href="/#pricing">Pricing</HashLink>
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
          <Link href={links.about} onClick={closeMenu}>About</Link>
          <Link href={links.method} onClick={closeMenu}>Method</Link>
          <Link href={links.blog} onClick={closeMenu}>Blog</Link>
          <HashLink href="/#testimonials" onClick={closeMenu}>Testimonials</HashLink>
          <HashLink href="/#pricing" onClick={closeMenu}>Pricing</HashLink>
          <a href={links.login} onClick={closeMenu}>Existing Student Login</a>
          <a className="btn btn--primary" href={links.diagnostic} onClick={closeMenu}>
            Start Your Diagnostic
          </a>
        </div>
      </div>
    </>
  );
}
