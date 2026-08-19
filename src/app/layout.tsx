import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FOCUS//OS",
  description: "Personal operating system for study, focus, and internship.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
