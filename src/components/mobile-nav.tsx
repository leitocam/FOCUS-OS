"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "@/app/login/actions";

const links = [
  { label: "TODAY", href: "/today" },
  { label: "CALENDAR", href: "/calendar" },
  { label: "INTERNSHIP", href: "/internship" },
];

export function MobileNav({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);
  return <div className="mobile-nav"><button className="mobile-nav-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation">MENU <span>{open ? "×" : "+"}</span></button>{open && <nav id="mobile-navigation" aria-label="Mobile navigation"><p>FOCUS//OS / NAVIGATION</p>{links.map((link) => <Link key={link.href} className={activeSection === link.label ? "active" : ""} href={link.href} onClick={() => setOpen(false)}>{link.label}<span>→</span></Link>)}<form action={signOut}><button type="submit">EXIT SYSTEM <span>→</span></button></form></nav>}</div>;
}
