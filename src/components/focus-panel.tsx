"use client";

import { useCallback, useEffect, useState } from "react";
import { SystemLabel } from "./system-label";
import { createClient } from "@/lib/supabase/client";

function format(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

type Session = { id: string; started_at: string };

export function FocusPanel({ userId }: { userId: string }) {
  const [session, setSession] = useState<Session | null>(null);
  const [now, setNow] = useState(Date.now());
  const [error, setError] = useState<string | null>(null);
  const begin = useCallback(async () => { const supabase = createClient(); const { data, error: requestError } = await supabase.from("focus_sessions").insert({ user_id: userId }).select("id, started_at").single(); if (requestError) { setError("DATABASE / NOT READY"); return; } setError(null); setSession(data); }, [userId]);
  useEffect(() => { const supabase = createClient(); void supabase.from("focus_sessions").select("id, started_at").eq("user_id", userId).is("ended_at", null).order("started_at", { ascending: false }).limit(1).maybeSingle().then(({ data, error: requestError }) => { if (requestError) setError("DATABASE / NOT READY"); else setSession(data); }); const timer = window.setInterval(() => setNow(Date.now()), 1000); const start = () => void begin(); window.addEventListener("focus-os:start", start); return () => { window.clearInterval(timer); window.removeEventListener("focus-os:start", start); }; }, [begin, userId]);
  const stop = async () => { if (!session) return; const endedAt = new Date().toISOString(); const duration = Math.max(0, Math.floor((Date.now() - new Date(session.started_at).getTime()) / 1000)); const { error: requestError } = await createClient().from("focus_sessions").update({ ended_at: endedAt, duration_seconds: duration }).eq("id", session.id); if (requestError) { setError("SESSION / STOP FAILED"); return; } setSession(null); };
  const seconds = session ? Math.max(0, Math.floor((now - new Date(session.started_at).getTime()) / 1000)) : 0;
  return <article className={`focus-panel${session ? " is-running" : ""}`}><SystemLabel>{session ? "04 — FOCUS / RUNNING" : "04 — FOCUS / IDLE"}</SystemLabel><strong>{format(seconds)}</strong><p>{error ?? (session ? "SESSION / PERSISTED" : "NO SESSION RUNNING")}</p><button onClick={session ? stop : begin}>{session ? "STOP SESSION" : "START SESSION"} <span>→</span></button></article>;
}
