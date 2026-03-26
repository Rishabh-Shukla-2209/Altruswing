import Link from "next/link";
import { Sparkles } from "lucide-react";

export function FeaturedCharityCard() {
  return (
    <article className="lg:col-span-1 bg-primary text-white rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(25,28,31,0.03),0_20px_40px_rgba(25,28,31,0.05)] group relative p-10 flex flex-col justify-end min-h-[420px]">
      <div className="absolute inset-0 overflow-hidden opacity-30 mix-blend-overlay">
        <div className="w-full h-full bg-gradient-to-br from-primary via-primary-container to-primary"></div>
      </div>
      <div className="relative z-10">
        <span className="bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-6 inline-block">
          Curator&apos;s Choice
        </span>
        <h3 className="text-4xl font-headline font-extrabold mb-6 leading-tight">
          Start Your Impact Portfolio
        </h3>
        <p className="text-on-primary-container text-sm leading-relaxed mb-10">
          Our &quot;Smart Giving&quot; AI helps you distribute donations across
          multiple high-impact charities with a single transaction.
        </p>
        <Link
          href="/signup"
          className="bg-white text-primary px-8 py-4 rounded-full font-bold text-sm inline-flex items-center gap-3 hover:bg-secondary-fixed transition-colors active:scale-95 duration-150"
        >
          Learn More
          <Sparkles size={18} />
        </Link>
      </div>
    </article>
  );
}
