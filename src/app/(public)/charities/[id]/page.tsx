"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { MobileNav } from "@/components/shared/MobileNav";
import { CharityHero } from "@/components/charities/CharityHero";
import { CharityActionCard } from "@/components/charities/CharityActionCard";
import { EventsCard } from "@/components/charities/EventsCard";
import { useCharity } from "@/hooks/useCharities";
import { Loader2 } from "lucide-react";

export default function CharityDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: charity, isLoading } = useCharity(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!charity) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface">
        Charity not found.
      </div>
    );
  }

  // Fallbacks for mock data fields missing in DB
  const images = charity.charity_images || [];
  const events =
    charity.charity_events?.map((e: any) => ({
      title: e.title,
      location: e.location || "Online",
      date: new Date(e.event_date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      time: new Date(e.event_date).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }),
    })) || [];

  return (
    <div className="bg-surface font-body text-on-surface antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <CharityHero
          name={charity.name}
          category="Featured Cause"
          tagline={charity.description ?? ""}
          imageUrl={
            charity.cover_image_url ??
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
          }
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
                  About the Cause
                </h3>
                <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed font-light">
                  <p>{charity.description}</p>
                </div>
              </section>

              {/* Image Grid */}
              <section className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative w-full h-80 rounded-lg overflow-hidden bg-surface-container">
                    {images[0]?.image_url && (
                      <Image
                        src={images[0].image_url}
                        alt="Charity Impact 1"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    )}
                  </div>
                  <div className="relative w-full h-64 rounded-lg overflow-hidden bg-surface-container">
                    {images[1]?.image_url && (
                      <Image
                        src={images[1].image_url}
                        alt="Charity Impact 2"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    )}
                  </div>
                </div>
                <div className="pt-12">
                  <div className="relative w-full h-full min-h-100 rounded-lg overflow-hidden bg-surface-container">
                    {images[2]?.image_url && (
                      <Image
                        src={images[2].image_url}
                        alt="Charity Impact 3"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column (40% Sticky) */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-10">
                <CharityActionCard
                  charityId={charity.id}
                  charityName={charity.name}
                  description="Join a global community of conservationists protecting the world's most important ecosystem."
                />
                <EventsCard events={events} />
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
