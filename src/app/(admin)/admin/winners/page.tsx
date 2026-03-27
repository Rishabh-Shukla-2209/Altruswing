"use client";
import {
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  DollarSign,
  Download,
  Loader2,
} from "lucide-react";
import { useWinners } from "@/hooks/useWinners";
import { Input } from "@/components/ui/input";

export default function WinnersPage() {
  const { data: winners = [], isLoading } = useWinners();
  return (
    <>
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">
            Winner Verification
          </h2>
          <p className="text-on-surface-variant max-w-2xl">
            View the full winners list, verify score submissions, and manage
            payout statuses.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-highest border border-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-on-primary transition-all">
          <Download size={16} />
          Export CSV
        </button>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Winners", value: "857", border: "border-primary" },
          {
            label: "Pending Verification",
            value: "42",
            border: "border-amber-400",
          },
          {
            label: "Payouts Completed",
            value: "$312,800",
            border: "border-emerald-400",
          },
          {
            label: "Payouts Pending",
            value: "$24,230",
            border: "border-error",
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

      {/* Search + Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
          />
          <Input
            placeholder="Search by winner name, email, or draw cycle..."
            className="pl-12 pr-4 py-3 h-auto bg-surface-container-lowest border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-outline/50"
          />
        </div>
        <select className="appearance-none px-6 py-3 bg-surface-container-lowest rounded-xl border-none text-on-surface font-medium text-sm cursor-pointer">
          <option>All Verification</option>
          <option>Verified</option>
          <option>Pending</option>
        </select>
        <select className="appearance-none px-6 py-3 bg-surface-container-lowest rounded-xl border-none text-on-surface font-medium text-sm cursor-pointer">
          <option>All Payouts</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Winners Table */}
      <div className="bg-surface-container rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Winner
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Draw
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Tier
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Prize
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Submitted
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Verification
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Payout
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  </td>
                </tr>
              ) : winners.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-on-surface-variant">
                    No winners found.
                  </td>
                </tr>
              ) : (
                winners.map((w: any) => (
                <tr
                  key={w.id}
                  className="group hover:bg-surface-container-highest/30 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div>
                      <div className="font-medium text-sm">{w.profiles?.email?.split('@')[0] || "User"}</div>
                      <div className="text-xs text-on-surface-variant">
                        {w.profiles?.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-primary text-sm font-bold">
                    {w.draws?.draw_month}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                          w.matched_count === 5
                            ? "bg-primary/10 text-primary"
                            : "bg-surface-container-highest text-outline"
                        }`}
                      >
                        {w.matched_count}
                      </div>
                      <span className="text-sm">Tier {w.matched_count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-sm font-bold">
                    ${(w.prize_cents / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">
                    {w.created_at ? new Date(w.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-5">
                    {w.payment_status === "Completed" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                        <CheckCircle2 size={10} />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                        <XCircle size={10} />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    {w.payment_status === "Completed" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                        <DollarSign size={10} />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-error/10 text-error text-[10px] font-bold uppercase tracking-widest border border-error/20">
                        <DollarSign size={10} />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1">
                      {w.proof_image_url && (
                        <button
                          className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                          title="View Screenshot"
                        >
                          <Eye size={14} />
                        </button>
                      )}
                      {w.payment_status !== "Completed" && (
                        <button
                          className="p-2 rounded-lg hover:bg-emerald-500/10 text-on-surface-variant hover:text-emerald-400 transition-colors"
                          title="Verify"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                      {w.payment_status !== "Completed" && (
                        <button
                          className="p-2 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors"
                          title="Mark as Paid"
                        >
                          <DollarSign size={14} />
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
        <div className="bg-surface-container-low px-6 py-4 flex justify-between items-center text-xs text-on-surface-variant">
          <span>Showing 1-5 of 857 winners</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-primary text-on-primary font-bold">
              1
            </button>
            <button className="px-3 py-1 rounded-md bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors">
              2
            </button>
            <button className="px-3 py-1 rounded-md bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
