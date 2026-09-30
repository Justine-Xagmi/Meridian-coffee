import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { WishlistProvider } from '@/components/wishlist/wishlist-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WebVitalsReporter } from '@/components/analytics/web-vitals-reporter';
import { OfflineBanner } from '@/components/system/offline-banner';

const displayFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Precision Pour-Over Equipment`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['pour over coffee', 'gooseneck kettle', 'burr grinder', 'coffee dripper', 'brewing scale', 'specialty coffee gear'],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Precision Pour-Over Equipment`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Precision Pour-Over Equipment`,
    description: SITE_DESCRIPTION,
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#141210' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/images/og-image.png`,
  };

  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <OfflineBanner />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <WishlistProvider>
            <Header />
            <main id="main-content" className="min-h-[60vh]">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </ThemeProvider>
        <WebVitalsReporter />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
