import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { googleApi, validGoogleAccessToken } from "@/lib/google-calendar";
import { classesOnDate } from "@/modules/schedule/semester-2026";

const timezoneOffset = "-04:00";
const asLaPazDate = (value: string) => new Date(`${value}:00${timezoneOffset}`);
const dateKey = (value: Date) => value.toLocaleDateString("en-CA", { timeZone: "America/La_Paz" });

export async function POST(request: NextRequest) {
  const supabase = await createClient(); const { data: jwt } = await supabase.auth.getClaims();
  if (!jwt?.claims?.sub) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as { title?: string; start?: string; end?: string };
  if (!body.title?.trim() || !body.start || !body.end) return NextResponse.json({ error: "Invalid event data" }, { status: 400 });
  const start = asLaPazDate(body.start); const end = asLaPazDate(body.end);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return NextResponse.json({ error: "End time must be after start time" }, { status: 400 });
  try {
    const admin = createAdminClient();
    const { data: connection, error } = await admin.from("calendar_connections").select("id, user_id, calendar_id, access_token, refresh_token, expires_at").eq("user_id", jwt.claims.sub).eq("provider", "google").eq("calendar_id", "primary").single();
    if (error || !connection) return NextResponse.json({ error: "Google Calendar is not connected" }, { status: 400 });
    const { data: conflicts } = await admin.from("calendar_events").select("title, start_at, end_at").eq("user_id", jwt.claims.sub).lt("start_at", end.toISOString()).gt("end_at", start.toISOString()).limit(3);
    const classConflicts = classesOnDate(dateKey(start)).filter((entry) => {
      const classStart = asLaPazDate(`${dateKey(start)}T${entry.start}`.replace("T", "T"));
      const classEnd = asLaPazDate(`${dateKey(start)}T${entry.end}`.replace("T", "T"));
      return classStart < end && classEnd > start;
    });
    if ((conflicts?.length ?? 0) || classConflicts.length) return NextResponse.json({ error: "This slot conflicts with your calendar or class schedule", conflicts: [...(conflicts ?? []).map((event) => event.title), ...classConflicts.map((entry) => entry.title)] }, { status: 409 });
    const token = await validGoogleAccessToken(connection, async (values) => { await admin.from("calendar_connections").update(values).eq("id", connection.id); });
    const created = await googleApi<{ id: string }>(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(connection.calendar_id)}/events`, token, { method: "POST", body: JSON.stringify({ summary: body.title.trim(), start: { dateTime: body.start, timeZone: "America/La_Paz" }, end: { dateTime: body.end, timeZone: "America/La_Paz" }, extendedProperties: { private: { source: "FOCUS_OS" } } }) });
    return NextResponse.json({ id: created.id });
  } catch { return NextResponse.json({ error: "Event creation failed" }, { status: 500 }); }
}
