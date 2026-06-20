import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { FEATURED_PRODUCTS_QUERYResult } from "@/sanity.types";

type FeaturedProduct = FEATURED_PRODUCTS_QUERYResult[number];

interface FeaturedSlideProps {
  product: FeaturedProduct;
}

export default function FeaturedSlide({ product }: FeaturedSlideProps) {
  const mainImage = product.images?.[0]?.asset?.url;

  return (
    <div className="flex min-h-[400px] flex-col md:min-h-[450px] md:flex-row lg:min-h-[500px]">
      {/* Image Section - Left side (60% on desktop) */}
      <div className="relative h-64 w-full md:h-auto md:w-3/5">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name ?? "Featured product"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-800">
            <span className="text-zinc-500">No image</span>
          </div>
        )}

        {/* Gradient overlay for image edge blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-900/90 dark:to-zinc-950/90 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent md:hidden" />
      </div>

      {/* Content Section - Right side (40% on desktop) */}
      <div className="flex w-full flex-col justify-center px-6 py-8 md:w-2/5 md:px-10 lg:px-16">
        {product.category && (
          <Badge
            variant="secondary"
            className="mb-4 w-fit bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
          >
            {product.category.title}
          </Badge>
        )}

        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {product.name}
        </h2>

        {product.description && (
          <p className="mt-4 line-clamp-3 text-sm text-zinc-300 sm:text-base lg:text-lg">
            {product.description}
          </p>
        )}

        <p className="mt-6 text-3xl font-bold text-white lg:text-4xl">
          {formatPrice(product.price)}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-white text-zinc-900 hover:bg-zinc-100"
          >
            <Link href={`/product/${product.slug}`}>
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
