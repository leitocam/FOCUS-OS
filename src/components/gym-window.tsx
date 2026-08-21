"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SystemLabel } from "./system-label";

type Slot = { start: string; end: string; duration: number };

export function GymWindow({ date, freePercent, freeMinutes, slots }: { date: string; freePercent: number; freeMinutes: number; slots: Slot[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const reserve = async (slot: Slot) => {
    setSaving(slot.start); setNotice(null);
    const response = await fetch("/api/integrations/google/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "GYM / TRAINING", start: `${date}T${slot.start}`, end: `${date}T${slot.end}` }) });
    const result = await response.json() as { error?: string };
    setSaving(null);
    if (!response.ok) { setNotice(result.error ?? "GYM / RESERVATION FAILED"); return; }
    setNotice("GYM / RESERVED IN CALENDAR"); router.refresh();
  };
  const hours = `${Math.floor(freeMinutes / 60)}H ${String(freeMinutes % 60).padStart(2, "0")}M`;
  return <section className="gym-window" aria-labelledby="gym-heading"><div className="gym-overview"><SystemLabel active>GYM / 02H 10M BLOCK</SystemLabel><h2 id="gym-heading">Train inside<br />the open space.</h2><p>Availability today / <strong>{freePercent}%</strong> free / {hours} remaining.</p><div className="availability-meter" aria-label={`${freePercent}% of the day is free`}><i style={{ width: `${freePercent}%` }} /></div></div><div className="gym-options"><header><SystemLabel>FIRST VIABLE WINDOWS / TODAY</SystemLabel><span>NO CLASS / NO CALENDAR CONFLICT</span></header>{slots.length ? <div>{slots.map((slot) => <button key={slot.start} disabled={Boolean(saving)} onClick={() => reserve(slot)}><time>{slot.start}<small>{slot.end}</small></time><strong>{saving === slot.start ? "RESERVING" : "RESERVE GYM"}</strong><em>{slot.duration} MIN <span>→</span></em></button>)}</div> : <p className="gym-empty">NO 02H 10M WINDOW REMAINS TODAY.<br /><span>USE CALENDAR TO RESERVE ANOTHER DAY.</span></p>}{notice && <p className="gym-notice">{notice}</p>}</div></section>;
}
