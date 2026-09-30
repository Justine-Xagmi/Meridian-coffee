export const SITE_NAME = 'Meridian Coffee Co.';
export const SITE_DESCRIPTION =
  'Precision pour-over equipment for a deliberate cup — kettles, grinders, drippers, and scales designed to disappear into the ritual.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const CART_COOKIE = 'meridian_cart';
export const WISHLIST_STORAGE_KEY = 'meridian_wishlist';
export const RECENTLY_VIEWED_STORAGE_KEY = 'meridian_recently_viewed';

export const FREE_SHIPPING_THRESHOLD = 75;
export const FLAT_SHIPPING_RATE = 6.5;
export const TAX_RATE = 0.0825;

export const NAV_LINKS = [
  { href: '/category/kettles', label: 'Kettles' },
  { href: '/category/grinders', label: 'Grinders' },
  { href: '/category/drippers', label: 'Drippers' },
  { href: '/category/scales', label: 'Scales' },
  { href: '/category/filters', label: 'Filters' },
  { href: '/category/accessories', label: 'Accessories' },
];
