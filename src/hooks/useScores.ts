import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

export function useScores(userId: string | null) {
  const supabase = createClient();
  return useQuery({
    queryKey: ["scores", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("scores")
        .select("*")
        .eq("user_id", userId)
        .order("played_on", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

export function useAddScore() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, playedOn, stablefordScore }: { userId: string; playedOn: string; stablefordScore: number }) => {
      const { data, error } = await supabase.from("scores").insert({
        user_id: userId,
        played_on: playedOn,
        stableford_score: stablefordScore,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["scores", variables.userId] });
    },
  });
}
