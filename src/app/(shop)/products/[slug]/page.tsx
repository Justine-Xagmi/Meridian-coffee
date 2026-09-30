import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/lib/data/products';
import { fetchProductBySlug } from '@/lib/data/fetchers';
import { getCategory } from '@/lib/data/categories';
import { SITE_URL } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductPurchasePanel } from '@/components/product/product-purchase-panel';
import { ProductSpecs } from '@/components/product/product-specs';
import { StarRating } from '@/components/ui/star-rating';
import { RelatedProducts } from '@/components/product/related-products';
import { RecentlyViewedTracker } from '@/components/product/recently-viewed-tracker';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

// The catalog is fully known at build time, so a slug outside
// generateStaticParams should 404 immediately rather than attempting an
// on-demand render (which, for `notFound()` calls in that fallback path,
// can otherwise serve a 200 status with 404 content — this makes the
// correct status code explicit).
export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: 'website',
      title: product.name,
      description: product.description,
      images: product.images.map((img) => ({ url: img.url, width: img.width, height: img.height, alt: img.alt })),
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.images[0]?.url ?? ''],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.variants[0]?.sku,
    image: product.images.map((img) => `${SITE_URL}${img.url}`),
    brand: { '@type': 'Brand', name: 'Meridian Coffee Co.' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price.toFixed(2),
      availability: totalStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <div>
      <RecentlyViewedTracker slug={product.slug} />

      <div className="container-page">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
            { label: product.name },
          ]}
        />
      </div>

      <div className="container-page grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="lg:pt-2">
          <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-base text-muted">{product.tagline}</p>
          <div className="mt-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          <div className="mt-6 border-t border-line pt-6">
            <ProductPurchasePanel product={product} />
          </div>

          <div className="mt-10 space-y-4">
            <h2 className="font-display text-lg text-ink">About this piece</h2>
            {product.longDescription.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="mb-3 font-display text-lg text-ink">Specifications</h2>
            <ProductSpecs specs={product.specs} />
          </div>

          <div className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <h3 className="font-medium text-ink">Materials</h3>
              <p className="mt-1 text-muted">{product.materials.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-medium text-ink">Care</h3>
              <p className="mt-1 text-muted">{product.careInstructions}</p>
            </div>
          </div>

          <p className="mt-8 text-xs text-muted">Added to the catalog {formatDate(product.createdAt)}</p>
        </div>
      </div>

      <Suspense fallback={<div className="container-page py-14"><ProductGridSkeleton count={4} /></div>}>
        <RelatedProducts product={product} />
      </Suspense>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </div>
  );
}
