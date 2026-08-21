"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SystemLabel } from "./system-label";
import { createClient } from "@/lib/supabase/client";
import { focusDurations, requestFocus, validFocusDuration, type FocusStartDetail } from "@/lib/focus";

type Session = { id: string; started_at: string; target_minutes: number | null; task_id: string | null; paused_at: string | null; paused_seconds: number; tasks: { title: string }[] | null };

function elapsedSeconds(session: Session, now: number) {
  const end = session.paused_at ? new Date(session.paused_at).getTime() : now;
  return Math.max(0, Math.floor((end - new Date(session.started_at).getTime()) / 1000) - session.paused_seconds);
}

function format(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function FocusPanel({ userId }: { userId: string }) {
  const [session, setSession] = useState<Session | null>(null);
  const [duration, setDuration] = useState(50);
  const [now, setNow] = useState(Date.now());
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await createClient().from("focus_sessions").select("id, started_at, target_minutes, task_id, paused_at, paused_seconds, tasks(title)").eq("user_id", userId).is("ended_at", null).order("started_at", { ascending: false }).limit(1).maybeSingle();
    if (error) setNotice("FOCUS / DATABASE NOT READY"); else setSession(data as Session | null);
  }, [userId]);

  const begin = useCallback(async (detail: FocusStartDetail = {}) => {
    if (session) { setNotice(session.paused_at ? "FOCUS / SESSION PAUSED" : "FOCUS / ALREADY RUNNING"); return; }
    const target = detail.targetMinutes ?? duration;
    if (!validFocusDuration(target)) { setNotice("DURATION / USE 15–180 MIN IN 5-MIN STEPS"); return; }
    setSaving(true);
    const { data, error } = await createClient().from("focus_sessions").insert({ user_id: userId, task_id: detail.taskId ?? null, target_minutes: target }).select("id, started_at, target_minutes, task_id, paused_at, paused_seconds, tasks(title)").single();
    setSaving(false);
    if (error) { setNotice("FOCUS / COULD NOT START"); return; }
    setDuration(target); setNotice(detail.taskTitle ? `FOCUS / LINKED TO ${detail.taskTitle.toUpperCase()}` : "FOCUS / SESSION STARTED"); setSession(data as Session);
  }, [duration, session, userId]);

  useEffect(() => {
    void load();
    const onStart = (event: Event) => void begin((event as CustomEvent<FocusStartDetail>).detail ?? {});
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    window.addEventListener("focus-os:start", onStart);
    return () => { window.clearInterval(timer); window.removeEventListener("focus-os:start", onStart); };
  }, [begin, load]);

  const pause = async () => {
    if (!session || session.paused_at) return;
    setSaving(true);
    const { error } = await createClient().from("focus_sessions").update({ paused_at: new Date().toISOString() }).eq("id", session.id);
    setSaving(false);
    if (error) setNotice("FOCUS / PAUSE FAILED"); else { setSession({ ...session, paused_at: new Date().toISOString() }); setNotice("FOCUS / PAUSED"); }
  };
  const resume = async () => {
    if (!session?.paused_at) return;
    const pausedSeconds = session.paused_seconds + Math.max(0, Math.floor((Date.now() - new Date(session.paused_at).getTime()) / 1000));
    setSaving(true);
    const { error } = await createClient().from("focus_sessions").update({ paused_at: null, paused_seconds: pausedSeconds }).eq("id", session.id);
    setSaving(false);
    if (error) setNotice("FOCUS / RESUME FAILED"); else { setSession({ ...session, paused_at: null, paused_seconds: pausedSeconds }); setNotice("FOCUS / RESUMED"); }
  };
  const stop = async () => {
    if (!session) return;
    const seconds = elapsedSeconds(session, Date.now());
    setSaving(true);
    const { error } = await createClient().from("focus_sessions").update({ ended_at: new Date().toISOString(), duration_seconds: seconds, paused_at: null }).eq("id", session.id);
    setSaving(false);
    if (error) { setNotice("FOCUS / FINISH FAILED"); return; }
    setSession(null); setNotice(`FOCUS / SAVED ${Math.floor(seconds / 60)} MIN`); window.dispatchEvent(new Event("focus-os:focus-updated"));
  };

  const seconds = session ? elapsedSeconds(session, now) : 0;
  const targetSeconds = (session?.target_minutes ?? duration) * 60;
  const progress = Math.min(100, Math.round((seconds / targetSeconds) * 100));
  const state = session ? (session.paused_at ? "PAUSED" : "RUNNING") : "READY";
  const targetLabel = useMemo(() => `${session?.target_minutes ?? duration} MIN`, [duration, session?.target_minutes]);

  return <article className={`focus-panel${session ? " is-running" : ""}${session?.paused_at ? " is-paused" : ""}`}>
    <SystemLabel>04 — FOCUS / {state}</SystemLabel>
    <strong>{format(seconds)}</strong>
    <p className="focus-context">{session?.tasks?.[0]?.title ? `TASK / ${session.tasks[0].title}` : session ? "UNLINKED DEEP WORK" : "SELECT A DURATION, THEN START."}</p>
    {session ? <><div className="focus-progress" aria-label={`${progress}% of focus target complete`}><i style={{ width: `${progress}%` }} /></div><div className="focus-controls"><button onClick={session.paused_at ? resume : pause} disabled={saving}>{session.paused_at ? "RESUME" : "PAUSE"}</button><button onClick={stop} disabled={saving}>FINISH <span>→</span></button></div><small>TARGET / {targetLabel} · {progress}%</small></> : <><div className="focus-duration" role="group" aria-label="Focus duration">{focusDurations.map((value) => <button className={duration === value ? "selected" : ""} key={value} onClick={() => setDuration(value)}>{value}<small>M</small></button>)}</div><label className="focus-custom">CUSTOM <input type="number" min="15" max="180" step="5" value={duration} onChange={(event) => setDuration(Number(event.target.value))} aria-label="Custom focus duration in minutes" /></label><button className="focus-start" onClick={() => void begin()} disabled={saving}>START {targetLabel} <span>→</span></button></>}
    {notice && <p className="focus-notice" role="status">{notice}</p>}
  </article>;
}
