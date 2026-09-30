import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/data/categories';

export function CategoryGrid() {
  return (
    <section aria-labelledby="shop-by-category" className="py-16">
      <div className="container-page">
        <div className="flex items-end justify-between">
          <h2 id="shop-by-category" className="font-display text-2xl text-ink sm:text-3xl">
            Shop by category
          </h2>
          <Link href="/products" className="focus-ring text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="focus-ring group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-surface-2">
                <Image
                  src={category.heroImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 30vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="px-3 py-3 text-sm font-medium text-ink">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
