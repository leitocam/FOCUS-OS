"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SystemLabel } from "./system-label";

type Profile = { required_minutes: number };
type Session = { started_at: string; ended_at: string | null; duration_seconds: number | null };

const format = (minutes: number) => `${Math.floor(minutes / 60)}H ${String(minutes % 60).padStart(2, "0")}M`;

function useInternshipData(userId: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const load = async () => { const [profileResult, sessionsResult] = await Promise.all([createClient().from("internship_profiles").select("required_minutes").eq("user_id", userId).maybeSingle(), createClient().from("internship_sessions").select("started_at, ended_at, duration_seconds").eq("user_id", userId)]); if (profileResult.data) setProfile(profileResult.data); if (sessionsResult.data) setSessions(sessionsResult.data); }; void load(); const interval = window.setInterval(() => setNow(Date.now()), 60000); return () => window.clearInterval(interval); }, [userId]);
  const logged = useMemo(() => sessions.reduce((total, session) => total + (session.ended_at ? Math.round((session.duration_seconds ?? 0) / 60) : Math.max(0, Math.floor((now - new Date(session.started_at).getTime()) / 60000))), 0), [now, sessions]);
  const target = profile?.required_minutes ?? 0;
  return { logged, target, percentage: target ? Math.min(100, (logged / target) * 100) : 0 };
}

export function InternshipMetric({ userId }: { userId: string }) {
  const { logged, target, percentage } = useInternshipData(userId);
  return <div><strong>{target ? format(logged) : "—"}</strong><SystemLabel>INTERNSHIP / LOGGED</SystemLabel><small>{target ? `${percentage.toFixed(1)}% / ${format(target)} TARGET` : "PROFILE / NOT CONFIGURED"}</small></div>;
}

export function InternshipStatus({ userId }: { userId: string }) {
  const { logged, target, percentage } = useInternshipData(userId);
  return <article className="internship-panel"><SystemLabel>03 — INTERNSHIP / STATUS</SystemLabel>{target ? <><div className="internship-numbers"><strong>{format(logged)}</strong><b>/ {format(target)}</b></div><div className="progress"><i style={{ width: `${percentage}%` }} /></div><p><span className="status-dot acid" /> PROFILE / ACTIVE <em>{percentage.toFixed(1)}%</em></p></> : <><div className="internship-numbers"><strong>—</strong><b>/ SETUP</b></div><p>CONFIGURE YOUR TARGET IN INTERNSHIP</p></>}</article>;
}
