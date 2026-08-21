"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { requestFocus, validFocusDuration } from "@/lib/focus";
import { SystemLabel } from "./system-label";

type Task = { id: string; title: string; status: "TODO" | "IN_PROGRESS" | "DONE"; estimated_minutes: number | null; priority: number };

export function TaskPanel({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [estimate, setEstimate] = useState(50);
  const [priorityValue, setPriorityValue] = useState(3);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { const { data, error: requestError } = await createClient().from("tasks").select("id, title, status, estimated_minutes, priority").eq("user_id", userId).neq("status", "DONE").order("priority", { ascending: false }).order("created_at", { ascending: true }).limit(3); if (requestError) setError("DATABASE / NOT READY"); else setTasks(data); }, [userId]);
  useEffect(() => { void load(); }, [load]);
  const add = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const value = title.trim(); if (value.length < 3) { setError("TASK / USE AT LEAST 3 CHARACTERS"); return; } if (!validFocusDuration(estimate)) { setError("ESTIMATE / USE 15–180 MIN IN 5-MIN STEPS"); return; } setSaving(true); const { error: requestError } = await createClient().from("tasks").insert({ user_id: userId, title: value, priority: priorityValue, estimated_minutes: estimate }); setSaving(false); if (requestError) setError("TASK / CREATE FAILED"); else { setTitle(""); setError(null); await load(); window.dispatchEvent(new Event("focus-os:tasks-updated")); } };
  const complete = async (task: Task) => { const { error: requestError } = await createClient().from("tasks").update({ status: "DONE" }).eq("id", task.id); if (requestError) setError("TASK / UPDATE FAILED"); else { await load(); window.dispatchEvent(new Event("focus-os:tasks-updated")); } };
  const priority = tasks[0];
  return <article className="recommendation task-panel"><SystemLabel>02 — BEST NEXT ACTION</SystemLabel>{priority ? <><h2>{priority.title}</h2><p>Priority {priority.priority} / next executable unit in your open queue.</p><div className="action-meta"><span>ESTIMATE / {priority.estimated_minutes ?? "—"} {priority.estimated_minutes ? "MIN" : "UNSET"}</span><span>PRIORITY / {priority.priority}</span></div><div className="task-actions"><button className="task-focus" onClick={() => requestFocus({ taskId: priority.id, taskTitle: priority.title, targetMinutes: priority.estimated_minutes ?? 50 })}>FOCUS THIS <span>→</span></button><button className="task-complete" onClick={() => complete(priority)}>DONE</button></div></> : <><h2>Define the next<br />move.</h2><p>There are no active tasks. Add one concrete action to make the focus window usable.</p></>}<form className="task-create" onSubmit={add}><input value={title} onChange={(event) => setTitle(event.target.value)} minLength={3} maxLength={280} placeholder="ADD A CONCRETE TASK" aria-label="New task" /><input value={estimate} onChange={(event) => setEstimate(Number(event.target.value))} type="number" min="15" max="180" step="5" aria-label="Estimate in minutes" /><select value={priorityValue} onChange={(event) => setPriorityValue(Number(event.target.value))} aria-label="Task priority"><option value={4}>P4</option><option value={3}>P3</option><option value={2}>P2</option><option value={1}>P1</option></select><button disabled={saving} type="submit">{saving ? "…" : "+"}</button></form>{tasks.length > 1 && <ul className="task-queue">{tasks.slice(1).map((task) => <li key={task.id}><button onClick={() => complete(task)} aria-label={`Complete ${task.title}`}>○</button>{task.title}<span>{task.estimated_minutes ?? "—"}{task.estimated_minutes ? "M" : ""}</span></li>)}</ul>}{error && <p className="task-error" role="alert">{error}</p>}</article>;
}
