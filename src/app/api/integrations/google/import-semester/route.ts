import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { googleApi, validGoogleAccessToken } from "@/lib/google-calendar";
import { laPazDate, semesterMeetings } from "@/modules/schedule/semester-2026";

type Connection = { id:string; user_id:string; calendar_id:string; access_token:string; refresh_token:string|null; expires_at:string|null };
const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function POST() {
  const supabase = await createClient(); const { data: jwt } = await supabase.auth.getClaims();
  if (!jwt?.claims?.sub) return NextResponse.json({ error:"Unauthorized" }, { status:401 });
  try {
    const admin = createAdminClient();
    const { data: connection, error } = await admin.from("calendar_connections").select("id, user_id, calendar_id, access_token, refresh_token, expires_at").eq("user_id", jwt.claims.sub).eq("provider", "google").eq("calendar_id", "primary").single();
    if (error || !connection) return NextResponse.json({ error:"Google Calendar is not connected" }, { status:400 });
    const typedConnection = connection as Connection;
    const token = await validGoogleAccessToken(typedConnection, async (values) => { await admin.from("calendar_connections").update(values).eq("id", typedConnection.id); });
    const today = laPazDate();
    const candidates = semesterMeetings.flatMap((meeting) => meeting.dates.filter((date) => date >= today).map((date) => ({ meeting, date, stableKey: `ucb-cba-2-2026:${meeting.id}:${date}` })));
    const { data: existing } = await admin.from("calendar_events").select("stable_key").eq("user_id", jwt.claims.sub).in("stable_key", candidates.map((item) => item.stableKey));
    const existingKeys = new Set((existing ?? []).map((event) => event.stable_key));
    const pending = candidates.filter((item) => !existingKeys.has(item.stableKey));
    let created = 0;
    for (const item of pending) {
      const createdEvent = await googleApi<{ id:string }>(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(typedConnection.calendar_id)}/events`, token, { method:"POST", body:JSON.stringify({ summary:`${item.meeting.code} — ${item.meeting.title}`, location:item.meeting.location, start:{ dateTime:`${item.date}T${item.meeting.start}:00`, timeZone:"America/La_Paz" }, end:{ dateTime:`${item.date}T${item.meeting.end}:00`, timeZone:"America/La_Paz" }, extendedProperties:{ private:{ source:"FOCUS_OS", semester:"ucb-cba-2-2026", schedule_key:item.stableKey } } }) });
      await admin.from("calendar_events").upsert({ connection_id:typedConnection.id, user_id:jwt.claims.sub, external_id:createdEvent.id, stable_key:item.stableKey, title:`${item.meeting.code} — ${item.meeting.title}`, start_at:`${item.date}T${item.meeting.start}:00-04:00`, end_at:`${item.date}T${item.meeting.end}:00-04:00`, timezone:"America/La_Paz", location:item.meeting.location, source:"FOCUS_OS" }, { onConflict:"connection_id,external_id" });
      created += 1;
      if (created % 5 === 0) await delay(150);
    }
    return NextResponse.json({ created, skipped:candidates.length - pending.length, total:candidates.length });
  } catch { return NextResponse.json({ error:"Semester import failed" }, { status:500 }); }
}
