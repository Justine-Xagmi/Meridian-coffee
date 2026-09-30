import { NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * Receives Core Web Vitals beacons from the client. No PII, no cookies,
 * no IP-based fingerprinting is stored — this endpoint only ever sees an
 * aggregate metric name/value/path per page view.
 *
 * In production, forward `body` to your metrics store (e.g. a logging
 * pipeline, a time-series DB, or a provider like Vercel Analytics /
 * Grafana Cloud). For this demo it simply logs server-side.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (
      typeof body?.name === 'string' &&
      typeof body?.value === 'number' &&
      typeof body?.path === 'string'
    ) {
      // eslint-disable-next-line no-console
      console.log(`[web-vitals] ${body.name}=${body.value.toFixed(2)} (${body.rating}) on ${body.path}`);
    }
  } catch {
    // Malformed beacon — ignore rather than error, this is best-effort telemetry.
  }
  return NextResponse.json({ ok: true });
}
