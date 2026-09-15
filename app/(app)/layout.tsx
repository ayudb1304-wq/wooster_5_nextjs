import type { Metadata } from "next";
import type { ReactNode } from "react";
import Sidebar from "@/components/app/Sidebar";
import "./app.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** The signed-in app: sidebar plus content. Demo data throughout. */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <Sidebar />
      <main className="app__main">{children}</main>
    </div>
  );
}
