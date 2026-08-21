import { classesOnDate } from "./semester-2026";

export const dayWindow = { start: "08:00", end: "22:00" };
export const gymDurationMinutes = 130;

type CalendarEvent = { start_at: string; end_at: string; is_all_day?: boolean | null };
type Interval = [number, number];

const minutes = (value: string) => { const [hour, minute] = value.split(":").map(Number); return hour * 60 + minute; };
const clock = (value: number) => `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
const localDate = (value: string) => new Intl.DateTimeFormat("en-GB", { timeZone: "America/La_Paz", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value)).split("/").reverse().join("-");
const localTime = (value: string) => new Intl.DateTimeFormat("en-GB", { timeZone: "America/La_Paz", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(value));

export function dayCapacity(date: string, events: CalendarEvent[], now = new Date()) {
  const windowStart = minutes(dayWindow.start); const windowEnd = minutes(dayWindow.end);
  const academic: Interval[] = classesOnDate(date).map((entry) => [minutes(entry.start), minutes(entry.end)]);
  const calendar: Interval[] = events.filter((event) => localDate(event.start_at) === date || localDate(event.end_at) === date).map((event): Interval => event.is_all_day ? [windowStart, windowEnd] : [minutes(localTime(event.start_at)), minutes(localTime(event.end_at))]);
  const merged = [...academic, ...calendar].map(([start, end]): Interval => [Math.max(windowStart, start), Math.min(windowEnd, end)]).filter(([start, end]) => end > start).sort((a, b) => a[0] - b[0]).reduce<Interval[]>((all, interval) => { const previous = all.at(-1); if (previous && interval[0] <= previous[1]) previous[1] = Math.max(previous[1], interval[1]); else all.push([...interval]); return all; }, []);
  const busyMinutes = merged.reduce((total, [start, end]) => total + end - start, 0);
  const currentDate = localDate(now.toISOString());
  const currentMinutes = currentDate === date ? Math.ceil((minutes(localTime(now.toISOString())) + 1) / 15) * 15 : windowStart;
  const slots: Interval[] = []; let cursor = windowStart;
  for (const [start, end] of merged) { const candidateStart = Math.max(cursor, currentMinutes); if (start - candidateStart >= gymDurationMinutes) slots.push([candidateStart, start]); cursor = Math.max(cursor, end); }
  const finalStart = Math.max(cursor, currentMinutes); if (windowEnd - finalStart >= gymDurationMinutes) slots.push([finalStart, windowEnd]);
  return { totalMinutes: windowEnd - windowStart, busyMinutes, freeMinutes: windowEnd - windowStart - busyMinutes, freePercent: Math.round(((windowEnd - windowStart - busyMinutes) / (windowEnd - windowStart)) * 100), gymSlots: slots.slice(0, 3).map(([start, end]) => ({ start: clock(start), end: clock(end), duration: end - start })) };
}
