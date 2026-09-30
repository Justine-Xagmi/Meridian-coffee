'use client';

import { useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addToCartAction, type CartActionState } from '@/lib/actions/cart-actions';
import { Price } from '@/components/product/price';
import { StockBadge } from '@/components/product/stock-badge';
import { WishlistButton } from '@/components/wishlist/wishlist-button';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

const initialState: CartActionState = { status: 'idle' };

function AddToCartSubmit({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="focus-ring inline-flex h-12 flex-1 items-center justify-center rounded-full bg-ink text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Adding…' : disabled ? 'Out of stock' : 'Add to cart'}
    </button>
  );
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? '');
  const [quantity, setQuantity] = useState(1);
  const [state, formAction] = useFormState(addToCartAction, initialState);

  const variant = useMemo(
    () => product.variants.find((v) => v.id === variantId) ?? product.variants[0],
    [product.variants, variantId]
  );

  const variantGroupName = product.variants[0]?.name ?? 'Option';
  const outOfStock = !variant || variant.stock < 1;
  const unitPrice = product.price + (variant?.priceModifier ?? 0);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Price price={unitPrice} compareAtPrice={product.compareAtPrice} />
        {variant && <StockBadge stock={variant.stock} />}
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-ink">{variantGroupName}</legend>
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={variantGroupName}>
          {product.variants.map((v) => {
            const selected = v.id === variantId;
            const disabled = v.stock < 1;
            return (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={disabled}
                onClick={() => setVariantId(v.id)}
                className={cn(
                  'focus-ring rounded-full border px-4 py-2 text-sm transition-colors',
                  selected ? 'border-ink bg-ink text-bg' : 'border-line text-ink hover:bg-surface-2',
                  disabled && 'cursor-not-allowed opacity-40 line-through'
                )}
              >
                {v.value}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center gap-3">
        <label htmlFor="quantity" className="text-sm font-medium text-ink">
          Qty
        </label>
        <div className="flex items-center rounded-full border border-line">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="focus-ring flex h-10 w-10 items-center justify-center text-ink hover:bg-surface-2"
          >
            −
          </button>
          <span id="quantity" className="w-8 text-center text-sm tabular-nums" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(variant?.stock ?? 1, q + 1))}
            className="focus-ring flex h-10 w-10 items-center justify-center text-ink hover:bg-surface-2"
          >
            +
          </button>
        </div>
      </div>

      <form action={formAction} className="mt-6 flex items-center gap-3">
        <input type="hidden" name="productSlug" value={product.slug} />
        <input type="hidden" name="variantId" value={variantId} />
        <input type="hidden" name="quantity" value={quantity} />
        <AddToCartSubmit disabled={outOfStock} />
        <WishlistButton productId={product.id} />
      </form>

      <p role="status" aria-live="polite" className="mt-3 text-sm">
        {state.status === 'success' && <span className="text-success">{state.message}</span>}
        {state.status === 'error' && <span className="text-danger">{state.message}</span>}
      </p>
    </div>
  );
}
