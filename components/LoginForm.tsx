"use client";

import { useState, type FormEvent } from "react";
import { links } from "@/lib/links";

/* Email and password mirror the form at woosterprep.com/login. UI shell only:
   wire onSubmit and the Google button to the auth backend; nothing is sent today. */
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sign in is not connected yet.");
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
        onClick={() => setStatus("Google sign in is not connected yet.")}
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
