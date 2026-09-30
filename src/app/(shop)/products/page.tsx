import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchProducts } from '@/lib/data/fetchers';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { FilterSortBar } from '@/components/search/filter-sort-bar';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EmptyState } from '@/components/ui/empty-state';
import type { SortOption } from '@/lib/types';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse the full Meridian Coffee Co. catalog: kettles, grinders, drippers, scales, filters, and accessories.',
  alternates: { canonical: '/products' },
};

interface PageProps {
  searchParams: { sort?: string; inStock?: string };
}

async function ProductsResults({ searchParams }: PageProps) {
  const products = await fetchProducts({
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
            description="Try clearing the “in stock only” filter to see everything in this catalog."
          />
        )}
      </div>
    </>
  );
}

export default function ProductsPage({ searchParams }: PageProps) {
  return (
    <div className="container-page py-4">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'All Products' }]} />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">All Products</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Every piece of equipment we make, in one place — from first kettle to daily-driver grinder.
      </p>
      <div className="mt-8">
        <Suspense
          key={`${searchParams.sort ?? ''}-${searchParams.inStock ?? ''}`}
          fallback={
            <>
              <div className="mb-8 h-10 w-full border-b border-line" />
              <ProductGridSkeleton count={12} />
            </>
          }
        >
          <ProductsResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
