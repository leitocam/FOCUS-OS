export type ClassEvent = {
  code: string;
  title: string;
  start: string;
  end: string;
  location: string;
};

// Canonical source: SEMESTER_SCHEDULE_2-2026.md / Thursday 2026-08-13.
export const thursday13August2026: ClassEvent[] = [
  { code: "SIS-324", title: "AUDITORÍA DE SISTEMAS", start: "09:00", end: "10:30", location: "LC/B2-1" },
  { code: "SIS-313", title: "TALLER DE DESARROLLO DE SOFTWARE", start: "10:45", end: "12:15", location: "LTEC/A1-1" },
  { code: "ICO-313", title: "MARKETING DIGITAL", start: "14:15", end: "15:45", location: "A/PB-5" },
  { code: "SIS-352", title: "PRÁCTICA PRE PROFESIONAL", start: "19:30", end: "21:00", location: "VI34" },
];
