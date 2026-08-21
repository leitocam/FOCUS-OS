import { AppShell } from "@/components/app-shell";
import { SystemLabel } from "@/components/system-label";
import { FocusPanel } from "@/components/focus-panel";
import { StartFocusButton } from "@/components/start-focus-button";
import { TaskPanel } from "@/components/task-panel";
import { TaskMetric } from "@/components/task-metric";
import { FocusMetric } from "@/components/focus-metric";
import { InternshipMetric, InternshipStatus } from "@/components/internship-summary";
import { Dayline, type DaylineEntry } from "@/components/dayline";
import { GymWindow } from "@/components/gym-window";
import { classesOnDate, laPazDate } from "@/modules/schedule/semester-2026";
import { dayCapacity } from "@/modules/schedule/day-capacity";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const timezone = "America/La_Paz";
const timeFormatter = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, hour: "2-digit", minute: "2-digit", hour12: false });

function dateAt(date: string, time: string) {
  return new Date(`${date}T${time}:00-04:00`);
}

function durationLabel(milliseconds: number) {
  const minutes = Math.max(0, Math.floor(milliseconds / 60_000));
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}H ${String(minutes % 60).padStart(2, "0")}M`;
}

export default async function TodayPage() {
  const supabase = await createClient();
  const { data: jwt } = await supabase.auth.getClaims();
  const userId = jwt?.claims?.sub;
  if (!userId) redirect("/login");

  const today = laPazDate();
  const startOfDay = new Date(`${today}T00:00:00-04:00`).toISOString();
  const endOfDay = new Date(`${today}T23:59:59-04:00`).toISOString();
  const dateAtNoon = new Date(`${today}T12:00:00-04:00`);
  const daysSinceMonday = (dateAtNoon.getUTCDay() + 6) % 7;
  dateAtNoon.setUTCDate(dateAtNoon.getUTCDate() - daysSinceMonday);
  const weekStart = `${dateAtNoon.toISOString().slice(0, 10)}T00:00:00-04:00`;

  const [{ data: calendarEvents }] = await Promise.all([
    supabase.from("calendar_events").select("id, title, start_at, end_at, location, stable_key, is_all_day").eq("user_id", userId).gte("start_at", startOfDay).lte("start_at", endOfDay).order("start_at", { ascending: true }),
  ]);

  const classes = classesOnDate(today);
  const capacity = dayCapacity(today, calendarEvents ?? []);
  const personalEvents: DaylineEntry[] = (calendarEvents ?? [])
    .filter((event) => !event.stable_key?.startsWith("ucb-cba-2-2026:"))
    .map((event) => ({
      id: event.id,
      kind: "CALENDAR",
      start: timeFormatter.format(new Date(event.start_at)),
      end: timeFormatter.format(new Date(event.end_at)),
      title: event.title,
      location: event.location,
      meta: "GOOGLE",
    }));
  const dayline = [...classes, ...personalEvents].sort((a, b) => a.start.localeCompare(b.start));
  const now = new Date();
  const nextEntry = dayline.find((entry) => dateAt(today, entry.start).getTime() > now.getTime()) ?? null;
  const nextStart = nextEntry ? dateAt(today, nextEntry.start) : null;
  const availability = nextStart ? durationLabel(nextStart.getTime() - now.getTime()) : "—";
  const dateLabel = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, weekday: "short", day: "2-digit", month: "short" }).format(new Date(`${today}T12:00:00-04:00`)).toUpperCase();
  const footerDate = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${today}T12:00:00-04:00`)).toUpperCase();
  const commitmentText = nextEntry ? nextEntry.title : "NO MORE COMMITMENTS";

  return <AppShell><div className="technical-grid">
    <section className="today-hero" aria-labelledby="today-heading">
      <div className="hero-copy"><SystemLabel active>TODAY / {dateLabel}</SystemLabel><h1 id="today-heading">Make the space<br />between count.</h1><p className="hero-detail">Next commitment / <strong>{commitmentText}</strong> / {nextEntry?.start ?? "CLEAR"}</p><StartFocusButton /></div>
      <div className="availability" aria-label="Available time before next commitment"><SystemLabel>AVAILABLE BEFORE NEXT</SystemLabel><strong>{availability === "—" ? "—" : <>{availability.slice(0, 2)}<span>H</span> {availability.slice(4, 6)}<span>M</span></>}</strong><p>{nextEntry ? `Free until ${nextEntry.start} / ${nextEntry.title}.` : "No more commitments registered today."}</p></div>
      <div className="hero-art" aria-hidden="true"><div className="halftone" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="data-slab slab-one"><i /> <span>{timeFormatter.format(now)}</span><b>LOCAL / NOW</b></div><div className="data-slab slab-two"><i /> <span>{nextEntry?.start ?? "—"}</span><b>{nextEntry ? `NEXT / ${nextEntry.meta}` : "DAY / CLEAR"}</b></div><div className="coordinate">TZ: UTC−04:00 / LPZ</div></div>
      <div className="hero-status"><span><i className="status-dot acid" /> SCHEDULE / {dayline.length ? "READY" : "CLEAR"}</span><span>LOAD / {dayline.length} EVENTS</span></div>
    </section>

    <section className="metric-strip" aria-label="Today metrics">
      <InternshipMetric userId={userId} />
      <FocusMetric userId={userId} weekStart={weekStart} />
      <TaskMetric userId={userId} />
    </section>

    <GymWindow date={today} freePercent={capacity.freePercent} freeMinutes={capacity.freeMinutes} slots={capacity.gymSlots} />

    <section className="content-grid">
      <Dayline entries={dayline} dateLabel={dateLabel} />
      <aside className="right-rail"><TaskPanel userId={userId} />
      <InternshipStatus userId={userId} />
      <FocusPanel userId={userId} /></aside>
    </section>
    <footer className="system-footer"><span>FOCUS//OS / PERSONAL OPERATING SYSTEM</span><span>{footerDate} / UTC−04:00</span><span>BUILD / SPRINT 04</span></footer>
  </div></AppShell>;
}
