import { Plus, Eye, Play, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { InteractiveDrawSimulator } from "@/components/admin/InteractiveDrawSimulator";

export default async function DrawsPage() {
  const supabase = await createClient();

  const [{ data: drawHistory, error }, { count: totalWinners }] = await Promise.all([
    supabase.from("draws").select("*").order("draw_month", { ascending: false }),
    supabase.from("winners").select("*", { count: "exact", head: true }),
  ]);

  if (error) console.error("Failed to fetch draws", error);

  const safeDraws = drawHistory || [];
  const totalDraws = safeDraws.length;
  const totalPoolCents = safeDraws.reduce((acc, d) => acc + (d.total_pool_cents || 0), 0);
  const avgPoolCents = totalDraws > 0 ? Math.round(totalPoolCents / totalDraws) : 0;

  const formatMoney = (cents: number) => "$" + (cents / 100).toLocaleString(undefined, { maximumFractionDigits: 0 });

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
      </section>

      {/* Stats — all dynamically computed */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Draws", value: totalDraws.toString(), border: "border-primary" },
          { label: "Total Prize Pool", value: formatMoney(totalPoolCents), border: "border-secondary" },
          { label: "Total Winners", value: (totalWinners || 0).toLocaleString(), border: "border-tertiary" },
          { label: "Avg. Pool Size", value: formatMoney(avgPoolCents), border: "border-primary-container" },
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
      <div className="w-full mb-12">
        <InteractiveDrawSimulator />
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
                  Winning Numbers
                </th>
                <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Prize Pool
                </th>
                <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Rollover
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
              {safeDraws.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-10 text-center text-on-surface-variant">
                    No draws found. Run a simulation above to get started.
                  </td>
                </tr>
              ) : (
                safeDraws.map((d) => (
                  <tr
                    key={d.id}
                    className="group hover:bg-surface-container-highest/30 transition-colors"
                  >
                    <td className="px-8 py-5 font-mono text-primary font-bold text-sm">
                      {d.id.substring(0, 8)}
                    </td>
                    <td className="px-8 py-5 text-sm">
                      {d.draw_month ? new Date(d.draw_month).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex gap-1.5">
                        {(d.winning_numbers || []).map((n: number, i: number) => (
                          <span
                            key={i}
                            className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-mono font-bold">
                      {formatMoney(d.total_pool_cents || 0)}
                    </td>
                    <td className="px-8 py-5 text-sm font-mono text-on-surface-variant">
                      {formatMoney(d.rollover_cents || 0)}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${d.status === "Published"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                      >
                        {d.status || "Draft"}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors">
                          <Eye size={14} />
                        </button>
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
