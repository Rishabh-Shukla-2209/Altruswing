"use client";

import { useState, useEffect, useMemo } from "react";
import { Trophy, IndianRupee, Download, Eye, Loader2 } from "lucide-react";
import { useUserWinnings } from "@/hooks/useWinners";
import { createClient } from "@/utils/supabase/client";

// Strictly typing the expected Supabase response
export interface Winning {
  id: string;
  created_at: string;
  matched_count: number | null;
  prize_cents: number | null;
  payment_status: string | null;
  draws?: {
    draw_month?: string;
  };
}

export interface WinningsStats {
  lifetime: string;
  completed: string;
  pending: string;
  completedCount: number;
  pendingCount: number;
  totalWins: number;
  biggestWin: Winning | null; // This tells TS it is NOT 'never'
}

export default function WinningsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUserId(session.user.id);
    });
  }, [supabase.auth]);

  const { data: winnings = [], isLoading } = useUserWinnings(userId);

  // Dynamically calculate statistics from the winnings data
  // Note the <WinningsStats> right after useMemo
  const stats = useMemo<WinningsStats>(() => {
    const typedWinnings = winnings as Winning[];

    let lifetimeCents = 0;
    let completedCents = 0;
    let pendingCents = 0;
    let completedCount = 0;
    let pendingCount = 0;
    let maxWin: Winning | null = null;

    typedWinnings.forEach((w) => {
      lifetimeCents += w.prize_cents ?? 0;

      if (w.payment_status === "Completed") {
        completedCents += w.prize_cents ?? 0;
        completedCount++;
      } else {
        pendingCents += w.prize_cents ?? 0;
        pendingCount++;
      }

      if (!maxWin || (w.prize_cents ?? 0) > (maxWin.prize_cents ?? 0)) {
        maxWin = w;
      }
    });

    return {
      lifetime: (lifetimeCents / 100).toFixed(2),
      completed: (completedCents / 100).toFixed(2),
      pending: (pendingCents / 100).toFixed(2),
      completedCount,
      pendingCount,
      totalWins: typedWinnings.length,
      biggestWin: maxWin,
    };
  }, [winnings]);

  const biggestWin = stats.biggestWin;

  return (
    <>
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold font-headline tracking-tight mb-2">
              Winnings & Rewards
            </h1>
            <p className="text-on-surface-variant text-lg">
              Track your total winnings, payment statuses, and reward history.
            </p>
          </div>
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary">
          <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">
            Lifetime Winnings
          </p>
          <h4 className="text-3xl font-bold font-headline text-primary">
            ₹{stats.lifetime}
          </h4>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-emerald-400">
          <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">
            Payouts Completed
          </p>
          <h4 className="text-3xl font-bold font-headline"> ₹{stats.completed}</h4>
          <p className="text-xs text-on-surface-variant mt-1">{stats.completedCount} transactions</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-amber-400">
          <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">
            Payouts Pending
          </p>
          <h4 className="text-3xl font-bold font-headline"> ₹{stats.pending}</h4>
          <p className="text-xs text-on-surface-variant mt-1">
            {stats.pendingCount} awaiting verification
          </p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-secondary">
          <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">
            Total Draws Won
          </p>
          <h4 className="text-3xl font-bold font-headline">{stats.totalWins}</h4>
          <p className="text-xs text-on-surface-variant mt-1">
            Verified victories
          </p>
        </div>
      </div>

      {/* Big Win Highlight (Only render if they have won something) */}
      {biggestWin && (
        <div className="bg-gradient-to-r from-primary to-primary-container p-8 rounded-xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">
              <Trophy size={40} className="text-white" />
            </div>

            {/* --- UPDATED SECTION --- */}
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-1">
                Biggest Win
              </p>
              <h3 className="text-3xl font-headline font-extrabold text-white mb-1">
                ₹{(biggestWin.prize_cents ?? 0 / 100).toFixed(2)}
              </h3>
              <p className="text-white/70 text-sm">
                Tier {biggestWin.matched_count} • Draw {biggestWin.draws?.draw_month || "Cycle"} • {new Date(biggestWin.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl text-center">
              <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">
                Payout Status
              </p>
              <p className="text-white font-bold font-headline">
                {biggestWin.payment_status} {biggestWin.payment_status === "Completed" ? "✓" : "⏳"}
              </p>
            </div>
            {/* ----------------------- */}

          </div>
        </div>
      )}

      {/* Winnings History */}
      <div>
        <h2 className="text-xl font-bold font-headline mb-4">
          Winnings History
        </h2>
        <div className="bg-surface-container rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Draw Cycle
                  </th>
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Date
                  </th>
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Tier
                  </th>
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Prize
                  </th>
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    </td>
                  </tr>
                ) : winnings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-on-surface-variant">
                      No winnings yet.
                    </td>
                  </tr>
                ) : (
                  (winnings as Winning[]).map((w: Winning) => (
                    <tr
                      key={w.id}
                      className="group hover:bg-surface-container-highest/30 transition-colors"
                    >
                      <td className="px-6 py-5 font-mono text-primary text-sm font-bold">
                        {w.draws?.draw_month || "N/A"}
                      </td>
                      <td className="px-6 py-5 text-sm">
                        {w.created_at ? new Date(w.created_at).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold  ₹{w.matched_count >= 4
                              ? "bg-primary/10 text-primary"
                              : "bg-surface-container-highest text-outline"
                              }`}
                          >
                            {w.matched_count}
                          </div>
                          <span className="text-sm">Tier {w.matched_count}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-mono text-lg font-bold">
                        ${(w.prize_cents ?? 0 / 100).toFixed(2)}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border  ${w.payment_status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }`}
                        >
                          <IndianRupee size={10} />
                          {w.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}