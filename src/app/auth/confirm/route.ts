import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  // In the PKCE flow, Supabase appends a 'code' parameter to the redirect URL
  const code = searchParams.get("code");

  // Our custom parameter to route them to Charity Selection or Update Password
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();

    // Exchange the secure code for a server-side session cookie
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Success! Redirect to the intended destination
      return NextResponse.redirect(`${origin}${next}`);
    } else {
      console.error("Auth session exchange failed:", error.message);
    }
  }

  // If there is no code, or the exchange failed, fallback to login
  return NextResponse.redirect(
    `${origin}/login?error=Verification link invalid or expired`,
  );
}
