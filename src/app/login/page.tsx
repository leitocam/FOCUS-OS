import { LoginForm } from "./login-form";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ auth_error?: string }> }) {
  const params = await searchParams;
  const confirmationError = params.auth_error === "confirmation";
  return <main className="auth-page"><div className="auth-noise" /><section className="auth-frame"><header><span className="wordmark">FOCUS<span>{"//"}</span>OS</span><span>ACCESS / IDENTITY</span></header><div className="auth-content"><p className="system-label is-active"><span>● </span>IDENTITY / REQUIRED</p><h1>Enter the<br />system.</h1><p>Study, internship and focus — one operational view.</p>{confirmationError && <p className="auth-message error" role="alert">EMAIL CONFIRMATION / LINK EXPIRED OR INVALID</p>}<LoginForm /></div><footer>PERSONAL OPERATING SYSTEM <span>AMERICA / LA PAZ</span></footer></section></main>;
}
