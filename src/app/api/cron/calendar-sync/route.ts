import { NextResponse, type NextRequest } from "next/server";
import { syncGoogleCalendar, type CalendarConnection } from "@/lib/calendar-sync";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = createAdminClient();
  const { data: connections, error } = await admin.from("calendar_connections").select("id, user_id, calendar_id, access_token, refresh_token, expires_at, sync_token").eq("provider", "google");
  if (error) return NextResponse.json({ error: "Unable to read connections" }, { status: 500 });
  const results = await Promise.allSettled((connections ?? []).map((connection) => syncGoogleCalendar(admin, connection as CalendarConnection)));
  return NextResponse.json({ synced: results.filter((result) => result.status === "fulfilled").length, failed: results.filter((result) => result.status === "rejected").length });
}
