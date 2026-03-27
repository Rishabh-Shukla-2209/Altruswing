"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { CharityListCard } from "@/components/charities/CharityListCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce"; // Adjust path if needed
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCharitiesInfinite } from "@/hooks/useCharities";
import { CategoryType } from "@/types/shared";
import { Constants } from "@/types/database.types";
import { formatEnum } from "@/lib/utils";

export default function CharitySelectionPage() {
  const router = useRouter();
  const supabase = createClient();

  const categories = Constants.public.Enums.CATEGORIES;

  // Form State
  const [selectedCharityId, setSelectedCharityId] = useState<string | null>(
    null,
  );
  const [contribution, setContribution] = useState<number[]>([10]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Search & Filter State
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState<CategoryType | "">("");
  const debouncedSearch = useDebounce(searchInput, 500);

  // Infinite Query Hook
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCharitiesInfinite({
      searchQuery: debouncedSearch,
      category: category,
    });

  // Intersection Observer for infinite scrolling
  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Auth Check
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUserId(session.user.id);
      }
    };
    getUser();
  }, [supabase, router]);

  const handleSubmit = async () => {
    if (!selectedCharityId || !userId) return;
    setIsSubmitting(true);

    const { error } = await supabase.from("user_charity_preferences").upsert({
      user_id: userId,
      charity_id: selectedCharityId,
      contribution_percent: contribution[0],
    });

    if (error) {
      console.error("Failed to save charity preference:", error);
      setIsSubmitting(false);
      return;
    }

    router.push("/checkout");
  };

  // Flatten the pages into a single array
  const charities = data?.pages.flatMap((page) => page.data) || [];

  // Framer Motion variant for smooth card entry
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12 pb-40">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-primary font-bold uppercase tracking-widest text-sm">
            Step 2 of 3
          </p>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight">
            Who are you playing for?
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Select a cause to support. Your performance on the course directly
            translates to impact off it.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
          <div className="relative grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search charities..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-12 h-14 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 text-lg"
            />
          </div>

          <select
            className="h-14 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 text-on-surface shadow-sm cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryType | "")}
          >
            <option value="">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>
                {formatEnum(c)}
              </option>
            ))}
          </select>
        </div>

        {/* Charity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : charities.length === 0 ? (
            <div className="col-span-full text-center py-20 text-on-surface-variant text-lg">
              No charities found matching your criteria.
            </div>
          ) : (
            charities.map((charity) => (
              <motion.div
                key={charity.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "50px" }}
              >
                <CharityListCard
                  id={charity.id}
                  name={charity.name}
                  description={charity.description ?? ""}
                  cover_image_url={charity.cover_image_url ?? ""}
                  category={charity.category ?? "General"}
                  location={charity.location ?? "Global"}
                  impact_label={charity.impact_label ?? "Impact"}
                  impact_value={charity.impact_value ?? "N/A"}
                  isSelected={selectedCharityId === charity.id}
                  onSelect={setSelectedCharityId}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* Loading More Indicator */}
        <div ref={loadMoreRef} className="w-full flex justify-center py-4">
          {isFetchingNextPage && (
            <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
          )}
        </div>

        {/* Impact Slider */}
        {selectedCharityId && (
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-primary/10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 impact-gradient"></div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">
              Set Your Impact
            </h3>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
              A minimum of 10% of your subscription is automatically allocated
              to your chosen cause. Slide to increase your contribution at no
              extra cost to your total fee.
            </p>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-4xl font-black text-primary font-headline">
                  {contribution[0]}%
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">
                  Allocated
                </span>
              </div>
              <Slider
                defaultValue={[10]}
                max={25}
                min={10}
                step={1}
                value={contribution}
                onValueChange={setContribution}
                className="py-4"
              />
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20 p-6 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <p className="hidden md:block text-sm font-medium text-on-surface-variant">
            {selectedCharityId
              ? "Great choice. Let's finalize your account."
              : "Please select a charity to continue."}
          </p>
          <Button
            onClick={handleSubmit}
            disabled={!selectedCharityId || isSubmitting}
            className="w-full md:w-auto px-12 py-6 rounded-xl impact-gradient text-white font-bold cursor-pointer tracking-widest uppercase text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mr-2 w-5 h-5" />
            ) : null}
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
