import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { googleAuthorizationUrl } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: jwt } = await supabase.auth.getClaims();
  if (!jwt?.claims?.sub) return NextResponse.redirect(new URL("/login", request.url));
  const state = crypto.randomUUID();
  const response = NextResponse.redirect(googleAuthorizationUrl(state));
  response.cookies.set("focus-os-google-state", state, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 600, path: "/" });
  return response;
}
