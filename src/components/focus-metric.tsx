"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SystemLabel } from "./system-label";

export function FocusMetric({ userId, weekStart }: { userId: string; weekStart: string }) {
  const [seconds, setSeconds] = useState(0);
  const load = useCallback(async () => { const { data } = await createClient().from("focus_sessions").select("duration_seconds").eq("user_id", userId).not("ended_at", "is", null).gte("started_at", weekStart); if (data) setSeconds(data.reduce((total, item) => total + (item.duration_seconds ?? 0), 0)); }, [userId, weekStart]);
  useEffect(() => { void load(); window.addEventListener("focus-os:focus-updated", load); return () => window.removeEventListener("focus-os:focus-updated", load); }, [load]);
  const minutes = Math.floor(seconds / 60);
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  const remainder = String(minutes % 60).padStart(2, "0");
  return <div><strong>{hours}<span>H</span> {remainder}<span>M</span></strong><SystemLabel>FOCUS / THIS WEEK</SystemLabel><small>COMPLETED SESSIONS / LIVE DATA</small></div>;
}
