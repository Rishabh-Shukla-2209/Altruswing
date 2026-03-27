"use client";
import { useCharities } from "@/hooks/useCharities";
import { CharityCard } from "../shared/CharityCard";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const CharitiesOverview = () => {
  const { data } = useCharities(1, 4);

  return (
    <div className="grid md:grid-cols-4 gap-8">
      {data ? (
        data.data.map((charity) => (
          <Link href={`/charities/${charity.id}`} key={charity.id}>
            <CharityCard
              name={charity.name}
              description={charity.description}
              imageUrl={charity.cover_image_url}
            />
          </Link>
        ))
      ) : (
        <>
          <Skeleton className="h-80 w-full rounded-md" />
          <Skeleton className="h-80 w-full rounded-md" />
          <Skeleton className="h-80 w-full rounded-md" />
          <Skeleton className="h-80 w-full rounded-md" />
        </>
      )}
    </div>
  );
};

export default CharitiesOverview;
