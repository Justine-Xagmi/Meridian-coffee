import { formatPrice } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

export function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
  showFreeShippingNudge = true,
}: {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  showFreeShippingNudge?: boolean;
}) {
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <h2 className="font-display text-lg text-ink">Order summary</h2>

      {showFreeShippingNudge && remainingForFreeShipping > 0 && (
        <p className="mt-3 rounded-lg bg-surface-2 px-3 py-2 text-xs text-muted">
          Add {formatPrice(remainingForFreeShipping)} more for free shipping.
        </p>
      )}

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="text-ink">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd className="text-ink">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Estimated tax</dt>
          <dd className="text-ink">{formatPrice(tax)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex justify-between border-t border-line pt-4 text-base font-medium text-ink">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
