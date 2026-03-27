import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

// In Next.js 16, the exported function must be named 'proxy' (or default)
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
