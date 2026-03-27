import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // The 'next' param matches what we passed in the redirectTo option
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();

    // Exchange the auth code for a session cookie
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    // Log the error in production tracking
    console.error("Auth callback error:", error.message);
  }

  // Return the user to an error page or back to login if the code exchange fails
  return NextResponse.redirect(
    `${origin}/login?error=Could not authenticate with Google`,
  );
}
