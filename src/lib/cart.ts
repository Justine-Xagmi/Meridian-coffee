import 'server-only';
import { cookies } from 'next/headers';
import { CART_COOKIE, FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE, TAX_RATE } from '@/lib/constants';
import { getProductBySlug, getAllProducts } from '@/lib/data/products';
import type { CartLineItem, CartItemHydrated } from '@/lib/types';

function safeParse(raw: string | undefined): CartLineItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartLineItem =>
        typeof item?.productId === 'string' &&
        typeof item?.variantId === 'string' &&
        typeof item?.quantity === 'number' &&
        item.quantity > 0
    );
  } catch {
    return [];
  }
}

/** Reads the raw cart line items from the request cookie (Server Component safe, read-only). */
export function readCartLines(): CartLineItem[] {
  const raw = cookies().get(CART_COOKIE)?.value;
  return safeParse(raw);
}

const allProductsById = new Map(getAllProducts().map((p) => [p.id, p]));

/** Resolves raw cart lines into full product + variant + pricing data for rendering. */
export function hydrateCart(lines: CartLineItem[]): CartItemHydrated[] {
  const hydrated: CartItemHydrated[] = [];
  for (const line of lines) {
    const product = allProductsById.get(line.productId);
    if (!product) continue;
    const variant = product.variants.find((v) => v.id === line.variantId);
    if (!variant) continue;
    const unitPrice = product.price + (variant.priceModifier ?? 0);
    hydrated.push({
      ...line,
      product,
      variant,
      unitPrice,
      lineTotal: unitPrice * line.quantity,
    });
  }
  return hydrated;
}

export function getCart(): CartItemHydrated[] {
  return hydrateCart(readCartLines());
}

export function cartTotals(items: CartItemHydrated[]) {
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;
  return { subtotal, shipping, tax, total, itemCount };
}

export function getCartItemCount(): number {
  return readCartLines().reduce((sum, l) => sum + l.quantity, 0);
}

// Re-exported for convenience in places that only have a slug.
export function findVariantStock(productSlug: string, variantId: string): number {
  const product = getProductBySlug(productSlug);
  return product?.variants.find((v) => v.id === variantId)?.stock ?? 0;
}
