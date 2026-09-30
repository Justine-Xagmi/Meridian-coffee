'use client';

import { useRef } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

/**
 * Progressively enhanced: this is a plain GET <form>, so filtering/sorting
 * works even with JavaScript disabled via the visible "Apply" button.
 * When JS is available, changing a control submits the form automatically.
 */
export function FilterSortBar({ resultCount }: { resultCount: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={pathname}
      method="GET"
      className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-muted" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'product' : 'products'}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            name="inStock"
            value="true"
            defaultChecked={searchParams.get('inStock') === 'true'}
            onChange={() => formRef.current?.requestSubmit()}
            className="h-4 w-4 rounded border-line accent-accent"
          />
          In stock only
        </label>

        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="sr-only">Sort by</span>
          <select
            name="sort"
            defaultValue={searchParams.get('sort') ?? 'featured'}
            onChange={() => formRef.current?.requestSubmit()}
            className="focus-ring h-9 rounded-full border border-line bg-surface px-3 text-sm text-ink"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>
        </label>

        <noscript>
          <button type="submit" className="focus-ring h-9 rounded-full border border-line px-4 text-sm">
            Apply
          </button>
        </noscript>
      </div>
    </form>
  );
}
