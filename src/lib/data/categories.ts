import type { Category, CategorySlug } from '@/lib/types';

export const categories: Category[] = [
  {
    slug: 'kettles',
    name: 'Kettles',
    description:
      'Gooseneck and electric kettles engineered for precise, controlled pours — the foundation of a consistent extraction.',
    heroImage: '/images/hero/kettles.svg',
  },
  {
    slug: 'grinders',
    name: 'Grinders',
    description:
      'Conical burr and hand grinders built for uniform particle size, from coarse press to fine espresso.',
    heroImage: '/images/hero/grinders.svg',
  },
  {
    slug: 'drippers',
    name: 'Drippers',
    description: 'Ceramic and glass brewers designed for even saturation and a clean, articulate cup.',
    heroImage: '/images/hero/drippers.svg',
  },
  {
    slug: 'scales',
    name: 'Scales',
    description: 'Precision brewing scales for dialing in ratios down to the tenth of a gram.',
    heroImage: '/images/hero/scales.svg',
  },
  {
    slug: 'filters',
    name: 'Filters',
    description: 'Abaca paper and reusable mesh filters selected for flavor clarity and low sediment.',
    heroImage: '/images/hero/filters.svg',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Serving ware and small tools that round out a considered brewing ritual.',
    heroImage: '/images/hero/accessories.svg',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return categories.some((c) => c.slug === slug);
}
