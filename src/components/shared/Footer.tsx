import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest pt-20 pb-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-12 gap-8">
        <div className="text-lg font-black text-on-surface font-headline uppercase tracking-tighter">
          AltruSwing
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link
            href="#"
            className="font-body text-xs tracking-widest uppercase text-on-surface-variant/60 hover:text-primary transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="font-body text-xs tracking-widest uppercase text-on-surface-variant/60 hover:text-primary transition-colors duration-200"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="font-body text-xs tracking-widest uppercase text-on-surface-variant/60 hover:text-primary transition-colors duration-200"
          >
            Impact Report
          </Link>
          <Link
            href="#"
            className="font-body text-xs tracking-widest uppercase text-on-surface-variant/60 hover:text-primary transition-colors duration-200"
          >
            Contact Support
          </Link>
        </div>
        <p className="font-body text-[10px] tracking-widest uppercase text-on-surface-variant/40 text-center md:text-right">
          © 2024 AltruSwing. <br className="md:hidden" /> Elevating the Game,
          Impacting the World.
        </p>
      </div>
    </footer>
  );
}
