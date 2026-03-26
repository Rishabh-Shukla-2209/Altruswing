import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-primary dark:text-white uppercase font-headline"
        >
          Performance + Purpose
        </Link>

        {/* Updated Links to match PRD requirements */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/#how-it-works"
            className="text-slate-500 dark:text-slate-400 font-medium hover:text-primary transition-colors font-headline tracking-tight text-sm"
          >
            How it Works
          </Link>
          <Link
            href="/charities"
            className="text-slate-500 dark:text-slate-400 font-medium hover:text-primary transition-colors font-headline tracking-tight text-sm"
          >
            Charities
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/login"
            className="text-primary font-bold text-sm hover:opacity-80 transition-all font-headline"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="hidden md:inline-flex px-6 py-2.5 rounded-full impact-gradient text-white font-bold tracking-wide text-sm shadow-md hover:scale-105 transition-transform"
          >
            Subscribe
          </Link>
        </div>
      </div>
      <div className="bg-surface-container-low dark:bg-slate-900 h-px w-full" />
    </nav>
  );
}
