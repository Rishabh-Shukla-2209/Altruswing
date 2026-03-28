"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";

export function UserSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className="relative flex-1">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
      />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users by email or ID..."
        className="pl-12 pr-12 py-3 h-auto bg-surface-container-lowest border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-outline/50"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
