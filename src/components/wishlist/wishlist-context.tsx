'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { WISHLIST_STORAGE_KEY } from '@/lib/constants';

interface WishlistContextValue {
  ids: string[];
  mounted: boolean;
  isWishlisted: (id: string) => boolean;
  toggle: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // localStorage unavailable (private mode, etc) — degrade silently
    } finally {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore write failures
    }
  }, [ids, mounted]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      ids,
      mounted,
      isWishlisted: (id: string) => ids.includes(id),
      toggle: (id: string) =>
        setIds((prev) => (prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id])),
    }),
    [ids, mounted]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
