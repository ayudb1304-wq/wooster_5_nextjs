"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "cn";

/**
 * A segmented control on top of Base UI Tabs: rounded track, a white pill that
 * slides to the active tab (Base UI's Indicator exposes the active tab's
 * position as CSS variables), labels with optional icons.
 */
export function SegmentedTabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="segmented" className={cn("flex flex-col gap-3", className)} {...props} />;
}

export function SegmentedList({ className, children, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="segmented-list"
      className={cn("relative inline-flex h-10 w-full items-center rounded-full bg-muted p-1 text-sm", className)}
      {...props}
    >
      <TabsPrimitive.Indicator
        data-slot="segmented-indicator"
        className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-full bg-card shadow-[0_1px_2px_rgba(23,27,34,0.12),0_0_0_1px_rgba(23,27,34,0.06)] transition-[translate,width] duration-300 ease-[cubic-bezier(0.25,0.74,0.22,0.99)]"
      />
      {children}
    </TabsPrimitive.List>
  );
}

export function SegmentedTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="segmented-tab"
      className={cn(
        "relative z-10 inline-flex h-full flex-1 items-center justify-center gap-2 rounded-full px-3 font-medium text-muted-foreground transition-colors duration-200 outline-none select-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 data-active:text-foreground [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export function SegmentedPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="segmented-panel" className={cn("outline-none", className)} {...props} />;
}
