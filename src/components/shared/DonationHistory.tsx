import { createClient } from "@/utils/supabase/server";
import { HeartHandshake } from "lucide-react";

// Strict Typing for the Join Query
interface DonationRecord {
    id: string;
    amount_cents: number;
    created_at: string;
    status: string;
    charities: {
        name: string;
    } | null;
}

export async function DonationHistory() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // Fetch donations and join the charity name
    const { data: donationsData } = await supabase
        .from("donations")
        .select(`
      id,
      amount_cents,
      created_at,
      status,
      charities ( name )
    `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    const donations = (donationsData as unknown as DonationRecord[]) || [];

    if (donations.length === 0) return null;

    return (
        <div className="bg-surface-container rounded-xl overflow-hidden mt-8">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center gap-3">
                <HeartHandshake size={20} className="text-primary" />
                <h2 className="font-headline font-bold text-lg">One-Time Donations</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container-low">
                            <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">Date</th>
                            <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">Charity</th>
                            <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">Amount</th>
                            <th className="px-8 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                        {donations.map((d) => (
                            <tr key={d.id} className="group hover:bg-surface-container-highest/30 transition-colors">
                                <td className="px-8 py-5 text-sm">
                                    {new Date(d.created_at).toLocaleDateString("en-IN", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </td>
                                <td className="px-8 py-5 text-sm font-bold">
                                    {d.charities?.name || "Unknown Charity"}
                                </td>
                                <td className="px-8 py-5 font-mono text-lg font-bold text-primary">
                                    ₹{(d.amount_cents / 100).toFixed(2)}
                                </td>
                                <td className="px-8 py-5">
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                        {d.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}