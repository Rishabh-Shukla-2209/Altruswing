import { Users, IndianRupee, Heart, Trophy } from "lucide-react";
import Link from "next/link";
import { InteractiveDrawSimulator } from "@/components/admin/InteractiveDrawSimulator";
import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: totalUsers }, { data: draws }, { count: activeCharities }] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("draws").select("total_pool_cents"),
    supabase.from("charities").select("id", { count: "exact", head: true }).eq("is_active", true)
  ]);

  const totalPrizePoolCents = draws?.reduce((acc, d) => acc + (d.total_pool_cents || 0), 0) || 0;
  const totalPrizePoolStr = "$" + (totalPrizePoolCents / 100).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const { data: donations } = await supabase.from("donations").select("amount_cents").eq("status", "completed");
  const totDonations = donations?.reduce((acc, d) => acc + d.amount_cents, 0) || 0;
  const totDonationsStr = "$" + (totDonations / 100).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const reportStats = [
    { label: "Total Users", value: (totalUsers || 0).toLocaleString(), change: "Live sync active", icon: Users, color: "text-primary", border: "border-primary", href: "/admin/users" },
    { label: "Total Prize Pool", value: totalPrizePoolStr, change: `${draws?.length || 0} draws executed`, icon: IndianRupee, color: "text-secondary", border: "border-secondary", href: "/admin/draws" },
    { label: "Charity Contributions", value: totDonationsStr, change: `${activeCharities || 0} active partners`, icon: Heart, color: "text-emerald-400", border: "border-emerald-400", href: "/admin/charities" },
    { label: "Draw Statistics", value: (draws?.length || 0).toString(), change: "Total draws completed", icon: Trophy, color: "text-amber-400", border: "border-amber-400", href: "/admin/draws" },
  ];

  return (
    <>
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">
            Admin Overview
          </h2>
          <p className="text-on-surface-variant max-w-2xl font-body">
            System-wide reporting and quick access to all management modules.
          </p>
        </div>
        <div className="bg-surface-container-low px-4 py-2 rounded-xl border border-primary/5 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(186,195,255,0.2)] animate-pulse"></div>
          <span className="font-label text-[10px] uppercase tracking-[0.2em] font-bold">
            System Status: Active
          </span>
        </div>
      </section>

      {/* Reports & Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`bg-surface-container-lowest p-6 rounded-xl border-l-4 ${stat.border} hover:bg-surface-container-low transition-colors group`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                {stat.label}
              </p>
              <stat.icon size={18} className={`${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
            </div>
            <h4 className="text-3xl font-bold font-headline mb-1">{stat.value}</h4>
            <p className="text-xs text-on-surface-variant">{stat.change}</p>
          </Link>
        ))}
      </div>

      {/* Draw Management Section */}
      <div>
        <h3 className="text-xl font-bold font-headline mb-6">Active Draw Cycle</h3>
      </div>

      {/* Config + Simulation Grid */}
      <div className="mb-12">
        <InteractiveDrawSimulator />
      </div>
    </>
  );
}
