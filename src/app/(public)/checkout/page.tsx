"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

// Read from public env vars
const MONTHLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!;
const YEARLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!;

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const selectedPriceId =
        billingCycle === "monthly" ? MONTHLY_PRICE_ID : YEARLY_PRICE_ID;

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: selectedPriceId }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface py-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <p className="text-primary font-bold uppercase tracking-widest text-sm">
            Step 3 of 3
          </p>
          <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight">
            Finalize Entry
          </h1>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-outline-variant/20">
          {/* Billing Toggle */}
          <div className="flex bg-surface-container-high rounded-lg p-1 mb-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`flex-1 py-2 text-sm font-bold rounded-md cursor-pointer transition-all ${
                billingCycle === "monthly"
                  ? "impact-gradient text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`flex-1 py-2 text-sm font-bold rounded-md cursor-pointer transition-all ${
                billingCycle === "yearly"
                  ? "impact-gradient text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Yearly (Save 33%)
            </button>
          </div>

          <div className="flex justify-between items-end mb-6 border-b border-outline-variant/10 pb-6">
            <div>
              <h3 className="text-xl font-bold">Membership</h3>
              <p className="text-sm text-on-surface-variant">Cancel anytime</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-primary">
                ₹{billingCycle === "monthly" ? "1,000" : "8,000"}
              </span>
              <span className="text-on-surface-variant font-medium">
                /{billingCycle === "monthly" ? "mo" : "yr"}
              </span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {[
              "Official handicap tracking",
              "Automatic charity contributions",
              "Entry into monthly prize draws",
            ].map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-sm font-medium"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full py-6 rounded-xl impact-gradient text-white font-bold tracking-widest cursor-pointer text-sm shadow-xl"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2 w-5 h-5" />
            ) : null}
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
