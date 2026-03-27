"use client";
import {
  Plus,
  Play,
  Eye,
  BarChart3,
  SlidersHorizontal,
  Info,
  Loader2,
} from "lucide-react";
import { useDraws } from "@/hooks/useDraws";
import { DrawConfigPanel } from "@/components/admin/DrawConfigPanel";
import { SimulationTable } from "@/components/admin/SimulationTable";

export default function DrawsPage() {
  const { data: drawHistory = [], isLoading } = useDraws();
  
  return (
    <>
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">
            Draw Management
          </h2>
          <p className="text-on-surface-variant max-w-2xl">
            Configure draw logic, run simulations, and publish official results
            for prize distribution.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm hover:opacity-90 transition-opacity">
          <Plus size={16} />
          New Draw Cycle
        </button>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Draws", value: "882", border: "border-primary" },
          {
            label: "Total Prize Pool",
            value: "$4.2M",
            border: "border-secondary",
          },
          {
            label: "Total Winners",
            value: "32,480",
            border: "border-tertiary",
          },
          {
            label: "Avg. Pool Size",
            value: "$310K",
            border: "border-primary-container",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-surface-container-lowest p-5 rounded-xl border-l-4 ${stat.border}`}
          >
            <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">
              {stat.label}
            </p>
            <h4 className="text-2xl font-bold font-headline">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Config + Live Simulation */}
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-4">
          <DrawConfigPanel />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <SimulationTable />
        </div>
      </div>

      {/* Draw History */}
      <div className="bg-surface-container rounded-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-outline-variant/10">
          <h3 className="font-headline font-bold text-lg tracking-tight">
            Draw History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Cycle
                </th>
                <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Date
                </th>
                <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Type
                </th>
                <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Entries
                </th>
                <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Prize Pool
                </th>
                <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Winners
                </th>
                <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Status
                </th>
                <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-8 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  </td>
                </tr>
              ) : drawHistory.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-8 py-10 text-center text-on-surface-variant">
                    No draws found.
                  </td>
                </tr>
              ) : (
                drawHistory.map((d: any) => (
                <tr
                  key={d.id}
                  className="group hover:bg-surface-container-highest/30 transition-colors"
                >
                  <td className="px-8 py-5 font-mono text-primary font-bold text-sm">
                    {d.id.substring(0, 8)}
                  </td>
                  <td className="px-8 py-5 text-sm">{d.draw_month}</td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-1 rounded-md bg-surface-container-highest text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Random
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-mono">—</td>
                  <td className="px-8 py-5 text-sm font-mono font-bold">
                    ${(d.total_pool_cents / 100).toFixed(2)}
                  </td>
                  <td className="px-8 py-5 text-sm">—</td>
                  <td className="px-8 py-5">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                        d.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors">
                        <Eye size={14} />
                      </button>
                      {d.status === "Scheduled" && (
                        <button className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors">
                          <Play size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
