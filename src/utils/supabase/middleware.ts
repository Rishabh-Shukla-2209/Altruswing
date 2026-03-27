import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Use getUser() instead of getSession() for secure server-side validation
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Define route classifications
  const isApiWebhook = pathname.startsWith("/api/stripe/webhook");
  const isPublicStatic = pathname === "/" || pathname.startsWith("/charities");
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname === "/signup" ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/update-password");

  // Auth callbacks must remain accessible to process the OAuth/PKCE codes
  const isAuthCallback = pathname.startsWith("/auth/");

  // 1. Unauthenticated users trying to access protected routes
  if (
    !user &&
    !isPublicStatic &&
    !isAuthRoute &&
    !isApiWebhook &&
    !isAuthCallback
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 2. Authenticated users trying to access login/signup pages
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // 3. Authenticated route protections
  if (user) {
    const isAdminRoute = pathname.startsWith("/admin");
    const isSubscriberRoute = pathname.startsWith("/dashboard");
    const isSignupFlow =
      pathname.startsWith("/signup/charity") ||
      pathname.startsWith("/checkout");

    if (pathname === "/" || isAdminRoute || isSubscriberRoute || isSignupFlow) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, subscription_status")
        .eq("id", user.id)
        .single();

      if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = profile?.role === "ADMIN" ? "/admin" : "/dashboard";
        return NextResponse.redirect(url);
      }

      if (isAdminRoute && profile?.role !== "ADMIN") {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }

      if (isSignupFlow && profile?.subscription_status === "active") {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
