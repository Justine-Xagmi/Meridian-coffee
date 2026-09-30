import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getAllProducts } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'daily', priority: 0.9 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
