import { TrendingUp, Megaphone, CloudUpload } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ScoreEntry } from "@/components/dashboard/ScoreEntry";
import { RollingScores } from "@/components/dashboard/RollingScores";
import { PhilanthropicImpact } from "@/components/dashboard/PhilanthropicImpact";
import { MonthlyDraw } from "@/components/dashboard/MonthlyDraw";
import { DonationToast } from "@/components/shared/DonationToast";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Authenticate the user
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // 2. Fetch Profile Data (Name and Status)
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  const hasAccess = profile?.subscription_status === "active" || profile?.subscription_status === "canceling";

  if (!hasAccess) {
    // Kick them to settings with a URL parameter explaining why
    redirect("/dashboard/settings?alert=inactive_subscription");
  }

  // 3. Fetch Winner Status 
  // Looks for a record where this user won, but hasn't uploaded proof yet
  const { data: pendingWin } = await supabase
    .from("winners")
    .select("id")
    .eq("user_id", user.id)
    .is("proof_image_url", null) // Supabase syntax for SQL 'IS NULL'
    .maybeSingle(); // Returns the record if it exists, or null if it doesn't (without throwing an error)

  const isWinner = !!pendingWin;

  // 4. Fetch the Last 5 Scores
  const { data: scoresData } = await supabase
    .from("scores")
    .select("stableford_score, played_on")
    .eq("user_id", user.id)
    .order("played_on", { ascending: false })
    .limit(5);

  // 5. Format Data for the UI
  const firstName = user.user_metadata.full_name || "Golfer";
  const isActive = profile?.subscription_status === "active";

  // Reverse the scores so they read chronologically left-to-right
  const rollingScores = scoresData?.reverse().map((score, index, array) => {
    const dateObj = new Date(score.played_on);
    const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    return {
      date: formattedDate,
      value: score.stableford_score,
      isLatest: index === array.length - 1,
    };
  }) || [];

  return (
    <>
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-extrabold font-headline tracking-tight mb-2">
            Welcome back, {firstName}
          </h1>
          <p className="text-on-surface-variant text-lg">
            Your performance journey continues.
          </p>
        </div>
        <div className="glass-card dark:glass-panel p-4 rounded-full flex items-center gap-4 border border-outline-variant/15 pr-6">
          <div className="relative flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]' : 'bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.4)]'}`}></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary font-headline capitalize">
                {profile?.subscription_status || "Inactive"}
              </span>
              <span className="text-xs text-on-surface-variant">
                • Premium Membership
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70">
              Auto-Renews
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
              Live Data
            </div>
          </div>

          {/* Score Entry */}
          <ScoreEntry />

          {/* Rolling 5 */}
          <RollingScores scores={rollingScores} />

          {/* Action Center - ONLY VISIBLE IF PENDING PROOF UPLOAD */}
          {isWinner && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              {/* Alert */}
              <div className="bg-error-container/20 p-6 rounded-xl flex items-center gap-6 border-l-4 border-error">
                <Megaphone size={28} className="text-error shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold text-lg font-headline">
                    Action Required: Draw Winner Verification
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Your name has been pulled for the monthly draw! Verify your last score to claim your reward.
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
          )}
        </section>

        {/* Right Column — Impact & Rewards */}
        <aside className="space-y-8">
          <PhilanthropicImpact />
          <MonthlyDraw />
        </aside>
      </div>
      <DonationToast />
    </>
  );
}