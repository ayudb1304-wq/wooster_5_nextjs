"use client";

import { ArrowRight, LayoutGrid, List, Search, SearchX } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type Concept, type Section, statusLabel, studyNext, tierLabel, tierOf } from "@/lib/app/data";

export type LibraryMode = {
  /* Link label on each card, e.g. "Open concept". */
  cta: string;
  /* Route prefix the card links to. */
  hrefBase: string;
  /* Unit word for counts, e.g. "concepts", "decks". */
  unit: string;
  /* Secondary line on the card when it is not the status, e.g. "PDF deck". */
  sub?: string;
};

type SortKey = "priority" | "points" | "name" | "status";
const sortLabels: Record<SortKey, string> = { priority: "Priority", points: "Most points", name: "Name", status: "Status" };
const statusOrder = { "in-progress": 0, "not-started": 1, mastered: 2 } as const;

const tierTone = { critical: "bg-critical-tint text-critical", high: "bg-progress-tint text-progress", steady: "bg-muted text-muted-foreground" } as const;
const statusTone = { mastered: "bg-mastered-tint text-mastered", "in-progress": "bg-progress-tint text-progress", "not-started": "bg-muted text-muted-foreground" } as const;
const barTone = { critical: "[&_[data-slot=progress-indicator]]:bg-critical", high: "[&_[data-slot=progress-indicator]]:bg-progress", steady: "[&_[data-slot=progress-indicator]]:bg-foreground/35" } as const;

export default function ConceptLibrary({ concepts, mode }: { concepts: Concept[]; mode: LibraryMode }) {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<Section | "All">("All");
  const [sort, setSort] = useState<SortKey>("priority");
  const [view, setView] = useState<"grid" | "list">("grid");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = concepts.filter((c) => (section === "All" || c.section === section) && (!q || c.name.toLowerCase().includes(q)));
    const by: Record<SortKey, (a: Concept, b: Concept) => number> = {
      priority: (a, b) => a.rank - b.rank,
      points: (a, b) => b.upside - a.upside,
      name: (a, b) => a.name.localeCompare(b.name),
      status: (a, b) => statusOrder[a.status] - statusOrder[b.status] || a.rank - b.rank,
    };
    return [...list].sort(by[sort]);
  }, [concepts, query, section, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder={`Search ${mode.unit}…`} value={query} onChange={(e) => setQuery(e.target.value)} className="h-9 bg-card pl-8" aria-label={`Search ${mode.unit}`} />
        </div>
        <Tabs value={section} onValueChange={(v) => setSection(v as Section | "All")}>
          <TabsList className="h-9">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="R&W">R&amp;W</TabsTrigger>
            <TabsTrigger value="Math">Math</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={sort} onValueChange={(v) => v && setSort(v as SortKey)} items={sortLabels}>
          <SelectTrigger className="h-9 bg-card" aria-label="Sort">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(sortLabels) as SortKey[]).map((k) => (
              <SelectItem key={k} value={k}>
                {sortLabels[k]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ToggleGroup value={[view]} onValueChange={(v) => v[0] && setView(v[0] as "grid" | "list")} variant="outline" className="bg-card" aria-label="View">
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-baseline justify-between text-sm text-muted-foreground">
        <span>
          Showing {shown.length} of {concepts.length} {mode.unit}
        </span>
        <span className="hidden sm:inline">Ranked by your personal score upside</span>
      </div>

      {shown.length === 0 ? (
        <Empty className="border border-dashed bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX />
            </EmptyMedia>
            <EmptyTitle>No {mode.unit} match</EmptyTitle>
            <EmptyDescription>Try a different name, or clear the section filter.</EmptyDescription>
          </EmptyHeader>
          <Button variant="outline" size="sm" onClick={() => { setQuery(""); setSection("All"); }}>
            Clear filters
          </Button>
        </Empty>
      ) : view === "grid" ? (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((c) => {
            const t = tierOf(c);
            const next = c === studyNext;
            return (
              <li key={c.slug}>
                <Card className={`group h-full gap-0 py-0 shadow-none transition-[transform,border-color] hover:-translate-y-0.5 hover:border-foreground/25 ${next ? "border-navy ring-1 ring-navy" : ""}`}>
                  <CardContent className="flex h-full flex-col gap-4 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{c.section}</Badge>
                        <span className="text-xs text-muted-foreground">#{c.rank}</span>
                      </div>
                      <Badge variant="outline" className={`border-transparent ${tierTone[t]}`}>
                        {tierLabel[t]}
                      </Badge>
                    </div>
                    <h3 className="font-serif text-[22px] leading-tight">{c.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {next && <Badge className="bg-navy text-white hover:bg-navy">Study next</Badge>}
                      {mode.sub ? (
                        <span className="text-muted-foreground">{mode.sub}</span>
                      ) : (
                        <Badge variant="outline" className={`border-transparent ${statusTone[c.status]}`}>
                          {statusLabel[c.status]}
                        </Badge>
                      )}
                      {c.mastery !== null && !mode.sub && <span className="text-muted-foreground">Mastery {c.mastery}/10</span>}
                    </div>
                    <div className="mt-auto flex flex-col gap-3">
                      <Progress value={c.upside} className={`[&_[data-slot=progress-track]]:h-1.5 ${barTone[t]}`} />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">+{c.upside} pts</span>
                        <Button variant="outline" size="sm" nativeButton={false} render={<Link href={`${mode.hrefBase}/${c.slug}`} />}>
                          {mode.cta} <ArrowRight />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      ) : (
        <Card className="gap-0 py-0 shadow-none">
          <ul className="divide-y">
            {shown.map((c) => {
              const t = tierOf(c);
              const next = c === studyNext;
              return (
                <li key={c.slug} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 md:grid-cols-[2.5rem_1fr_6rem_7rem_9rem_auto]">
                  <span className="text-xs text-muted-foreground">#{c.rank}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-serif text-lg leading-tight">{c.name}</span>
                      {next && <Badge className="bg-navy text-white hover:bg-navy">Study next</Badge>}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground md:hidden">
                      {c.section} · {tierLabel[t]} · {mode.sub ?? statusLabel[c.status]}
                    </div>
                  </div>
                  <Badge variant="secondary" className="hidden md:inline-flex">{c.section}</Badge>
                  <Badge variant="outline" className={`hidden border-transparent md:inline-flex ${tierTone[t]}`}>
                    {tierLabel[t]}
                  </Badge>
                  <div className="hidden items-center gap-2 md:flex">
                    <Progress value={c.upside} className={`[&_[data-slot=progress-track]]:h-1.5 ${barTone[t]} w-16`} />
                    <span className="text-xs font-semibold">+{c.upside}</span>
                  </div>
                  <Button variant="ghost" size="sm" nativeButton={false} render={<Link href={`${mode.hrefBase}/${c.slug}`} />}>
                    {mode.cta} <ArrowRight />
                  </Button>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </div>
  );
}
