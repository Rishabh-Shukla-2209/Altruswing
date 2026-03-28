"use client";

import { useState } from "react";
import { Heart, Settings, Loader2, X } from "lucide-react";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { updateContributionPercent } from "@/app/(subscriber)/dashboard/action";

type CharityProps = {
    name: string;
    description: string;
    cover_image_url: string;
};

export function ImpactCardClient({
    charity,
    initialPercent
}: {
    charity: CharityProps;
    initialPercent: number;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [percent, setPercent] = useState<number[]>([initialPercent]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            await updateContributionPercent(percent[0]);
            setIsEditing(false); // Close edit mode on success
        } catch (error) {
            console.error("Failed to update percentage:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-3xl min-h-[360px] flex flex-col justify-center p-8 group bg-surface-container-lowest transition-all">
            {/* Dynamic Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-20"
                style={{ backgroundImage: `url('${charity.cover_image_url}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/90 to-surface-container-lowest/20"></div>

            <div className="relative z-10 w-full h-full flex flex-col justify-end">
                {/* Header Row */}
                <div className="flex justify-between items-start mb-4">
                    <Heart size={32} className="text-primary drop-shadow-md" />
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-2 bg-surface-container/50 backdrop-blur-md rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary"
                        >
                            <Settings size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setPercent([initialPercent]); // Reset on cancel
                            }}
                            className="p-2 bg-surface-container/50 backdrop-blur-md rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-error"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* View Mode vs Edit Mode */}
                {!isEditing ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-xs uppercase tracking-[0.2em] font-label text-on-surface-variant mb-2">
                            Philanthropic Impact
                        </p>
                        <h3 className="text-2xl font-bold font-headline mb-3 line-clamp-1">
                            {charity.name}
                        </h3>
                        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed line-clamp-2">
                            {charity.description}
                        </p>
                        <div className="flex items-center justify-between p-4 bg-surface-container/80 backdrop-blur-md rounded-xl border border-outline-variant/10">
                            <span className="text-xs font-label text-on-surface-variant uppercase">
                                Contribution
                            </span>
                            <span className="text-primary font-black font-headline text-lg">
                                {initialPercent}% OF FEE
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in zoom-in-95 bg-surface-container/90 backdrop-blur-xl p-6 rounded-2xl border border-primary/20">
                        <h4 className="font-bold font-headline text-lg mb-2">Adjust Contribution</h4>
                        <p className="text-xs text-on-surface-variant mb-6">
                            Increase your impact at no extra cost to your monthly fee.
                        </p>

                        <div className="flex justify-between items-end mb-4">
                            <span className="text-3xl font-black text-primary">{percent[0]}%</span>
                        </div>

                        <Slider
                            defaultValue={[initialPercent]}
                            max={25}
                            min={10}
                            step={1}
                            value={percent}
                            onValueChange={setPercent}
                            className="mb-8"
                        />

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={handleSave}
                                disabled={isSubmitting || percent[0] === initialPercent}
                                className="w-full impact-gradient text-white font-bold"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Save Changes"}
                            </Button>

                            <Link
                                href="/charities"
                                className="w-full py-2 text-center text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                            >
                                Choose a different cause &rarr;
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}