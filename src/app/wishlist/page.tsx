'use client';

import { useMemo } from 'react';
import { useWishlist } from '@/components/wishlist/wishlist-context';
import { getAllProducts } from '@/lib/data/products';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { ButtonLink } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export default function WishlistPage() {
  const { ids, mounted } = useWishlist();

  const products = useMemo(() => {
    const all = getAllProducts();
    return all.filter((p) => ids.includes(p.id));
  }, [ids]);

  return (
    <div className="container-page py-4">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Your Wishlist</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Saved on this device only. Clear your browser storage and this list resets.
      </p>

      <div className="mt-8">
        {!mounted ? (
          <ProductGridSkeleton count={4} />
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState
            title="Nothing saved yet"
            description="Tap the heart icon on any product to save it here for later."
            action={<ButtonLink href="/products">Browse products</ButtonLink>}
          />
        )}
      </div>
    </div>
  );
}
