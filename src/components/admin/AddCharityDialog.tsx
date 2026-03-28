"use client";

import { useState } from "react";
import { X, Loader2, Plus } from "lucide-react";
import { createCharity } from "@/app/(admin)/admin/actions/adminCharities";
import { useRouter } from "next/navigation";
import { Constants } from "@/types/database.types";

const CATEGORIES = Constants.public.Enums.CATEGORIES;
const REGIONS = Constants.public.Enums.REGION;

export function AddCharityDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    cover_image_url: "",
    impact_label: "",
    impact_value: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createCharity(form);
      setIsOpen(false);
      setForm({
        name: "",
        description: "",
        category: "",
        location: "",
        cover_image_url: "",
        impact_label: "",
        impact_value: "",
      });
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to create charity");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm hover:opacity-90 transition-opacity"
      >
        <Plus size={16} />
        Add Charity
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={() => setIsOpen(false)}
      >
        {/* Dialog */}
        <div
          className="bg-surface-container rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant/10 animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-outline-variant/10">
            <div>
              <h3 className="font-headline font-bold text-xl tracking-tight">
                Add New Charity
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                All fields except Name are optional. The charity will be set to
                Active by default.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Body */}
          <div className="px-8 py-6 space-y-5">
            {/* Name (required) */}
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">
                Charity Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Future Learners Alliance"
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Brief description of the charity's mission and goals..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none"
              />
            </div>

            {/* Category + Region row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm cursor-pointer appearance-none"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">
                  Region
                </label>
                <select
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm cursor-pointer appearance-none"
                >
                  <option value="">Select region...</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cover Image URL */}
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">
                Cover Image URL
              </label>
              <input
                type="url"
                value={form.cover_image_url}
                onChange={(e) => update("cover_image_url", e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>

            {/* Impact Label + Value row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">
                  Impact Label
                </label>
                <input
                  type="text"
                  value={form.impact_label}
                  onChange={(e) => update("impact_label", e.target.value)}
                  placeholder="e.g. Trees Planted"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
              </div>
              <div>
                <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">
                  Impact Value
                </label>
                <input
                  type="text"
                  value={form.impact_value}
                  onChange={(e) => update("impact_value", e.target.value)}
                  placeholder="e.g. 12,480"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-error text-xs font-bold uppercase tracking-wider text-center py-2 px-4 bg-error/5 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-outline-variant/10 flex justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 rounded-xl bg-surface-container-highest text-on-surface-variant font-bold text-sm hover:bg-surface-bright transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !form.name.trim()}
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Plus size={14} />
              )}
              Create Charity
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
