"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * A link to a landing-page section. On the landing page it scrolls to the
 * section itself, so clicking the same item twice works: Next's router treats a
 * navigation to the current URL, hash included, as a no-op and never scrolls.
 * On any other page it is a normal link to "/#section".
 */
export default function HashLink({ href, onClick, ...rest }: Props) {
  const pathname = usePathname();
  const hash = href.split("#")[1];
  const path = href.split("#")[0] || "/";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !hash || pathname !== path) return;
    const target = hash === "top" ? document.documentElement : document.getElementById(hash);
    if (!target) return;
    e.preventDefault();
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    if (target === document.documentElement) window.scrollTo({ top: 0, behavior });
    else target.scrollIntoView({ behavior, block: "start" });
    history.replaceState(null, "", `#${hash}`);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
