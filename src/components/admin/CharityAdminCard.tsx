"use client";

import { Eye, Loader2, Power, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toggleCharityStatus, deleteCharity } from "@/app/(admin)/admin/actions/adminCharities";
import { EditCharityDialog } from "@/components/admin/EditCharityDialog";

export function CharityAdminCard({ charity, totalContributions }: { charity: any, totalContributions: string }) {
    const [isMutating, setIsMutating] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleToggle = async () => {
        setIsMutating(true);
        try {
            await toggleCharityStatus(charity.id, charity.is_active);
        } catch (err: any) {
            alert("Failed to toggle: " + err.message);
        } finally {
            setIsMutating(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to completely delete ${charity.name}?`)) return;
        setIsMutating(true);
        try {
            await deleteCharity(charity.id);
            setIsDeleted(true);
        } catch (err: any) {
            alert("Failed to delete: " + err.message);
            setIsMutating(false);
        }
    };

    if (isDeleted) return null;

    const isActive = charity.is_active;

    return (
        <div className="bg-surface-container rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
            <div className={`relative h-40 overflow-hidden ${!isActive ? 'grayscale' : ''}`}>
                <Image
                src={charity.cover_image_url || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&q=60"}
                alt={charity.name || "Charity"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                <span
                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${
                    isActive
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-error/10 text-error border-error/20"
                    }`}
                >
                    {isActive ? "Active" : "Inactive"}
                </span>
                </div>
                <div className="absolute top-3 right-3">
                <span className="bg-surface-container-lowest/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-on-surface-variant">
                    {charity.category || "General"}
                </span>
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                <div className="pr-4 truncate">
                    <h4 className="font-headline font-bold text-lg truncate">{charity.name}</h4>
                    <p className="text-xs text-on-surface-variant">{charity.location || "Global"}</p>
                </div>
                <span className="text-xs font-mono text-on-surface-variant shrink-0">
                    ...{charity.id.split('-')[0].substring(0, 4)}
                </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
                <div>
                    <p className="text-[10px] text-outline uppercase tracking-widest font-label">
                    Contributions
                    </p>
                    <p className="text-primary font-bold font-headline">
                    {totalContributions}
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={handleToggle}
                        disabled={isMutating}
                        className={`p-2 rounded-lg hover:bg-surface-container-highest transition-colors disabled:opacity-50 ${isActive ? 'text-on-surface-variant hover:text-amber-500' : 'text-on-surface-variant hover:text-emerald-500'}`}
                        title={isActive ? "Deactivate" : "Activate"}
                    >
                    {isMutating ? <Loader2 size={14} className="animate-spin" /> : <Power size={14} />}
                    </button>
                    <EditCharityDialog charity={charity} />
                    <button
                        onClick={handleDelete}
                        disabled={isMutating}
                        className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-error transition-colors disabled:opacity-50"
                        title="Delete Permanently"
                    >
                    {isMutating ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}
