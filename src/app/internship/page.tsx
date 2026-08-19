import { AppShell } from "@/components/app-shell";
import { InternshipTracker } from "@/components/internship-tracker";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function InternshipPage() {
  const supabase = await createClient();
  const { data: jwt } = await supabase.auth.getClaims();
  const userId = jwt?.claims?.sub;
  if (!userId) redirect("/login");
  return <AppShell activeSection="INTERNSHIP"><main className="module-page"><header className="module-heading"><p className="system-label is-active"><span>● </span>INTERNSHIP / LIVE TRACKER</p><h1>Hours without<br />the guesswork.</h1><p>Register work, see what remains, and keep the weekly pace visible.</p></header><InternshipTracker userId={userId} /></main></AppShell>;
}
