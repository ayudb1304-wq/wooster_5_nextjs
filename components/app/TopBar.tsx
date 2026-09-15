"use client";

import { Flame, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { concepts, student, studyNext } from "@/lib/app/data";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/concepts": "Concepts",
  "/flashcards": "Flash cards",
  "/practice": "Review decks",
  "/practice-exams/mastery": "Mastery sets",
  "/exams": "Full-length exams",
  "/stats": "Stats",
  "/profile": "Profile",
};

const pages = Object.entries(titles).map(([href, label]) => ({ href, label }));

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = titles[pathname] ?? "Wooster Prep";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur md:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 !h-4" />
      <Breadcrumb className="hidden sm:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dashboard" />}>Wooster Prep</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{current}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-muted-foreground gap-2 pr-1.5" onClick={() => setOpen(true)}>
          <Search />
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground md:inline">⌘K</kbd>
        </Button>
        <Badge variant="outline" className="h-7 gap-1.5 bg-card px-2.5 text-[13px] font-medium">
          <Flame className="size-3.5 text-progress" />
          {student.streakDays}-day streak
        </Badge>
        <Button size="sm" className="rounded-full px-3.5" nativeButton={false} render={<Link href={`/concepts/${studyNext.slug}`} />}>
          Start session
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen} title="Search" description="Jump to a page or a concept">
        <Command>
          <CommandInput placeholder="Search concepts and pages…" />
          <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((p) => (
              <CommandItem key={p.href} value={p.label} onSelect={() => go(p.href)}>
                {p.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Concepts">
            {concepts.map((c) => (
              <CommandItem key={c.slug} value={`${c.name} ${c.section}`} onSelect={() => go(`/concepts/${c.slug}`)}>
                <span className="text-muted-foreground w-10 text-xs">#{c.rank}</span>
                {c.name}
                <span className="ml-auto text-xs text-muted-foreground">+{c.upside} pts</span>
              </CommandItem>
            ))}
          </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </header>
  );
}
