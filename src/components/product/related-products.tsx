import { fetchRelatedProducts } from '@/lib/data/fetchers';
import { ProductGrid } from '@/components/product/product-grid';
import type { Product } from '@/lib/types';

export async function RelatedProducts({ product }: { product: Product }) {
  const related = await fetchRelatedProducts(product);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-line py-14">
      <div className="container-page">
        <h2 id="related-heading" className="font-display text-2xl text-ink">
          You may also like
        </h2>
        <div className="mt-6">
          <ProductGrid products={related} />
        </div>
      </div>
    </section>
  );
}
