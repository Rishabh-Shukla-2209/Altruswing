"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";

export function WinnerFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [verification, setVerification] = useState(searchParams.get("verification") || "");
  const [payout, setPayout] = useState(searchParams.get("payout") || "");
  
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    } else {
      params.delete("q");
    }
    
    if (verification) {
      params.set("verification", verification);
    } else {
      params.delete("verification");
    }
    
    if (payout) {
      params.set("payout", payout);
    } else {
      params.delete("payout");
    }
    
    router.push(`?${params.toString()}`);
  }, [debouncedQuery, verification, payout, router, searchParams]);

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
          placeholder="Search by winner name, email..."
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
      
      <div className="flex gap-2">
        <select
          value={verification}
          onChange={(e) => setVerification(e.target.value)}
          className="appearance-none px-4 py-3 bg-surface-container-lowest rounded-xl border-none text-on-surface font-medium text-sm cursor-pointer focus:ring-2 focus:ring-primary/20 outline-none min-w-[150px]"
        >
          <option value="">All Verification</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
        </select>
        
        <select
          value={payout}
          onChange={(e) => setPayout(e.target.value)}
          className="appearance-none px-4 py-3 bg-surface-container-lowest rounded-xl border-none text-on-surface font-medium text-sm cursor-pointer focus:ring-2 focus:ring-primary/20 outline-none min-w-[150px]"
        >
          <option value="">All Payouts</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>
  );
}
