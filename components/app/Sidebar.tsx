"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { student } from "@/lib/app/data";
import logo from "@/public/assets/wooster-logo.jpg";

const nav = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Concepts", href: "/concepts" },
  { label: "Flash cards", href: "/flashcards" },
  { label: "Review decks", href: "/practice" },
  { label: "Mastery sets", href: "/practice-exams/mastery" },
  { label: "Full-length exams", href: "/exams" },
  { label: "Stats", href: "/stats" },
  { label: "Profile", href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="app__side">
      <Link className="app__logo" href="/dashboard" aria-label="Dashboard">
        <Image src={logo} alt="Wooster Prep" width={140} height={40} priority />
      </Link>
      <nav className="app__nav" aria-label="App">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} className={active ? "is-active" : undefined} aria-current={active ? "page" : undefined}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="app__user">
        <span className="app__user-name">
          {student.firstName} {student.lastName}
        </span>
        <span className="app__user-note">Demo account</span>
        <Link className="app__logout" href="/login">
          Log out
        </Link>
      </div>
    </aside>
  );
}
