import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CategoryType, RegionType } from "@/types/shared";

interface CharityFilters {
  searchQuery?: string;
  category?: CategoryType | "";
  location?: RegionType | "";
  pageSize?: number;
}

export function useCharitiesInfinite({
  searchQuery = "",
  category = "",
  location = "",
  pageSize = 6,
}: CharityFilters = {}) {
  const supabase = createClient();

  return useInfiniteQuery({
    // Adding all filters to the queryKey ensures React Query resets
    // the infinite list when any filter changes.
    queryKey: ["charities", searchQuery, category, location],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * pageSize;
      const to = from + pageSize - 1;

      let query = supabase.from("charities").select("*").eq("is_active", true);

      // 1. Search purely by name (case-insensitive partial match)
      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }

      // 2. Exact match filter for category
      if (category) {
        query = query.eq("category", category);
      }

      // 3. Exact match filter for location
      if (location) {
        query = query.eq("location", location);
      }

      const { data, error } = await query
        .order("created_at", { ascending: false })
        .order("id", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        data,
        nextPage: data.length === pageSize ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
}

export function useCharities(page: number, pageSize = 10) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["charities", page],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from("charities")
        .select("*", { count: "exact" })
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        data,
        count,
        hasMore: to + 1 < (count ?? 0),
      };
    },
  });
}

export function useCharity(id: string) {
  const supabase = createClient();
  return useQuery({
    queryKey: ["charity", id],
    queryFn: async () => {
      // In a real app we might fetch the specific related tables,
      // but here we demonstrate joining events and images
      const { data, error } = await supabase
        .from("charities")
        .select("*, charity_events(*), charity_images(*)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}
