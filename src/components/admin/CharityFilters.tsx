"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Constants } from "@/types/database.types";

const CATEGORIES = Constants.public.Enums.CATEGORIES;

export function CharityFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    } else {
      params.delete("q");
    }
    
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    
    router.push(`?${params.toString()}`);
  }, [debouncedQuery, category, router, searchParams]);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search charities by name or description..."
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
      
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="appearance-none px-6 py-3 bg-surface-container-lowest rounded-xl border-none text-on-surface font-medium text-sm cursor-pointer focus:ring-2 focus:ring-primary/20 outline-none min-w-[200px]"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c.replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
