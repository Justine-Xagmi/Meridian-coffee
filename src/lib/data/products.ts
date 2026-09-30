import type { Product } from '@/lib/types';

function img(url: string, alt: string): { url: string; alt: string; width: number; height: number } {
  return { url, alt, width: 1200, height: 1500 };
}

export const products: Product[] = [
  {
    id: 'p-001',
    slug: 'cascade-gooseneck-kettle',
    name: 'Cascade Gooseneck Kettle',
    tagline: 'Precision pour control for pour-over brewing',
    description:
      'A stainless steel gooseneck kettle with a fine-tapered spout for slow, controlled pours and even coffee bed saturation.',
    longDescription: [
      'The Cascade Gooseneck Kettle was designed around a single problem: most kettles pour too fast at the moment you need control the most. Its tapered spout narrows gradually along its length, letting you drop from a fast fill-flow to a whisper-thin bloom pour without changing your grip.',
      'A counterbalanced handle keeps the kettle level even near-empty, and the thermometer-ready lid vents steam without dripping back down the spout. Compatible with induction, gas, and electric ranges.',
      'Every unit is hand-polished after forming, which is why you may notice subtle brushing variation — a mark of the process, not a defect.',
    ],
    category: 'kettles',
    price: 89,
    compareAtPrice: 109,
    currency: 'USD',
    images: [
      img('/images/products/cascade-gooseneck-kettle.svg', 'Cascade Gooseneck Kettle in brushed steel on a light surface'),
      img('/images/products/cascade-gooseneck-kettle-copper.svg', 'Detail of the Cascade Gooseneck Kettle spout'),
      img('/images/products/horizon-electric-kettle.svg', 'Cascade Gooseneck Kettle pouring angle'),
    ],
    variants: [
      { id: 'v-001-a', name: 'Finish', value: 'Brushed Steel', stock: 24, sku: 'CGK-BS-1000' },
      { id: 'v-001-b', name: 'Finish', value: 'Matte Black', stock: 12, sku: 'CGK-MB-1000' },
      { id: 'v-001-c', name: 'Finish', value: 'Copper', stock: 0, sku: 'CGK-CP-1000' },
    ],
    specs: [
      { label: 'Capacity', value: '1.0 L' },
      { label: 'Material', value: '18/8 stainless steel' },
      { label: 'Compatible heat sources', value: 'Gas, electric, induction' },
      { label: 'Weight', value: '540 g' },
      { label: 'Dimensions', value: '24.5 × 12.5 × 19 cm' },
    ],
    rating: 4.8,
    reviewCount: 214,
    featured: true,
    materials: ['18/8 stainless steel', 'Phenolic resin handle'],
    careInstructions: 'Hand wash recommended. Dry immediately to prevent water spotting on the steel finish.',
    createdAt: '2024-01-15',
  },
  {
    id: 'p-002',
    slug: 'horizon-electric-kettle',
    name: 'Horizon Electric Gooseneck Kettle',
    tagline: 'Variable temperature control with a 1-degree readout',
    description:
      'An electric gooseneck kettle with precise temperature hold, a matte LCD display, and a quiet 1200W element.',
    longDescription: [
      'Horizon pairs the pour control of a manual gooseneck with variable temperature electronics. Set your target in single-degree increments from 40–100°C and the internal sensor holds it steady for up to 60 minutes, so you can grind, dose, and prep without your water cooling below target.',
      'The base rotates a full 360°, the cord tucks beneath for a clean counter, and the kettle lifts off silently — no locking mechanism to fumble with mid-pour.',
    ],
    category: 'kettles',
    price: 149,
    currency: 'USD',
    images: [
      img('/images/products/horizon-electric-kettle.svg', 'Horizon Electric Gooseneck Kettle on its base'),
      img('/images/products/cascade-gooseneck-kettle.svg', 'Horizon kettle display detail'),
    ],
    variants: [
      { id: 'v-002-a', name: 'Finish', value: 'Matte Black', stock: 18, sku: 'HEK-MB-1200' },
      { id: 'v-002-b', name: 'Finish', value: 'Brushed Steel', stock: 9, sku: 'HEK-BS-1200' },
    ],
    specs: [
      { label: 'Capacity', value: '1.2 L' },
      { label: 'Power', value: '1200 W' },
      { label: 'Temperature range', value: '40–100°C, ±1°C hold' },
      { label: 'Keep-warm', value: 'Up to 60 minutes' },
    ],
    rating: 4.7,
    reviewCount: 132,
    featured: true,
    new: true,
    materials: ['Stainless steel', 'Heat-resistant polymer base'],
    careInstructions: 'Wipe base with a dry cloth. Descale monthly with equal parts water and white vinegar.',
    createdAt: '2024-06-02',
  },
  {
    id: 'p-003',
    slug: 'terra-conical-burr-grinder',
    name: 'Terra Conical Burr Grinder',
    tagline: '40mm steel conical burrs, 31 grind settings',
    description:
      'A countertop conical burr grinder covering French press through espresso, with a stepped dial and static-reducing chute.',
    longDescription: [
      'Terra uses 40mm hardened-steel conical burrs run at a low 450 RPM, which keeps heat transfer to the grounds minimal and preserves volatile aromatics that faster grinders cook off.',
      'Thirty-one click-stop settings cover everything from cold brew to Turkish, with the pour-over and espresso ranges given extra resolution where dial-in precision matters most.',
      'An anti-static chute and swappable dosing cup keep grounds where they belong — in your filter, not across your counter.',
    ],
    category: 'grinders',
    price: 219,
    compareAtPrice: 249,
    currency: 'USD',
    images: [
      img('/images/products/terra-conical-burr-grinder.svg', 'Terra Conical Burr Grinder, sand colorway'),
      img('/images/products/terra-conical-burr-grinder-onyx.svg', 'Terra Conical Burr Grinder in onyx'),
    ],
    variants: [
      { id: 'v-003-a', name: 'Finish', value: 'Sand', stock: 15, sku: 'TCG-SD-40' },
      { id: 'v-003-b', name: 'Finish', value: 'Onyx', stock: 21, sku: 'TCG-ON-40' },
    ],
    specs: [
      { label: 'Burr type', value: '40mm conical steel' },
      { label: 'Settings', value: '31 stepped' },
      { label: 'Hopper capacity', value: '250 g' },
      { label: 'Motor', value: '450 RPM, thermal-protected' },
      { label: 'Noise', value: '~62 dB' },
    ],
    rating: 4.9,
    reviewCount: 341,
    featured: true,
    materials: ['Anodized aluminum housing', 'Hardened steel burrs'],
    careInstructions: 'Brush burrs weekly. Run grinder-cleaning tablets monthly for oily beans.',
    createdAt: '2023-11-08',
  },
  {
    id: 'p-004',
    slug: 'compact-hand-grinder',
    name: 'Compact Hand Grinder',
    tagline: 'Travel-ready burr grinder with a magnetic catch cup',
    description: 'A pocketable stainless burr grinder for travel and camp brewing, with 24 external click settings.',
    longDescription: [
      'The Compact Hand Grinder packs full-size burr geometry into a body that fits in a jacket pocket. External click adjustment means you can change grind size without disassembly, even with cold hands.',
      'A magnetic catch cup keeps grounds contained, and the handle folds flat for packing.',
    ],
    category: 'grinders',
    price: 69,
    currency: 'USD',
    images: [img('/images/products/compact-hand-grinder.svg', 'Compact Hand Grinder disassembled showing burr')],
    variants: [{ id: 'v-004-a', name: 'Finish', value: 'Brushed Steel', stock: 40, sku: 'CHG-BS-01' }],
    specs: [
      { label: 'Burr type', value: '38mm stainless conical' },
      { label: 'Settings', value: '24 external click-stop' },
      { label: 'Capacity', value: '30 g beans' },
      { label: 'Weight', value: '310 g' },
    ],
    rating: 4.6,
    reviewCount: 98,
    materials: ['Stainless steel', 'Silicone grip'],
    careInstructions: 'Disassemble and brush burrs after every few uses.',
    createdAt: '2024-03-20',
  },
  {
    id: 'p-005',
    slug: 'origin-ceramic-dripper',
    name: 'Origin Ceramic Dripper',
    tagline: 'Flat-bottom ceramic brewer for even extraction',
    description:
      'A flat-bottom ceramic pour-over dripper with a triple-hole design for consistent, repeatable extraction.',
    longDescription: [
      'Origin\u2019s flat brew bed keeps the coffee bed depth even across the whole diameter, avoiding the over-extracted center and under-extracted edges common with cone-shaped drippers.',
      'Triple-hole drainage gives you room to slow the drawdown with a finer grind without stalling the brew, so you have more control over strength and clarity in the same recipe.',
      'Unglazed stoneware interior; glazed exterior in a small run of natural tones.',
    ],
    category: 'drippers',
    price: 48,
    currency: 'USD',
    images: [
      img('/images/products/origin-ceramic-dripper.svg', 'Origin Ceramic Dripper in sage'),
      img('/images/products/origin-ceramic-dripper-slate.svg', 'Origin Ceramic Dripper in slate'),
    ],
    variants: [
      { id: 'v-005-a', name: 'Color', value: 'Sage', stock: 30, sku: 'OCD-SG-02' },
      { id: 'v-005-b', name: 'Color', value: 'Slate', stock: 26, sku: 'OCD-SL-02' },
      { id: 'v-005-c', name: 'Color', value: 'Bone', stock: 8, sku: 'OCD-BN-02' },
    ],
    specs: [
      { label: 'Material', value: 'Glazed stoneware' },
      { label: 'Serves', value: '1–2 cups' },
      { label: 'Filter type', value: 'Cone #02, paper or mesh' },
      { label: 'Dishwasher safe', value: 'Yes' },
    ],
    rating: 4.8,
    reviewCount: 187,
    featured: true,
    materials: ['Stoneware', 'Ceramic glaze'],
    careInstructions: 'Dishwasher safe. Avoid thermal shock — do not move directly from freezer to boiling water.',
    createdAt: '2023-09-12',
  },
  {
    id: 'p-006',
    slug: 'glass-immersion-brewer',
    name: 'Glass Immersion Brewer',
    tagline: 'Full-immersion brewing with a fine steel mesh filter',
    description: 'A double-wall borosilicate glass brewer for full-immersion coffee, no paper filters required.',
    longDescription: [
      'The Glass Immersion Brewer steeps grounds fully submerged before releasing through a fine stainless mesh, producing a fuller-bodied cup than drip methods while staying cleaner than a French press plunge.',
      'Double-wall construction keeps the brew hot and the exterior cool to hold.',
    ],
    category: 'drippers',
    price: 58,
    currency: 'USD',
    images: [img('/images/products/glass-immersion-brewer.svg', 'Glass Immersion Brewer with steam rising')],
    variants: [{ id: 'v-006-a', name: 'Size', value: '400 ml', stock: 22, sku: 'GIB-400' }],
    specs: [
      { label: 'Material', value: 'Borosilicate glass, stainless mesh' },
      { label: 'Capacity', value: '400 ml' },
      { label: 'Filter', value: 'Reusable fine mesh, no paper needed' },
    ],
    rating: 4.5,
    reviewCount: 76,
    new: true,
    materials: ['Borosilicate glass', 'Stainless steel mesh'],
    careInstructions: 'Top-rack dishwasher safe. Hand dry mesh filter to prevent water spots.',
    createdAt: '2024-07-01',
  },
  {
    id: 'p-007',
    slug: 'precision-brew-scale',
    name: 'Precision Brew Scale',
    tagline: '0.1g resolution with built-in flow timer',
    description: 'A brewing scale with 0.1g resolution, auto-start timer, and a low-glare display for pour-over dial-in.',
    longDescription: [
      'Precision Brew Scale reads to 0.1g with a fast <150ms refresh, so your ratio math keeps pace with a real pour instead of lagging a full second behind, which is where most budget scales fall apart.',
      'The built-in timer auto-starts on the first weight change and can be tared mid-pour with a single tap, and the display tilts for visibility from a standing brew position.',
    ],
    category: 'scales',
    price: 79,
    currency: 'USD',
    images: [img('/images/products/precision-brew-scale.svg', 'Precision Brew Scale with kettle pouring above it')],
    variants: [
      { id: 'v-007-a', name: 'Finish', value: 'Onyx', stock: 33, sku: 'PBS-ON-01' },
      { id: 'v-007-b', name: 'Finish', value: 'Sand', stock: 0, sku: 'PBS-SD-01' },
    ],
    specs: [
      { label: 'Resolution', value: '0.1 g' },
      { label: 'Max load', value: '2000 g' },
      { label: 'Refresh rate', value: '<150 ms' },
      { label: 'Battery', value: 'USB-C rechargeable, ~20 hr use' },
    ],
    rating: 4.9,
    reviewCount: 265,
    featured: true,
    materials: ['Tempered glass platform', 'ABS housing'],
    careInstructions: 'Wipe with a damp cloth. Avoid submerging in water.',
    createdAt: '2023-12-01',
  },
  {
    id: 'p-008',
    slug: 'tandem-tasting-scale',
    name: 'Tandem Tasting Scale',
    tagline: 'Dual-platform scale for cupping and calibration',
    description: 'A two-platform scale for side-by-side cupping comparisons and grinder calibration.',
    longDescription: [
      'Tandem gives you two independent 0.01g-resolution platforms on one base, so you can compare dose consistency across two grinders or two cups without swapping a single scale back and forth.',
    ],
    category: 'scales',
    price: 129,
    currency: 'USD',
    images: [img('/images/products/tandem-tasting-scale.svg', 'Tandem Tasting Scale with two platforms')],
    variants: [{ id: 'v-008-a', name: 'Finish', value: 'Sand', stock: 11, sku: 'TTS-SD-01' }],
    specs: [
      { label: 'Resolution', value: '0.01 g per platform' },
      { label: 'Platforms', value: '2 independent' },
      { label: 'Max load', value: '500 g per platform' },
    ],
    rating: 4.7,
    reviewCount: 41,
    materials: ['Anodized aluminum', 'Tempered glass'],
    careInstructions: 'Wipe with a damp cloth. Store in a dry place.',
    createdAt: '2024-02-14',
  },
  {
    id: 'p-009',
    slug: 'abaca-paper-filters-100ct',
    name: 'Abaca Paper Filters (100ct)',
    tagline: 'Chlorine-free, low-sediment filters for a clean cup',
    description: 'Unbleached abaca-blend paper filters sized for cone drippers, 100 count.',
    longDescription: [
      'Woven from an abaca and wood pulp blend, these filters run thicker than standard bleached paper, trapping more fine sediment while letting oils through for a clean but not clinical cup.',
      'Chlorine-free processing means no papery off-notes in the first pour, so you can skip the pre-rinse if you\u2019re in a hurry.',
    ],
    category: 'filters',
    price: 12,
    currency: 'USD',
    images: [img('/images/products/abaca-paper-filters-100ct.svg', 'Stack of abaca paper filters')],
    variants: [
      { id: 'v-009-a', name: 'Size', value: 'Cone #02', stock: 120, sku: 'APF-02-100' },
      { id: 'v-009-b', name: 'Size', value: 'Cone #01', stock: 95, sku: 'APF-01-100' },
    ],
    specs: [
      { label: 'Count', value: '100 filters' },
      { label: 'Material', value: 'Abaca and wood pulp blend' },
      { label: 'Processing', value: 'Chlorine-free' },
    ],
    rating: 4.7,
    reviewCount: 152,
    materials: ['Abaca fiber', 'Wood pulp'],
    careInstructions: 'Single use. Store in a dry place.',
    createdAt: '2023-08-22',
  },
  {
    id: 'p-010',
    slug: 'reusable-mesh-filter',
    name: 'Reusable Mesh Filter',
    tagline: 'Ultra-fine stainless mesh for a fuller-bodied cup',
    description: 'A permanent stainless steel mesh filter that fits standard cone drippers.',
    longDescription: [
      'This ultra-fine mesh filter replaces paper entirely, letting more coffee oils and micro-fines through for a rounder body while still keeping the cup meaningfully cleaner than a French press.',
      'Laser-cut from a single sheet of stainless with no seams to trap grounds.',
    ],
    category: 'filters',
    price: 24,
    currency: 'USD',
    images: [img('/images/products/reusable-mesh-filter.svg', 'Reusable stainless mesh filter')],
    variants: [{ id: 'v-010-a', name: 'Size', value: 'Cone #02', stock: 45, sku: 'RMF-02' }],
    specs: [
      { label: 'Material', value: '304 stainless steel mesh' },
      { label: 'Mesh size', value: '120 micron' },
      { label: 'Fits', value: 'Standard cone #02 drippers' },
    ],
    rating: 4.4,
    reviewCount: 63,
    materials: ['304 stainless steel'],
    careInstructions: 'Rinse immediately after use. Dishwasher safe.',
    createdAt: '2024-04-11',
  },
  {
    id: 'p-011',
    slug: 'walnut-serving-tray',
    name: 'Walnut Serving Tray',
    tagline: 'Solid walnut tray for brewing service',
    description: 'A solid American walnut tray sized for a full pour-over setup, with brass corner inlays.',
    longDescription: [
      'Sized to carry a kettle, dripper, and two cups without crowding, the Walnut Serving Tray is finished with food-safe oil that deepens the grain over time with use.',
      'Brass corner inlays are set flush and won\u2019t catch on a towel or sleeve.',
    ],
    category: 'accessories',
    price: 68,
    currency: 'USD',
    images: [img('/images/products/walnut-serving-tray.svg', 'Walnut serving tray with brass inlay corners')],
    variants: [{ id: 'v-011-a', name: 'Size', value: 'Standard', stock: 19, sku: 'WST-STD' }],
    specs: [
      { label: 'Material', value: 'Solid American walnut' },
      { label: 'Finish', value: 'Food-safe mineral oil' },
      { label: 'Dimensions', value: '38 × 24 × 2 cm' },
    ],
    rating: 4.8,
    reviewCount: 54,
    materials: ['American walnut', 'Brass'],
    careInstructions: 'Hand wash and dry immediately. Re-oil every few months.',
    createdAt: '2024-01-30',
  },
  {
    id: 'p-012',
    slug: 'linen-brew-cloth-set',
    name: 'Linen Brew Cloth Set',
    tagline: 'Set of three heavyweight linen cloths',
    description: 'Three heavyweight linen cloths for wiping kettles, drying drippers, and lining trays.',
    longDescription: [
      'Woven from heavyweight European linen, these cloths are absorbent enough for cleanup duty but tight enough not to shed lint on wet ceramic or glass.',
      'They soften and improve with washing.',
    ],
    category: 'accessories',
    price: 34,
    currency: 'USD',
    images: [img('/images/products/linen-brew-cloth-set.svg', 'Folded linen brew cloths')],
    variants: [
      { id: 'v-012-a', name: 'Color', value: 'Natural', stock: 60, sku: 'LBC-NAT' },
      { id: 'v-012-b', name: 'Color', value: 'Charcoal', stock: 38, sku: 'LBC-CHR' },
    ],
    specs: [
      { label: 'Material', value: '100% European linen' },
      { label: 'Set size', value: '3 cloths, 45 × 45 cm each' },
    ],
    rating: 4.6,
    reviewCount: 29,
    materials: ['100% linen'],
    careInstructions: 'Machine wash cold, tumble dry low.',
    createdAt: '2024-05-18',
  },
  {
    id: 'p-013',
    slug: 'ceramic-cupping-bowls-set',
    name: 'Ceramic Cupping Bowls (Set of 4)',
    tagline: 'SCA-spec cupping bowls for tasting and comparison',
    description: 'A set of four SCA-spec ceramic cupping bowls for structured tasting sessions at home.',
    longDescription: [
      'Sized and shaped to SCA cupping specification, these bowls hold a consistent volume so ratio comparisons across beans stay meaningful.',
      'A wide mouth makes room for a proper cupping spoon and keeps aroma close to the surface during the break.',
    ],
    category: 'accessories',
    price: 52,
    currency: 'USD',
    images: [img('/images/products/ceramic-cupping-bowls-set.svg', 'Set of four ceramic cupping bowls')],
    variants: [{ id: 'v-013-a', name: 'Color', value: 'Slate', stock: 16, sku: 'CCB-SL-4' }],
    specs: [
      { label: 'Set size', value: '4 bowls' },
      { label: 'Capacity', value: '207 ml each (SCA spec)' },
      { label: 'Material', value: 'Glazed stoneware' },
    ],
    rating: 4.9,
    reviewCount: 22,
    new: true,
    materials: ['Stoneware', 'Ceramic glaze'],
    careInstructions: 'Dishwasher safe.',
    createdAt: '2024-08-05',
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.new);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.tagline, p.description, p.category].some((field) => field.toLowerCase().includes(q))
  );
}
