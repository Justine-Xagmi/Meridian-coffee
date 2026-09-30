import Link from 'next/link';
import { NAV_LINKS, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg text-ink">{SITE_NAME}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{SITE_DESCRIPTION}</p>
        </div>

        <nav aria-label="Shop">
          <h2 className="text-sm font-semibold text-ink">Shop</h2>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="focus-ring text-sm text-muted hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-semibold text-ink">Company</h2>
          <ul className="mt-3 space-y-2">
            <li><Link href="/#about" className="focus-ring text-sm text-muted hover:text-ink">Our story</Link></li>
            <li><Link href="/#journal" className="focus-ring text-sm text-muted hover:text-ink">Journal</Link></li>
            <li><Link href="/search" className="focus-ring text-sm text-muted hover:text-ink">Search</Link></li>
          </ul>
        </nav>

        <nav aria-label="Support">
          <h2 className="text-sm font-semibold text-ink">Support</h2>
          <ul className="mt-3 space-y-2">
            <li><Link href="/cart" className="focus-ring text-sm text-muted hover:text-ink">Shipping &amp; returns</Link></li>
            <li><Link href="/wishlist" className="focus-ring text-sm text-muted hover:text-ink">Wishlist</Link></li>
            <li><a href="mailto:hello@meridiancoffee.example" className="focus-ring text-sm text-muted hover:text-ink">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>Portfolio demo project — not a real store. No orders are fulfilled.</p>
        </div>
      </div>
    </footer>
  );
}
