import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/shared/ModeToggle";

export default function SignupPage() {
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
            Join a community of golfers who play with purpose. Track scores,
            win rewards, and support charities that change the world.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-headline font-black text-white">14k+</p>
              <p className="text-[0.65rem] text-secondary-fixed-dim uppercase tracking-widest mt-1">Players</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-headline font-black text-white">$2.4M</p>
              <p className="text-[0.65rem] text-secondary-fixed-dim uppercase tracking-widest mt-1">Donated</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-headline font-black text-white">842</p>
              <p className="text-[0.65rem] text-secondary-fixed-dim uppercase tracking-widest mt-1">Lives Changed</p>
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

          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-bold text-on-surface uppercase tracking-wider">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-bold text-on-surface uppercase tracking-wider">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-on-surface uppercase tracking-wider">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold text-on-surface uppercase tracking-wider">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                className="w-full px-5 py-4 h-auto bg-surface-container-high rounded-xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-outline-variant bg-surface-container-high text-primary focus:ring-primary/20"
              />
              <label htmlFor="terms" className="text-sm text-on-surface-variant leading-relaxed">
                I agree to the{" "}
                <Link href="#" className="text-primary font-semibold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary font-semibold hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all duration-300"
            >
              Create Account
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-surface px-4 text-on-surface-variant">
                or sign up with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 px-6 py-2 rounded-xl bg-surface-container-high border border-outline-variant/10 text-on-surface font-medium text-sm hover:bg-surface-container-highest transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 px-6 py-2 rounded-xl bg-surface-container-high border border-outline-variant/10 text-on-surface font-medium text-sm hover:bg-surface-container-highest transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </button>
          </div>

          <p className="text-center text-on-surface-variant text-sm">
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
