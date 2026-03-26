import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

interface CharityListCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  location: string;
  impactLabel: string;
  impactValue: string;
}

export function CharityListCard({
  id,
  name,
  description,
  imageUrl,
  category,
  location,
  impactLabel,
  impactValue,
}: CharityListCardProps) {
  return (
    <article className="group bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-500 shadow-[0_4px_12px_rgba(25,28,31,0.03),0_20px_40px_rgba(25,28,31,0.05)] hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_10px_25px_rgba(25,28,31,0.08),0_30px_60px_rgba(25,28,31,0.1)] flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-40"></div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 dark:bg-surface-container-high/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
            {category}
          </span>
        </div>
      </div>
      <div className="p-8 flex-grow flex flex-col">
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
          <Link
            href={`/charities/${id}`}
            className="flex items-center gap-2 text-primary font-bold group/btn"
          >
            <span className="text-sm">View Impact</span>
            <ArrowRight
              size={16}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
