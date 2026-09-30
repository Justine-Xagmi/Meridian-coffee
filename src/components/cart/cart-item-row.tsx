'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { updateCartQuantityAction, removeFromCartAction } from '@/lib/actions/cart-actions';
import type { CartItemHydrated } from '@/lib/types';

const QTY_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export function CartItemRow({ item }: { item: CartItemHydrated }) {
  const image = item.product.images[0];
  const maxQty = Math.min(item.variant.stock, 10);

  return (
    <li className="flex gap-4 py-6">
      <Link
        href={`/products/${item.product.slug}`}
        className="focus-ring relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-2"
      >
        {image && <Image src={image.url} alt={image.alt} fill sizes="96px" className="object-cover" />}
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-4">
          <div>
            <Link href={`/products/${item.product.slug}`} className="focus-ring font-display text-base text-ink hover:underline">
              {item.product.name}
            </Link>
            <p className="mt-0.5 text-sm text-muted">{item.variant.value}</p>
          </div>
          <p className="whitespace-nowrap font-medium text-ink">{formatPrice(item.lineTotal)}</p>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <form action={updateCartQuantityAction} className="flex items-center gap-2">
            <input type="hidden" name="productId" value={item.productId} />
            <input type="hidden" name="variantId" value={item.variantId} />
            <label htmlFor={`qty-${item.productId}-${item.variantId}`} className="sr-only">
              Quantity for {item.product.name}
            </label>
            <select
              id={`qty-${item.productId}-${item.variantId}`}
              name="quantity"
              defaultValue={item.quantity}
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
              className="focus-ring h-9 rounded-full border border-line bg-surface px-3 text-sm text-ink"
            >
              {QTY_OPTIONS.filter((n) => n <= maxQty || n === item.quantity).map((n) => (
                <option key={n} value={n}>
                  Qty {n}
                </option>
              ))}
            </select>
            <noscript>
              <button type="submit" className="text-xs underline">
                Update
              </button>
            </noscript>
          </form>

          <form action={removeFromCartAction}>
            <input type="hidden" name="productId" value={item.productId} />
            <input type="hidden" name="variantId" value={item.variantId} />
            <button type="submit" className="focus-ring text-sm text-muted underline-offset-2 hover:text-danger hover:underline">
              Remove
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}
