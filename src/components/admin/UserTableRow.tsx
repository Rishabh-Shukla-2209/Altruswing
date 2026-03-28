"use client";

import { Trash2, Loader2, CreditCard, X, Check, Pencil } from "lucide-react";
import { forceUpdateSubscription, deleteUser, deleteScore, updateScore } from "@/app/(admin)/admin/actions/adminUsers";
import { useState } from "react";
import { useRouter } from "next/navigation";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    canceling: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    past_due: "bg-error/10 text-error border-error/20",
    inactive: "bg-surface-container-highest text-on-surface-variant border-outline-variant/20",
  };
  return (
    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${styles[status] || styles.inactive}`}>
      {status || "none"}
    </span>
  );
}

const SUB_OPTIONS = ["active", "inactive", "past_due", "canceling"];

export function UserTableRow({ user }: { user: any }) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSubDropdown, setShowSubDropdown] = useState(false);
    const [editingScoreId, setEditingScoreId] = useState<string | null>(null);
    const [editingScoreValue, setEditingScoreValue] = useState("");
    const [deleted, setDeleted] = useState(false);

    const handleSetSubscription = async (newStatus: string) => {
        setIsUpdating(true);
        setShowSubDropdown(false);
        try {
            await forceUpdateSubscription(user.id, newStatus);
            router.refresh();
        } catch (e: any) {
            alert("Failed to update: " + e.message);
        }
        setIsUpdating(false);
    };

    const handleDelete = async () => {
        if (!confirm(`Delete user ${user.email}? This removes all their data (scores, preferences, winnings). This cannot be undone.`)) return;
        setIsDeleting(true);
        try {
            await deleteUser(user.id);
            setDeleted(true);
        } catch (e: any) {
            alert("Failed to delete: " + e.message);
            setIsDeleting(false);
        }
    };

    const handleDeleteScore = async (scoreId: string) => {
        try {
            await deleteScore(scoreId);
            router.refresh();
        } catch (e: any) {
            alert("Failed: " + e.message);
        }
    };

    const handleSaveScore = async (scoreId: string) => {
        const val = parseInt(editingScoreValue, 10);
        if (isNaN(val)) { alert("Invalid number"); return; }
        try {
            await updateScore(scoreId, val);
            setEditingScoreId(null);
            router.refresh();
        } catch (e: any) {
            alert("Failed: " + e.message);
        }
    };

    if (deleted) return null;

    return (
        <tr className="group hover:bg-surface-container-highest/30 transition-colors">
            <td className="px-6 py-5">
                <div>
                    <div className="font-medium text-sm truncate w-32 md:w-48">{user.email}</div>
                    <div className="text-[10px] text-on-surface-variant font-mono truncate w-32 md:w-48">
                        {user.id}
                    </div>
                </div>
            </td>
            <td className="px-6 py-5 font-mono text-sm font-bold">
                {user.role || "user"}
            </td>
            <td className="px-6 py-5">
                <div className="flex gap-1 flex-wrap">
                    {user.scores.length === 0 ? (
                        <span className="text-xs text-on-surface-variant italic">No scores</span>
                    ) : user.scores.map((s: any, i: number) => (
                        <div key={s.id} className="relative group/score">
                            {editingScoreId === s.id ? (
                                <div className="flex items-center gap-0.5">
                                    <input
                                        type="number"
                                        min={0}
                                        max={45}
                                        value={editingScoreValue}
                                        onChange={(e) => setEditingScoreValue(e.target.value)}
                                        className="w-10 h-8 rounded-md bg-surface-container-lowest text-center text-xs font-bold border border-primary/30 outline-none"
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleSaveScore(s.id);
                                            if (e.key === "Escape") setEditingScoreId(null);
                                        }}
                                    />
                                    <button onClick={() => handleSaveScore(s.id)} className="p-0.5 text-emerald-400 hover:text-emerald-300">
                                        <Check size={10} />
                                    </button>
                                    <button onClick={() => setEditingScoreId(null)} className="p-0.5 text-error hover:text-error/80">
                                        <X size={10} />
                                    </button>
                                </div>
                            ) : (
                                <span
                                    className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold cursor-pointer transition-colors ${
                                        i === 0
                                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                                            : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-highest/70"
                                    }`}
                                    onClick={() => {
                                        setEditingScoreId(s.id);
                                        setEditingScoreValue(s.stableford_score.toString());
                                    }}
                                    title="Click to edit"
                                >
                                    {s.stableford_score}
                                </span>
                            )}
                            {editingScoreId !== s.id && (
                                <button
                                    onClick={() => handleDeleteScore(s.id)}
                                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-error text-on-error flex items-center justify-center opacity-0 group-hover/score:opacity-100 transition-opacity"
                                    title="Delete score"
                                >
                                    <X size={8} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </td>
            <td className="px-6 py-5 relative">
                <div className="relative inline-block">
                    <button
                        onClick={() => setShowSubDropdown(!showSubDropdown)}
                        disabled={isUpdating}
                        className="flex items-center gap-1.5 cursor-pointer"
                    >
                        {isUpdating ? (
                            <Loader2 size={12} className="animate-spin text-primary" />
                        ) : (
                            <StatusBadge status={user.subscription_status} />
                        )}
                        <Pencil size={10} className="text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    {showSubDropdown && (
                        <div className="absolute top-full left-0 mt-1 z-50 bg-surface-container-lowest rounded-lg shadow-xl border border-outline-variant/10 py-1 min-w-[120px]">
                            {SUB_OPTIONS.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => handleSetSubscription(opt)}
                                    className={`w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-surface-container-highest transition-colors ${
                                        opt === user.subscription_status ? "text-primary" : "text-on-surface-variant"
                                    }`}
                                >
                                    {opt.replace("_", " ")}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </td>
            <td className="px-6 py-5 text-sm text-on-surface-variant">
                {new Date(user.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-5">
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-2 rounded-lg hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors disabled:opacity-50"
                    title="Delete User"
                >
                    {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
            </td>
        </tr>
    );
}
