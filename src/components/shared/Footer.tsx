import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-20 px-8 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="text-lg font-black text-primary font-headline">
            PERFORMANCE + PURPOSE
          </div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm">
            The digital curator for those who believe high performance should
            drive meaningful global impact.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <p className="font-bold text-[10px] uppercase tracking-widest text-primary">
              Platform
            </p>
            <Link
              href="/charities"
              className="text-slate-500 hover:text-primary text-xs tracking-wider uppercase transition-all hover:translate-x-1"
            >
              Charities
            </Link>
            <Link
              href="/login"
              className="text-slate-500 hover:text-primary text-xs tracking-wider uppercase transition-all hover:translate-x-1"
            >
              Sign In
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="font-bold text-[10px] uppercase tracking-widest text-primary">
              Legal
            </p>
            <Link
              href="#"
              className="text-slate-500 hover:text-primary text-xs tracking-wider uppercase transition-all hover:translate-x-1"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-slate-500 hover:text-primary text-xs tracking-wider uppercase transition-all hover:translate-x-1"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-200 flex justify-between items-center">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          © 2026 Performance + Purpose. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
