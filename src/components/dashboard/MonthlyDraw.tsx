import { createClient } from "@/utils/supabase/server";
import { CountdownTimer } from "./CountdownTimer";

export async function MonthlyDraw() {
  const supabase = await createClient();

  // 1. Authenticate
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // 2. Fetch the user's lifetime winnings from the 'winners' table
  // Assumes a column named 'prize_amount' (numeric) exists in your table
  const { data: winningsData } = await supabase
    .from("winners")
    .select("prize_cents")
    .eq("user_id", user.id);

  // 3. Calculate total lifetime winnings
  const lifetimeWinnings = winningsData?.reduce(
    (total, record) => total + (Number(record.prize_cents) || 0),
    0
  ) || 0;

  // 4. Calculate the Next Draw Date (e.g., the 1st of the upcoming month at midnight)
  const now = new Date();
  const nextDrawDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

  // Format currency
  const formattedWinnings = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR", // Changed to INR based on your earlier Stripe configurations
    minimumFractionDigits: 0,
  }).format(lifetimeWinnings);

  return (
    <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/10">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest font-label text-on-surface-variant mb-1">
            Official Draw
          </p>
          <h3 className="text-2xl font-bold font-headline">Monthly Draw</h3>
        </div>
        <div className="bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-[10px] font-black font-label text-primary uppercase">
            Elite Tier
          </span>
        </div>
      </div>

      <div className="mb-10 text-center">
        <p className="text-xs font-label text-on-surface-variant uppercase mb-4">
          Countdown to Next Draw
        </p>

        {/* Pass the calculated target date to our Client Component */}
        <CountdownTimer targetDate={nextDrawDate} />
      </div>

      <div className="p-6 bg-surface-container-lowest rounded-xl text-center">
        <p className="text-xs font-label text-on-surface-variant uppercase mb-2">
          Lifetime Winnings
        </p>
        <div className="text-4xl font-extrabold font-headline text-primary">
          {formattedWinnings}
        </div>
      </div>
    </div>
  );
}