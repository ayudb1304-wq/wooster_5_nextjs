"use client";

import { BarChart3, BookOpen, ChevronsUpDown, FileText, Layers, LayoutDashboard, ListChecks, LogOut, Timer, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { student } from "@/lib/app/data";
import logo from "@/public/assets/wooster-logo.jpg";

const groups = [
  {
    label: "Study",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Concepts", href: "/concepts", icon: BookOpen },
      { label: "Mastery sets", href: "/practice-exams/mastery", icon: ListChecks },
    ],
  },
  {
    label: "Practice",
    items: [
      { label: "Flash cards", href: "/flashcards", icon: Layers },
      { label: "Review decks", href: "/practice", icon: FileText },
      { label: "Full-length exams", href: "/exams", icon: Timer },
    ],
  },
  {
    label: "You",
    items: [
      { label: "Stats", href: "/stats", icon: BarChart3 },
      { label: "Profile", href: "/profile", icon: User },
    ],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const initials = `${student.firstName[0]}${student.lastName[0]}`;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 pt-4 pb-2">
        <Link href="/dashboard" aria-label="Dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Image src={logo} alt="Wooster Prep" width={120} height={34} priority className="h-auto w-[120px] mix-blend-multiply group-data-[collapsible=icon]:hidden dark:mix-blend-screen dark:[filter:invert(1)_grayscale(1)_brightness(2)]" />
          <span className="hidden size-7 items-center justify-center rounded-md bg-navy font-serif text-sm text-white dark:text-ink group-data-[collapsible=icon]:flex">W</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton isActive={active} tooltip={item.label} render={<Link href={item.href} />}>
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton size="lg" className="data-[popup-open]:bg-sidebar-accent data-[popup-open]:text-sidebar-accent-foreground" />
                }
              >
                <Avatar className="size-8 rounded-md">
                  <AvatarFallback className="rounded-md bg-navy text-white dark:text-ink text-xs">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {student.firstName} {student.lastName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">Demo account</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="min-w-56 rounded-lg">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">{student.email}</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/profile" />}>
                  <User /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/stats" />}>
                  <BarChart3 /> Stats
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/login" />}>
                  <LogOut /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
