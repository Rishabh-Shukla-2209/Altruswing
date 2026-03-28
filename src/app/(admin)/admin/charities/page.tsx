import { createClient } from "@/utils/supabase/server";
import { CharityAdminCard } from "@/components/admin/CharityAdminCard";
import { AddCharityDialog } from "@/components/admin/AddCharityDialog";
import { CharityFilters } from "@/components/admin/CharityFilters";

interface CharitiesAdminPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function CharitiesAdminPage({ searchParams }: CharitiesAdminPageProps) {
  const supabase = await createClient();
  const { q, category } = await searchParams;

  let queryBuilder = supabase.from("charities").select("*");

  if (q) {
    queryBuilder = queryBuilder.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
  }

  if (category) {
    queryBuilder = queryBuilder.eq("category", category as any);
  }

  const [{ data: charities }, { data: donations }] = await Promise.all([
    queryBuilder.order("name", { ascending: true }),
    supabase.from("donations").select("charity_id, amount_cents").eq("status", "completed")
  ]);

  const activePartners = charities?.filter((c) => c.is_active).length || 0;
  
  const totalContributionsCents = donations?.reduce((sum, d) => sum + d.amount_cents, 0) || 0;
  const formatMoney = (cents: number) => "$" + (cents / 100).toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <>
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">
            Charity Management
          </h2>
          <p className="text-on-surface-variant max-w-2xl">
            Add, edit, and manage charity organizations. Control content and partnership details.
          </p>
        </div>
        <AddCharityDialog />
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Charities", value: charities?.length.toString() || "0", border: "border-primary" },
          { label: "Active Partners", value: activePartners.toString(), border: "border-secondary" },
          { label: "Total Contributions", value: formatMoney(totalContributionsCents), border: "border-tertiary" },
          { label: "Inactive", value: ((charities?.length || 0) - activePartners).toString(), border: "border-amber-400" },
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

      {/* Search & Filters */}
      <div className="flex gap-4">
        <CharityFilters />
      </div>

      {/* Charity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities?.length === 0 ? (
          <div className="col-span-full py-20 text-center text-on-surface-variant italic">
            No charities found matching your criteria.
          </div>
        ) : (
          charities?.map((c) => {
            const myDonations = donations?.filter(d => d.charity_id === c.id) || [];
            const myTotal = myDonations.reduce((acc, d) => acc + d.amount_cents, 0);
            return <CharityAdminCard key={c.id} charity={c} totalContributions={formatMoney(myTotal)} />
          })
        )}
      </div>
    </>
  );
}
