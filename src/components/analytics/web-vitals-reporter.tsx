'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Privacy-conscious performance reporting.
 *
 * - No third-party script, no cookies, no cross-site identifiers.
 * - Sends only the metric name/value/id and the current pathname via
 *   `navigator.sendBeacon`, which is fire-and-forget and never blocks
 *   navigation or the main thread.
 * - Swap the `/api/vitals` handler for your analytics provider of choice
 *   (or point it at Vercel Analytics / a data warehouse) without touching
 *   this component.
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (process.env.NEXT_PUBLIC_ENABLE_VITALS !== 'true') return;

    const payload = JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: metric.rating,
      path: window.location.pathname,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/vitals', payload);
    } else {
      fetch('/api/vitals', { body: payload, method: 'POST', keepalive: true }).catch(() => {});
    }
  });

  return null;
}
