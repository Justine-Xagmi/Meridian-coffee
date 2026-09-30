import { formatPrice } from '@/lib/utils';

export function Price({ price, compareAtPrice }: { price: number; compareAtPrice?: number }) {
  const onSale = compareAtPrice && compareAtPrice > price;
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="font-medium text-ink">{formatPrice(price)}</span>
      {onSale && <span className="text-sm text-muted line-through">{formatPrice(compareAtPrice!)}</span>}
    </span>
  );
}
