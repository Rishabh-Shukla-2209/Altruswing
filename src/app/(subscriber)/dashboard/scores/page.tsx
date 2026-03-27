"use client";
import { useState, useEffect } from "react";
import { TrendingUp, Edit3, Trash2, Loader2 } from "lucide-react";
import { ScoreEntry } from "@/components/dashboard/ScoreEntry";
import { RollingScores } from "@/components/dashboard/RollingScores";
import { useScores } from "@/hooks/useScores";
import { createClient } from "@/utils/supabase/client";

export default function ScoresPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUserId(session.user.id);
    });
  }, [supabase.auth]);

  const { data: scoreHistory = [], isLoading } = useScores(userId);

  const avgScore = scoreHistory.length 
    ? Math.round(scoreHistory.reduce((s: any, r: any) => s + r.stableford_score, 0) / scoreHistory.length) 
    : 0;
  const bestScore = scoreHistory.length 
    ? Math.max(...scoreHistory.map((r: any) => r.stableford_score)) 
    : 0;

  const rollingScores = scoreHistory
    .slice(0, 5)
    .map((s: any, i: number) => ({
      date: new Date(s.played_on).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      value: s.stableford_score,
      isLatest: i === 0,
    }))
    .reverse();

  return (
    <>
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-extrabold font-headline tracking-tight">
            Performance Tracker
          </h1>
          <TrendingUp size={24} className="text-green-400" />
        </div>
        <p className="text-on-surface-variant text-lg">
          Log new scores, review your history, and track your progression.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Rounds", value: String(scoreHistory.length), border: "border-primary" },
          { label: "Best Score", value: String(bestScore), border: "border-emerald-400" },
          { label: "Average Score", value: String(avgScore), border: "border-secondary" },
          { label: "Current Handicap", value: "8", border: "border-tertiary" },
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

      {/* Score Entry */}
      <div className="mb-10">
        <h2 className="text-xl font-bold font-headline mb-4">Log New Score</h2>
        <ScoreEntry />
      </div>

      {/* Rolling 5 */}
      <div className="mb-10">
        <RollingScores scores={rollingScores} />
      </div>

      {/* Score History Table */}
      <div>
        <h2 className="text-xl font-bold font-headline mb-4">Score History</h2>
        <div className="bg-surface-container rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Date
                  </th>
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Course
                  </th>
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Stableford
                  </th>
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Status
                  </th>
                  <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    </td>
                  </tr>
                ) : scoreHistory.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-on-surface-variant">
                      No scores found.
                    </td>
                  </tr>
                ) : (
                  scoreHistory.map((r: any) => (
                  <tr
                    key={r.id}
                    className="group hover:bg-surface-container-highest/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">{r.played_on ? new Date(r.played_on).toLocaleDateString() : "—"}</td>
                    <td className="px-6 py-4 text-sm font-medium">Digital Heroes Golf Club</td> {/* Hardcoded generic course for now */}
                    <td className="px-6 py-4">
                      <span className="text-lg font-black font-headline text-primary">
                        {r.stableford_score}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border bg-emerald-500/10 text-emerald-400 border-emerald-500/20`}
                      >
                        Verified
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                          title="Edit Score"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-error transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
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
      </div>
    </>
  );
}
