"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Flag, Medal, CreditCard, PlusCircle } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/winnings", label: "Rewards", icon: Medal },
  { href: "/dashboard/settings", label: "Subscriptions", icon: CreditCard },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col py-8 px-4 gap-2 h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest z-40 mt-20">
      <div className="px-4 mb-8">
        <p className="font-headline font-black text-primary text-lg">Alex Morgan</p>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-label">
          Pro Member
        </p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${isActive
                ? "bg-surface-container text-primary shadow-[0_0_10px_rgba(186,195,255,0.1)]"
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
            >
              <item.icon size={20} />
              <span className="font-label text-sm uppercase tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
