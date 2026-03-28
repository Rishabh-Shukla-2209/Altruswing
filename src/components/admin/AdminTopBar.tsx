"use client";

import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";


export function AdminTopBar() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };
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
        <div className="flex items-center gap-4">
          <ModeToggle />
          <button
            onClick={handleLogout}
            className="bg-surface-container-high border border-outline-variant/20 dark:text-on-surface px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-surface-container-highest transition-all duration-300 shadow-sm"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
