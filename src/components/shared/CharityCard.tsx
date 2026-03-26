import Image from "next/image";

interface CharityCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

export function CharityCard({ name, description, imageUrl }: CharityCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-80 rounded-xl overflow-hidden mb-6 shadow-md transition-transform duration-500 group-hover:-translate-y-2">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <h4 className="font-headline text-xl font-bold text-primary mb-2">
        {name}
      </h4>
      <p className="text-sm text-on-surface-variant">{description}</p>
    </div>
  );
}
