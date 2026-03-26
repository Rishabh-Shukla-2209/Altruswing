import { SlidersHorizontal, BarChart3, Info } from "lucide-react";

export function DrawConfigPanel() {
  return (
    <div className="glass-card dark:glass-panel rounded-xl p-8 outline outline-1 outline-outline-variant/15 space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <SlidersHorizontal size={20} className="text-primary" />
        <h3 className="font-headline font-bold text-lg tracking-tight uppercase">
          Draw Logic Engine
        </h3>
      </div>
      <div className="space-y-6">
        {/* Toggle Logic */}
        <div className="bg-surface-container-lowest/50 p-1 rounded-xl flex gap-1">
          <button className="flex-1 py-3 px-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all bg-primary text-on-primary">
            Random Generation
          </button>
          <button className="flex-1 py-3 px-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all text-on-surface-variant hover:bg-surface-container-highest/50">
            Algorithmic (Weighted)
          </button>
        </div>

        {/* Param Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-outline">
              Minimum Participation Threshold
            </label>
            <div className="bg-surface-container-lowest rounded-xl p-4 flex justify-between items-center">
              <span className="font-headline font-bold">15,000</span>
              <span className="text-[10px] text-primary font-bold">
                ENTRIES
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-outline">
              Weight Bias Factor (Charity Tier)
            </label>
            <div className="bg-surface-container-lowest rounded-xl p-4 flex justify-between items-center">
              <span className="font-headline font-bold">1.25x</span>
              <Info size={14} className="text-outline" />
            </div>
          </div>
        </div>

        <button className="w-full py-4 px-6 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-primary font-bold text-sm tracking-widest uppercase transition-all duration-300 border border-primary/10 flex items-center justify-center gap-3">
          <BarChart3 size={16} />
          Run Simulation / Pre-Analysis
        </button>
      </div>
    </div>
  );
}
