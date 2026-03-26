const tiers = [
  {
    tier: 5,
    name: "Grand Jackpot",
    winners: "01",
    payout: "$250,000.00",
    liability: "$250,000.00",
    status: "Optimal",
    statusColor: "emerald",
    highlight: true,
  },
  {
    tier: 4,
    name: "Secondary Tier",
    winners: "42",
    payout: "$1,200.00",
    liability: "$50,400.00",
    status: "Optimal",
    statusColor: "emerald",
    highlight: false,
  },
  {
    tier: 3,
    name: "Standard Match",
    winners: "814",
    payout: "$45.00",
    liability: "$36,630.00",
    status: "High Vol",
    statusColor: "amber",
    highlight: false,
  },
];

export function SimulationTable() {
  return (
    <div className="bg-surface-container rounded-xl overflow-hidden flex flex-col w-full">
      <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center">
        <h3 className="font-headline font-bold text-lg tracking-tight">
          Simulation Results Preview:{" "}
          <span className="text-primary opacity-80">Cycle #882</span>
        </h3>
        <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          Iter: 4/5
        </span>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                Match Tier
              </th>
              <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                Est. Winners
              </th>
              <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                Payout Per Unit
              </th>
              <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                Total Liability
              </th>
              <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {tiers.map((t) => (
              <tr
                key={t.tier}
                className="group hover:bg-surface-container-highest/30 transition-colors"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${t.highlight
                        ? "bg-primary/10 text-primary"
                        : "bg-surface-container-highest text-outline"
                        }`}
                    >
                      {t.tier}
                    </div>
                    <span className="text-sm font-medium">{t.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-bold">{t.winners}</td>
                <td className="px-8 py-5 text-sm font-mono text-primary">
                  {t.payout}
                </td>
                <td className="px-8 py-5 text-sm font-mono">{t.liability}</td>
                <td className="px-8 py-5">
                  <span
                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${t.statusColor === "emerald"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-auto bg-surface-container-low px-8 py-4 flex justify-between items-center text-xs">
        <span className="text-on-surface-variant italic">
          Simulation verified against blockchain hash: 0x82...f92a
        </span>
        <div className="flex gap-4">
          <span className="font-bold text-outline">
            TOTAL POOL: $337,030.00
          </span>
          <span className="font-bold text-primary">
            REMAINING: $1,422,970.00
          </span>
        </div>
      </div>
    </div>
  );
}
