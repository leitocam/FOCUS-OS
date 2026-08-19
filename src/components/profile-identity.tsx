"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ProfileIdentity() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => { void createClient().auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null)); }, []);
  return <span className="profile-identity"><i aria-hidden="true" />{email ? email.split("@")[0].toUpperCase() : "USER"}</span>;
}
