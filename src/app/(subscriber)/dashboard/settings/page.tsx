import { CreditCard, Heart, User, Bell, Shield } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionManager, CharityRateSelector, OneTimeDonation, CancelSubscription } from "@/components/dashboard/SettingsInteractive";
import { DonationHistory } from "@/components/shared/DonationHistory";
import { SubscriptionAlert } from "@/components/dashboard/SubscriptionAlert";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  const { data: preference } = await supabase
    .from("user_charity_preferences")
    .select(`contribution_percent, charities (id, name, category, location, description)`) // Added 'id' here
    .eq("user_id", user.id)
    .maybeSingle();

  const charity = preference?.charities && !Array.isArray(preference.charities)
    ? preference.charities
    : null;

  const isActive = profile?.subscription_status === "active";
  const authName = user.user_metadata?.full_name || user.user_metadata?.name || "Member";

  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight mb-2">Account Settings</h1>
        <p className="text-on-surface-variant text-lg">Manage your subscription, charity preferences, and profile details.</p>
      </header>

      <SubscriptionAlert />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">

          <section className="bg-surface-container rounded-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center gap-3">
              <CreditCard size={20} className="text-primary" />
              <h2 className="font-headline font-bold text-lg">Subscription Status</h2>
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {isActive && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>}
                      {profile?.subscription_status || "Inactive"}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm mt-2">
                    Billing cycle management is securely handled via Stripe.
                  </p>
                </div>
                <SubscriptionManager />
                <CancelSubscription />
              </div>
            </div>
          </section>

          <section className="bg-surface-container rounded-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center gap-3">
              <Heart size={20} className="text-primary" />
              <h2 className="font-headline font-bold text-lg">Charity & Contribution</h2>
            </div>
            <div className="p-8">
              {charity ? (
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
                        <Heart size={28} className="text-on-primary" />
                      </div>
                      <div>
                        <h3 className="font-headline font-bold text-xl">{charity.name}</h3>
                        <p className="text-sm text-on-surface-variant">{charity.category} • {charity.location}</p>
                      </div>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">
                      {charity.description}
                    </p>
                    <Link href="/charities?mode=edit" className="text-primary font-bold text-sm hover:underline">
                      Change Charity →
                    </Link>
                  </div>
                  <div className="bg-surface-container-lowest p-6 rounded-xl min-w-[200px]">
                    <p className="text-[10px] uppercase tracking-widest text-outline font-label mb-2">Contribution Rate</p>
                    <div className="text-4xl font-black font-headline text-primary mb-2">
                      {preference?.contribution_percent || 10}%
                    </div>
                    <p className="text-xs text-on-surface-variant">of your subscription fee</p>
                    <CharityRateSelector currentRate={preference?.contribution_percent || 10} />
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-on-surface-variant mb-4">You have not selected a charity yet.</p>
                  <Link href="/charities?mode=edit" className="text-primary font-bold hover:underline">Select a Charity →</Link>
                </div>
              )}
            </div>
          </section>

          {/* Read-Only Account Details */}
          <section className="bg-surface-container rounded-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center gap-3">
              <User size={20} className="text-primary" />
              <h2 className="font-headline font-bold text-lg">Account Details</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 bg-surface-container-lowest p-4 rounded-xl">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-outline">Name</p>
                  <p className="font-medium text-on-surface">{authName}</p>
                </div>
                <div className="space-y-2 bg-surface-container-lowest p-4 rounded-xl">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-outline">Email</p>
                  <p className="font-medium text-on-surface">{user.email}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {charity && (
            <OneTimeDonation charityId={charity.id} charityName={charity.name} />
          )}
          <DonationHistory />
        </div>
      </div>
    </>
  );
}