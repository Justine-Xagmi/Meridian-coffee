'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: '4rem 1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Something went wrong</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          A critical error occurred. Please try reloading the page.
        </p>
        <button
          onClick={reset}
          style={{ borderRadius: '999px', padding: '0.6rem 1.5rem', background: '#1a1a1a', color: '#fff', border: 'none' }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}
