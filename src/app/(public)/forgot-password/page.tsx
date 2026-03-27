"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  useEffect(() => {
    // Listen for auth events across all tabs
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // If they click the reset link in Tab B, Supabase logs them in temporarily.
      // Tab A (this tab) will instantly hear the SIGNED_IN event.
      if (event === "SIGNED_IN") {
        router.push("/update-password");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // Points to the callback we built, which will securely route them to the update page
      redirectTo: `${window.location.origin}/auth/confirm?next=/update-password`,
    });

    if (error) {
      setMessage({ text: error.message, type: "error" });
    } else {
      setMessage({
        text: "Check your email for the password reset link.",
        type: "success",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased flex">
      {/* Left Panel — Hidden on Mobile, matches your design exactly */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-end p-16">
        <div className="absolute inset-0 impact-gradient"></div>
        <div className="absolute top-[-10%] right-[-20%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-container/20 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-lg">
          <Link
            href="/"
            className="text-3xl font-black tracking-tighter text-white font-headline mb-8 block"
          >
            AltruSwing.
          </Link>
          <h2 className="text-5xl font-headline font-extrabold text-white leading-tight mb-6">
            Secure your <span className="text-primary-fixed-dim">Account.</span>
          </h2>
          <p className="text-lg text-secondary-fixed-dim leading-relaxed">
            Get back to tracking your scores and making an impact. We'll help
            you securely reset your password.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute top-8 right-8">
          <ModeToggle />
        </div>

        <div className="w-full max-w-md space-y-10">
          <div className="space-y-3">
            <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">
              Reset Password
            </h1>
            <p className="text-on-surface-variant text-lg">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {message && (
            <div
              className={`p-4 rounded-xl border text-sm font-medium ${
                message.type === "error"
                  ? "bg-red-500/10 border-red-500/20 text-red-500"
                  : "bg-green-500/10 border-green-500/20 text-green-500"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-bold text-on-surface tracking-wider"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || message?.type === "success"}
              className="w-full py-4 rounded-xl bg-linear-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="text-center text-on-surface-variant text-sm">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
