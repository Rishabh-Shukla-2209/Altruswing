"use client";

import { useState, useEffect } from "react";

export function CountdownTimer({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const target = new Date(targetDate).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                });
            }
        };

        updateTimer(); // Initial call
        const interval = setInterval(updateTimer, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [targetDate]);

    // Prevent hydration mismatch by not rendering the numbers until the client mounts
    if (!isMounted) return <div className="h-16 animate-pulse bg-surface-container-high rounded-xl"></div>;

    return (
        <div className="flex justify-center gap-4">
            <div className="text-center">
                <div className="text-3xl font-black font-headline">
                    {timeLeft.days.toString().padStart(2, "0")}
                </div>
                <div className="text-[10px] font-label text-on-surface-variant uppercase">Days</div>
            </div>
            <div className="text-3xl font-black font-headline text-primary/40">:</div>
            <div className="text-center">
                <div className="text-3xl font-black font-headline">
                    {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <div className="text-[10px] font-label text-on-surface-variant uppercase">Hrs</div>
            </div>
            <div className="text-3xl font-black font-headline text-primary/40">:</div>
            <div className="text-center">
                <div className="text-3xl font-black font-headline">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-[10px] font-label text-on-surface-variant uppercase">Min</div>
            </div>
        </div>
    );
}
