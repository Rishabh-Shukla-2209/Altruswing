import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

export function useDraws() {
  const supabase = createClient();
  return useQuery({
    queryKey: ["draws"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("draws")
        .select("*")
        .order("draw_month", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}
