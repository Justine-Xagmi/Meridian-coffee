'use client';

import { useWishlist } from '@/components/wishlist/wishlist-context';

export function WishlistCount() {
  const { ids, mounted } = useWishlist();
  if (!mounted || ids.length === 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-ink">
      {ids.length}
    </span>
  );
}
