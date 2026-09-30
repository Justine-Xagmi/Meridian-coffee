import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { categories, getCategory, isCategorySlug } from '@/lib/data/categories';
import { fetchProducts } from '@/lib/data/fetchers';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { FilterSortBar } from '@/components/search/filter-sort-bar';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EmptyState } from '@/components/ui/empty-state';
import type { SortOption } from '@/lib/types';

interface PageProps {
  params: { category: string };
  searchParams: { sort?: string; inStock?: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

// The category list is fixed at build time, so an unknown slug should 404
// immediately (see the matching note in products/[slug]/page.tsx).
export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getCategory(params.category);
  if (!category) notFound();
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: { images: [{ url: category.heroImage, width: 2000, height: 1400, alt: category.name }] },
  };
}

async function CategoryResults({ categorySlug, searchParams }: { categorySlug: string; searchParams: PageProps['searchParams'] }) {
  const products = await fetchProducts({
    category: categorySlug,
    sort: searchParams.sort as SortOption | undefined,
    inStockOnly: searchParams.inStock === 'true',
  });

  return (
    <>
      <FilterSortBar resultCount={products.length} />
      <div className="mt-8">
        {products.length > 0 ? (
          <ProductGrid products={products} priorityCount={4} />
        ) : (
          <EmptyState
            title="No products match those filters"
            description="Try clearing filters to see the full category."
          />
        )}
      </div>
    </>
  );
}

export default function CategoryPage({ params, searchParams }: PageProps) {
  if (!isCategorySlug(params.category)) notFound();
  const category = getCategory(params.category)!;

  return (
    <div>
      <div className="relative h-48 w-full overflow-hidden bg-surface-2 sm:h-64">
        <Image src={category.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
        <div className="container-page absolute inset-0 flex flex-col justify-end pb-6">
          <h1 className="font-display text-3xl text-white sm:text-4xl">{category.name}</h1>
        </div>
      </div>

      <div className="container-page py-4">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: category.name }]} />
        <p className="max-w-xl text-sm text-muted">{category.description}</p>

        <div className="mt-8">
          <Suspense
            key={`${category.slug}-${searchParams.sort ?? ''}-${searchParams.inStock ?? ''}`}
            fallback={
              <>
                <div className="mb-8 h-10 w-full border-b border-line" />
                <ProductGridSkeleton count={8} />
              </>
            }
          >
            <CategoryResults categorySlug={category.slug} searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
