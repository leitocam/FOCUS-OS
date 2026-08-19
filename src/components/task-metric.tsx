"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SystemLabel } from "./system-label";

export function TaskMetric({ userId }: { userId: string }) {
  const [counts, setCounts] = useState({ done: 0, total: 0 });
  useEffect(() => { const load = async () => { const { data } = await createClient().from("tasks").select("status").eq("user_id", userId); if (data) setCounts({ done: data.filter((task) => task.status === "DONE").length, total: data.length }); }; void load(); window.addEventListener("focus-os:tasks-updated", load); return () => window.removeEventListener("focus-os:tasks-updated", load); }, [userId]);
  return <div><strong>{String(counts.done).padStart(2, "0")}<span>/</span>{String(counts.total).padStart(2, "0")}</strong><SystemLabel>TASKS / COMPLETE</SystemLabel><small>ALL TASKS / LIVE DATA</small></div>;
}
