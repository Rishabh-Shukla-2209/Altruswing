// src/components/shared/Navbar.tsx
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0b1326]/40 backdrop-blur-xl shadow-sm dark:shadow-[0_20px_40px_-15px_rgba(6,14,32,0.6)]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <Link href="/" className="text-2xl font-black tracking-tighter text-primary dark:text-on-surface font-headline">
          AltruSwing
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#how-it-works" className="text-slate-500 dark:text-on-surface-variant hover:text-primary dark:hover:text-on-surface transition-colors font-headline tracking-tight font-medium text-sm">
            How it Works
          </Link>
          <Link href="/charities" className="text-slate-500 dark:text-on-surface-variant hover:text-primary dark:hover:text-on-surface transition-colors font-headline tracking-tight font-medium text-sm">
            Charities
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link
            href="/login"
            className="text-slate-500 dark:text-on-surface-variant hover:text-primary dark:hover:text-on-surface text-sm font-medium transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-xl text-sm font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/10"
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
}