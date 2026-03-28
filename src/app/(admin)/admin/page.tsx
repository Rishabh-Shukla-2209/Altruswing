import { AlertTriangle, LockOpen, Users, IndianRupee, Heart, Trophy } from "lucide-react";
import Link from "next/link";
import { DrawConfigPanel } from "@/components/admin/DrawConfigPanel";
import { SimulationTable } from "@/components/admin/SimulationTable";

const reportStats = [
  { label: "Total Users", value: "14,208", change: "+312 this month", icon: Users, color: "text-primary", border: "border-primary", href: "/admin/users" },
  { label: "Total Prize Pool", value: "$4.2M", change: "Cycle #883 pending", icon: IndianRupee, color: "text-secondary", border: "border-secondary", href: "/admin/draws" },
  { label: "Charity Contributions", value: "$402,900", change: "24 active partners", icon: Heart, color: "text-emerald-400", border: "border-emerald-400", href: "/admin/charities" },
  { label: "Draw Statistics", value: "882", change: "99.82% algo confidence", icon: Trophy, color: "text-amber-400", border: "border-amber-400", href: "/admin/draws" },
];

const riskMetrics = [
  {
    label: "Expected Charity Yield",
    value: "$142,500",
    progress: "w-3/4",
    borderColor: "border-primary",
    barColor: "bg-primary",
  },
  {
    label: "Algorithmic Confidence",
    value: "99.82%",
    progress: "w-full",
    borderColor: "border-secondary",
    barColor: "bg-secondary opacity-80",
  },
  {
    label: "System Entropy Level",
    value: "Low (0.004)",
    progress: "w-[5%]",
    borderColor: "border-error",
    barColor: "bg-error",
  },
];

export default function AdminDashboard() {
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
      <div className="grid grid-cols-12 gap-8 items-start w-full">
        {/* <div className="col-span-12 lg:col-span-4">
          <DrawConfigPanel />
        </div> */}
        <div className="col-span-12 lg:col-span-8 w-full">
          <SimulationTable />
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {riskMetrics.map((m) => (
          <div
            key={m.label}
            className={`bg-surface-container-lowest p-6 rounded-xl border-l-4 ${m.borderColor} space-y-2`}
          >
            <p className="font-label text-[10px] uppercase tracking-widest text-outline">
              {m.label}
            </p>
            <h4 className="text-2xl font-bold font-headline">{m.value}</h4>
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className={`${m.barColor} h-full ${m.progress}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Execution Barrier */}
      <div className="bg-surface-container border border-error/20 p-12 rounded-2xl flex flex-col items-center text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-error/5 pointer-events-none opacity-20"></div>
        <div className="w-16 h-16 rounded-full bg-error-container flex items-center justify-center text-error shadow-[0_0_15px_rgba(255,180,171,0.15)] mb-4">
          <AlertTriangle size={32} />
        </div>
        <div className="space-y-2 relative z-10">
          <h3 className="text-3xl font-black font-headline tracking-tight uppercase">
            System Finalization Required
          </h3>
          <p className="text-on-surface-variant max-w-md mx-auto">
            Publishing these results will trigger immutable blockchain entries
            and initiate automated payout transfers. This action is irreversible.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-outline mb-4">
            <span className="w-8 h-[1px] bg-outline/20"></span>
            Authority Authentication
            <span className="w-8 h-[1px] bg-outline/20"></span>
          </div>
          <button className="group relative px-12 py-6 bg-transparent border-2 border-error rounded-xl overflow-hidden transition-all duration-300 hover:bg-error active:scale-95 active:duration-75">
            <span className="relative z-10 font-black text-lg tracking-[0.2em] text-error group-hover:text-on-error uppercase flex items-center gap-3">
              <LockOpen size={20} />
              Publish Official Results
            </span>
            <div className="absolute inset-0 bg-error opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="text-[10px] text-outline font-medium tracking-widest uppercase mt-2">
            Requires Root Level Credentials
          </p>
        </div>
      </div>
    </>
  );
}
