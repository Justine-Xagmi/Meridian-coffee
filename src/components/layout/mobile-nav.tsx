'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    dialogRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-2 md:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Site navigation"
        className="m-0 h-full max-h-none w-[85vw] max-w-sm bg-surface p-0 text-ink backdrop:bg-ink/40 backdrop:backdrop-blur-sm open:animate-slideInRight left-auto right-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <span className="font-display text-lg">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-2"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-3" aria-label="Categories">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring rounded-lg px-3 py-3 text-base text-ink hover:bg-surface-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-1 border-t border-line p-3">
            <Link href="/wishlist" className="focus-ring rounded-lg px-3 py-3 text-sm text-muted hover:bg-surface-2">
              Wishlist
            </Link>
            <Link href="/cart" className="focus-ring rounded-lg px-3 py-3 text-sm text-muted hover:bg-surface-2">
              Cart
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
