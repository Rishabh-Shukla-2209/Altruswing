"use client";

import { ShieldCheck, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { updateUserCharity } from "@/app/(subscriber)/dashboard/action";

interface CharityActionCardProps {
  charityId: string;
  charityName: string;
  description: string;
}

export function CharityActionCard({ charityId, charityName, description }: CharityActionCardProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, [supabase]);

  const handleSupport = async () => {
    setIsSubmitting(true);
    try {
      await updateUserCharity(charityId);
      router.push("/dashboard"); // Send them straight back to see the updated impact
    } catch (error) {
      console.error("Failed to update charity:", error);
      setIsSubmitting(false);
    }
  };

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

      {/* Smart Button Logic */}
      {isAuthenticated === null ? (
        <div className="w-full h-16 bg-surface-container-high animate-pulse rounded-full mb-6"></div>
      ) : isAuthenticated ? (
        <button
          onClick={handleSupport}
          disabled={isSubmitting}
          className="w-full h-16 rounded-full impact-gradient text-white font-headline font-bold text-lg shadow-lg hover:scale-[1.02] cursor-pointer transition-all duration-200 mb-6 flex items-center justify-center disabled:opacity-50 disabled:hover:scale-100"
        >
          {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Set as My Charity"}
        </button>
      ) : (
        <Link
          href="/signup"
          className="flex w-full h-16 items-center justify-center rounded-full cursor-pointer impact-gradient text-white font-headline font-bold text-lg shadow-lg hover:scale-[1.02] transition-all duration-200 mb-6"
        >
          Sign Up to Support
        </Link>
      )}

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