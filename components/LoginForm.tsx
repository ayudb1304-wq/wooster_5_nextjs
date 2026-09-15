"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { links } from "@/lib/links";

/* Email and password mirror the form at woosterprep.com/login. Demo only:
   any submission opens the demo student's dashboard. Nothing is sent. */
export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Opening the demo account…");
    router.push("/dashboard");
  };

  return (
    <form className="form auth__form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label className="field__label" htmlFor="email">
          Email
        </label>
        <input className="input" id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="password">
          Password
        </label>
        <div className="input-wrap">
          <input
            className="input input--toggle"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
          />
          <button
            className="input__toggle"
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-pressed={showPassword}
            aria-controls="password"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="auth__row">
        <label className="check">
          <input className="check__box" type="checkbox" name="remember" />
          <span>Keep me signed in</span>
        </label>
        <a className="auth__link" href={links.email}>
          Forgot your password?
        </a>
      </div>

      <button className="btn btn--primary btn--lg btn--block" type="submit">
        Sign in
      </button>

      <div className="auth__divider" aria-hidden="true">
        <span>Or continue with</span>
      </div>

      <button
        className="btn btn--ghost btn--lg btn--block"
        type="button"
        onClick={() => router.push("/dashboard")}
      >
        Continue with Google
      </button>

      {status && (
        <span className="form__status" role="status">
          {status}
        </span>
      )}
    </form>
  );
}
