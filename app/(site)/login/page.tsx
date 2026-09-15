import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import { links } from "@/lib/links";
import loginPhoto from "@/public/assets/login.jpg";
import logo from "@/public/assets/wooster-logo.jpg";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to continue prep.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

/* Placeholder quote until a real one exists. */
const quote = {
  text: "The plan told me what to do next every single day. I never had to guess.",
  by: "Student, class of 2026",
};

export default function LoginPage() {
  return (
    <section className="page auth" data-ui="light">
      <div className="auth__col">
        <div className="auth__card">
          <div className="auth__head reveal">
            <Image className="auth__logo" src={logo} alt="Wooster Prep" width={180} height={51} priority />
            <span className="eyebrow">Existing student login</span>
            <h1 className="h2">Welcome back.</h1>
            <p className="lede">Sign in to continue prep.</p>
          </div>
          <div className="reveal reveal--delay">
            <LoginForm />
          </div>
          <p className="auth__links reveal reveal--delay-2">
            New to Wooster Prep? <a href={links.register}>Create an account</a>
          </p>
        </div>
      </div>

      <div className="auth__media reveal reveal--delay">
        <Image
          src={loginPhoto}
          alt="Students working at long tables in a library"
          fill
          sizes="(max-width: 960px) 0px, 50vw"
          placeholder="blur"
          priority
        />
        <figure className="auth__quote reveal reveal--delay-2">
          <blockquote>{quote.text}</blockquote>
          <figcaption>{quote.by}</figcaption>
        </figure>
      </div>
    </section>
  );
}
