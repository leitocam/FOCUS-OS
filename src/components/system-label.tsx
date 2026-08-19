export function SystemLabel({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return <p className={`system-label${active ? " is-active" : ""}`}>{active && <span aria-hidden="true">● </span>}{children}</p>;
}
