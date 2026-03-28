import { createClient } from "@/utils/supabase/server";
import { UserTableRow } from "@/components/admin/UserTableRow";
import { AddUserDialog } from "@/components/admin/AddUserDialog";
import { UserSearch } from "@/components/admin/UserSearch";

interface UsersPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const supabase = await createClient();
  const { q } = await searchParams;

  let queryBuilder = supabase
    .from("profiles")
    .select(`
    id,
    email,
    role,
    subscription_status,
    created_at,
    scores (
      id,
      stableford_score,
      played_on
    )
  `);

  if (q && q.trim()) {
    const safeQ = q.trim();

    // Only email search (safe default)
    queryBuilder = queryBuilder.ilike("email", `%${safeQ}%`);

    // Optional: exact UUID match
    if (safeQ.length === 36) {
      queryBuilder = queryBuilder.or(
        `email.ilike.%${safeQ}%,id.eq.${safeQ}`
      );
    }
  }

  const { data: users, error } = await queryBuilder.order("created_at", {
    ascending: false,
  });

  if (error) {
    console.error("Failed to fetch users", error);
  }

  // Sort scores by newest date per user and limit to 5
  const formattedUsers = users?.map(u => {
    const sortedScores = (u.scores || []).sort((a: any, b: any) => new Date(b.played_on).getTime() - new Date(a.played_on).getTime()).slice(0, 5);
    return { ...u, scores: sortedScores };
  }) || [];

  const totalUsers = formattedUsers.length;
  const activeSubs = formattedUsers.filter(u => u.subscription_status === "active").length;

  return (
    <>
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">
            User Management
          </h2>
          <p className="text-on-surface-variant max-w-2xl">
            View and edit user profiles, manage golf scores, and control subscription states.
          </p>
        </div>
        <AddUserDialog />
      </section>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: totalUsers.toLocaleString(), border: "border-primary" },
          { label: "Active Subscriptions", value: activeSubs.toLocaleString(), border: "border-secondary" },
          { label: "Search Results", value: q ? formattedUsers.length.toString() : "All", border: "border-tertiary" },
          { label: "Suspensions", value: formattedUsers.filter(u => u.subscription_status === "past_due").length.toString(), border: "border-error" },
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

      {/* Search */}
      <div className="flex gap-4">
        <UserSearch />
      </div>

      {/* Table */}
      <div className="bg-surface-container rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  User
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Role
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Rolling 5
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Status
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Joined
                </th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {formattedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-on-surface-variant italic">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                formattedUsers.map(u => (
                  <UserTableRow key={u.id} user={u} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
