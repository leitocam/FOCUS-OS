type GoogleToken = { access_token: string; refresh_token?: string; expires_in: number; scope?: string };
type Connection = { id: string; user_id: string; calendar_id: string; access_token: string; refresh_token: string | null; expires_at: string | null };

const googleTokenUrl = "https://oauth2.googleapis.com/token";
const scopes = ["openid", "email", "https://www.googleapis.com/auth/calendar.readonly", "https://www.googleapis.com/auth/calendar.events"];

export function googleAuthorizationUrl(state: string) {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({ client_id: process.env.GOOGLE_CALENDAR_CLIENT_ID!, redirect_uri: process.env.GOOGLE_CALENDAR_REDIRECT_URI!, response_type: "code", access_type: "offline", prompt: "consent", scope: scopes.join(" "), state }).toString();
  return url.toString();
}

async function tokenRequest(params: URLSearchParams): Promise<GoogleToken> {
  const response = await fetch(googleTokenUrl, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: params, cache: "no-store" });
  if (!response.ok) throw new Error("Google token exchange failed");
  return response.json() as Promise<GoogleToken>;
}

export function exchangeGoogleCode(code: string) {
  return tokenRequest(new URLSearchParams({ code, client_id: process.env.GOOGLE_CALENDAR_CLIENT_ID!, client_secret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET!, redirect_uri: process.env.GOOGLE_CALENDAR_REDIRECT_URI!, grant_type: "authorization_code" }));
}

export async function validGoogleAccessToken(connection: Connection, update: (values: Record<string, unknown>) => Promise<void>) {
  if (!connection.expires_at || new Date(connection.expires_at).getTime() > Date.now() + 60_000) return connection.access_token;
  if (!connection.refresh_token) throw new Error("Google connection needs to be reauthorized");
  const token = await tokenRequest(new URLSearchParams({ refresh_token: connection.refresh_token, client_id: process.env.GOOGLE_CALENDAR_CLIENT_ID!, client_secret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET!, grant_type: "refresh_token" }));
  await update({ access_token: token.access_token, expires_at: new Date(Date.now() + token.expires_in * 1000).toISOString() });
  return token.access_token;
}

export async function googleApi<T>(url: string, token: string, init?: RequestInit) {
  const response = await fetch(url, { ...init, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init?.headers ?? {}) }, cache: "no-store" });
  if (!response.ok) throw new Error(`Google Calendar request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export async function googleAccountEmail(token: string) {
  const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!response.ok) return null;
  const profile = await response.json() as { email?: string };
  return profile.email ?? null;
}
