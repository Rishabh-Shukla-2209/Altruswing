import { TrendingUp, Edit3, Trash2 } from "lucide-react";
import { ScoreEntry } from "@/components/dashboard/ScoreEntry";
import { RollingScores } from "@/components/dashboard/RollingScores";

const rollingScores = [
  { date: "Apr 12", value: 32 },
  { date: "Apr 15", value: 35 },
  { date: "Apr 18", value: 38 },
  { date: "Apr 21", value: 36 },
  { date: "Apr 24", value: 42, isLatest: true },
];

const scoreHistory = [
  { id: 1, date: "Apr 24, 2024", course: "Pebble Beach GL", score: 42, stableford: 42, verified: true },
  { id: 2, date: "Apr 21, 2024", course: "St Andrews Links", score: 36, stableford: 36, verified: true },
  { id: 3, date: "Apr 18, 2024", course: "Augusta National", score: 38, stableford: 38, verified: true },
  { id: 4, date: "Apr 15, 2024", course: "Royal Melbourne", score: 35, stableford: 35, verified: true },
  { id: 5, date: "Apr 12, 2024", course: "Pinehurst No. 2", score: 32, stableford: 32, verified: true },
  { id: 6, date: "Apr 08, 2024", course: "Whistling Straits", score: 29, stableford: 29, verified: false },
  { id: 7, date: "Apr 04, 2024", course: "TPC Sawgrass", score: 34, stableford: 34, verified: true },
  { id: 8, date: "Mar 30, 2024", course: "Bethpage State Park", score: 31, stableford: 31, verified: true },
];

export default function ScoresPage() {
  const avgScore = Math.round(scoreHistory.reduce((s, r) => s + r.score, 0) / scoreHistory.length);
  const bestScore = Math.max(...scoreHistory.map((r) => r.score));

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
                {scoreHistory.map((r) => (
                  <tr
                    key={r.id}
                    className="group hover:bg-surface-container-highest/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">{r.date}</td>
                    <td className="px-6 py-4 text-sm font-medium">{r.course}</td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-black font-headline text-primary">
                        {r.stableford}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                          r.verified
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {r.verified ? "Verified" : "Pending"}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
