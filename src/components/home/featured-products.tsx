import { fetchFeaturedProducts } from '@/lib/data/fetchers';
import { ProductGrid } from '@/components/product/product-grid';

export async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();
  return <ProductGrid products={products} priorityCount={4} />;
}
