import { Suspense } from 'react';
import Link from 'next/link';
import { Hero } from '@/components/home/hero';
import { ValueProps } from '@/components/home/value-props';
import { CategoryGrid } from '@/components/home/category-grid';
import { FeaturedProducts } from '@/components/home/featured-products';
import { NewArrivals } from '@/components/home/new-arrivals';
import { AboutSection } from '@/components/home/about-section';
import { NewsletterSection } from '@/components/home/newsletter-section';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryGrid />

      <section aria-labelledby="featured-heading" className="border-t border-line py-16">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <h2 id="featured-heading" className="font-display text-2xl text-ink sm:text-3xl">
              Featured equipment
            </h2>
            <Link href="/products" className="focus-ring text-sm font-medium text-accent hover:underline">
              Shop all
            </Link>
          </div>
          <div className="mt-7">
            <Suspense fallback={<ProductGridSkeleton count={4} />}>
              <FeaturedProducts />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-labelledby="new-heading" className="border-t border-line py-16">
        <div className="container-page">
          <h2 id="new-heading" className="font-display text-2xl text-ink sm:text-3xl">
            New arrivals
          </h2>
          <div className="mt-7">
            <Suspense fallback={<ProductGridSkeleton count={3} />}>
              <NewArrivals />
            </Suspense>
          </div>
        </div>
      </section>

      <AboutSection />
      <NewsletterSection />
    </>
  );
}
