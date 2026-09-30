import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { CartItemHydrated } from '@/lib/types';

export function CheckoutReviewList({ items }: { items: CartItemHydrated[] }) {
  return (
    <ul className="max-h-80 space-y-4 overflow-y-auto pr-1">
      {items.map((item) => {
        const image = item.product.images[0];
        return (
          <li key={`${item.productId}-${item.variantId}`} className="flex gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-2">
              {image && <Image src={image.url} alt={image.alt} fill sizes="56px" className="object-cover" />}
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-bg">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">{item.product.name}</p>
              <p className="text-xs text-muted">{item.variant.value}</p>
            </div>
            <p className="text-sm text-ink">{formatPrice(item.lineTotal)}</p>
          </li>
        );
      })}
    </ul>
  );
}
