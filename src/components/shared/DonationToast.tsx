"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Heart, X } from "lucide-react";

export function DonationToast() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (searchParams.get("donation") === "success") {
            setIsVisible(true);

            // Clean up the URL securely without triggering a hard reload
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete("donation");
            const newUrl = newParams.toString() ? `${pathname}?${newParams.toString()}` : pathname;
            router.replace(newUrl, { scroll: false });

            // Auto-dismiss after 5 seconds
            const timer = setTimeout(() => setIsVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [searchParams, router, pathname]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className="bg-surface-container-highest border border-primary/20 p-4 rounded-2xl shadow-2xl flex items-start gap-4 max-w-sm">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shrink-0">
                    <Heart size={20} className="text-on-primary" />
                </div>
                <div className="flex-1 pt-1">
                    <h4 className="text-sm font-bold font-headline text-on-surface mb-1">
                        Impact Registered
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                        Thank you for your generous contribution. 100% of your donation is on its way to the field.
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}