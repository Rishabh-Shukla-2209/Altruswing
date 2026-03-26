import { Heart } from "lucide-react";
import Link from "next/link";

export function PhilanthropicImpact() {
  return (
    <div className="relative overflow-hidden rounded-3xl min-h-[320px] flex flex-col justify-end p-8 group bg-surface-container-lowest">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
      <div className="relative z-10">
        <Heart size={32} className="text-primary mb-4" />
        <p className="text-xs uppercase tracking-[0.2em] font-label text-on-surface-variant mb-2">
          Philanthropic Impact
        </p>
        <h3 className="text-2xl font-bold font-headline mb-4">
          Amazonas Reforest
        </h3>
        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
          Your performance directly funds rainforest restoration in the Amazon
          basin.
        </p>
        <div className="flex items-center justify-between p-4 bg-surface-container/80 backdrop-blur-md rounded-xl mb-6">
          <span className="text-xs font-label text-on-surface-variant uppercase">
            Contribution
          </span>
          <span className="text-primary font-black font-headline">
            15% OF FEE
          </span>
        </div>
        <Link
          href="/charities"
          className="block w-full py-3 bg-surface-container-highest text-primary font-bold rounded-xl border border-primary/10 hover:bg-primary hover:text-on-primary transition-all text-center"
        >
          Change Charity
        </Link>
      </div>
    </div>
  );
}
