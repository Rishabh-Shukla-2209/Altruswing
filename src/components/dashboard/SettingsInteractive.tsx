"use client";

import { useState } from "react";
import { AlertTriangle, ExternalLink, HeartHandshake, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { updateContributionPercent } from "@/app/(subscriber)/dashboard/action";
import { useRouter } from "next/navigation";

// --- 1. STRIPE PORTAL BUTTON ---
export function SubscriptionManager() {
    const [isLoading, setIsLoading] = useState(false);

    const handleManage = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/stripe/portal", { method: "POST" });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
        } catch (error) {
            console.error("Failed to generate portal session", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleManage}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-surface-container-highest border border-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-on-primary transition-all disabled:opacity-50"
        >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Manage Subscription"}
            {!isLoading && <ExternalLink size={16} />}
        </button>
    );
}

// --- 2. CHARITY RATE SELECTOR ---
export function CharityRateSelector({ currentRate }: { currentRate: number }) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsUpdating(true);
        try {
            await updateContributionPercent(parseInt(e.target.value, 10));
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="mt-4 space-y-2 relative">
            <Label className="font-label text-[10px] uppercase tracking-widest text-outline">Adjust Rate</Label>
            <select
                disabled={isUpdating}
                value={currentRate}
                onChange={handleChange}
                className="w-full appearance-none px-4 py-2 bg-surface-container-high rounded-lg border-none text-on-surface font-medium text-sm cursor-pointer disabled:opacity-50"
            >
                {[10, 15, 20, 25].map(rate => (
                    <option key={rate} value={rate}>{rate}%</option>
                ))}
            </select>
            {isUpdating && <Loader2 className="absolute right-3 top-7 w-4 h-4 animate-spin text-primary" />}
        </div>
    );
}

export function OneTimeDonation({ charityId, charityName }: { charityId: string, charityName: string }) {
    const [amount, setAmount] = useState<number>(500); // Default ₹500
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDonate = async () => {
        setIsProcessing(true);
        try {
            const res = await fetch("/api/stripe/donate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, charityId, charityName }),
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
        } catch (error) {
            console.error("Donation failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="impact-gradient rounded-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px]"></div>
            <div className="relative z-10 text-white">
                <div className="flex items-center gap-3 mb-4">
                    <HeartHandshake size={24} className="text-white" />
                    <h3 className="font-headline font-bold text-lg">Direct Impact</h3>
                </div>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                    Make a one-time, independent donation to <strong className="text-white">{charityName}</strong>. 100% of this goes directly to the field.
                </p>

                <div className="flex gap-2 mb-4">
                    {[500, 1000, 2500].map((preset) => (
                        <button
                            key={preset}
                            onClick={() => setAmount(preset)}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${amount === preset
                                ? "bg-surface-container-highest text-primary shadow-md"
                                : "bg-white/20 text-white hover:bg-white/30"
                                }`}
                        >
                            ₹{preset}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleDonate}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl bg-surface-container-highest text-primary font-bold text-sm hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : `Donate ₹${amount}`}
                </button>
            </div>
        </div>
    );
}


// --- CANCEL SUBSCRIPTION BUTTON ---
export function CancelSubscription() {
    const router = useRouter();
    const [isConfirming, setIsConfirming] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCancel = async () => {
        if (!isConfirming) {
            setIsConfirming(true);
            return;
        }

        setIsProcessing(true);
        try {
            const res = await fetch("/api/stripe/cancel", { method: "POST" });
            if (res.ok) {
                router.refresh(); // Instantly updates the UI to show "Canceling" status
            } else {
                const data = await res.json();
                console.error("Failed to cancel:", data.error);
            }
        } catch (error) {
            console.error("Cancellation failed", error);
        } finally {
            setIsProcessing(false);
            setIsConfirming(false);
        }
    };

    return (
        <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
            <button
                onClick={handleCancel}
                disabled={isProcessing}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center gap-2 ${isConfirming
                        ? "bg-error text-on-error hover:bg-error/90 animate-in shake"
                        : "bg-transparent text-error hover:bg-error/10 border border-error/20"
                    }`}
            >
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                {!isProcessing && isConfirming && <AlertTriangle className="w-4 h-4" />}
                {isConfirming ? "Confirm Cancellation" : "Cancel Plan"}
            </button>
            {isConfirming && (
                <p className="text-[10px] text-on-surface-variant max-w-[200px] text-right">
                    You will retain access until the end of your current billing cycle.
                </p>
            )}
        </div>
    );
}