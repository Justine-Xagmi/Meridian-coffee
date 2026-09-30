import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchSearchResults } from '@/lib/data/fetchers';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { SearchBar } from '@/components/search/search-bar';
import { EmptyState } from '@/components/ui/empty-state';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: { q?: string };
}

async function SearchResults({ query }: { query: string }) {
  const results = await fetchSearchResults(query);

  if (results.length === 0) {
    return (
      <EmptyState
        title={`No results for "${query}"`}
        description="Try a different term, or browse products by category from the main navigation."
      />
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-muted" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
      </p>
      <ProductGrid products={results} priorityCount={4} />
    </>
  );
}

export default function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q?.trim() ?? '';

  return (
    <div className="container-page py-4">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Search</h1>
      <div className="mt-5 max-w-md">
        <SearchBar defaultValue={query} />
      </div>

      <div className="mt-10">
        {query ? (
          <Suspense key={query} fallback={<ProductGridSkeleton count={8} />}>
            <SearchResults query={query} />
          </Suspense>
        ) : (
          <EmptyState title="Search the catalog" description="Try “kettle”, “grinder”, or “dripper” to get started." />
        )}
      </div>
    </div>
  );
}
