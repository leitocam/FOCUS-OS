import { googleApi, validGoogleAccessToken } from "@/lib/google-calendar";

type Admin = ReturnType<typeof import("@/lib/supabase/admin").createAdminClient>;
export type CalendarConnection = { id: string; user_id: string; calendar_id: string; access_token: string; refresh_token: string | null; expires_at: string | null; sync_token: string | null };
type GoogleEvent = { id: string; status?: string; summary?: string; location?: string; updated?: string; start?: { dateTime?: string; date?: string; timeZone?: string }; end?: { dateTime?: string; date?: string; timeZone?: string } };
type GoogleEventsResponse = { items?: GoogleEvent[]; nextPageToken?: string; nextSyncToken?: string };

function allDayTimestamp(date: string) { return `${date}T00:00:00-04:00`; }

export async function syncGoogleCalendar(admin: Admin, connection: CalendarConnection) {
  const updateConnection = async (values: Record<string, unknown>) => { await admin.from("calendar_connections").update(values).eq("id", connection.id); };
  const token = await validGoogleAccessToken(connection, updateConnection);
  let syncToken = connection.sync_token;
  let pageToken: string | undefined;
  let nextSyncToken: string | undefined;
  let processed = 0;

  try {
    do {
      const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(connection.calendar_id)}/events`);
      const params = new URLSearchParams({ singleEvents: "true", showDeleted: "true", maxResults: "2500" });
      if (syncToken) params.set("syncToken", syncToken);
      else {
        const start = new Date(); start.setDate(start.getDate() - 7);
        const end = new Date(); end.setDate(end.getDate() + 90);
        params.set("orderBy", "startTime"); params.set("timeMin", start.toISOString()); params.set("timeMax", end.toISOString());
      }
      if (pageToken) params.set("pageToken", pageToken);
      url.search = params.toString();
      const result = await googleApi<GoogleEventsResponse>(url.toString(), token);
      for (const event of result.items ?? []) {
        if (event.status === "cancelled") {
          await admin.from("calendar_events").delete().eq("connection_id", connection.id).eq("external_id", event.id);
          processed += 1;
          continue;
        }
        if (!event.start || !event.end || (!event.start.dateTime && !event.start.date) || (!event.end.dateTime && !event.end.date)) continue;
        const isAllDay = Boolean(event.start.date);
        const startAt = event.start.dateTime ?? allDayTimestamp(event.start.date!);
        const endAt = event.end.dateTime ?? allDayTimestamp(event.end.date!);
        const { error } = await admin.from("calendar_events").upsert({ connection_id: connection.id, user_id: connection.user_id, external_id: event.id, title: event.summary || "UNTITLED EVENT", start_at: startAt, end_at: endAt, timezone: event.start.timeZone ?? "America/La_Paz", location: event.location ?? null, source: "GOOGLE", is_all_day: isAllDay, updated_at: event.updated ?? new Date().toISOString() }, { onConflict: "connection_id,external_id" });
        if (error) throw error;
        processed += 1;
      }
      pageToken = result.nextPageToken;
      nextSyncToken = result.nextSyncToken ?? nextSyncToken;
    } while (pageToken);
    await updateConnection({ sync_token: nextSyncToken ?? syncToken, last_synced_at: new Date().toISOString(), last_sync_status: "OK", last_sync_error: null });
    return { processed, incremental: Boolean(syncToken) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Calendar sync failed";
    // Google expires an incremental token with HTTP 410. Reset it for the next full sync.
    const expiredToken = message.includes("(410)");
    await updateConnection({ sync_token: expiredToken ? null : syncToken, last_sync_status: expiredToken ? "RESET_REQUIRED" : "FAILED", last_sync_error: message.slice(0, 500) });
    throw error;
  }
}
