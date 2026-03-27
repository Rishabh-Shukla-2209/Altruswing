"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { createClient } from "@/utils/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // This updates the password for the currently authenticated user
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      // Password updated successfully, route them to the dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased flex items-center justify-center p-8 relative">
      <div className="absolute top-8 right-8">
        <ModeToggle />
      </div>

      <div className="w-full max-w-md space-y-10">
        <div className="space-y-3">
          <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">
            New Password
          </h1>
          <p className="text-on-surface-variant text-lg">
            Enter your new password below to regain access.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-bold text-on-surface tracking-wider"
            >
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-linear-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
