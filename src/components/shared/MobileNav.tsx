import Link from "next/link";
import { Flag, Heart, Medal, Users } from "lucide-react";

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 h-24 md:hidden bg-white/90 dark:bg-surface-container-lowest/90 backdrop-blur-2xl rounded-t-[3rem] shadow-[0_-10px_40px_rgba(25,28,31,0.05)] dark:shadow-[0_-10px_40px_rgba(6,14,32,0.4)] border-t border-white/20 dark:border-outline-variant/10">
      <Link
        href="/dashboard"
        className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-full w-14 h-14 -mt-6 shadow-lg active:scale-90 duration-200"
      >
        <Flag size={24} />
        <span className="font-body text-[8px] font-bold uppercase tracking-widest mt-1">
          Game
        </span>
      </Link>
      <Link
        href="/charities"
        className="flex flex-col items-center justify-center text-slate-400 dark:text-on-surface-variant p-2 hover:text-primary transition-all"
      >
        <Heart size={24} />
        <span className="font-body text-[8px] font-bold uppercase tracking-widest mt-1">
          Impact
        </span>
      </Link>
      <Link
        href="/rewards"
        className="flex flex-col items-center justify-center text-slate-400 dark:text-on-surface-variant p-2 hover:text-primary transition-all"
      >
        <Medal size={24} />
        <span className="font-body text-[8px] font-bold uppercase tracking-widest mt-1">
          Rewards
        </span>
      </Link>
      <Link
        href="/community"
        className="flex flex-col items-center justify-center text-slate-400 dark:text-on-surface-variant p-2 hover:text-primary transition-all"
      >
        <Users size={24} />
        <span className="font-body text-[8px] font-bold uppercase tracking-widest mt-1">
          Community
        </span>
      </Link>
    </nav>
  );
}
