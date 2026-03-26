"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CharitySearchBar() {
  return (
    <div className="sticky top-20 z-40 px-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/75 dark:bg-surface-container/75 backdrop-blur-[20px] rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4 outline outline-1 outline-outline-variant/15">
          {/* Search */}
          <div className="relative flex-grow w-full">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60"
            />
            <Input
              type="text"
              placeholder="Search by name, mission, or keyword..."
              className="w-full pl-12 pr-6 py-3.5 h-auto bg-surface-container-high rounded-lg border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50 font-body"
            />
          </div>
          {/* Filters */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto">
            <select className="appearance-none w-full md:w-48 px-6 py-3.5 bg-surface-container-high rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-medium cursor-pointer text-sm">
              <option>All Categories</option>
              <option>Environment</option>
              <option>Education</option>
              <option>Health</option>
              <option>Crisis Relief</option>
            </select>
            <select className="appearance-none w-full md:w-48 px-6 py-3.5 bg-surface-container-high rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-medium cursor-pointer text-sm">
              <option>Global Region</option>
              <option>Africa</option>
              <option>South America</option>
              <option>Southeast Asia</option>
              <option>Middle East</option>
            </select>
            <button className="bg-primary text-on-primary p-3.5 rounded-lg flex items-center justify-center hover:bg-primary-container transition-colors shadow-lg shadow-primary/10">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
