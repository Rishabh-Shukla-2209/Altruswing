"use client";

import { useState } from "react";
import { SlidersHorizontal, BarChart3, Info, LockOpen, AlertTriangle, Loader2 } from "lucide-react";
import { runSimulation, publishDraw } from "@/app/(admin)/admin/actions/drawEngine";
import { useRouter } from "next/navigation";

export function InteractiveDrawSimulator() {
  const router = useRouter();
  const [logicType, setLogicType] = useState<"random" | "algorithmic">("random");
  const [simulation, setSimulation] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async () => {
    setIsSimulating(true);
    setError(null);
    try {
      const result = await runSimulation(logicType);
      setSimulation(result);
    } catch (err: any) {
      setError(err.message || "Simulation failed");
    } finally {
      setIsSimulating(false);
    }
  };

  const handlePublish = async () => {
    if (!simulation) return;
    setIsPublishing(true);
    setError(null);
    try {
      await publishDraw(simulation);
      alert("Results Published Successfully!");
      setSimulation(null);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to publish draw");
    } finally {
      setIsPublishing(false);
    }
  };

  // Convert cents to dollars beautifully
  const formatMoney = (cents: number) => `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="grid grid-cols-12 gap-8 items-start w-full">
      {/* Config Panel */}
      <div className="col-span-12 lg:col-span-4">
        <div className="glass-card dark:glass-panel rounded-xl p-8 outline outline-1 outline-outline-variant/15 space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <SlidersHorizontal size={20} className="text-primary" />
            <h3 className="font-headline font-bold text-lg tracking-tight uppercase">
              Draw Logic Engine
            </h3>
          </div>
          <div className="space-y-6">
            <div className="bg-surface-container-lowest/50 p-1 rounded-xl flex gap-1">
              <button 
                onClick={() => setLogicType("random")}
                className={`flex-1 py-3 px-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${logicType === "random" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-highest/50"}`}
              >
                Random Generation
              </button>
              <button 
                onClick={() => setLogicType("algorithmic")}
                className={`flex-1 py-3 px-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${logicType === "algorithmic" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-highest/50"}`}
              >
                Algorithmic (Weighted)
              </button>
            </div>

            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full py-4 px-6 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-primary font-bold text-sm tracking-widest uppercase transition-all duration-300 border border-primary/10 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSimulating ? <Loader2 size={16} className="animate-spin" /> : <BarChart3 size={16} />}
              Run Simulation / Pre-Analysis
            </button>

            {error && <div className="text-error text-xs uppercase font-bold text-center mt-2">{error}</div>}
          </div>
        </div>
      </div>

      {/* Simulation Table */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-8 w-full">
        {simulation ? (
          <div className="bg-surface-container rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline font-bold text-lg tracking-tight">
                Live Simulation Active
              </h3>
              <span className="bg-primary/10 px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse border border-primary/20">
                Ready for Publish
              </span>
            </div>
            
            {/* Draw Numbers Display */}
            <div className="px-8 py-6 border-b border-outline-variant/10 flex flex-col items-center justify-center bg-surface-container-lowest gap-3">
              <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                Selected Winning Numbers
              </p>
              <div className="flex gap-4">
                 {simulation.tiers[0].winningNumbers.map((num: number, idx: number) => (
                    <div key={idx} className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center text-xl font-bold font-mono shadow-md">
                        {num}
                    </div>
                 ))}
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant">
                    <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em]">Match Tier</th>
                    <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em]">Winners</th>
                    <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em]">Payout/Unit</th>
                    <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em]">Total Liability</th>
                    <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {simulation.tiers.map((t: any) => (
                    <tr key={t.tier} className="hover:bg-surface-container-highest/30 transition-colors">
                      <td className="px-8 py-5 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${t.highlight ? "bg-primary/10 text-primary" : "bg-surface-container-highest text-outline"}`}>
                          {t.tier}
                        </div>
                        <span className="text-sm font-medium">{t.name}</span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold">{t.winnersCount}</td>
                      <td className="px-8 py-5 text-sm font-mono text-primary">{formatMoney(t.payoutPerUnit * 100)}</td>
                      <td className="px-8 py-5 text-sm font-mono">{formatMoney(t.liability)}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${t.statusColor === "emerald" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Execution Barrier */}
            <div className="bg-surface-container border-t-2 border-error/20 p-8 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-error/5 pointer-events-none opacity-20"></div>
                <div className="space-y-1 relative z-10">
                    <h3 className="text-xl font-black font-headline tracking-tight uppercase text-error">
                        Finalize Draw & Lock Results
                    </h3>
                    <p className="text-on-surface-variant max-w-md mx-auto text-xs">
                        Publishing transfers <b>{formatMoney(simulation.rollover)}</b> to next month rollover. This action is irreversible.
                    </p>
                </div>
                <button 
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="group relative px-8 py-4 bg-transparent border-2 border-error rounded-xl overflow-hidden transition-all duration-300 hover:bg-error active:scale-95 active:duration-75 disabled:opacity-50"
                 >
                    <span className="relative z-10 font-bold text-sm tracking-[0.2em] text-error group-hover:text-on-error uppercase flex items-center gap-3">
                        {isPublishing ? <Loader2 size={16} className="animate-spin" /> : <LockOpen size={16} />}
                        Publish Official Results
                    </span>
                    <div className="absolute inset-0 bg-error opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </div>
          </div>
        ) : (
          <div className="bg-surface-container rounded-xl flex items-center justify-center p-20 border border-dashed border-outline-variant/30 text-outline h-full">
             <div className="text-center space-y-4">
                 <BarChart3 size={40} className="mx-auto opacity-20" />
                 <p className="font-label text-sm uppercase tracking-widest">Awaiting Simulation Task</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
