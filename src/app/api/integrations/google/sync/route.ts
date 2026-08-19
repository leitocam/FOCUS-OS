import { NextResponse } from "next/server";
import { syncGoogleCalendar, type CalendarConnection } from "@/lib/calendar-sync";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const { data: jwt } = await supabase.auth.getClaims();
  if (!jwt?.claims?.sub) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = createAdminClient();
  const { data: connection, error } = await admin.from("calendar_connections").select("id, user_id, calendar_id, access_token, refresh_token, expires_at, sync_token").eq("user_id", jwt.claims.sub).eq("provider", "google").eq("calendar_id", "primary").single();
  if (error || !connection) return NextResponse.json({ error: "Google Calendar is not connected" }, { status: 400 });
  try {
    const result = await syncGoogleCalendar(admin, connection as CalendarConnection);
    return NextResponse.json({ synced: result.processed, incremental: result.incremental });
  } catch { return NextResponse.json({ error: "Calendar sync failed. Reconnect Google if the issue persists." }, { status: 500 }); }
}
