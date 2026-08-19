import { SystemLabel } from "./system-label";

export type DaylineEntry = { id: string; kind: "CLASS" | "CALENDAR"; start: string; end: string; title: string; location: string | null; meta: string };

export function Dayline({ entries, dateLabel }: { entries: DaylineEntry[]; dateLabel: string }) {
  return <article className="timeline-panel"><header><SystemLabel>01 — DAYLINE / {dateLabel}</SystemLabel><p>CLASSES + CALENDAR / AMERICA LA PAZ</p></header>{entries.length ? <ol className="timeline">{entries.map((entry) => <li key={entry.id}><time>{entry.start}<small>{entry.end}</small></time><span className={`node${entry.kind === "CALENDAR" ? " next" : ""}`} /><div><SystemLabel>{entry.kind} / {entry.meta}{entry.location ? ` / ${entry.location}` : ""}</SystemLabel><h2>{entry.title}</h2></div></li>)}</ol> : <div className="dayline-empty"><SystemLabel>DAYLINE / CLEAR</SystemLabel><strong>NO CLASSES<br />NO ACTIVITIES.</strong><p>Calendar and semester schedule have no events for this date.</p></div>}</article>;
}
