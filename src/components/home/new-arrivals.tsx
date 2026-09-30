import { fetchNewProducts } from '@/lib/data/fetchers';
import { ProductGrid } from '@/components/product/product-grid';

export async function NewArrivals() {
  const products = await fetchNewProducts();
  if (products.length === 0) return null;
  return <ProductGrid products={products} />;
}
