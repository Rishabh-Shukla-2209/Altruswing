"use client";

import { useState } from "react";
import { X, Loader2, UserPlus } from "lucide-react";
import { createUser } from "@/app/(admin)/admin/actions/adminUsers";
import { useRouter } from "next/navigation";

export function AddUserDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createUser(form);
      setIsOpen(false);
      setForm({
        email: "",
        password: "",
        role: "user",
      });
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to create user");
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
        <UserPlus size={16} />
        Add User
      </button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-surface-container rounded-2xl w-full max-w-md shadow-2xl border border-outline-variant/10 animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-outline-variant/10">
            <div>
              <h3 className="font-headline font-bold text-xl tracking-tight">
                Add New User
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Create a new user account and profile.
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
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="user@example.com"
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>

            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Leave blank for random"
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/40 border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
              <p className="text-[10px] text-outline mt-1 italic">
                A random password will be generated if not specified.
              </p>
            </div>

            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">
                System Role
              </label>
              <select
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm cursor-pointer appearance-none"
              >
                <option value="user">USER</option>
                <option value="admin">ADMIN</option>
              </select>
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
              disabled={isSubmitting || !form.email.trim()}
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <UserPlus size={14} />
              )}
              Create User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
