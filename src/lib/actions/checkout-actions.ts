'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { CART_COOKIE } from '@/lib/constants';
import { getCart, cartTotals } from '@/lib/cart';
import { saveOrder } from '@/lib/data/orders-store';
import type { Order } from '@/lib/types';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Enter your full name.'),
  email: z.string().email('Enter a valid email address.'),
  address: z.string().min(4, 'Enter your street address.'),
  city: z.string().min(1, 'Enter your city.'),
  postalCode: z.string().min(3, 'Enter a valid postal code.'),
  country: z.string().min(1, 'Select a country.'),
});

export type CheckoutState = {
  status: 'idle' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof checkoutSchema>, string>>;
};

export async function placeOrderAction(_prevState: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const items = getCart();
  if (items.length === 0) {
    return { status: 'error', message: 'Your cart is empty.' };
  }

  const parsed = checkoutSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    address: formData.get('address'),
    city: formData.get('city'),
    postalCode: formData.get('postalCode'),
    country: formData.get('country'),
  });

  if (!parsed.success) {
    const fieldErrors: CheckoutState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof checkoutSchema>;
      fieldErrors[key] = issue.message;
    }
    return { status: 'error', message: 'Please correct the highlighted fields.', fieldErrors };
  }

  const { subtotal, shipping, tax, total } = cartTotals(items);
  const order: Order = {
    id: crypto.randomUUID().slice(0, 8).toUpperCase(),
    items,
    subtotal,
    shipping,
    tax,
    total,
    customer: parsed.data,
    createdAt: new Date().toISOString(),
  };

  saveOrder(order);
  cookies().set(CART_COOKIE, JSON.stringify([]), { path: '/', maxAge: 0 });

  redirect(`/checkout/confirmation/${order.id}`);
}
