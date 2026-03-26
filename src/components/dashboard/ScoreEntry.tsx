"use client";

import { Input } from "@/components/ui/input";

export function ScoreEntry() {
  return (
    <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 w-full">
          <label className="block text-xs uppercase tracking-[0.2em] font-label text-on-surface-variant mb-3 px-2">
            Log New Stableford Score (1-45)
          </label>
          <Input
            type="number"
            min={1}
            max={45}
            placeholder="Enter score..."
            className="w-full bg-surface-container-lowest border-none rounded-xl py-4 px-6 h-auto text-xl font-headline focus-visible:ring-2 focus-visible:ring-primary/40 placeholder:text-on-surface-variant/30"
          />
        </div>
        <button className="h-14 px-10 bg-gradient-to-br from-primary to-primary-container text-on-primary font-extrabold rounded-xl transition-transform active:scale-95 hover:shadow-lg hover:shadow-primary/20">
          Submit Score
        </button>
      </div>
    </div>
  );
}
