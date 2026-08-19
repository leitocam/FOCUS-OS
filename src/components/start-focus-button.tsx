"use client";

import { SystemButton } from "./system-button";

export function StartFocusButton({ children = "START FOCUS" }: { children?: React.ReactNode }) {
  return <SystemButton light onClick={() => window.dispatchEvent(new Event("focus-os:start"))}>{children}</SystemButton>;
}
