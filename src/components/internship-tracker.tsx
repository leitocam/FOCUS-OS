"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SystemLabel } from "./system-label";

type Profile = { required_minutes: number; weekly_target_minutes: number | null; start_date: string | null; deadline: string | null; company: string | null; role: string | null };
type Session = { id: string; started_at: string; ended_at: string | null; paused_at: string | null; accumulated_seconds: number; duration_seconds: number | null; description: string | null; project: string | null };

const blankProfile = { required_minutes: "", weekly_target_minutes: "", start_date: "", deadline: "", company: "", role: "" };
const duration = (minutes: number) => `${Math.floor(minutes / 60)}H ${String(minutes % 60).padStart(2, "0")}M`;
const selectSessions = "id, started_at, ended_at, paused_at, accumulated_seconds, duration_seconds, description, project";

export function InternshipTracker({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [active, setActive] = useState<Session | null>(null);
  const [now, setNow] = useState(Date.now());
  const [settings, setSettings] = useState(blankProfile);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const manualFormRef = useRef<HTMLFormElement>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const [profileResult, sessionsResult] = await Promise.all([
      supabase.from("internship_profiles").select("required_minutes, weekly_target_minutes, start_date, deadline, company, role").eq("user_id", userId).maybeSingle(),
      supabase.from("internship_sessions").select(selectSessions).eq("user_id", userId).order("started_at", { ascending: false }).limit(30),
    ]);
    if (profileResult.error || sessionsResult.error) { setNotice("DATABASE / RUN PAUSE MIGRATION"); return; }
    setProfile(profileResult.data);
    setSessions(sessionsResult.data);
    setActive(sessionsResult.data.find((session) => !session.ended_at) ?? null);
    if (profileResult.data) setSettings({ required_minutes: String(profileResult.data.required_minutes / 60), weekly_target_minutes: profileResult.data.weekly_target_minutes ? String(profileResult.data.weekly_target_minutes / 60) : "", start_date: profileResult.data.start_date ?? "", deadline: profileResult.data.deadline ?? "", company: profileResult.data.company ?? "", role: profileResult.data.role ?? "" });
  }, [userId]);

  useEffect(() => { void load(); const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(timer); }, [load]);
  const elapsedSeconds = useCallback((session: Session) => session.paused_at || session.ended_at ? session.accumulated_seconds || session.duration_seconds || 0 : session.accumulated_seconds + Math.max(0, Math.floor((now - new Date(session.started_at).getTime()) / 1000)), [now]);
  const loggedMinutes = useMemo(() => sessions.reduce((total, session) => total + Math.round(elapsedSeconds(session) / 60), 0), [elapsedSeconds, sessions]);

  const start = async () => {
    const { data, error } = await createClient().from("internship_sessions").insert({ user_id: userId }).select(selectSessions).single();
    if (error) setNotice("SESSION / START FAILED"); else { setSessions((items) => [data, ...items]); setActive(data); setNotice("SESSION / RUNNING"); }
  };
  const pause = async () => {
    if (!active) return;
    const seconds = elapsedSeconds(active);
    const { error } = await createClient().from("internship_sessions").update({ paused_at: new Date().toISOString(), accumulated_seconds: seconds, duration_seconds: seconds }).eq("id", active.id);
    if (error) setNotice("SESSION / PAUSE FAILED"); else { setNotice("SESSION / PAUSED"); await load(); }
  };
  const resume = async () => {
    if (!active) return;
    const { error } = await createClient().from("internship_sessions").update({ started_at: new Date().toISOString(), paused_at: null }).eq("id", active.id);
    if (error) setNotice("SESSION / RESUME FAILED"); else { setNotice("SESSION / RUNNING"); await load(); }
  };
  const stop = async () => {
    if (!active) return;
    const seconds = elapsedSeconds(active);
    const { error } = await createClient().from("internship_sessions").update({ ended_at: new Date().toISOString(), paused_at: null, accumulated_seconds: seconds, duration_seconds: seconds }).eq("id", active.id);
    if (error) setNotice("SESSION / STOP FAILED"); else { setNotice("SESSION / SAVED"); await load(); }
  };
  const saveSettings = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const required = Number(settings.required_minutes);
    if (!required || required <= 0) { setNotice("REQUIRED HOURS / REQUIRED"); return; }
    setSaving(true);
    const { error } = await createClient().from("internship_profiles").upsert({ user_id: userId, required_minutes: Math.round(required * 60), weekly_target_minutes: settings.weekly_target_minutes ? Math.round(Number(settings.weekly_target_minutes) * 60) : null, start_date: settings.start_date || null, deadline: settings.deadline || null, company: settings.company || null, role: settings.role || null });
    setSaving(false); if (error) setNotice("PROFILE / SAVE FAILED"); else { setNotice("PROFILE / SAVED"); await load(); }
  };
  const addManual = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); const minutes = Number(form.get("minutes"));
    if (!minutes || minutes <= 0) return;
    const endedAt = new Date();
    const { error } = await createClient().from("internship_sessions").insert({ user_id: userId, started_at: new Date(endedAt.getTime() - minutes * 60000).toISOString(), ended_at: endedAt.toISOString(), duration_seconds: Math.round(minutes * 60), accumulated_seconds: Math.round(minutes * 60), description: String(form.get("description") ?? "") || null, project: String(form.get("project") ?? "") || null });
    if (error) setNotice("MANUAL ENTRY / FAILED"); else { manualFormRef.current?.reset(); setNotice("MANUAL ENTRY / SAVED"); await load(); }
  };

  const totalRequired = profile?.required_minutes ?? 0;
  const progress = totalRequired ? Math.min(100, (loggedMinutes / totalRequired) * 100) : 0;
  const activeMinutes = active ? Math.floor(elapsedSeconds(active) / 60) : 0;
  const weekStart = new Date(); weekStart.setHours(0, 0, 0, 0); weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const weeklyMinutes = sessions.filter((session) => new Date(session.started_at) >= weekStart).reduce((total, session) => total + Math.round(elapsedSeconds(session) / 60), 0);
  const weeklyTarget = profile?.weekly_target_minutes ?? 0;
  const projected = weeklyTarget && totalRequired > loggedMinutes ? new Date(Date.now() + ((totalRequired - loggedMinutes) / weeklyTarget) * 7 * 86400000) : null;

  return <section className="internship-layout"><section className="internship-scene"><SystemLabel>LOGGED / REQUIRED</SystemLabel><div className="internship-display"><strong>{duration(loggedMinutes)}</strong><span>/ {totalRequired ? duration(totalRequired) : "SET TARGET"}</span></div><div className="internship-progress"><i style={{ width: `${progress}%` }} /></div><p>{totalRequired ? `${progress.toFixed(1)}% COMPLETE / ${duration(Math.max(0, totalRequired - loggedMinutes))} REMAINING` : "CONFIGURE REQUIRED HOURS TO START TRACKING"}</p><div className="internship-stats"><span><b>{duration(weeklyMinutes)}</b>THIS WEEK</span><span><b>{weeklyTarget ? duration(weeklyTarget) : "—"}</b>WEEKLY TARGET</span><span><b>{projected ? projected.toLocaleDateString("en-CA") : "—"}</b>EST. COMPLETE</span></div><div className="timer-zone"><SystemLabel>{active ? active.paused_at ? "SESSION / PAUSED" : "SESSION / RUNNING" : "SESSION / IDLE"}</SystemLabel><strong>{duration(activeMinutes)}</strong>{active ? <>{active.paused_at ? <button className="tracker-button secondary" onClick={resume}>RESUME<span>▶</span></button> : <button className="tracker-button secondary" onClick={pause}>PAUSE<span>Ⅱ</span></button>}<button className="tracker-button" onClick={stop}>STOP & SAVE<span>→</span></button></> : <button className="tracker-button" onClick={start}>START INTERNSHIP<span>→</span></button>}</div>{notice && <p className="tracker-notice">{notice}</p>}</section><aside className="internship-settings"><SystemLabel>CONFIGURATION / REQUIRED</SystemLabel><form onSubmit={saveSettings}><label>REQUIRED HOURS<input required type="number" min="1" value={settings.required_minutes} onChange={(event) => setSettings({ ...settings, required_minutes: event.target.value })} placeholder="E.G. 240" /></label><label>WEEKLY TARGET / HOURS<input type="number" min="1" value={settings.weekly_target_minutes} onChange={(event) => setSettings({ ...settings, weekly_target_minutes: event.target.value })} /></label><label>START DATE<input type="date" value={settings.start_date} onChange={(event) => setSettings({ ...settings, start_date: event.target.value })} /></label><label>DEADLINE<input type="date" value={settings.deadline} onChange={(event) => setSettings({ ...settings, deadline: event.target.value })} /></label><label>COMPANY<input value={settings.company} onChange={(event) => setSettings({ ...settings, company: event.target.value })} maxLength={100} /></label><label>ROLE<input value={settings.role} onChange={(event) => setSettings({ ...settings, role: event.target.value })} maxLength={100} /></label><button className="settings-save" disabled={saving}>{saving ? "SAVING" : "SAVE PROFILE"}<span>→</span></button></form></aside><section className="manual-entry"><SystemLabel>MANUAL ENTRY / COMPLETED WORK</SystemLabel><form ref={manualFormRef} onSubmit={addManual}><input name="minutes" type="number" min="1" placeholder="MINUTES" aria-label="Minutes worked" required /><input name="project" maxLength={100} placeholder="PROJECT" aria-label="Project" /><input name="description" maxLength={280} placeholder="DESCRIPTION" aria-label="Description" /><button type="submit">LOG HOURS →</button></form></section><section className="internship-history"><SystemLabel>RECENT SESSIONS / {sessions.filter((session) => session.ended_at).length} LOGGED</SystemLabel><ul>{sessions.filter((session) => session.ended_at).slice(0, 6).map((session) => <li key={session.id}><span>{new Date(session.started_at).toLocaleDateString("en-CA")}</span><b>{session.project || "GENERAL WORK"}</b><em>{duration(Math.round(elapsedSeconds(session) / 60))}</em></li>)}</ul></section></section>;
}
