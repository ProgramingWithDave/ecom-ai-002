import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";
import CategoryTiles from "./CategoryTiles";

function Banner({
  categorySlug,
  categories,
}: {
  categorySlug: string;
  categories: ALL_CATEGORIES_QUERYResult;
}) {
  return (
    <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 ">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Shop {categorySlug ? categorySlug : "All Products"}
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Premium furniture for your home
        </p>
      </div>

      {/* Category Tiles - Full width */}
      <div className="mt-6 mx-auto max-w-7xl w-full">
        <CategoryTiles
          categories={categories}
          activeCategory={categorySlug || undefined}
        />
      </div>
    </div>
  );
}

export default Banner;
