import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

/**
 * Superuser Supabase client using SERVICE_ROLE_KEY.
 * Use ONLY in server-side contexts (Server Actions, API Routes).
 * NEVER expose to the client.
 */
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
