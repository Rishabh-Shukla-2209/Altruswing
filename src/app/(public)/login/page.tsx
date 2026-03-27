"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { email, password } = formData;

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    // Redirect to dashboard on successful login
    router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Redirect back to our callback route, then straight to the dashboard
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased flex">
      {/* Left Panel — Branding */}
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
            Performance <span className="text-primary-fixed-dim">+</span>{" "}
            Purpose.
          </h2>
          <p className="text-lg text-secondary-fixed-dim leading-relaxed">
            Track your golf game, compete for monthly prizes, and make a real
            impact for causes that matter.
          </p>
          <div className="flex items-center gap-4 mt-12">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                JD
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                AK
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                ML
              </div>
            </div>
            <span className="text-sm text-secondary-fixed-dim font-medium">
              +14,208 golfers making an impact
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute top-8 right-8">
          <ModeToggle />
        </div>

        <div className="w-full max-w-md space-y-10">
          {/* Mobile logo */}
          <div className="lg:hidden">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-primary font-headline"
            >
              AltruSwing.
            </Link>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">
              Welcome back
            </h1>
            <p className="text-on-surface-variant text-lg">
              Sign in to your account to continue your journey.
            </p>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
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
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="password"
                  className="text-sm font-bold text-on-surface tracking-wider"
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-linear-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-surface px-4 text-on-surface-variant">
                or continue with
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-surface-container-high border border-outline-variant/10 text-on-surface font-medium text-sm hover:bg-surface-container-highest transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>

          <p className="text-center text-on-surface-variant text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-bold hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
