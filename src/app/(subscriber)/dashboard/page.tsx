import { TrendingUp, Megaphone, CloudUpload, ArrowRight, HeadphonesIcon } from "lucide-react";
import Link from "next/link";
import { ScoreEntry } from "@/components/dashboard/ScoreEntry";
import { RollingScores } from "@/components/dashboard/RollingScores";
import { PhilanthropicImpact } from "@/components/dashboard/PhilanthropicImpact";
import { MonthlyDraw } from "@/components/dashboard/MonthlyDraw";

const rollingScores = [
  { date: "Apr 12", value: 32 },
  { date: "Apr 15", value: 35 },
  { date: "Apr 18", value: 38 },
  { date: "Apr 21", value: 36 },
  { date: "Apr 24", value: 42, isLatest: true },
];

export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-extrabold font-headline tracking-tight mb-2">
            Welcome back, Alex
          </h1>
          <p className="text-on-surface-variant text-lg">
            Your performance journey continues.
          </p>
        </div>
        <div className="glass-card dark:glass-panel p-4 rounded-full flex items-center gap-4 border border-outline-variant/15 pr-6">
          <div className="relative flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.4)]"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary font-headline">
                Active
              </span>
              <span className="text-xs text-on-surface-variant">
                • Premium Membership
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70">
              Renews May 1st
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column — Your Game */}
        <section className="lg:col-span-2 space-y-10">
          {/* Performance Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold font-headline">Your Game</h2>
              <TrendingUp size={24} className="text-green-400" />
            </div>
            <div className="text-sm font-label uppercase tracking-widest text-on-surface-variant">
              Last updated: 2h ago
            </div>
          </div>

          {/* Score Entry */}
          <ScoreEntry />

          {/* Rolling 5 */}
          <RollingScores scores={rollingScores} />

          {/* Action Center */}
          <div className="space-y-6">
            {/* Alert */}
            <div className="bg-error-container/20 p-6 rounded-xl flex items-center gap-6 border-l-4 border-error">
              <Megaphone size={28} className="text-error shrink-0" />
              <div className="flex-1">
                <h4 className="font-bold text-lg font-headline">
                  Action Required: Draw Winner Verification
                </h4>
                <p className="text-sm text-on-surface-variant">
                  Your name has been pulled for the April Mid-Month Draw.
                  Verify your last score to claim.
                </p>
              </div>
            </div>

            {/* Upload */}
            <div className="bg-surface-container-low p-10 rounded-xl border-2 border-dashed border-outline-variant/30 text-center hover:bg-surface-container-high transition-colors cursor-pointer group">
              <CloudUpload
                size={48}
                className="mx-auto text-on-surface-variant mb-4 group-hover:text-primary transition-colors"
              />
              <h4 className="text-xl font-bold font-headline mb-2">
                Upload Screenshot Proof
              </h4>
              <p className="text-on-surface-variant text-sm max-w-sm mx-auto">
                Drag and drop your score verification image here to authorize
                your official ranking and rewards.
              </p>
              <div className="mt-6 inline-flex px-6 py-2 bg-surface-container-highest rounded-full text-xs font-label uppercase tracking-widest text-primary border border-primary/10">
                Secure Verification Layer Active
              </div>
            </div>
          </div>
        </section>

        {/* Right Column — Impact & Rewards */}
        <aside className="space-y-8">
          <PhilanthropicImpact />
          <MonthlyDraw />
        </aside>
      </div>
    </>
  );
}
