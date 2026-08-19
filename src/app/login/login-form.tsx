"use client";

import { useActionState, useState } from "react";
import { signIn, signUp, type AuthState } from "./actions";

const initialState: AuthState = {};

export function LoginForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [signInState, signInAction, pendingSignIn] = useActionState(signIn, initialState);
  const [signUpState, signUpAction, pendingSignUp] = useActionState(signUp, initialState);
  const state = mode === "signin" ? signInState : signUpState;
  const pending = mode === "signin" ? pendingSignIn : pendingSignUp;
  return <div className="login-form">
    <div className="auth-mode" aria-label="Authentication mode"><button className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")} type="button">01 / SIGN IN</button><button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} type="button">02 / CREATE ACCOUNT</button></div>
    {mode === "signin" ? <form action={signInAction}><label>EMAIL<input required name="email" type="email" autoComplete="email" placeholder="YOU@DOMAIN.COM" /></label><label>PASSWORD<input required name="password" type="password" minLength={6} autoComplete="current-password" placeholder="••••••••" /></label><button className="auth-button" disabled={pending}>{pending ? "VERIFYING ACCESS" : "ENTER SYSTEM"}<b>→</b></button><p className="auth-hint">NO ACCOUNT? USE CREATE ACCOUNT ABOVE.</p></form> : <form action={signUpAction}><label>EMAIL<input required name="email" type="email" autoComplete="email" placeholder="YOU@DOMAIN.COM" /></label><label>PASSWORD<input required name="password" type="password" minLength={6} autoComplete="new-password" placeholder="MINIMUM 6 CHARACTERS" /></label><label>CONFIRM PASSWORD<input required name="passwordConfirmation" type="password" minLength={6} autoComplete="new-password" placeholder="REPEAT PASSWORD" /></label><button className="auth-button" disabled={pending}>{pending ? "SAVING ACCOUNT" : "CREATE ACCOUNT"}<b>→</b></button><p className="auth-hint">ACCOUNT ACCESS REQUIRES EMAIL CONFIRMATION.</p></form>}
    {state.error && <p className="auth-message error" role="alert">AUTH / FAILED — {state.error}</p>}
    {state.message && <p className="auth-message" role="status">{state.message}</p>}
  </div>;
}
