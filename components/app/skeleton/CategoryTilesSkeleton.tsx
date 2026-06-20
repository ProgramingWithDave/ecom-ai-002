import { Skeleton } from "@/components/ui/skeleton";

const blocks = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
}));

export function CategoryTilesSkeleton() {
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto py-4 pl-8 pr-4 sm:pl-12 sm:pr-6 lg:pl-10 lg:pr-8 scrollbar-hide">
        {/* All Products tile skeleton */}
        <div className="flex-shrink-0 overflow-hidden rounded-xl">
          <Skeleton className="h-32 w-56 sm:h-56 sm:w-80" />
        </div>

        {/* Category tiles skeletons */}
        {blocks.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 overflow-hidden rounded-xl"
          >
            <Skeleton className="h-32 w-56 sm:h-56 sm:w-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
