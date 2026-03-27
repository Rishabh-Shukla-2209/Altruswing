"use client";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CharityListCard } from "@/components/charities/CharityListCard";
import { CharitySearchBar } from "@/components/charities/CharitySearchBar";
import { useCharitiesInfinite } from "@/hooks/useCharities";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { CategoryType, RegionType } from "@/types/shared";
import { useDebounce } from "@/hooks/useDebounce";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

export default function CharitiesPage() {
  const [region, setRegion] = useState<RegionType | "">("");
  const [category, setCategory] = useState<CategoryType | "">("");
  const [query, setQuery] = useState("");
  const debouncedSearch = useDebounce(query, 500);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useCharitiesInfinite({
      searchQuery: debouncedSearch,
      category,
      location: region,
    });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased overflow-x-hidden min-h-screen [overflow-anchor:none]">
      <Navbar />

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-20 right-[-10%] w-125 h-125 ethereal-glow opacity-60"></div>
        <div className="absolute bottom-40 left-[-10%] w-150 h-150 ethereal-glow opacity-40"></div>

        {/* Hero Header */}
        <header className="max-w-7xl mx-auto px-8 mb-20">
          <div className="max-w-3xl">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">
              Curated Impact Directory
            </span>
            <h1 className="text-6xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
              Causes You Can <br />
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
        <CharitySearchBar
          region={region}
          setRegion={setRegion}
          category={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
        />

        {/* Charity Grid */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Initial Loading State */}
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton className="h-100 w-full rounded-xl" key={i} />
              ))}

            {/* Rendered Data */}
            {data?.pages.flatMap((page) =>
              page.data.length === 0 ? (
                <p>No more charities.</p>
              ) : (
                page.data.map((charity) => (
                  <motion.div
                    key={charity.id}
                    variants={cardVariants}
                    initial="hidden"
                    // whileInView triggers the animation automatically when scrolled into the viewport
                    animate="visible"
                    // viewport={{ once: true }} ensures it doesn't re-animate if they scroll up and down
                    viewport={{ once: true, margin: "50px" }}
                  >
                    <Link href={`/charities/${charity.id}`}>
                      <CharityListCard {...charity} />
                    </Link>
                  </motion.div>
                ))
              ),
            )}

            {/* Infinite Scroll "Load More" Skeletons */}
            {isFetchingNextPage &&
              Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`fetching-skeleton-${i}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Skeleton className="h-100 w-full rounded-xl" />
                </motion.div>
              ))}
          </div>
        </section>

        {/* Load More */}
        {hasNextPage && (
          <div className="mt-24 text-center">
            <Button
              className="px-4 py-6 rounded-lg cursor-pointer"
              size="lg"
              variant="outline"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Discover More Causes"}
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
