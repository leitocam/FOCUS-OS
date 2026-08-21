export const focusDurations = [25, 50, 90] as const;

export type FocusStartDetail = {
  taskId?: string;
  taskTitle?: string;
  targetMinutes?: number;
};

export function requestFocus(detail: FocusStartDetail = {}) {
  window.dispatchEvent(new CustomEvent<FocusStartDetail>("focus-os:start", { detail }));
}

export function validFocusDuration(value: number) {
  return Number.isInteger(value) && value >= 15 && value <= 180 && value % 5 === 0;
}
