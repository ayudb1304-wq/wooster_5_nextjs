import Image from "next/image";
import { links, socials } from "@/lib/links";
import logo from "@/public/assets/wooster-logo.jpg";

type Column = { heading: string; items: { label: string; href: string }[] };

/* Every link appears once. Anchors point at section ids on the landing page;
   the rest go to woosterprep.com. */
const columns: Column[] = [
  {
    heading: "Product",
    items: [
      { label: "Free diagnostic", href: links.diagnostic },
      { label: "What is included", href: "#included" },
      { label: "Pricing", href: "#pricing" },
      { label: "Score guarantee", href: "#guarantee" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Blog", href: links.blog },
      { label: "How it works", href: "#how-it-works" },
      { label: "For parents", href: "#parents" },
      { label: "Student login", href: links.login },
    ],
  },
  {
    heading: "Explore",
    items: [
      { label: "The film", href: "#film" },
      { label: "The Wooster Prep way", href: "#method" },
      { label: "Why it works", href: "#why" },
      { label: "Testimonials", href: "#testimonials" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About us", href: "#about" },
      { label: "Contact", href: links.email },
      { label: "Careers", href: links.careers },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy policy", href: links.privacy },
      { label: "Terms", href: links.terms },
      { label: "Educational disclaimer", href: links.disclaimer },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer" data-ui="light">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a className="footer__logo" href="#top" aria-label="Wooster Prep home">
            <Image src={logo} alt="Wooster Prep" width={220} height={62} />
          </a>
          <p className="footer__tagline">Personalized SAT prep that tells you exactly what to study next.</p>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} className="footer__col" aria-label={col.heading}>
            <span className="footer__heading">{col.heading}</span>
            {col.items.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="container footer__bottom">
        <span>&copy; {new Date().getFullYear()} Wooster Prep</span>
        <nav className="footer__social" aria-label="Social">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
