import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { TrendingUp, FileText, Medal, Heart, ArrowRight } from "lucide-react";
import { CharityCard } from "@/components/shared/CharityCard";
import { MobileNav } from "@/components/shared/MobileNav";
import CharitiesOverview from "@/components/charities/CharitiesOverview";

export default function LandingPage() {
  const charities = [
    {
      id: "1",
      name: "EcoRestore",
      desc: "Reforestation and biodiversity protection across the Amazon.",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    },
    {
      id: "2",
      name: "HealthFirst",
      desc: "Providing surgical care and medical training in remote regions.",
      img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    },
    {
      id: "3",
      name: "LearnBound",
      desc: "Digital literacy programs for underprivileged urban communities.",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    },
    {
      id: "4",
      name: "PurePulse",
      desc: "Clean energy and water purification infrastructure projects.",
      img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80",
    },
  ];

  return (
    <div className="bg-surface font-body text-on-surface antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-container/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest/50 border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(186,195,255,0.6)]"></span>
              <span className="text-[0.65rem] font-label uppercase tracking-widest text-primary">
                Digital Curator Series
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tight leading-[0.9] text-on-surface">
              AltruSwing<span className="text-primary">.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
              Track your golf performance, win monthly rewards, and support
              meaningful causes. Every stroke counts toward global impact.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/signup"
                className="bg-linear-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.05] transition-transform duration-300 shadow-xl shadow-primary/20 inline-block text-center"
              >
                Start Playing with Purpose
              </Link>
              <Link
                href="/charities"
                className="bg-surface-container-high border border-outline-variant/30 text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-bright transition-colors inline-block text-center"
              >
                Explore Charities
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            {/* Floating Glass Card — existing card, dark-mode-aware */}
            <div className="glass-card dark:glass-panel p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(25,28,31,0.05)] dark:shadow-2xl border border-white/40 dark:border-outline-variant/10 w-full max-w-md rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                    Performance Trend
                  </p>
                  <h3 className="font-headline text-2xl font-bold text-primary">
                    Your Last 5 Scores
                  </h3>
                </div>
                <TrendingUp className="text-primary text-3xl" size={32} />
              </div>
              <div className="flex justify-between items-end h-16 gap-2 mb-6">
                <div className="flex-1 bg-primary/10 rounded-t-lg h-[60%]"></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[80%]"></div>
                <div className="flex-1 impact-gradient rounded-t-lg h-full shadow-lg"></div>
                <div className="flex-1 bg-primary/15 rounded-t-lg h-[90%]"></div>
                <div className="flex-1 bg-primary/5 rounded-t-lg h-[70%]"></div>
              </div>
              <div className="flex justify-between text-sm font-bold text-primary/80">
                <span>32</span>
                <span>36</span>
                <span className="text-primary font-black">40</span>
                <span>38</span>
                <span>35</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Purpose Cycle */}
      <section className="py-32 bg-surface-container-low relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-headline font-bold mb-4">
              The Purpose Cycle
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              A seamless integration of sport and philanthropy. Turn every game
              into an opportunity for change.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="group p-8 rounded-[2.5rem] bg-surface-container border border-outline-variant/10 hover:border-primary/20 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <FileText className="text-primary text-3xl" size={28} />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">
                Play & Track
              </h3>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                Input your handicap and round scores effortlessly. Our advanced
                analytics track your progression over time.
              </p>
              <div className="bg-surface-container-lowest dark:bg-surface-container-lowest/50 rounded-xl p-4 border border-outline-variant/5">
                <div className="flex justify-between items-center text-xs font-label uppercase text-primary mb-2">
                  <span>Score Input</span>
                  <span>+1.2 HDCP</span>
                </div>
                <div className="h-2 bg-outline-variant/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4"></div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group p-8 rounded-[2.5rem] bg-surface-container border border-outline-variant/10 hover:border-primary/20 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Medal className="text-primary text-3xl" size={28} />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">
                Compete & Win
              </h3>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                Each verified round enters you into our monthly prize pool. The
                better you play, the more entries you earn.
              </p>
              <div className="bg-surface-container-lowest dark:bg-surface-container-lowest/50 rounded-xl p-4 border border-outline-variant/5 flex items-center gap-3">
                <Medal className="text-secondary" size={24} />
                <div>
                  <p className="text-xs font-bold">12 Active Entries</p>
                  <p className="text-[0.65rem] text-on-surface-variant">
                    Monthly Jackpot Draw
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group p-8 rounded-[2.5rem] bg-surface-container border border-outline-variant/10 hover:border-primary/20 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Heart className="text-primary text-3xl" size={28} />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">
                Make an Impact
              </h3>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                A portion of every entry fee and platform profit goes directly
                to our verified partner charities.
              </p>
              <div className="bg-surface-container-lowest dark:bg-surface-container-lowest/50 rounded-xl p-4 border border-outline-variant/5">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">
                  842 Lives Impacted
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Pool Section — dark mode fixes only */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-container-lowest dark:bg-surface-container-lowest"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-secondary-fixed blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center space-y-12">
          <p className="font-label uppercase tracking-[0.4em] text-primary/60 mb-6 text-sm">
            Monthly Prize Pool
          </p>
          <div className="text-6xl md:text-9xl font-headline font-black tracking-tighter text-primary dark:text-white dark:text-glow mb-8 italic">
            ₹ 1, 50, 00, 000
          </div>
          <div className="max-w-lg mx-auto">
            <p className="text-on-surface-variant text-lg md:text-xl font-medium tracking-wide italic">
              &quot;Your performance on the course could win you this next
              month.&quot;
            </p>
          </div>
          <Link
            href="/signup"
            className="bg-linear-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.05] transition-transform duration-300 shadow-xl shadow-primary/20 uppercase inline-block text-center"
          >
            Join the Draw
          </Link>
        </div>
      </section>

      {/* Dual Value Section — dark mode fixes only */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Your Game */}
            <div className="space-y-10">
              <div className="space-y-2">
                <span className="text-primary font-label text-xs font-black uppercase tracking-widest">
                  Performance Dashboard
                </span>
                <h3 className="font-headline text-4xl font-extrabold text-primary">
                  Your Game
                </h3>
              </div>
              <div className="bg-surface-container-lowest p-10 rounded-xl shadow-lg border border-outline-variant/5">
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div>
                    <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1">
                      Average Score
                    </p>
                    <p className="text-4xl font-headline font-black text-primary">
                      74.2
                    </p>
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1">
                      Handicap Index
                    </p>
                    <p className="text-4xl font-headline font-black text-primary">
                      3.8
                      <span className="text-sm font-bold text-error ml-2">
                        ↓0.2
                      </span>
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-primary/60">
                    <span>Consistency</span>
                    <span>88%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-low rounded-full">
                    <div className="h-full w-[88%] impact-gradient rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Impact */}
            <div className="space-y-10">
              <div className="space-y-2">
                <span className="text-primary font-label text-xs font-black uppercase tracking-widest">
                  Philanthropic Reach
                </span>
                <h3 className="font-headline text-4xl font-extrabold text-primary">
                  Your Impact
                </h3>
              </div>
              <div className="bg-surface-container-lowest p-10 rounded-xl shadow-lg border border-outline-variant/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Heart
                    className="text-[96px] text-primary"
                    strokeWidth={1.5}
                    fill="currentColor"
                    size={120}
                    style={{ opacity: 0.8 }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8 mb-10 relative z-10">
                  <div>
                    <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1">
                      Lives Impacted
                    </p>
                    <p className="text-4xl font-headline font-black text-primary">
                      128
                    </p>
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1">
                      Total Contributed
                    </p>
                    <p className="text-4xl font-headline font-black text-primary">
                      ₹22,450
                    </p>
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Your contributions this month provided clean water access
                    for a village of 40 people in East Africa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Charities — dark mode fixes only */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-primary font-label text-xs font-black uppercase tracking-widest">
                Global Partners
              </span>
              <h2 className="font-headline text-5xl font-extrabold text-primary">
                Play for something bigger.
              </h2>
            </div>
            <Link
              href="/charities"
              className="text-primary font-bold text-sm underline underline-offset-8 decoration-2 hover:decoration-primary/40 transition-all"
            >
              View all charities
            </Link>
          </div>
          <CharitiesOverview />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-headline font-black mb-8 leading-tight">
            Play. Win. Impact.
          </h2>
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/signup"
              className="bg-linear-to-r from-primary to-primary-container text-on-primary px-12 py-5 rounded-2xl font-bold text-xl hover:scale-[1.05] transition-transform duration-300 shadow-2xl shadow-primary/30 inline-block"
            >
              Join the Next Draw
            </Link>
            <p className="text-on-surface-variant text-lg">
              Track your game. Win rewards. Support real change.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-bright flex items-center justify-center text-[0.5rem] font-bold">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary/40 flex items-center justify-center text-[0.5rem] font-bold">
                  AK
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-secondary-container flex items-center justify-center text-[0.5rem] font-bold">
                  ML
                </div>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">
                +1,402 joined today
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  );
}
