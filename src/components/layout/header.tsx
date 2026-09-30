import Link from 'next/link';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { getCartItemCount } from '@/lib/cart';
import { SearchBar } from '@/components/search/search-bar';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';
import { WishlistCount } from '@/components/wishlist/wishlist-count';

export function Header() {
  const cartCount = getCartItemCount();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <div className="container-page flex h-16 items-center gap-4">
        <MobileNav />

        <Link href="/" className="focus-ring shrink-0 rounded-sm font-display text-lg tracking-tight text-ink">
          {SITE_NAME}
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 justify-end lg:flex">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link
            href="/search"
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-2 lg:hidden"
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 20l-3.8-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Link>

          <ThemeToggle />

          <Link
            href="/wishlist"
            className="focus-ring relative inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-2"
            aria-label="Wishlist"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 20.3s-7.6-4.5-10-9.2C0.4 7.9 2 4.5 5.4 3.7c2-.5 4 .3 5.2 2 1.2-1.7 3.2-2.5 5.2-2 3.4.8 5 4.2 3.4 7.4-2.4 4.7-10 9.2-10 9.2z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <WishlistCount />
          </Link>

          <Link
            href="/cart"
            className="focus-ring relative inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-2"
            aria-label={`Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 8h12l-1 11.5a1.5 1.5 0 0 1-1.5 1.5H8.5A1.5 1.5 0 0 1 7 19.5L6 8Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M9 8V6.5a3 3 0 1 1 6 0V8" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-ink">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
