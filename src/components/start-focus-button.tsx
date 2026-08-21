"use client";

import { SystemButton } from "./system-button";
import { requestFocus } from "@/lib/focus";

export function StartFocusButton({ children = "START FOCUS" }: { children?: React.ReactNode }) {
  return <SystemButton light onClick={() => requestFocus({ targetMinutes: 50 })}>{children}</SystemButton>;
}
