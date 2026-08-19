"use client";

import { useEffect, useState } from "react";

const commands = ["START / FOCUS SESSION", "START / INTERNSHIP", "ADD / TASK", "OPEN / CALENDAR"];
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const down = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen((value) => !value); } if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown", down); return () => window.removeEventListener("keydown", down); }, []);
  return <><button className="command-trigger" onClick={() => setOpen(true)} aria-haspopup="dialog"><span>COMMAND</span><kbd>⌘ K</kbd></button>
    {open && <div className="command-backdrop" onMouseDown={() => setOpen(false)}><section className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(e) => e.stopPropagation()}>
      <div className="command-input"><span aria-hidden="true">&gt;</span><input autoFocus aria-label="Search command" placeholder="TYPE A COMMAND" /></div>
      <div className="command-results">{commands.map((command, index) => <button key={command} onClick={() => setOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{command}<b>↗</b></button>)}</div>
      <footer>ESC / CLOSE <span>FOCUS//OS COMMAND LAYER</span></footer>
    </section></div>}
  </>;
}
