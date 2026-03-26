"use client";

import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/shared/ModeToggle";

export function AdminTopBar() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-8 w-full h-16 bg-surface/40 dark:bg-surface/40 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <span className="font-headline text-xs font-medium tracking-widest uppercase text-on-surface-variant">
          Current View /
        </span>
        <span className="text-lg font-black text-primary font-headline tracking-tight">
          Admin Console
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search
            size={14}
            className="absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 text-outline"
          />
          <Input
            type="text"
            placeholder="GLOBAL COMMAND..."
            className="bg-surface-container-lowest border-none rounded-xl pl-10 pr-4 py-1.5 h-auto text-xs font-label tracking-widest focus-visible:ring-1 focus-visible:ring-primary/40 w-64 placeholder:text-outline/50 uppercase"
          />
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <button className="text-primary hover:text-on-surface transition-all relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-error rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-container-highest/30 px-2 py-1 rounded-lg transition-all">
            <User size={20} className="text-primary" />
            <span className="text-[10px] font-bold tracking-tighter uppercase text-on-surface">
              Admin_Root
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
