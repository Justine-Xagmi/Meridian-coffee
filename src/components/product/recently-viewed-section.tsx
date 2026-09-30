'use client';

import { useEffect, useState } from 'react';
import { RECENTLY_VIEWED_STORAGE_KEY } from '@/lib/constants';
import { getProductBySlug } from '@/lib/data/products';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/lib/types';

export function RecentlyViewedSection({ excludeSlug }: { excludeSlug?: string }) {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
      const slugs: string[] = raw ? JSON.parse(raw) : [];
      const resolved = slugs
        .filter((slug) => slug !== excludeSlug)
        .map((slug) => getProductBySlug(slug))
        .filter((p): p is Product => Boolean(p))
        .slice(0, 4);
      setProducts(resolved);
    } catch {
      setProducts([]);
    }
  }, [excludeSlug]);

  if (!products || products.length === 0) return null;

  return (
    <section aria-labelledby="recently-viewed-heading" className="border-t border-line py-14">
      <div className="container-page">
        <h2 id="recently-viewed-heading" className="font-display text-2xl text-ink">
          Recently viewed
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
