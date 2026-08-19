type Props = { children: React.ReactNode; light?: boolean; onClick?: () => void; type?: "button" | "submit" };

export function SystemButton({ children, light = false, onClick, type = "button" }: Props) {
  return <button type={type} onClick={onClick} className={`system-button${light ? " is-light" : ""}`}><span>{children}</span><b aria-hidden="true">→</b></button>;
}
