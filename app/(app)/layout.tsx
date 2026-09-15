import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppSidebar from "@/components/app/AppSidebar";
import TopBar from "@/components/app/TopBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./theme.css";
import "./app.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** The signed-in app: collapsible sidebar, top bar, content. Demo data throughout. */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="bg-background">
            <TopBar />
            <div className="app-content">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}
