"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

export function SubscriptionAlert() {
    const searchParams = useSearchParams();
    const alertType = searchParams.get("alert");

    if (alertType !== "inactive_subscription") return null;

    return (
        <div className="mb-8 p-4 bg-error-container/20 border-l-4 border-error rounded-r-xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="text-error shrink-0 mt-0.5" size={20} />
            <div>
                <h4 className="text-sm font-bold font-headline text-error mb-1">
                    Access Restricted
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                    Your AltruSwing subscription is currently inactive. Please renew your membership below to access the game dashboard, log scores, and enter the monthly draws.
                </p>
            </div>
        </div>
    );
}