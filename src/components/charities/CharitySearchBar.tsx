"use client";

import { FunnelPlus, FunnelX, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Constants } from "@/types/database.types";
import { formatEnum } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { CategoryType, RegionType } from "@/types/shared";

export function CharitySearchBar({
  region,
  setRegion,
  category,
  setCategory,
  query,
  setQuery,
}: {
  region: string;
  setRegion: Dispatch<SetStateAction<RegionType | "">>;
  category: string;
  setCategory: Dispatch<SetStateAction<CategoryType | "">>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) {
  const categories = Constants.public.Enums.CATEGORIES;
  const regions = Constants.public.Enums.REGION;

  return (
    <div className="sticky top-20 z-40 px-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/75 dark:bg-surface-container/75 backdrop-blur-[20px] rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4 outline outline-outline-variant/15">
          {/* Search */}
          <div className="relative grow w-full">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60"
            />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-12 pr-6 py-3.5 h-auto bg-surface-container-high rounded-lg border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50 font-body"
            />
          </div>
          {/* Filters */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType | "")}
              className="appearance-none w-full md:w-48 px-6 py-3.5 bg-surface-container-high rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-medium cursor-pointer text-sm"
            >
              <option value="">Select Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {formatEnum(c)}
                </option>
              ))}
            </select>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as RegionType | "")}
              className="appearance-none w-full md:w-48 px-6 py-3.5 bg-surface-container-high rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-medium cursor-pointer text-sm"
            >
              <option value="">Select Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {formatEnum(r)}
                </option>
              ))}
            </select>
            <button className="bg-primary text-on-primary p-3.5 rounded-lg flex items-center justify-center hover:cursor-pointer transition-colors shadow-lg shadow-primary/10">
              {region || category ? (
                <FunnelX
                  size={20}
                  color="blue"
                  onClick={() => {
                    setRegion("");
                    setCategory("");
                  }}
                />
              ) : (
                <FunnelPlus size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
