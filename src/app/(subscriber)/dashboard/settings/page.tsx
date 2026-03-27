"use client";

import { CreditCard, Heart, User, Bell, Shield, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);

  const handleManageSubscription = async () => {
    try {
      setIsLoadingPortal(true);
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No portal URL returned:", data.error);
      }
    } catch (error) {
      console.error("Failed to generate portal session", error);
    } finally {
      setIsLoadingPortal(false);
    }
  };
  return (
    <>
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight mb-2">
          Account Settings
        </h1>
        <p className="text-on-surface-variant text-lg">
          Manage your subscription, charity preferences, and profile details.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column — Main Settings */}
        <div className="lg:col-span-2 space-y-10">
          {/* Subscription Status */}
          <section className="bg-surface-container rounded-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center gap-3">
              <CreditCard size={20} className="text-primary" />
              <h2 className="font-headline font-bold text-lg">
                Subscription Status
              </h2>
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      Active
                    </span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-[10px] font-black font-label text-primary uppercase">
                      Premium Plan
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm">
                    Your subscription renews on{" "}
                    <span className="font-bold text-on-surface">May 1, 2024</span>.
                    Billed monthly at{" "}
                    <span className="font-bold text-on-surface">$29.99/mo</span>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleManageSubscription}
                    disabled={isLoadingPortal}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-surface-container-highest border border-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-on-primary transition-all disabled:opacity-50"
                  >
                    {isLoadingPortal ? "Redirecting..." : "Manage Subscription"}
                    {!isLoadingPortal && <ExternalLink size={16} />}
                  </button>
                </div>
              </div>
              {/* Billing History */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">
                  Recent Billing
                </h4>
                {[
                  { date: "Apr 01, 2024", amount: "$29.99", status: "Paid" },
                  { date: "Mar 01, 2024", amount: "$29.99", status: "Paid" },
                  { date: "Feb 01, 2024", amount: "$29.99", status: "Paid" },
                ].map((b) => (
                  <div
                    key={b.date}
                    className="flex justify-between items-center py-3 border-b border-outline-variant/5 last:border-none"
                  >
                    <span className="text-sm">{b.date}</span>
                    <span className="text-sm font-mono font-bold">
                      {b.amount}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Selected Charity */}
          <section className="bg-surface-container rounded-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center gap-3">
              <Heart size={20} className="text-primary" />
              <h2 className="font-headline font-bold text-lg">
                Charity & Contribution
              </h2>
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
                      <Heart size={28} className="text-on-primary" />
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-xl">
                        Amazonas Reforest
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        Environment • South America
                      </p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    Direct community-led action to restore native rainforest
                    canopy and protect critical biodiversity corridors in the
                    Amazon basin.
                  </p>
                  <Link
                    href="/charities"
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    Change Charity →
                  </Link>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl min-w-[200px]">
                  <p className="text-[10px] uppercase tracking-widest text-outline font-label mb-2">
                    Contribution Rate
                  </p>
                  <div className="text-4xl font-black font-headline text-primary mb-2">
                    15%
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    of your subscription fee
                  </p>
                  <div className="mt-4 space-y-2">
                    <label className="font-label text-[10px] uppercase tracking-widest text-outline">
                      Adjust Rate
                    </label>
                    <select className="w-full appearance-none px-4 py-2 bg-surface-container-high rounded-lg border-none text-on-surface font-medium text-sm cursor-pointer">
                      <option>5%</option>
                      <option>10%</option>
                      <option selected>15%</option>
                      <option>20%</option>
                      <option>25%</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Profile */}
          <section className="bg-surface-container rounded-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center gap-3">
              <User size={20} className="text-primary" />
              <h2 className="font-headline font-bold text-lg">
                Profile Details
              </h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-outline">
                    Full Name
                  </Label>
                  <Input
                    defaultValue="Alex Morgan"
                    className="px-5 py-3 h-auto bg-surface-container-lowest border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-outline">
                    Email
                  </Label>
                  <Input
                    defaultValue="alex.morgan@example.com"
                    className="px-5 py-3 h-auto bg-surface-container-lowest border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-outline">
                    Handicap
                  </Label>
                  <Input
                    type="number"
                    defaultValue={8}
                    className="px-5 py-3 h-auto bg-surface-container-lowest border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-outline">
                    Home Course
                  </Label>
                  <Input
                    defaultValue="Pebble Beach Golf Links"
                    className="px-5 py-3 h-auto bg-surface-container-lowest border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                </div>
              </div>
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm hover:opacity-90 transition-opacity">
                Save Changes
              </button>
            </div>
          </section>
        </div>

        {/* Right Column — Quick Actions */}
        <div className="space-y-8">
          {/* Participation Summary */}
          <div className="bg-surface-container rounded-xl p-8">
            <h3 className="font-headline font-bold text-lg mb-6">
              Draw Participation
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-outline font-label">
                    Draws Entered
                  </p>
                  <p className="text-2xl font-black font-headline">47</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-outline font-label">
                    Win Rate
                  </p>
                  <p className="text-2xl font-black font-headline text-primary">
                    8.5%
                  </p>
                </div>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl">
                <p className="text-[10px] uppercase tracking-widest text-outline font-label mb-2">
                  Next Draw
                </p>
                <p className="font-bold font-headline">May 08, 2024</p>
                <p className="text-xs text-on-surface-variant">
                  Cycle #883 • Auto-entered
                </p>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl">
                <p className="text-[10px] uppercase tracking-widest text-outline font-label mb-2">
                  Upcoming Draws
                </p>
                <ul className="space-y-2">
                  <li className="flex justify-between text-sm">
                    <span>Mid-Month Draw</span>
                    <span className="text-primary font-bold">May 15</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Monthly Grand</span>
                    <span className="text-primary font-bold">Jun 01</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-surface-container rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell size={18} className="text-primary" />
              <h3 className="font-headline font-bold text-lg">
                Notifications
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Draw Results", checked: true },
                { label: "Score Verification", checked: true },
                { label: "Payout Updates", checked: true },
                { label: "Newsletter", checked: false },
              ].map((n) => (
                <label
                  key={n.label}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="text-sm">{n.label}</span>
                  <input
                    type="checkbox"
                    defaultChecked={n.checked}
                    className="rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary/20"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-surface-container rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={18} className="text-primary" />
              <h3 className="font-headline font-bold text-lg">Security</h3>
            </div>
            <div className="space-y-4">
              <button className="w-full py-3 rounded-xl bg-surface-container-highest border border-outline-variant/10 text-on-surface font-bold text-sm hover:bg-surface-bright transition-colors">
                Change Password
              </button>
              <button className="w-full py-3 rounded-xl bg-surface-container-highest border border-outline-variant/10 text-on-surface font-bold text-sm hover:bg-surface-bright transition-colors">
                Enable Two-Factor Auth
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
