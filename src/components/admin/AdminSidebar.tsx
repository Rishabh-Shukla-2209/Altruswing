"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Heart,
  ShieldCheck,
  Plus,
  Settings,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/draws", label: "Draw Management", icon: Trophy },
  { href: "/admin/charities", label: "Charity Management", icon: Heart },
  { href: "/admin/winners", label: "Winner Verification", icon: ShieldCheck },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col py-8 px-4 h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest z-50 shadow-[40px_60px_-10px_rgba(6,14,32,0.6)]">
      <div className="mb-10 px-4">
        <h1 className="text-xl font-bold tracking-tighter text-on-surface font-headline">
          Command Center
        </h1>
        <p className="text-sm tracking-wide text-on-surface-variant opacity-60 font-headline">
          AltruSwing Admin
        </p>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm tracking-wide transition-all duration-300 active:scale-95 ${isActive
                ? "text-primary font-bold border-r-2 border-primary bg-gradient-to-r from-primary-container/10 to-transparent"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
                }`}
            >
              <item.icon size={20} />
              <span className="font-headline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
