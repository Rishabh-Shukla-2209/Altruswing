import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

export function useWinners() {
  const supabase = createClient();
  return useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("winners")
        .select("*, draws(*), profiles(email)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useUserWinnings(userId: string | null) {
  const supabase = createClient();
  return useQuery({
    queryKey: ["winnings", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("winners")
        .select("*, draws(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}
