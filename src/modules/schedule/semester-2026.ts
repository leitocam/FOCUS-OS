export type SemesterMeeting = { id: string; code: string; title: string; parallel: number; start: string; end: string; location: string; dates: string[] };

const monday = ["2026-08-03","2026-08-10","2026-08-17","2026-08-24","2026-08-31","2026-09-07","2026-09-28","2026-10-05","2026-10-12","2026-10-19","2026-10-26","2026-11-09","2026-11-16","2026-11-23","2026-11-30"];
const tuesday = ["2026-08-04","2026-08-11","2026-08-18","2026-08-25","2026-09-01","2026-09-08","2026-09-15","2026-09-22","2026-09-29","2026-10-06","2026-10-13","2026-10-20","2026-10-27","2026-11-03","2026-11-10","2026-11-17","2026-11-24","2026-12-01"];
const wednesday = ["2026-08-05","2026-08-12","2026-08-19","2026-08-26","2026-09-02","2026-09-09","2026-09-16","2026-09-23","2026-09-30","2026-10-07","2026-10-14","2026-10-21","2026-10-28","2026-11-04","2026-11-11","2026-11-18","2026-11-25","2026-12-02"];
const thursday = ["2026-08-13","2026-08-20","2026-08-27","2026-09-03","2026-09-10","2026-09-17","2026-09-24","2026-10-01","2026-10-08","2026-10-15","2026-10-22","2026-10-29","2026-11-05","2026-11-12","2026-11-19","2026-11-26","2026-12-03"];

// Canonical source: SEMESTER_SCHEDULE_2-2026.md. Each split SIAAn block remains separate.
export const semesterMeetings: SemesterMeeting[] = [
  { id:"fhc202-mon-1045", code:"FHC-202", title:"Cristología", parallel:3, start:"10:45", end:"12:15", location:"A4-7", dates:monday },
  { id:"mat361-mon-1415", code:"MAT-361", title:"Análisis de Algoritmos", parallel:1, start:"14:15", end:"15:45", location:"LC/A1-7", dates:monday },
  { id:"sis325-mon-1745", code:"SIS-325", title:"Ética y Seguridad de Sistemas", parallel:1, start:"17:45", end:"19:15", location:"LTEC/A1-1", dates:monday },
  { id:"sis324-tue-0900", code:"SIS-324", title:"Auditoría de Sistemas", parallel:1, start:"09:00", end:"10:30", location:"LTEC/A1-1", dates:tuesday },
  { id:"sis313-tue-1045", code:"SIS-313", title:"Taller de Desarrollo de Software", parallel:1, start:"10:45", end:"12:15", location:"LTEC/A1-1", dates:tuesday },
  { id:"ico313-tue-1415", code:"ICO-313", title:"Marketing Digital", parallel:1, start:"14:15", end:"15:45", location:"A/PB-5", dates:tuesday },
  { id:"sis352-tue-1930", code:"SIS-352", title:"Práctica Pre Profesional", parallel:1, start:"19:30", end:"21:00", location:"LTEC/A1-1", dates:tuesday },
  { id:"fhc202-wed-1045", code:"FHC-202", title:"Cristología", parallel:3, start:"10:45", end:"12:15", location:"A4-7", dates:wednesday },
  { id:"mat361-wed-1415", code:"MAT-361", title:"Análisis de Algoritmos", parallel:1, start:"14:15", end:"15:45", location:"LC/A1-7", dates:wednesday },
  { id:"mat361-wed-1600", code:"MAT-361", title:"Análisis de Algoritmos", parallel:1, start:"16:00", end:"16:45", location:"LC/A1-7", dates:wednesday },
  { id:"sis325-wed-1745", code:"SIS-325", title:"Ética y Seguridad de Sistemas", parallel:1, start:"17:45", end:"19:15", location:"LSIS/A1-11", dates:wednesday },
  { id:"sis325-wed-1930", code:"SIS-325", title:"Ética y Seguridad de Sistemas", parallel:1, start:"19:30", end:"20:15", location:"LSIS/A1-11", dates:wednesday },
  { id:"sis324-thu-0900", code:"SIS-324", title:"Auditoría de Sistemas", parallel:1, start:"09:00", end:"10:30", location:"LC/B2-1", dates:thursday },
  { id:"sis313-thu-1045", code:"SIS-313", title:"Taller de Desarrollo de Software", parallel:1, start:"10:45", end:"12:15", location:"LTEC/A1-1", dates:thursday },
  { id:"ico313-thu-1415", code:"ICO-313", title:"Marketing Digital", parallel:1, start:"14:15", end:"15:45", location:"A/PB-5", dates:thursday },
  { id:"sis352-thu-1930", code:"SIS-352", title:"Práctica Pre Profesional", parallel:1, start:"19:30", end:"21:00", location:"VI34", dates:thursday },
];

export function laPazDate() { const parts = new Intl.DateTimeFormat("en", { timeZone:"America/La_Paz", year:"numeric", month:"2-digit", day:"2-digit" }).formatToParts(); const value = (type: string) => parts.find((part) => part.type === type)?.value; return `${value("year")}-${value("month")}-${value("day")}`; }

export function classesOnDate(date: string) {
  return semesterMeetings.filter((meeting) => meeting.dates.includes(date)).map((meeting) => ({ id: `${meeting.id}::${date}`, kind: "CLASS" as const, start: meeting.start, end: meeting.end, title: `${meeting.code} — ${meeting.title}`, location: meeting.location, meta: meeting.code }));
}
