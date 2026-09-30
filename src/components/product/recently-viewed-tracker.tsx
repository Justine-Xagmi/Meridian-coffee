'use client';

import { useEffect } from 'react';
import { RECENTLY_VIEWED_STORAGE_KEY } from '@/lib/constants';

/** Client island: records a product visit to localStorage. Renders nothing. */
export function RecentlyViewedTracker({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
      const existing: string[] = raw ? JSON.parse(raw) : [];
      const next = [slug, ...existing.filter((s) => s !== slug)].slice(0, 8);
      window.localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, [slug]);

  return null;
}
