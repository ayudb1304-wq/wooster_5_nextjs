import Image from "next/image";
import { links } from "@/lib/links";
import logo from "@/public/assets/wooster-logo.jpg";

export default function Cta() {
  return (
    <section className="cta" data-ui="light">
      <div className="container cta__inner reveal">
        <Image className="cta__logo" src={logo} alt="Wooster Prep" width={220} height={62} />
        <h2 className="display">Begin with the free diagnostic.</h2>
        <p className="lede">Take the free diagnostic to see exactly what to study next, and how to study it.</p>
        <div className="cta__actions">
          <a className="btn btn--primary btn--lg" href={links.diagnostic}>
            Start Your Diagnostic
          </a>
          <a className="btn btn--ghost btn--lg" href={links.login}>
            Existing Student Login
          </a>
        </div>
      </div>
    </section>
  );
}
