"use client";

import { ThemeProvider as NextThemes } from "next-themes";
import type { ReactNode } from "react";

/** Light first. Mounted in the root layout so its pre-paint script renders once on the server;
    the marketing pages have no dark styles, so the class is inert there. */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="light" enableSystem={false} storageKey="wooster-theme" disableTransitionOnChange={false}>
      {children}
    </NextThemes>
  );
}
