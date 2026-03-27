"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { createClient } from "@/utils/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [isSuccess, setIsSuccess] = useState(false); // Add this state

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { firstName, lastName, email, password } = formData;
    const fullName = `${firstName} ${lastName}`;

    // 1. Supabase Auth Signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        // Tell Supabase where to send them AFTER they click the email link
        emailRedirectTo: `${window.location.origin}/auth/confirm?next=/signup/charity`,
      },
    });

    if (authError) {
      if (authError.message.includes("Password should contain")) {
        setError(
          "Password must be at least 8 characters long and include a mix of capital and small letters, numbers, and special characters.",
        );
      } else {
        setError(authError.message);
      }
      setIsLoading(false);
      setIsSuccess(false);
      return;
    }

    // 2. Handle the "Check Email" state
    if (authData.user) {
      // If the user already exists, Supabase returns a fake user object for security.
      // We check the identities array to see if it's a genuine new signup.
      if (authData.user.identities && authData.user.identities.length === 0) {
        setError("An account with this email already exists. Please log in.");
        setIsLoading(false);
        return;
      }

      // Switch the UI to show the success message
      setIsSuccess(true);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Redirects back to your app's callback route, passing the next destination
        redirectTo: `${window.location.origin}/auth/callback?next=/signup/charity`,
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
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-container/20 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-lg">
          <Link
            href="/"
            className="text-3xl font-black tracking-tighter text-white font-headline mb-8 block"
          >
            AltruSwing.
          </Link>
          <h2 className="text-5xl font-headline font-extrabold text-white leading-tight mb-6">
            Every Stroke <span className="text-primary-fixed-dim">Counts.</span>
          </h2>
          <p className="text-lg text-secondary-fixed-dim leading-relaxed">
            Join a community of golfers who play with purpose. Track scores, win
            rewards, and support charities that change the world.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-headline font-black text-white">
                14k+
              </p>
              <p className="text-[0.65rem] text-secondary-fixed-dim  tracking-widest mt-1">
                Players
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-headline font-black text-white">
                $2.4M
              </p>
              <p className="text-[0.65rem] text-secondary-fixed-dim  tracking-widest mt-1">
                Donated
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-headline font-black text-white">
                842
              </p>
              <p className="text-[0.65rem] text-secondary-fixed-dim  tracking-widest mt-1">
                Lives Changed
              </p>
            </div>
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
              Create your account
            </h1>
            <p className="text-on-surface-variant text-lg">
              Start your journey toward performance and purpose.
            </p>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text font-medium">
              {error}
            </div>
          )}

          {isSuccess && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text font-medium">
              Please check your email to verify your account.
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text font-bold text-on-surface  tracking-wider"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text font-bold text-on-surface  tracking-wider"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text font-bold text-on-surface  tracking-wider"
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
              <Label
                htmlFor="password"
                className="text font-bold text-on-surface  tracking-wider"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Minimum 8 characters"
                className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-linear-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20"></div>
            </div>
            <div className="relative flex justify-center text">
              <span className="bg-surface px-4 text-on-surface-variant">
                or sign up with
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-2 rounded-xl bg-surface-container-high border border-outline-variant/10 text-on-surface font-medium text hover:bg-surface-container-highest transition-colors cursor-pointer"
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

          <p className="text-center text-on-surface-variant text">
            Already have an account?{" "}
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
