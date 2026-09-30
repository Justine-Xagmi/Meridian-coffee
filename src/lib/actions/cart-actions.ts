'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { CART_COOKIE } from '@/lib/constants';
import { readCartLines } from '@/lib/cart';
import { getProductBySlug } from '@/lib/data/products';
import type { CartLineItem } from '@/lib/types';

const CART_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function persist(lines: CartLineItem[]) {
  cookies().set(CART_COOKIE, JSON.stringify(lines), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: CART_MAX_AGE,
    path: '/',
  });
}

const addSchema = z.object({
  productSlug: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(20).default(1),
});

export type CartActionState = { status: 'idle' | 'success' | 'error'; message?: string };

export async function addToCartAction(
  _prevState: CartActionState,
  formData: FormData
): Promise<CartActionState> {
  const parsed = addSchema.safeParse({
    productSlug: formData.get('productSlug'),
    variantId: formData.get('variantId'),
    quantity: formData.get('quantity') ?? 1,
  });

  if (!parsed.success) {
    return { status: 'error', message: 'Please choose a valid option.' };
  }

  const { productSlug, variantId, quantity } = parsed.data;
  const product = getProductBySlug(productSlug);
  const variant = product?.variants.find((v) => v.id === variantId);

  if (!product || !variant) {
    return { status: 'error', message: 'That product could not be found.' };
  }
  if (variant.stock < 1) {
    return { status: 'error', message: 'This option is currently out of stock.' };
  }

  const lines = readCartLines();
  const existing = lines.find((l) => l.productId === product.id && l.variantId === variantId);
  const nextQty = Math.min((existing?.quantity ?? 0) + quantity, variant.stock, 20);

  const nextLines = existing
    ? lines.map((l) => (l.productId === product.id && l.variantId === variantId ? { ...l, quantity: nextQty } : l))
    : [...lines, { productId: product.id, variantId, quantity: nextQty }];

  persist(nextLines);
  revalidatePath('/cart');
  revalidatePath('/', 'layout');

  return { status: 'success', message: `Added ${product.name} to your cart.` };
}

export async function updateCartQuantityAction(formData: FormData): Promise<void> {
  const productId = String(formData.get('productId') ?? '');
  const variantId = String(formData.get('variantId') ?? '');
  const quantity = Number(formData.get('quantity') ?? 0);

  const lines = readCartLines();
  const nextLines =
    quantity <= 0
      ? lines.filter((l) => !(l.productId === productId && l.variantId === variantId))
      : lines.map((l) =>
          l.productId === productId && l.variantId === variantId ? { ...l, quantity: Math.min(quantity, 20) } : l
        );

  persist(nextLines);
  revalidatePath('/cart');
  revalidatePath('/', 'layout');
}

export async function removeFromCartAction(formData: FormData): Promise<void> {
  const productId = String(formData.get('productId') ?? '');
  const variantId = String(formData.get('variantId') ?? '');
  const lines = readCartLines().filter((l) => !(l.productId === productId && l.variantId === variantId));
  persist(lines);
  revalidatePath('/cart');
  revalidatePath('/', 'layout');
}

export async function clearCartAction(): Promise<void> {
  persist([]);
  revalidatePath('/cart');
  revalidatePath('/', 'layout');
}
