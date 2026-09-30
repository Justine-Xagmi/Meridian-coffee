export function SearchBar({ defaultValue = '', className }: { defaultValue?: string; className?: string }) {
  return (
    <form action="/search" method="GET" role="search" className={className ?? 'relative w-full max-w-sm'}>
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <input
        id="site-search"
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search kettles, grinders…"
        className="focus-ring h-10 w-full rounded-full border border-line bg-surface px-4 pr-10 text-sm text-ink placeholder:text-muted"
      />
      <button
        type="submit"
        className="focus-ring absolute right-1 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-surface-2"
        aria-label="Search"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M20 20l-3.8-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}
