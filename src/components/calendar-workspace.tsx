"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { classesOnDate, laPazDate } from "@/modules/schedule/semester-2026";
import { SystemLabel } from "./system-label";

type Event = { id: string; title: string; start_at: string; end_at: string; location: string | null; source: "GOOGLE" | "FOCUS_OS"; is_all_day: boolean };
type SyncState = { lastSyncedAt: string | null; status: string | null; error: string | null };
type Reservation = { title: string; start: string; end: string };

const localDate = (value: string) => new Intl.DateTimeFormat("en-GB", { timeZone: "America/La_Paz", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value)).split("/").reverse().join("-");
const localTime = (value: string) => new Intl.DateTimeFormat("en-GB", { timeZone: "America/La_Paz", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(value));

export function CalendarWorkspace({ userId, status, connectedEmail, isConnected, syncState }: { userId: string; status?: string; connectedEmail: string | null; isConnected: boolean; syncState: SyncState }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [notice, setNotice] = useState(status === "connected" ? "GOOGLE / CONNECTED" : status === "oauth_failed" ? "GOOGLE / CONNECTION FAILED" : null);
  const [syncInfo, setSyncInfo] = useState(syncState);
  const [syncing, setSyncing] = useState(false);
  const [importingSemester, setImportingSemester] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserving, setReserving] = useState(false);
  const [reservationError, setReservationError] = useState<string | null>(null);
  const [reservation, setReservation] = useState<Reservation>({ title: "", start: "", end: "" });
  const reservationFormRef = useRef<HTMLFormElement>(null);

  const load = useCallback(async () => {
    const { data, error } = await createClient().from("calendar_events").select("id, title, start_at, end_at, location, source, is_all_day").eq("user_id", userId).gte("end_at", new Date().toISOString()).order("start_at", { ascending: true }).limit(30);
    if (error) setNotice("EVENTS / LOAD FAILED"); else setEvents(data);
  }, [userId]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setReserveOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const sync = async () => {
    setSyncing(true);
    const response = await fetch("/api/integrations/google/sync", { method: "POST" });
    const result = await response.json() as { synced?: number; error?: string };
    setSyncing(false);
    if (!response.ok) { setNotice(result.error ?? "SYNC / FAILED"); setSyncInfo((current) => ({ ...current, status: "FAILED", error: result.error ?? "SYNC FAILED" })); return; }
    setNotice(`SYNC / ${result.synced ?? 0} EVENTS`);
    setSyncInfo({ lastSyncedAt: new Date().toISOString(), status: "OK", error: null });
    await load();
  };

  const importSemester = async () => {
    setImportingSemester(true);
    const response = await fetch("/api/integrations/google/import-semester", { method: "POST" });
    const result = await response.json() as { created?: number; skipped?: number; error?: string };
    setImportingSemester(false);
    if (!response.ok) setNotice(result.error ?? "SEMESTER / IMPORT FAILED"); else { setNotice(`SEMESTER / ${result.created ?? 0} CREATED · ${result.skipped ?? 0} EXISTING`); await load(); }
  };

  const openReservation = (preset?: Partial<Reservation>) => { setReservationError(null); setReservation((current) => ({ ...current, ...preset })); setReserveOpen(true); };
  const reserve = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (new Date(reservation.end) <= new Date(reservation.start)) { setReservationError("END TIME MUST BE AFTER START TIME"); return; }
    setReserving(true); setReservationError(null);
    const response = await fetch("/api/integrations/google/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(reservation) });
    const result = await response.json() as { error?: string };
    setReserving(false);
    if (!response.ok) { setReservationError(result.error ?? "RESERVATION / FAILED"); return; }
    reservationFormRef.current?.reset(); setReservation({ title: "", start: "", end: "" }); setReserveOpen(false); setNotice("RESERVATION / CREATED IN GOOGLE"); await sync();
  };

  const opportunities = useMemo(() => {
    const date = laPazDate();
    const minutes = (value: string) => { const [hour, minute] = value.split(":").map(Number); return hour * 60 + minute; };
    const academic = classesOnDate(date).map((entry) => [minutes(entry.start), minutes(entry.end)] as [number, number]);
    const calendar = events.filter((event) => localDate(event.start_at) === date).map((event): [number, number] => event.is_all_day ? [480, 1320] : [minutes(localTime(event.start_at)), minutes(localTime(event.end_at))]);
    const merged = [...academic, ...calendar].sort((a, b) => a[0] - b[0]).reduce<[number, number][]>((all, interval) => { const previous = all.at(-1); if (previous && interval[0] <= previous[1]) previous[1] = Math.max(previous[1], interval[1]); else all.push([...interval]); return all; }, []);
    const slots: Array<[number, number]> = []; let cursor = 480;
    for (const [start, end] of merged) { if (start - cursor >= 45) slots.push([cursor, start]); cursor = Math.max(cursor, end); }
    if (1320 - cursor >= 45) slots.push([cursor, 1320]);
    const clock = (value: number) => `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
    return { date, slots: slots.slice(0, 3).map(([start, end]) => ({ start: clock(start), end: clock(end), minutes: end - start })) };
  }, [events]);
  const syncLabel = syncInfo.lastSyncedAt ? `LAST SYNC / ${new Date(syncInfo.lastSyncedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "America/La_Paz" })}` : "SYNC / NOT RUN YET";
  const rangePreview = reservation.start && reservation.end ? `${new Date(reservation.start).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })} → ${new Date(reservation.end).toLocaleTimeString("en-GB", { timeStyle: "short" })}` : "DEFINE A START AND END TIME";

  return <><section className="calendar-layout"><section className="calendar-controls"><SystemLabel>GOOGLE CALENDAR / STATUS</SystemLabel><h2>{notice ?? (isConnected ? "GOOGLE / CONNECTED" : "NOT CONNECTED")}</h2>{connectedEmail ? <div className="calendar-account"><SystemLabel>CONNECTED ACCOUNT</SystemLabel><strong title={connectedEmail}>{connectedEmail}</strong><span>/ CALENDAR</span></div> : <p>{isConnected ? "CONNECTED ACCOUNT / RECONNECT GOOGLE TO DISPLAY THE EMAIL" : "Connect once, then sync the next 90 days of your schedule."}</p>}<p className={`calendar-sync-state${syncInfo.status === "FAILED" ? " is-failed" : ""}`}>{syncLabel}{syncInfo.error ? ` / ${syncInfo.error}` : ""}</p><section className="calendar-opportunities"><header><SystemLabel>FREE SLOTS / TODAY</SystemLabel><span>{opportunities.date}</span></header>{isConnected && opportunities.slots.length ? <div className="opportunity-list">{opportunities.slots.map((slot) => <button key={`${slot.start}-${slot.end}`} onClick={() => openReservation({ title: "FOCUS BLOCK", start: `${opportunities.date}T${slot.start}`, end: `${opportunities.date}T${slot.end}` })}><b>{slot.start} — {slot.end}</b><small>{slot.minutes} MIN AVAILABLE</small><i>→</i></button>)}</div> : <p className="opportunity-empty">{isConnected ? "NO 45 MINUTE WINDOW REMAINS" : "CONNECT GOOGLE TO CALCULATE AVAILABILITY"}</p>}</section><div className="calendar-actions"><button className="calendar-reserve-trigger" onClick={() => openReservation()} disabled={!isConnected}>RESERVE TIME <span>→</span></button><a className="calendar-connect" href="/api/integrations/google/connect">{isConnected ? "RECONNECT GOOGLE" : "CONNECT GOOGLE"} <span>→</span></a><button onClick={sync} disabled={syncing || !isConnected}>{syncing ? "SYNCING" : "SYNC NOW"}<span>↻</span></button><button className="semester-import" onClick={importSemester} disabled={importingSemester || !isConnected}>{importingSemester ? "IMPORTING SCHEDULE" : "IMPORT SEMESTER"}<span>↓</span></button></div></section><section className="calendar-events"><header><SystemLabel>UPCOMING / {events.length} EVENTS</SystemLabel><span>AMERICA / LA PAZ</span></header>{events.length ? <ol>{events.map((event) => <li key={event.id}><time>{new Date(event.start_at).toLocaleDateString("en-CA", { month: "short", day: "numeric", timeZone: "America/La_Paz" })}<b>{event.is_all_day ? "ALL DAY" : new Date(event.start_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "America/La_Paz" })}</b></time><div><strong>{event.title}</strong><small>{event.location ?? "NO LOCATION"}</small></div><em>{event.source === "FOCUS_OS" ? "FOCUS//OS" : "GOOGLE"}</em></li>)}</ol> : <div className="calendar-empty">NO EVENTS LOADED<br /><span>{isConnected ? "SYNC GOOGLE CALENDAR TO LOAD EVENTS" : "CONNECT GOOGLE CALENDAR"}</span></div>}</section></section>{reserveOpen && <div className="reservation-backdrop" onMouseDown={() => setReserveOpen(false)}><section className="reservation-modal" role="dialog" aria-modal="true" aria-labelledby="reserve-title" onMouseDown={(event) => event.stopPropagation()}><header><div><SystemLabel active>CALENDAR / NEW RESERVATION</SystemLabel><h2 id="reserve-title">Reserve the<br />space.</h2></div><button className="modal-close" onClick={() => setReserveOpen(false)} aria-label="Close reservation dialog">×</button></header><div className="reservation-modal-grid"><form ref={reservationFormRef} onSubmit={reserve}><label className="reservation-field reservation-title-field"><SystemLabel>ACTIVITY / TITLE</SystemLabel><input value={reservation.title} onChange={(event) => setReservation({ ...reservation, title: event.target.value })} name="title" required maxLength={180} autoFocus placeholder="DEEP WORK, MEETING, ERRAND…" /></label><div className="reservation-time-grid"><label className="reservation-field"><SystemLabel>START / LA PAZ</SystemLabel><input value={reservation.start} onChange={(event) => setReservation({ ...reservation, start: event.target.value })} name="start" type="datetime-local" required /></label><label className="reservation-field"><SystemLabel>END / LA PAZ</SystemLabel><input value={reservation.end} onChange={(event) => setReservation({ ...reservation, end: event.target.value })} name="end" type="datetime-local" required /></label></div>{reservationError && <p className="reservation-error">{reservationError}</p>}<footer><button type="button" className="reservation-cancel" onClick={() => setReserveOpen(false)}>CANCEL</button><button type="submit" className="reservation-confirm" disabled={reserving}>{reserving ? "RESERVING" : "CONFIRM IN GOOGLE"}<span>→</span></button></footer></form><aside className="reservation-preview"><SystemLabel>01 / SLOT PREVIEW</SystemLabel><strong>{reservation.title || "UNNAMED BLOCK"}</strong><p>{rangePreview}</p><div><span>DESTINATION</span><b>{connectedEmail ?? "GOOGLE CALENDAR"}</b></div><small>THE EVENT WILL BE CREATED IN YOUR CONNECTED GOOGLE CALENDAR. PRESS ESC TO CANCEL.</small></aside></div></section></div>}</>;
}
