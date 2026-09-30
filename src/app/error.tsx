'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In production, forward to your error monitoring service (Sentry, etc.)
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </div>
      <h1 className="font-display text-2xl text-ink">Something went wrong</h1>
      <p className="max-w-sm text-sm text-muted">
        An unexpected error occurred while loading this page. You can try again, or head back home.
      </p>
      <div className="mt-2 flex gap-3">
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
