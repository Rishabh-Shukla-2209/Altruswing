import { ShieldCheck, Info } from "lucide-react";
import Link from "next/link";

interface CharityActionCardProps {
  charityName: string;
  description: string;
}

export function CharityActionCard({ charityName, description }: CharityActionCardProps) {
  return (
    <div className="glass-card dark:glass-panel p-10 rounded-xl shadow-2xl shadow-on-surface/5 border border-outline-variant/15">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck size={20} className="text-primary" />
        <span className="text-sm font-bold text-primary tracking-wide uppercase">
          Verified Charity
        </span>
      </div>
      <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">
        Support {charityName}
      </h3>
      <p className="text-on-surface-variant mb-10 leading-relaxed">
        {description}
      </p>
      <Link
        href="/signup"
        className="block w-full py-5 rounded-full impact-gradient text-white font-headline font-bold text-lg shadow-lg hover:scale-95 transition-all duration-200 mb-6 text-center"
      >
        Support This Charity
      </Link>
      <div className="flex items-start gap-3 p-4 bg-surface-container-low dark:bg-surface-container/50 rounded-lg">
        <Info size={16} className="text-secondary shrink-0 mt-0.5" />
        <p className="text-xs text-on-surface-variant leading-relaxed">
          <strong className="block text-primary mb-1 uppercase tracking-tighter">
            Transparency Note
          </strong>
          100% of your designated contribution goes directly to the field.
          Operational costs are covered by separate endowment grants.
        </p>
      </div>
    </div>
  );
}
