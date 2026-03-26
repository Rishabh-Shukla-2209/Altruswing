import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { MobileNav } from "@/components/shared/MobileNav";
import { CharityHero } from "@/components/charities/CharityHero";
import { ImpactMetrics } from "@/components/charities/ImpactMetrics";
import { CharityActionCard } from "@/components/charities/CharityActionCard";
import { EventsCard } from "@/components/charities/EventsCard";

// Mock data using Amazonas Reforest from charities list
const charity = {
  id: "2",
  name: "Amazonas Reforest",
  category: "Environment",
  tagline:
    "Restoring critical biodiversity corridors through direct community-led action in the Amazon basin.",
  heroImage:
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80",
  aboutTitle: "Restoring the Lungs of Our Planet",
  aboutParagraphs: [
    "The Amazon rainforest is not just a forest — it is the planet's most critical life-support system. Yet over the past three decades, deforestation has claimed over 17% of its canopy. Amazonas Reforest was founded on a single principle: that local communities hold the key to lasting environmental restoration.",
    "We don't just plant trees. We cultivate entire ecosystems. Through partnerships with indigenous communities and global conservation experts, we implement scientifically-guided reforestation programs that restore native species, protect biodiversity corridors, and create sustainable livelihoods for local families.",
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      alt: "Rainforest canopy",
    },
    {
      src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80",
      alt: "Community reforestation",
    },
    {
      src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
      alt: "Biodiversity corridor",
    },
  ],
  impact: {
    percentage: 72,
    amountRaised: "$1,240,000",
    patronCount: "3,180",
    goalDescription:
      "We are just $480,000 away from our goal for the new biodiversity corridor in Pará.",
  },
  quote: {
    text: "When we began replanting native species, the wildlife returned within months. The forest remembers, and with Amazonas Reforest, so do the people who depend on it.",
    author: "Carlos Mendes",
    role: "Community Leader, Pará District",
  },
  actionCard: {
    description:
      "Join a global community of conservationists protecting the world's most important rainforest ecosystem.",
  },
  events: [
    {
      title: "Amazon Conservation Summit",
      location: "São Paulo Convention Centre",
      date: "Dec 08",
      time: "9:00 AM",
    },
    {
      title: "Reforestation Field Workshop",
      location: "Pará Community Centre",
      date: "Jan 15",
      time: "All Day",
    },
    {
      title: "Virtual Donor Briefing",
      location: "Online Webinar",
      date: "Feb 02",
      time: "6:00 PM",
    },
  ],
};

export default function CharityDetailPage() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <CharityHero
          name={charity.name}
          category={charity.category}
          tagline={charity.tagline}
          imageUrl={charity.heroImage}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-16">
            {/* Left Column (60%) */}
            <div className="lg:col-span-6 space-y-24">
              {/* About the Cause */}
              <section>
                <h2 className="text-primary font-headline text-sm font-bold tracking-widest uppercase mb-6">
                  About the Cause
                </h2>
                <h3 className="text-4xl font-headline font-bold text-on-surface mb-8 tracking-tight leading-tight">
                  {charity.aboutTitle}
                </h3>
                <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed font-light">
                  {charity.aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>

              {/* Image Grid */}
              <section className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative w-full h-80 rounded-lg overflow-hidden">
                    <Image
                      src={charity.images[0].src}
                      alt={charity.images[0].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={charity.images[1].src}
                      alt={charity.images[1].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
                <div className="pt-12">
                  <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={charity.images[2].src}
                      alt={charity.images[2].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </section>

              {/* Impact Metrics */}
              <ImpactMetrics
                percentage={charity.impact.percentage}
                amountRaised={charity.impact.amountRaised}
                patronCount={charity.impact.patronCount}
                goalDescription={charity.impact.goalDescription}
              />

              {/* Quote */}
              <blockquote className="border-l-4 border-primary pl-10 py-4">
                <p className="text-2xl font-headline italic text-on-surface leading-snug mb-6">
                  &ldquo;{charity.quote.text}&rdquo;
                </p>
                <cite className="not-italic flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full impact-gradient"></div>
                  <div>
                    <div className="font-bold text-on-surface">
                      {charity.quote.author}
                    </div>
                    <div className="text-sm text-on-surface-variant">
                      {charity.quote.role}
                    </div>
                  </div>
                </cite>
              </blockquote>
            </div>

            {/* Right Column (40% Sticky) */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-10">
                <CharityActionCard
                  charityName={charity.name}
                  description={charity.actionCard.description}
                />
                <EventsCard events={charity.events} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
