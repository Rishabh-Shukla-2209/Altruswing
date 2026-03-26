import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { MobileNav } from "@/components/shared/MobileNav";
import { CharityListCard } from "@/components/charities/CharityListCard";
import { CharitySearchBar } from "@/components/charities/CharitySearchBar";
import { FeaturedCharityCard } from "@/components/charities/FeaturedCharityCard";
import Link from "next/link";

const charities = [
  {
    id: "1",
    name: "Future Learners Alliance",
    description:
      "Providing digital resources and mentorship to underfunded schools across developing nations to bridge the tech gap.",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    category: "Education",
    location: "Global Network",
    impactLabel: "Impact Score",
    impactValue: "9.8/10",
  },
  {
    id: "2",
    name: "Amazonas Reforest",
    description:
      "Direct community-led action to restore native rainforest canopy and protect critical biodiversity corridors.",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    category: "Environment",
    location: "South America",
    impactLabel: "Hectares Restored",
    impactValue: "12.4k",
  },
  {
    id: "3",
    name: "Vitality Health Hub",
    description:
      "Deploying mobile clinics and clean water systems to remote villages to eradicate preventable water-borne diseases.",
    imageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    category: "Health",
    location: "Africa",
    impactLabel: "Lives Reached",
    impactValue: "850k+",
  },
  {
    id: "4",
    name: "Swift Response Team",
    description:
      "Providing emergency nutrition and medical supplies within 24 hours of natural disaster or conflict events.",
    imageUrl:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    category: "Crisis Relief",
    location: "Global",
    impactLabel: "Response Time",
    impactValue: "<18 hrs",
  },
  {
    id: "5",
    name: "Blue Horizon Trust",
    description:
      "Cleaning marine plastic pollution and restoring coral nurseries across the Coral Triangle to protect marine life.",
    imageUrl:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80",
    category: "Oceans",
    location: "Asia Pacific",
    impactLabel: "Plastic Removed",
    impactValue: "450 Tons",
  },
];

export default function CharitiesPage() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] ethereal-glow opacity-60"></div>
        <div className="absolute bottom-40 left-[-10%] w-[600px] h-[600px] ethereal-glow opacity-40"></div>

        {/* Hero Header */}
        <header className="max-w-7xl mx-auto px-8 mb-20">
          <div className="max-w-3xl">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">
              Curated Impact Directory
            </span>
            <h1 className="text-6xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
              Causes You Can{" "}
              <br />
              <span className="text-primary">Support</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl">
              Discover hand-picked organizations making measurable differences
              globally. Our editorial team validates every cause to ensure your
              generosity reaches where it matters most.
            </p>
          </div>
        </header>

        {/* Search & Filter Bar */}
        <CharitySearchBar />

        {/* Charity Grid */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {charities.map((charity) => (
              <CharityListCard key={charity.id} {...charity} />
            ))}
            <FeaturedCharityCard />
          </div>
        </section>

        {/* Load More */}
        <section className="max-w-7xl mx-auto px-8 mt-24 text-center">
          <Link
            href="#"
            className="px-12 py-5 rounded-full outline outline-1 outline-outline-variant/30 text-primary font-bold text-lg hover:bg-surface-container-low transition-all inline-block"
          >
            Discover More Causes
          </Link>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
