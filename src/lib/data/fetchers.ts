import 'server-only';
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  getNewProducts,
  getRelatedProducts,
  searchProducts,
} from '@/lib/data/products';
import type { Product, SortOption } from '@/lib/types';

/**
 * This storefront's catalog is static demo data (see ./products.ts), so reads
 * are already instant. In a real deployment these functions are the seam
 * where you'd call your database, headless CMS, or commerce platform API.
 *
 * We add a small artificial delay here purely to make the app's Suspense /
 * streaming boundaries (see product & category pages) visibly meaningful in
 * a demo — the shell (header, hero, layout) paints immediately while these
 * "slower" sections stream in behind a skeleton, exactly as they would while
 * waiting on a real network round trip.
 */
function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  return delay(getFeaturedProducts(), 400);
}

export async function fetchNewProducts(): Promise<Product[]> {
  return delay(getNewProducts(), 250);
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  return delay(getProductBySlug(slug), 150);
}

export async function fetchRelatedProducts(product: Product): Promise<Product[]> {
  return delay(getRelatedProducts(product), 350);
}

export interface ProductQuery {
  category?: string;
  sort?: SortOption;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}

function sortProducts(items: Product[], sort: SortOption = 'featured'): Product[] {
  const copy = [...items];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'newest':
      return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'featured':
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export async function fetchProducts(query: ProductQuery): Promise<Product[]> {
  let items = query.category ? getProductsByCategory(query.category) : getAllProducts();

  if (query.minPrice !== undefined) items = items.filter((p) => p.price >= query.minPrice!);
  if (query.maxPrice !== undefined) items = items.filter((p) => p.price <= query.maxPrice!);
  if (query.inStockOnly) items = items.filter((p) => p.variants.some((v) => v.stock > 0));

  items = sortProducts(items, query.sort);

  return delay(items, 300);
}

export async function fetchSearchResults(q: string): Promise<Product[]> {
  return delay(searchProducts(q), 350);
}
