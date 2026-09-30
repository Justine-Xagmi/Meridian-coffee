import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Price } from '@/components/product/price';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { WishlistButton } from '@/components/wishlist/wishlist-button';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const primaryImage = product.images[0];
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-2">
        <Link href={`/products/${product.slug}`} className="focus-ring block h-full w-full rounded-2xl">
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              priority={priority}
            />
          )}
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.new && <Badge tone="accent">New</Badge>}
          {product.compareAtPrice && <Badge tone="danger">Sale</Badge>}
          {totalStock === 0 && <Badge tone="neutral">Sold out</Badge>}
        </div>
        <div className="absolute right-3 top-3">
          <WishlistButton productId={product.id} floating />
        </div>
      </div>
      <div className="mt-3.5 flex flex-1 flex-col gap-1">
        <Link href={`/products/${product.slug}`} className="focus-ring rounded-sm">
          <h3 className="font-display text-base leading-snug text-ink">{product.name}</h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted">{product.tagline}</p>
        <div className="mt-1 flex items-center justify-between">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
          <StarRating rating={product.rating} size={12} />
        </div>
      </div>
    </div>
  );
}
