"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // 1. Fetch initial session
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsCheckingAuth(false);
    };
    fetchSession();

    // 2. Listen for cross-tab logins/logouts
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh(); // Crucial: Clears the Next.js client-side route cache
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0b1326]/40 backdrop-blur-xl shadow-sm dark:shadow-[0_20px_40px_-15px_rgba(6,14,32,0.6)]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-primary dark:text-on-surface font-headline"
        >
          AltruSwing
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-8">
          {!isCheckingAuth && !user && <Link
            href="/#how-it-works"
            className="text-slate-500 dark:text-on-surface-variant hover:text-primary dark:hover:text-on-surface transition-colors font-headline tracking-tight font-medium text-sm"
          >
            How it Works
          </Link>}
          <Link
            href="/charities"
            className="text-slate-500 dark:text-on-surface-variant hover:text-primary dark:hover:text-on-surface transition-colors font-headline tracking-tight font-medium text-sm"
          >
            Charities
          </Link>
          {user && <Link
            href="/dashboard"
            className="text-slate-500 dark:text-on-surface-variant hover:text-primary dark:hover:text-on-surface transition-colors font-headline tracking-tight font-medium text-sm"
          >
            Dashboard
          </Link>}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <ModeToggle />

          {/* Prevent layout shift while checking auth */}
          {!isCheckingAuth &&
            (user ? (
              // --- AUTHENTICATED STATE ---
              <button
                onClick={handleLogout}
                className="bg-surface-container-high border border-outline-variant/20 dark:text-on-surface px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-surface-container-highest transition-all duration-300 shadow-sm"
              >
                Log Out
              </button>
            ) : (
              // --- UNAUTHENTICATED STATE ---
              <>
                <Link
                  href="/login"
                  className="text-slate-500 dark:text-on-surface-variant hover:text-primary dark:hover:text-on-surface text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-linear-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-xl text-sm font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/10"
                >
                  Join Now
                </Link>
              </>
            ))}
        </div>
      </div>
    </nav>
  );
}
