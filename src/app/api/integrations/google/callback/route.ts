import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { exchangeGoogleCode, googleAccountEmail } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const errorRedirect = (reason: string) => NextResponse.redirect(new URL(`/calendar?status=${reason}`, request.url));
  const state = request.nextUrl.searchParams.get("state");
  const code = request.nextUrl.searchParams.get("code");
  if (!state || state !== request.cookies.get("focus-os-google-state")?.value || !code) return errorRedirect("oauth_failed");
  const supabase = await createClient();
  const { data: jwt } = await supabase.auth.getClaims();
  if (!jwt?.claims?.sub) return errorRedirect("auth_required");
  try {
    const token = await exchangeGoogleCode(code);
    const admin = createAdminClient();
    const accountEmail = await googleAccountEmail(token.access_token);
    const { error } = await admin.from("calendar_connections").upsert({ user_id: jwt.claims.sub, provider: "google", calendar_id: "primary", access_token: token.access_token, refresh_token: token.refresh_token ?? null, expires_at: new Date(Date.now() + token.expires_in * 1000).toISOString(), scope: token.scope ?? null, account_email: accountEmail }, { onConflict: "user_id,provider,calendar_id" });
    if (error) throw error;
    const response = NextResponse.redirect(new URL("/calendar?status=connected", request.url));
    response.cookies.delete("focus-os-google-state");
    return response;
  } catch { return errorRedirect("oauth_failed"); }
}
