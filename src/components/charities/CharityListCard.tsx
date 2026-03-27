"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CharityListCardProps {
  id: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
  category: string | null;
  location: string | null;
  impact_label: string | null;
  impact_value: string | null;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export function CharityListCard({
  id,
  name,
  description,
  cover_image_url: imageUrl,
  category,
  location,
  impact_label: impactLabel,
  impact_value: impactValue,
  isSelected,
  onSelect,
}: CharityListCardProps) {
  // Determine if the card is in "Selection Mode" vs "Directory Mode"
  const isSelectable = !!onSelect;

  return (
    <article
      onClick={() => isSelectable && onSelect(id)}
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-500 flex flex-col",
        isSelectable ? "cursor-pointer" : "",
        // Base shadow vs Selected ring state
        isSelected
          ? "bg-primary/5 ring-4 ring-primary scale-[1.02] shadow-2xl"
          : "bg-surface-container-lowest shadow-[0_4px_12px_rgba(25,28,31,0.03),0_20px_40px_rgba(25,28,31,0.05)] hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_10px_25px_rgba(25,28,31,0.08),0_30px_60px_rgba(25,28,31,0.1)]",
      )}
    >
      {/* Selected State Overlay */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-20 bg-primary text-white rounded-full p-1 shadow-lg animate-in zoom-in duration-300">
          <CheckCircle2 size={24} />
        </div>
      )}

      <div className="relative h-64 overflow-hidden">
        <Image
          src={
            imageUrl ??
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
          }
          alt={name}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            !isSelected && "group-hover:scale-105",
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent opacity-40"></div>
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-white/90 dark:bg-surface-container-high/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="p-8 grow flex flex-col relative z-10">
        <div className="flex items-center gap-2 mb-3 text-on-surface-variant/70 text-xs font-medium">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
        <h3 className="text-2xl font-headline font-extrabold mb-4 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-8 line-clamp-2">
          {description}
        </p>

        <div className="mt-auto pt-8 border-t border-outline-variant/15 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-on-surface-variant/50">
              {impactLabel}
            </span>
            <span className="text-primary font-bold">{impactValue}</span>
          </div>

          {/* Conditional Action Area: Selection Button vs Navigation Link */}
          {isSelectable ? (
            <div
              className={cn(
                "flex items-center gap-2 font-bold transition-colors",
                isSelected
                  ? "text-primary"
                  : "text-on-surface-variant group-hover:text-primary",
              )}
            >
              <span className="text-sm">
                {isSelected ? "Selected" : "Select Cause"}
              </span>
              {!isSelected && (
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-primary font-bold group/btn">
              <span className="text-sm">View Charity</span>
              <ArrowRight
                size={16}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
