import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased overflow-x-hidden">
      {/* TopNavBar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-surface to-secondary-fixed/30" />
          <div className="ethereal-glow absolute -top-24 -right-24 w-125 h-125 rounded-full opacity-40" />
          <div className="ethereal-glow absolute bottom-0 -left-24 w-150 h-150 rounded-full opacity-30" />
          <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none font-headline font-bold text-9xl overflow-hidden flex flex-wrap gap-20 p-20">
            <span>72</span>
            <span>-4.2</span>
            <span>18.5%</span>
            <span>68</span>
            <span>+2.1</span>
            <span>34</span>
            <span>89%</span>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-primary font-label text-xs font-bold uppercase tracking-widest">
              Digital Curator Series
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-primary leading-[1.1] tracking-tight">
              Performance + Purpose.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed tracking-wide">
              Track your golf performance, win monthly rewards, and support
              meaningful causes through a curated fintech experience.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 rounded-full impact-gradient text-white font-bold tracking-wide shadow-lg hover:scale-105 transition-transform active:scale-95">
                Start Playing with Purpose
              </button>
              <button className="px-8 py-4 rounded-full bg-white/50 backdrop-blur-md border border-outline-variant/20 text-primary font-bold tracking-wide hover:bg-white/80 transition-all">
                Explore Charities
              </button>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="glass-card p-8 rounded-xl shadow-[0_20px_40px_rgba(25,28,31,0.05)] border border-white/40 w-full max-w-sm rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                    Performance Trend
                  </p>
                  <h3 className="font-headline text-2xl font-bold text-primary">
                    Your Last 5 Scores
                  </h3>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl">
                  insights
                </span>
              </div>
              <div className="flex justify-between items-end h-16 gap-2 mb-6">
                <div className="flex-1 bg-primary/10 rounded-t-lg h-[60%]" />
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[80%]" />
                <div className="flex-1 impact-gradient rounded-t-lg h-full shadow-lg" />
                <div className="flex-1 bg-primary/15 rounded-t-lg h-[90%]" />
                <div className="flex-1 bg-primary/5 rounded-t-lg h-[70%]" />
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

      {/* Core Loop Section */}
      <section className="py-32 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4 tracking-tight">
              The Cycle of Good
            </h2>
            <p className="text-on-surface-variant font-medium tracking-wide">
              A seamless integration of data-driven performance and
              philanthropic impact.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              {
                icon: "edit_document",
                title: "Play & Track",
                desc: "Enter your latest golf scores to unlock performance insights and entry slots.",
                fill: "1/3",
              },
              {
                icon: "military_tech",
                title: "Compete & Win",
                desc: "Your scores become entries into our exclusive monthly prize draws.",
                fill: "2/3",
              },
              {
                icon: "favorite",
                title: "Make an Impact",
                desc: "A dedicated portion of every subscription supports global vetted charities.",
                fill: "full",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-surface-container-lowest p-10 rounded-xl shadow-sm flex flex-col items-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-secondary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {step.icon}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-headline text-2xl font-bold text-primary">
                    {step.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed tracking-wide">
                    {step.desc}
                  </p>
                </div>
                <div className="w-full h-1 bg-surface-container-low rounded-full overflow-hidden">
                  <div className={`h-full impact-gradient w-${step.fill}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Pool Section */}
      <section className="py-24 impact-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-secondary-fixed blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center space-y-12">
          <p className="text-secondary-fixed font-label text-sm font-bold uppercase tracking-[0.4em]">
            Current Prize Pool
          </p>
          <h2 className="font-headline text-6xl md:text-9xl font-black text-white tracking-tighter">
            $150,000.00
          </h2>
          <div className="max-w-lg mx-auto">
            <p className="text-white/70 text-lg md:text-xl font-medium tracking-wide italic">
              &quot;Your performance on the course could win you this next
              month.&quot;
            </p>
          </div>
          <button className="px-10 py-5 rounded-full bg-white text-primary font-black uppercase tracking-widest text-sm hover:bg-secondary-fixed transition-colors">
            Join the Draw
          </button>
        </div>
      </section>

      {/* Featured Charities */}
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
            <button className="text-primary font-bold text-sm underline underline-offset-8 decoration-2 hover:decoration-primary/40 transition-all">
              View all charities
            </button>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                id: 1,
                name: "EcoRestore",
                desc: "Reforestation and biodiversity protection across the Amazon.",
              },
              {
                id: 2,
                name: "HealthFirst",
                desc: "Providing surgical care and medical training in remote regions.",
              },
              {
                id: 3,
                name: "LearnBound",
                desc: "Digital literacy programs for underprivileged urban communities.",
              },
              {
                id: 4,
                name: "PurePulse",
                desc: "Clean energy and water purification infrastructure projects.",
              },
            ].map((charity) => (
              <div key={charity.id} className="group cursor-pointer">
                <div className="relative h-80 rounded-xl overflow-hidden mb-6 shadow-md transition-transform duration-500 group-hover:-translate-y-2">
                  <Image
                    src={`http://googleusercontent.com/profile/picture/${charity.id}`}
                    alt={charity.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h4 className="font-headline text-xl font-bold text-primary mb-2">
                  {charity.name}
                </h4>
                <p className="text-sm text-on-surface-variant">
                  {charity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-surface border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <p className="text-4xl font-headline font-black text-primary">
              50k+
            </p>
            <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">
              Active Players
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-headline font-black text-primary">
              $5M+
            </p>
            <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">
              Total Contributions
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-headline font-black text-primary">
              1,240
            </p>
            <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">
              Rewards Distributed
            </p>
          </div>
        </div>
      </section>

      {/* Footer (Can be extracted later) */}
      <Footer />
    </div>
  );
}
