'use client';

import { useEffect, useState } from 'react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="status"
      aria-live="assertive"
      className="fixed inset-x-0 top-0 z-50 bg-ink px-4 py-2.5 text-center text-sm text-bg"
    >
      You&rsquo;re offline. Some actions like checkout won&rsquo;t work until your connection returns.
    </div>
  );
}
