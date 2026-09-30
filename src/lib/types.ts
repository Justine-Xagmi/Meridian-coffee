export type CategorySlug =
  | 'kettles'
  | 'grinders'
  | 'drippers'
  | 'scales'
  | 'filters'
  | 'accessories';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  heroImage: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  /** e.g. color or size label */
  value: string;
  priceModifier?: number;
  stock: number;
  sku: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string[];
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  currency: 'USD';
  images: ProductImage[];
  variants: ProductVariant[];
  specs: { label: string; value: string }[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  new?: boolean;
  materials: string[];
  careInstructions: string;
  createdAt: string;
}

export interface CartLineItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CartItemHydrated extends CartLineItem {
  product: Product;
  variant: ProductVariant;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  items: CartItemHydrated[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
