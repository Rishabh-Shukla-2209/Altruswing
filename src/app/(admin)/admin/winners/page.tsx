import {
  CheckCircle2,
  XCircle,
  Eye,
  IndianRupee,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { WinnerFilters } from "@/components/admin/WinnerFilters";

interface WinnersPageProps {
  searchParams: Promise<{ q?: string; verification?: string; payout?: string }>;
}

export default async function WinnersPage({ searchParams }: WinnersPageProps) {
  const supabase = await createClient();
  const { q, verification, payout } = await searchParams;

  let queryBuilder = supabase
    .from("winners")
    .select(`
    id,
    prize_cents,
    matched_count,
    payment_status,
    proof_image_url,
    created_at,
    profiles!inner ( email ),
    draws ( draw_month )
  `);

  // -----------------------------
  // 🔍 SEARCH (UUID-safe + email)
  // -----------------------------
  if (q && q.trim()) {
    const safeQ = q.trim();

    // UUID match OR profile email match
    if (safeQ.length === 36) {
      queryBuilder = queryBuilder.or(
        `id.eq.${safeQ},profiles.email.ilike.%${safeQ}%`
      );
    } else {
      queryBuilder = queryBuilder.ilike(
        "profiles.email",
        `%${safeQ}%`
      );
    }
  }

  // -----------------------------
  // ✅ FILTERS (fix conflict)
  // -----------------------------

  // ⚠️ Both were writing to payment_status → combine logic properly
  if (verification && payout) {
    // If both exist → prioritize payout (or define rule clearly)
    queryBuilder = queryBuilder.eq(
      "payment_status",
      payout === "completed" ? "completed" : "pending"
    );
  } else if (verification) {
    queryBuilder = queryBuilder.eq(
      "payment_status",
      verification === "verified" ? "completed" : "pending"
    );
  } else if (payout) {
    queryBuilder = queryBuilder.eq(
      "payment_status",
      payout === "completed" ? "completed" : "pending"
    );
  }

  // -----------------------------
  // 📦 EXECUTE
  // -----------------------------
  const { data: winners, error } = await queryBuilder.order("created_at", {
    ascending: false,
  });

  if (error) {
    console.error("Failed to fetch winners", error);
  }

  // Secondary client-side-like filtering for the profile email since Supabase OR across joins is tricky
  const filteredWinners = winners?.filter((w: any) => {
    if (!q) return true;
    const email = Array.isArray(w.profiles) ? w.profiles[0]?.email : w.profiles?.email;
    return email?.toLowerCase().includes(q.toLowerCase()) || w.id.includes(q);
  }) || [];

  const totalWinners = filteredWinners.length;
  const pendingVerification = filteredWinners.filter(w => w.payment_status?.toLowerCase() === "pending").length;

  let payoutsCompletedCents = 0;
  let payoutsPendingCents = 0;

  filteredWinners.forEach(w => {
    if (w.payment_status?.toLowerCase() === "completed") payoutsCompletedCents += (w.prize_cents || 0);
    else payoutsPendingCents += (w.prize_cents || 0);
  });

  const formatMoney = (cents: number) => "$" + (cents / 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

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
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Winners", value: totalWinners.toString(), border: "border-primary" },
          {
            label: "Pending Verification",
            value: pendingVerification.toString(),
            border: "border-amber-400",
          },
          {
            label: "Payouts Completed",
            value: formatMoney(payoutsCompletedCents),
            border: "border-emerald-400",
          },
          {
            label: "Payouts Pending",
            value: formatMoney(payoutsPendingCents),
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
        <WinnerFilters />
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
                  Draw Date
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
              {filteredWinners.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-on-surface-variant italic">
                    No winners found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredWinners.map((w: any) => {
                  const email = Array.isArray(w.profiles) ? w.profiles[0]?.email : w.profiles?.email;
                  const drawMonth = Array.isArray(w.draws) ? w.draws[0]?.draw_month : w.draws?.draw_month;

                  return (
                    <tr
                      key={w.id}
                      className="group hover:bg-surface-container-highest/30 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <div className="font-medium text-sm">{email?.split('@')[0] || "User"}</div>
                          <div className="text-xs text-on-surface-variant">
                            {email || "No Email Attached"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-mono text-primary text-sm font-bold">
                        {drawMonth ? new Date(drawMonth).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${w.matched_count === 5
                              ? "bg-primary/10 text-primary"
                              : "bg-surface-container-highest text-outline"
                              }`}
                          >
                            {w.matched_count || "?"}
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
                        {w.payment_status?.toLowerCase() === "completed" ? (
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
                        {w.payment_status?.toLowerCase() === "completed" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                            <IndianRupee size={10} />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-error/10 text-error text-[10px] font-bold uppercase tracking-widest border border-error/20">
                            <IndianRupee size={10} />
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
                          {w.payment_status?.toLowerCase() !== "completed" && (
                            <button
                              className="p-2 rounded-lg hover:bg-emerald-500/10 text-on-surface-variant hover:text-emerald-400 transition-colors"
                              title="Verify Ticket Match"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                          )}
                          {w.payment_status?.toLowerCase() !== "completed" && (
                            <button
                              className="p-2 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors"
                              title="Mark as Paid"
                            >
                              <IndianRupee size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-surface-container-low px-6 py-4 flex justify-between items-center text-xs text-on-surface-variant">
          <span>Showing {filteredWinners.length} winners</span>
        </div>
      </div>
    </>
  );
}
