import Image from "next/image";

interface CharityHeroProps {
  name: string;
  category: string;
  tagline: string;
  imageUrl: string;
}

export function CharityHero({ name, category, tagline, imageUrl }: CharityHeroProps) {
  return (
    <section className="relative w-full h-[870px] overflow-hidden flex items-end pb-24">
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-90"></div>
      <div className="relative w-full max-w-7xl mx-auto px-8">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary-fixed text-primary dark:text-on-secondary-fixed text-xs font-bold tracking-widest uppercase mb-6">
            {category} Partner
          </span>
          <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-white tracking-tighter mb-6 leading-tight">
            {name}
          </h1>
          <p className="text-xl md:text-2xl text-secondary-fixed-dim font-light leading-relaxed max-w-2xl">
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
