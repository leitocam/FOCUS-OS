import { AppShell } from "@/components/app-shell";
import { CalendarWorkspace } from "@/components/calendar-workspace";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CalendarPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const supabase = await createClient(); const { data: jwt } = await supabase.auth.getClaims(); const userId = jwt?.claims?.sub;
  if (!userId) redirect("/login");
  const params = await searchParams;
  const admin = createAdminClient();
  const { data: connection } = await admin.from("calendar_connections").select("account_email, last_synced_at, last_sync_status, last_sync_error").eq("user_id", userId).eq("provider", "google").eq("calendar_id", "primary").maybeSingle();
  return <AppShell activeSection="CALENDAR"><main className="module-page"><header className="module-heading"><p className="system-label is-active"><span>● </span>CALENDAR / GOOGLE CONNECTION</p><h1>See the load.<br />Use the gaps.</h1><p>Calendar is read from Google and transformed into usable time.</p></header><CalendarWorkspace userId={userId} status={params.status} connectedEmail={connection?.account_email ?? null} isConnected={Boolean(connection)} syncState={{ lastSyncedAt: connection?.last_synced_at ?? null, status: connection?.last_sync_status ?? null, error: connection?.last_sync_error ?? null }} /></main></AppShell>;
}
