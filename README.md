# Meridian Coffee Co.

A portfolio-grade e-commerce storefront for a premium pour-over coffee equipment
brand, built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind
CSS**. It's designed to demonstrate modern Next.js Commerce patterns — Server
Components by default, Server Actions for mutations, streaming with Suspense,
and a strict performance/accessibility budget — rather than to ship every
feature a real store might eventually need.

> 📄 See **[PORTFOLIO.md](./PORTFOLIO.md)** for the full case study: problem,
> architecture decisions, trade-offs, accessibility, and performance results.

---

## Table of contents

1. [Features](#features)
2. [Tech stack](#tech-stack)
3. [Getting started](#getting-started)
4. [Environment variables](#environment-variables)
5. [Project structure](#project-structure)
6. [Architecture overview](#architecture-overview)
7. [Performance](#performance)
8. [Accessibility](#accessibility)
9. [Testing](#testing)
10. [Performance testing (Lighthouse)](#performance-testing-lighthouse)
11. [Deployment](#deployment)
12. [Known limitations](#known-limitations)

---

## Features

- **Catalog** — 16 realistic products across 6 categories (kettles, grinders,
  drippers, scales, filters, accessories), each with variants, stock levels,
  specs, and reviews.
- **Browsing** — homepage, all-products page, category pages, and search, all
  with server-side sorting/filtering via URL search params.
- **Product detail** — image gallery, variant selection, live stock status,
  specs table, related products, recently viewed.
- **Cart** — persistent (httpOnly cookie), updated via Server Actions, no
  client-side cart library or global state manager.
- **Wishlist** — persisted to `localStorage`, since it's a personal,
  non-sensitive, device-local preference (see [PORTFOLIO.md](./PORTFOLIO.md)
  for why this differs from the cart's storage strategy).
- **Checkout** — shipping form → Server Action validation (Zod) → order
  confirmation page. Simulates a full flow without a real payment processor.
- **Dark / light mode** — via `next-themes`, no flash of incorrect theme.
- **Full state coverage** — every list/detail view has a loading skeleton,
  empty state, error boundary, and not-found page. A lightweight offline
  banner detects lost connectivity.
- **SEO** — per-page metadata, Open Graph/Twitter cards, canonical URLs,
  `sitemap.xml`, `robots.txt`, and JSON-LD for `Product`, `Offer`,
  `AggregateRating`, `BreadcrumbList`, and `Organization`.
- **Privacy-conscious analytics** — Core Web Vitals are optionally beaconed to
  a first-party `/api/vitals` route. No third-party script, no cookies, no
  PII.

## Tech stack

| Concern              | Choice                                           |
| --------------------- | ------------------------------------------------- |
| Framework             | Next.js 14 (App Router)                          |
| Language              | TypeScript (strict mode)                         |
| Styling               | Tailwind CSS + CSS custom properties for theming |
| Fonts                 | `next/font/google` (Fraunces + Inter, self-hosted at build time) |
| State (cart)          | httpOnly cookie + Server Actions (no client store) |
| State (wishlist)      | React Context + `localStorage`                   |
| Validation            | Zod (Server Action input parsing)                |
| Theme                 | `next-themes`                                    |
| Data                  | In-memory TypeScript modules (see [Known limitations](#known-limitations)) |
| Testing perf          | `lighthouse` + `chrome-launcher` CLI script       |

No UI kit, no CSS-in-JS runtime, no client-side data-fetching library — this
project intentionally keeps the dependency list short.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Script                | Description                                      |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Start the dev server with fast refresh            |
| `npm run build`        | Production build (also runs type/lint checks)     |
| `npm run start`        | Serve the production build                        |
| `npm run lint`         | ESLint (`next/core-web-vitals` ruleset)           |
| `npm run typecheck`    | `tsc --noEmit`                                    |
| `npm run lighthouse`   | Run Lighthouse against a running server, see below |

> **Note on `next/font/google` and network access:** at build time, Next.js
> downloads the Fraunces and Inter font files from Google Fonts and
> self-hosts them — there is **no runtime request to Google** in the built
> app (this is the whole point of `next/font`, see
> [Performance](#performance)). Building in a fully network-isolated
> environment (e.g. an offline CI sandbox) will fail at this download step;
> any normal dev machine, CI runner, or Vercel deployment has outbound
> internet access and is unaffected.

## Environment variables

See [`.env.example`](./.env.example) for the full, commented list. In short:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000   # used for canonical URLs, sitemap, OG tags
NEXT_PUBLIC_ENABLE_VITALS=false              # set "true" to beacon Web Vitals to /api/vitals
```

Nothing else is required to run the project as-is. The `.env.example` file
also documents the integration points (`DATABASE_URL`, `STRIPE_SECRET_KEY`,
`RESEND_API_KEY`) you'd wire up to turn this into a real, revenue-generating
store — see [Known limitations](#known-limitations).

## Project structure

```
src/
├── app/                          # App Router routes
│   ├── (shop)/                   # Route group (no URL segment)
│   │   ├── products/             # /products, /products/[slug]
│   │   ├── category/[category]/  # /category/:slug
│   │   └── search/                # /search
│   ├── cart/                     # /cart
│   ├── checkout/                 # /checkout, /checkout/confirmation/[orderId]
│   ├── wishlist/                 # /wishlist (client-rendered, localStorage)
│   ├── api/vitals/               # Web Vitals beacon endpoint
│   ├── layout.tsx                # Root layout: fonts, providers, header/footer
│   ├── page.tsx                  # Homepage
│   ├── sitemap.ts / robots.ts / manifest.ts
│   ├── loading.tsx / error.tsx / global-error.tsx / not-found.tsx
├── components/
│   ├── layout/                   # Header, Footer, MobileNav
│   ├── product/                  # Card, Grid, Gallery, Purchase panel, Specs…
│   ├── cart/                     # Cart row, Order summary
│   ├── checkout/                 # Checkout form, review list
│   ├── search/                   # Search bar, filter/sort bar
│   ├── wishlist/                 # Wishlist context, button, count badge
│   ├── theme/                    # Theme provider/toggle
│   ├── analytics/                # Web Vitals reporter
│   ├── system/                   # Offline banner
│   └── ui/                       # Button, Badge, Skeleton, Breadcrumbs…
├── lib/
│   ├── data/                     # Product/category "database" + async fetchers
│   ├── actions/                  # Server Actions (cart, checkout, newsletter)
│   ├── cart.ts                   # Cart domain logic (cookie read, totals)
│   ├── types.ts, utils.ts, constants.ts
public/
├── images/                       # Generated SVG product/hero artwork
scripts/
├── generate_images.py            # Regenerates placeholder artwork
└── lighthouse.mjs                # Lighthouse CLI runner
```

## Architecture overview

This is a summary; see **[PORTFOLIO.md](./PORTFOLIO.md)** for the full
reasoning behind each decision.

- **Server Components by default.** Nearly every component in `components/product`,
  `components/layout`, and all route files are Server Components. `'use client'`
  is added only where interactivity truly requires it (~15 files): theme
  toggle, mobile nav dialog, gallery thumbnails, variant selector, cart row
  quantity control, wishlist context/button, filter/sort auto-submit,
  checkout/newsletter forms, offline banner.
- **Cart lives on the server.** The cart is a signed-free, httpOnly cookie
  read directly in Server Components (`getCart()`, `getCartItemCount()`) and
  mutated only through Server Actions (`addToCartAction`,
  `updateCartQuantityAction`, …). There is no client-side cart store, no
  cart context, and no hydration mismatch risk — the header's cart badge is
  correct on the very first byte of HTML.
- **Wishlist lives on the client.** Unlike the cart, the wishlist has no
  server-visible consequence (no stock reservation, no price calculation) and
  benefits from being instantly interactive without a network round trip, so
  it's `localStorage`-backed via a small Context provider.
- **Streaming with Suspense.** Product listing/detail/search pages await a
  (simulated) async data layer inside `<Suspense>` boundaries with a
  matching skeleton `fallback`, so the page shell — header, breadcrumbs,
  filters — paints immediately while results stream in.
- **Static where possible, dynamic where necessary.** Product and category
  pages use `generateStaticParams` for build-time SSG with on-demand
  revalidation. Cart/checkout/search are inherently request-specific and
  render dynamically.
- **Zero client-side data fetching.** There is no SWR/React Query/Redux.
  Every data need is satisfied by a Server Component, a Server Action, or
  (for wishlist/recently-viewed) `localStorage` read directly in the
  component that needs it.

## Performance

Concrete choices and the Core Web Vitals they target:

| Decision                                                                 | Improves | Why |
| ------------------------------------------------------------------------- | -------- | --- |
| Server Components for all non-interactive UI                             | LCP, TBT/INP | Zero client JS shipped for product cards, grids, specs, footer, etc. |
| `next/image` everywhere, with explicit `sizes` per breakpoint            | LCP, CLS | Correctly-sized responsive images, no oversized downloads, reserved aspect-ratio boxes prevent shift. |
| `next/font/google` with `display: swap`                                  | LCP, CLS | Fonts are downloaded once at **build time** and self-hosted — no runtime request to Google, no render-blocking `<link>`, no layout shift from a late-swapping web font. |
| Cart as an httpOnly cookie read server-side                              | INP, JS size | No client cart store/hydration; the cart badge needs zero client JS to be correct on load. |
| Server Actions for all mutations (cart, checkout, newsletter)            | JS size | No hand-rolled `fetch` + client state management; forms work with JS disabled (progressive enhancement) and `useFormStatus` only adds a pending indicator, not the mutation logic. |
| Native `<dialog>` for the mobile nav                                     | JS size | Browser-native focus trap, `Escape`-to-close, and backdrop — instead of a client-side modal library. |
| Zero-JS search bar (`<form method="GET">`)                               | JS size, INP | Search works with JavaScript fully disabled; there's no keystroke-driven client fetch loop to debounce. |
| Suspense + streaming SSR                                                 | LCP (perceived) | The page shell is sent immediately; slower sections stream in with a skeleton instead of blocking the whole response. |
| `generateStaticParams` + ISR for product/category pages                  | LCP, TTFB | Most-requested pages are pre-rendered HTML served from the edge, not computed per request. |
| Route-level `loading.tsx` skeletons                                      | CLS, perceived performance | Skeletons match the exact dimensions of the real content, so there's no shift when data arrives. |
| Deterministic local SVG artwork (no external image CDN)                  | LCP, requests | Removes a third-party image host from the critical path entirely. |
| No UI kit / CSS-in-JS runtime                                            | TBT/INP | Tailwind compiles to static CSS with no client-side style computation. |
| Security headers (`next.config.mjs`) instead of a third-party script     | TBT | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` set at the edge, no JS cost. |
| First-party Web Vitals beacon (`sendBeacon`, opt-in)                     | TBT | No analytics SDK on the critical path; a single fire-and-forget beacon per metric, and only when explicitly enabled. |

See [PORTFOLIO.md § Lighthouse / Core Web Vitals results](./PORTFOLIO.md#11-lighthousecore-web-vitals-results)
for measured numbers and how to reproduce them.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`) and a "Skip to
  content" link that appears on keyboard focus.
- All interactive controls have visible `:focus-visible` rings
  (`.focus-ring` utility) tuned for contrast in both themes.
- Icon-only buttons (cart, wishlist, theme toggle, gallery thumbnails,
  close buttons) have `aria-label`s; toggle buttons expose `aria-pressed`
  or `aria-checked` as appropriate.
- The mobile nav uses a native `<dialog>` element, which provides a correct
  accessible name, focus trapping, and `Escape`-to-close for free.
- Live regions (`aria-live="polite"`/`"assertive"`) announce add-to-cart
  feedback, form errors, filtered result counts, and offline status without
  moving focus.
- Star ratings, stock badges, and price/sale states are conveyed with text,
  not color alone.
- Color tokens were chosen for WCAG AA contrast in both light and dark mode
  (verify with the Lighthouse/axe run described below).
- `prefers-reduced-motion` disables shimmer/slide animations globally.

## Testing

This project ships with type-checking and linting as its automated
correctness net, plus a manual QA checklist — see
[PORTFOLIO.md § What could be improved next](./PORTFOLIO.md#12-what-could-be-improved-next)
for why unit/e2e tests weren't included in this pass.

```bash
npm run typecheck   # TypeScript strict mode, zero errors
npm run lint         # next/core-web-vitals ESLint ruleset
```

**Manual QA checklist** (also a good smoke test after any change):

- [ ] Add an item to the cart from a product page and from a product card's
      quick view; confirm the header badge updates immediately.
- [ ] Change quantity and remove an item from `/cart`; confirm totals
      recompute and free-shipping messaging updates.
- [ ] Complete checkout with valid and invalid data; confirm field-level
      errors render and a valid submission redirects to a confirmation page
      with a matching order ID.
- [ ] Toggle the wishlist heart on a product card and on a product detail
      page; confirm it persists across a reload.
- [ ] Search for a term with zero, one, and many matches.
- [ ] Filter/sort a category page and confirm the URL updates and is
      shareable/bookmarkable.
- [ ] Resize to a mobile viewport and open/close the mobile nav with a
      keyboard only (`Tab`, `Enter`, `Escape`).
- [ ] Toggle dark mode and confirm no flash of unstyled/incorrect theme on
      reload.
- [ ] Disconnect network (DevTools → Network → Offline) and confirm the
      offline banner appears.
- [ ] Visit a nonexistent product slug and a nonexistent route to see the
      not-found states.

## Performance testing (Lighthouse)

```bash
npm run build
npm run start          # serves the production build on :3000

# in a second terminal
npm run lighthouse
```

This runs Lighthouse (headless Chrome) against `/`, `/products`,
`/category/kettles`, a product detail page, and `/cart`, printing
Performance/Accessibility/Best Practices/SEO scores plus LCP, CLS, and TBT
(a lab proxy for INP) to the console, and writes full HTML reports to
`./reports/`.

You can also run Lighthouse manually from Chrome DevTools (Lighthouse tab)
or via `npx lighthouse <url> --view` against the deployed URL for
field-adjacent results, or check real-user Core Web Vitals in the Vercel
Analytics/Speed Insights dashboard once deployed.

## Deployment

Deploys to **Vercel** with zero configuration:

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it in the [Vercel dashboard](https://vercel.com/new).
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain in the Vercel
   project's Environment Variables (and optionally
   `NEXT_PUBLIC_ENABLE_VITALS=true`).
4. Deploy. Vercel builds with `next build` and serves static/SSG pages from
   the edge and dynamic routes (`/cart`, `/checkout`, `/search`, …) as
   serverless/edge functions automatically — no extra config needed.

Any other Node-compatible host (Netlify, Render, self-hosted `next start`
behind a reverse proxy) also works, since nothing here depends on a
Vercel-only API.

## Known limitations

This is a portfolio/demo project, not a production store. In particular:

- **No real database.** Products/categories live in TypeScript modules
  (`src/lib/data`); orders live in an in-memory `Map` that resets on server
  restart. A production build would replace both with a real database (see
  `.env.example`'s `DATABASE_URL`).
- **No real payments.** Checkout validates and "places" an order but never
  contacts a payment processor. Swapping in Stripe (or similar) would touch
  only `src/lib/actions/checkout-actions.ts`.
- **No transactional email.** The confirmation page is the only receipt;
  wiring up `RESEND_API_KEY` (or similar) would send a real email from the
  same Server Action.
- **404s return HTTP 200 for unknown product/category slugs.** The not-found
  UI renders correctly, but because every route is dynamically rendered
  (see above), Next.js optimistically sends a `200` status before the
  `notFound()` call resolves — a documented Next.js characteristic of
  dynamic rendering, not a bug in the app logic. See
  [PORTFOLIO.md §6](./PORTFOLIO.md#6-trade-offs) for the full mechanism and
  fix.

Full rationale for these trade-offs — and what a v2 would prioritize — is in
[PORTFOLIO.md](./PORTFOLIO.md).
