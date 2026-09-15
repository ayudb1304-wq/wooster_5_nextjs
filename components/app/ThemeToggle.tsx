"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Switch from "@/components/ui/sky-toggle";

/** The sky toggle bound to next-themes. Renders unchecked until mounted so server and client match. */
export default function ThemeToggle({ size = 12 }: { size?: number }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const dark = mounted && resolvedTheme === "dark";
  return <Switch size={size} checked={dark} onCheckedChange={(night) => setTheme(night ? "dark" : "light")} label={dark ? "Switch to light mode" : "Switch to dark mode"} />;
}
