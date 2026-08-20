import Link from "next/link";
import { CommandPalette } from "./command-palette";
import { signOut } from "@/app/login/actions";
import { ProfileIdentity } from "./profile-identity";
import { MobileNav } from "./mobile-nav";

const nav = ["TODAY", "CALENDAR", "FOCUS", "INTERNSHIP", "INSIGHTS"];

export function AppShell({ children, activeSection = "TODAY" }: { children: React.ReactNode; activeSection?: string }) {
  return <main className="app-shell"><div className="ambient-noise" aria-hidden="true" />
    <header className="topbar">
      <Link className="wordmark" href="/today">FOCUS<span>{"//"}</span>OS</Link>
      <span className="topbar-slash" aria-hidden="true">/</span>
      <nav aria-label="Primary navigation">{nav.map((item) => <Link key={item} href={item === "TODAY" ? "/today" : item === "CALENDAR" ? "/calendar" : item === "INTERNSHIP" ? "/internship" : "#"} className={item === activeSection ? "active" : ""}>{item}</Link>)}</nav>
      <CommandPalette /><ProfileIdentity /><form className="desktop-exit" action={signOut}><button className="sign-out" type="submit">EXIT</button></form><MobileNav activeSection={activeSection} />
    </header>{children}
  </main>;
}
