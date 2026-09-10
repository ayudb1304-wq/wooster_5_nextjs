import Image from "next/image";
import { links } from "@/lib/links";
import logo from "@/public/assets/wooster-logo.jpg";

export default function Footer() {
  return (
    <footer className="footer" data-ui="light">
      <div className="container footer__grid">
        <a className="footer__brand" href="#top" aria-label="Wooster Prep home">
          <Image src={logo} alt="Wooster Prep" width={140} height={40} />
        </a>
        <nav className="footer__links" aria-label="Footer">
          <a href={links.privacy}>Privacy Policy</a>
          <a href={links.terms}>Terms</a>
          <a href={links.disclaimer}>Educational Disclaimer</a>
          <a href={links.email}>hal@woosterprep.com</a>
        </nav>
        <a className="btn btn--primary footer__cta" href={links.diagnostic}>
          Get In Touch
        </a>
      </div>
      <div className="container footer__bottom">
        <span>&copy; {new Date().getFullYear()} Wooster Prep</span>
        <a href={links.privacy}>Privacy Policy</a>
      </div>
    </footer>
  );
}
