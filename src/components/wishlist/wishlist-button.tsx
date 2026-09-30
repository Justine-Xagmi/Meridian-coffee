'use client';

import { cn } from '@/lib/utils';
import { useWishlist } from '@/components/wishlist/wishlist-context';

export function WishlistButton({ productId, floating = false }: { productId: string; floating?: boolean }) {
  const { isWishlisted, toggle, mounted } = useWishlist();
  const active = mounted && isWishlisted(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggle(productId);
      }}
      aria-pressed={active}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn(
        'focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors',
        floating ? 'bg-surface/90 backdrop-blur shadow-sm hover:bg-surface' : 'hover:bg-surface-2'
      )}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" className={active ? 'text-accent' : 'text-ink'}>
        <path
          d="M12 20.3s-7.6-4.5-10-9.2C0.4 7.9 2 4.5 5.4 3.7c2-.5 4 .3 5.2 2 1.2-1.7 3.2-2.5 5.2-2 3.4.8 5 4.2 3.4 7.4-2.4 4.7-10 9.2-10 9.2z"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
