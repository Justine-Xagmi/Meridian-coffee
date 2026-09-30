# Portfolio Case Study: Meridian Coffee Co.

A premium, focused-catalog e-commerce storefront built to demonstrate modern
Next.js Commerce architecture: Server Components by default, Server Actions
for all mutations, streaming SSR, and a performance/accessibility budget
treated as a first-class requirement rather than an afterthought.

---

## 1. Problem

Most "e-commerce template" projects fall into one of two traps: either they're
a thin CRUD app (a `products` table, a cart array, a checkout button) that
doesn't demonstrate any real architectural thinking, or they're a kitchen-sink
feature dump (reviews, recommendations engines, multi-currency, subscriptions,
loyalty points) that's too broad to execute any single part of well.

The goal here was different: **build a small number of commerce flows to a
genuinely production-credible standard** — correct Server/Client Component
boundaries, real streaming, a cart that survives a page refresh without a
client-side store, forms that work before JavaScript loads, and Core Web
Vitals that would pass a real audit — rather than maximizing feature count.

## 2. Product concept

**Meridian Coffee Co.** — a direct-to-consumer brand selling precision
pour-over brewing equipment (gooseneck kettles, conical burr grinders,
ceramic drippers, brewing scales, filters, and brewing accessories). This
concept was chosen deliberately:

- **Naturally small catalog** (16 SKUs across 6 categories) — big enough to
  need real filtering/sorting/search, small enough that every product could
  be written with genuine, specific detail instead of generated filler.
- **Meaningful variants and stock states** — finish/color options with
  independent stock levels, so "out of stock," "low stock," and variant
  selection aren't hypothetical UI states.
- **A visual identity that rewards typography and spacing** over busy imagery
  — which let the project lean on a warm, editorial design system instead of
  needing a professional photo shoot (see [§8](#8-mobile-ux-decisions) and the
  note on placeholder art in [§6](#6-trade-offs)).

## 3. Architecture decisions

| Decision | Rationale |
| --- | --- |
| **App Router, not Pages Router** | Server Components, streaming, and colocated `loading`/`error`/`not-found` files are only available (or are far more ergonomic) in the App Router. |
| **No global client state manager** (Redux/Zustand/Context-for-everything) | The cart is server state (a cookie), the wishlist is the only truly client-only state and gets a single small Context. Reaching for a global store would have added a dependency and a hydration cost to solve a problem the platform already solves. |
| **Server Actions instead of API routes for mutations** | `addToCartAction`, `updateCartQuantityAction`, `placeOrderAction`, and `subscribeAction` are colocated with their domain logic in `src/lib/actions`, type-checked end-to-end with the calling form, and don't require hand-written `fetch` + loading/error state plumbing on the client. One real API route (`/api/vitals`) exists only because it must be reachable via `navigator.sendBeacon`, which needs a URL, not a Server Action reference. |
| **Zod for Server Action input validation** | Form data arrives as untyped `FormData`; Zod gives a single declarative schema that produces both parsed, typed data and field-level error messages for the client. |
| **In-memory data layer with a clear seam** | `src/lib/data/products.ts` and `src/lib/data/orders-store.ts` are intentionally the only two files a real backend integration would touch. Everything else (pages, components, actions) is written against the shape of that data, not against "an array," so swapping in Postgres/Prisma later doesn't ripple outward. |
| **Route groups** (`(shop)`) | Groups `/products`, `/category/[category]`, and `/search` for organizational clarity without affecting the URL — these three routes share the "browse and filter a product list" shape. |

## 4. Why Server Components were used

The default in this codebase is a Server Component; `'use client'` is the
exception and has to be justified. Concretely, of ~79 files in `src/`, only
about 15 are Client Components, and each one exists for a specific, narrow
reason:

- **Theme toggle** — reads/writes `next-themes` state, which is inherently a
  browser API.
- **Mobile nav** — manages native `<dialog>` open/close state.
- **Product gallery** — swaps the active thumbnail without a navigation.
- **Product purchase panel** — holds the selected variant/quantity in state
  before submitting the add-to-cart Server Action.
- **Cart item row** — the quantity `<select>` auto-submits on change.
- **Wishlist context/button/count** — `localStorage` is a browser-only API.
- **Filter/sort bar** — auto-submits the GET form on change for a nicer UX
  (a `<noscript>` fallback keeps it usable without JS).
- **Checkout/newsletter forms** — use `useFormState`/`useFormStatus` for
  pending and error UI around a Server Action.
- **Web Vitals reporter, offline banner** — both are inherently
  browser-API-driven (`PerformanceObserver`, `navigator.onLine`).

Everything else — every product card, every grid, the header's cart badge,
the footer, breadcrumbs, specs tables, the entire homepage layout — is a
Server Component. This matters for three concrete reasons:

1. **Zero client JS for content that never changes on the client.** A
   product card doesn't need to re-render in the browser; shipping it as a
   Server Component means its markup and text are pure HTML, with no
   corresponding JavaScript bundle, no hydration cost, and no risk of a
   hydration mismatch.
2. **Data stays on the server.** Product data, pricing logic, and stock
   calculations are computed once, server-side, and never need to be
   serialized into a client bundle just so a component *could* theoretically
   re-render them.
3. **The cart badge is correct before any JS runs.** Because `Header` is a
   Server Component that reads the cart cookie directly, the very first byte
   of HTML already shows the right cart count — there's no
   "flash of empty cart, then update" that a client-fetched cart would cause.

## 5. Performance decisions

See the [README's Performance table](./README.md#performance) for the full
list mapped to specific Core Web Vitals. The three decisions with the
biggest structural impact:

1. **Cart-as-cookie, read server-side.** This is the single decision that
   most shaped the architecture. It means the cart requires no client
   JavaScript to render correctly, no loading state ("is the cart still
   fetching?"), and no hydration mismatch — at the cost of making every page
   that renders `<Header>` (i.e., every page) dynamically rendered rather
   than fully static, since `cookies()` opts a request into dynamic
   rendering. That's a deliberate trade (see [§6](#6-trade-offs)).
2. **Suspense boundaries around the data-dependent parts of a page, not the
   whole page.** Product/category/search pages render their shell
   (breadcrumbs, heading, filter bar) synchronously and stream the actual
   result grid in behind a skeleton that matches its exact final dimensions
   — so Cumulative Layout Shift stays at zero even though the content
   arrives asynchronously.
3. **`next/font/google` over a `<link>` tag or a self-managed `@font-face`.**
   Next downloads the font files at build time and serves them from the same
   origin as the app, with automatically-generated `font-display: swap` and
   size-adjusted fallback metrics — eliminating both a third-party network
   request and the layout shift that a naively-swapped web font causes.

## 6. Trade-offs

Being explicit about what was traded for what:

- **Dynamic rendering vs. a fully static homepage — and its effect on 404 status codes.** Because the header reads the cart cookie, no page in this app is served as pure static HTML at the edge — every request is dynamically rendered server-side. The alternative (a fully static shell with the cart badge fetched client-side) would regain static delivery but reintroduce a client fetch, a loading state, and a hydration step for something as simple as "how many items are in my cart." **Given this app's scale, I chose the simpler, more correct-by-default approach and accepted the dynamic-rendering cost.** That cost has a second, subtler consequence worth calling out explicitly: Next.js's App Router optimistically sends a `200` status as soon as a dynamically-rendered response starts streaming, before a `notFound()` call deeper in the tree (e.g. on an unknown product slug) has resolved — so `/products/does-not-exist` renders the correct not-found UI but with an HTTP `200` rather than `404`, which matters for crawlers/monitoring even though human visitors see the right page. This is documented Next.js behavior for dynamically-rendered routes, not a bug specific to this codebase, and it disappears entirely for any route that's genuinely static. The real fix — Partial Prerendering (see [§12](#12-what-could-be-improved-next)) — would let product/category pages prerender statically (and thus 404 correctly) while only the cart badge in the header streams in dynamically.
- **`localStorage` for wishlist and recently-viewed vs. a database.** This
  keeps those features instant and free of any server round-trip, but means
  they're device-local (no cross-device sync) and invisible to
  server-rendered pages (the wishlist page itself has to be a Client
  Component, and recently-viewed products are looked up from a small
  client-importable product index). For a feature with zero business logic
  attached (no inventory hold, no price lock), this felt like the right
  place to spend client-side simplicity instead of server complexity.
- **In-memory data instead of a real database.** This keeps the project
  runnable with `npm install && npm run dev` and zero external services,
  which matters for a portfolio piece a reviewer will actually try to run —
  but it means data doesn't persist across deploys/restarts and there's no
  real concurrency story. The data-access functions are written as the seam
  where a real database would slot in without changing any calling code.
- **Simulated latency in the data layer.** `src/lib/data/fetchers.ts` adds an
  artificial 150–400ms delay to otherwise-instant in-memory reads, purely so
  the Suspense/streaming boundaries in the UI are visibly meaningful in a
  demo instead of resolving too fast to notice. This is clearly commented as
  demo-only in the source.
- **Generated SVG product imagery instead of photography.** A real brand
  launch would commission product photography; this project generates
  deterministic, on-brand SVG illustrations programmatically
  (`scripts/generate_images.py`) so the repository has zero external image
  dependencies and instant, crawlable, zero-CLS imagery out of the box. It's
  an honest placeholder, not a disguised one — swapping in real photography
  later touches only `src/lib/data/products.ts`'s `images` arrays.
- **No automated test suite.** Given the scope, effort went into
  type-checking (TypeScript strict mode) and linting as the correctness net
  rather than a parallel Jest/Playwright suite. See
  [§12](#12-what-could-be-improved-next) for what a next pass would add.

## 7. Accessibility decisions

- **Semantic HTML first, ARIA second.** Landmarks (`header`, `nav`, `main`,
  `footer`), a real `<dialog>` for the mobile menu, real `<fieldset>`/`<legend>`
  for variant selection, and real `<form>`s for every mutation — ARIA
  attributes (`aria-pressed`, `aria-live`, `aria-current`) are added on top
  of correct semantics, not instead of them.
- **A visible skip link** (`.skip-link`) that only appears on keyboard focus,
  letting keyboard/screen-reader users bypass the header navigation.
- **Live regions instead of silent state changes.** Add-to-cart confirmation,
  form validation errors, filtered result counts, and offline status are all
  wrapped in `aria-live` regions so they're announced without requiring the
  user to find them visually.
- **Never color alone.** Stock status (badge text: "In stock" / "Only 3
  left" / "Out of stock"), sale pricing (a struck-through comparison price,
  not just a red badge), and star ratings (an `aria-label` with the numeric
  rating and review count) all carry a text equivalent.
- **Focus management via native elements over custom widgets.** The mobile
  nav's `<dialog>` gets focus trapping and `Escape`-to-close from the
  browser for free; a custom `<div role="dialog">` implementation would have
  needed hand-rolled focus trapping to match.
- **`prefers-reduced-motion` respected globally** — shimmer skeletons and
  slide-in transitions are disabled via a single media query in
  `globals.css` rather than per-component checks.
- **Contrast-checked color tokens.** Both the light and dark palettes use a
  muted-but-AA-compliant text color (`--color-muted`) for secondary copy, with
  full-contrast `--color-ink` reserved for primary content and headings.

## 8. Mobile UX decisions

- **Mobile-first layout throughout** — Tailwind's default (unprefixed)
  classes target mobile, with `sm:`/`md:`/`lg:` progressively enhancing for
  larger viewports, rather than designing desktop-first and squeezing down.
- **A native `<dialog>`-based mobile nav** instead of a JS-heavy off-canvas
  drawer library — smaller bundle, correct focus behavior, and a backdrop
  that closes on tap for free.
- **Thumb-reachable primary actions.** Add-to-cart, quantity steppers, and
  variant pills are sized at a minimum 40–48px touch target and placed in
  the lower two-thirds of the product detail view on mobile.
- **A 2-column product grid on mobile** (not 1) — dense enough to browse
  efficiently on a phone without the cards feeling cramped, matching the
  aspect-ratio-locked image boxes that prevent shift while scrolling.
- **The mobile search/cart/wishlist icons collapse into the icon row** rather
  than being hidden behind a second-level menu, since search and cart are
  the two highest-intent actions on a commerce site.
- **Sticky, translucent header** (`backdrop-blur`) that stays out of the way
  while scrolling but remains reachable without scrolling back to the top.

## 9. Security considerations

- **httpOnly, `SameSite=Lax` cart cookie.** The cart cookie is never readable
  from client-side JavaScript, which removes an entire class of
  cart-tampering-via-XSS risk; `SameSite=Lax` mitigates basic CSRF vectors
  for the cookie itself, and `secure: true` is set in production.
- **All mutations go through Server Actions with server-side validation.**
  Even though a form's fields are also constrained in the DOM (e.g.
  `required`, `type="email"`), every Server Action re-validates with Zod
  server-side — client-side constraints are a UX nicety, not the security
  boundary.
- **Security headers set at the edge** (`next.config.mjs`):
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive
  `Permissions-Policy` (camera/microphone/geolocation all denied) — cheap
  insurance with zero runtime JS cost.
- **No `dangerouslySetInnerHTML` of user input.** The only uses of
  `dangerouslySetInnerHTML` in the codebase are for JSON-LD structured data
  built entirely from trusted, server-side product/category data — never
  from user-submitted content.
- **No third-party script execution.** Because there's no analytics SDK, ad
  script, or embedded widget, there's no third-party code with page-level
  script access — reducing the supply-chain attack surface to `next-themes`,
  `zod`, and `clsx`.
- **Server Actions validate stock before mutating the cart.** `addToCartAction`
  re-checks the variant's stock server-side rather than trusting a client-sent
  quantity, so a manipulated form payload can't add more units than exist.

## 10. Before/after performance measurements

This project was built new rather than migrated from an existing
implementation, so there isn't a literal "before" version of *this* app to
compare against. Instead, the meaningful comparison is **this architecture
vs. the common alternative it deliberately avoided** — a client-rendered
cart/catalog fetched from a REST API with a global state manager:

| | Client-fetched cart + SPA-style catalog (common pattern) | This project |
| --- | --- | --- |
| Cart badge on first paint | Empty/`0` until a client fetch resolves, then updates (visible flash) | Correct from the first byte of HTML |
| JS required for cart to be readable | Yes | No (JS only needed to *change* it) |
| Client state library | Typically Redux/Zustand + a cart slice | None — cart is a server cookie |
| Product grid rendering | Client-side fetch → loading spinner → render | Server-rendered HTML, streamed with a skeleton fallback |
| Search | Usually a debounced client fetch on every keystroke | A GET form; works with zero JS, no debounce logic needed |

The concrete, reproducible numbers for *this* build are in
[§11](#11-lighthousecore-web-vitals-results) below.

## 11. Lighthouse/Core Web Vitals results

**Methodology note (read this first):** this project's `npm run build` step
downloads the Fraunces/Inter font files from Google Fonts at build time
(then self-hosts them — see [README § Performance](./README.md#performance)).
The sandbox this project was authored in has no outbound network access to
`fonts.googleapis.com`, so a Lighthouse run could not be executed against
the exact final production build inside that environment. What follows is
the reproducible command to generate real numbers on any machine with normal
internet access (which includes any CI runner or Vercel deployment):

```bash
npm run build
npm run start
# in a second terminal:
npm run lighthouse
```

This prints Performance/Accessibility/Best Practices/SEO scores and
LCP/CLS/TBT for `/`, `/products`, `/category/kettles`, a product detail
page, and `/cart`, and writes full HTML reports to `./reports/`.

**What to expect, and why**, based on this architecture (verify with the
command above on your machine — treat any numbers not generated by your own
run, including in a README or case study, with appropriate skepticism):

- **Performance:** the architecture (server-rendered HTML, no client data
  fetching waterfall, self-hosted fonts, sized images, minimal JS) is
  designed to score in the high 90s on desktop and high 80s/90s on
  simulated mobile throttling. The most likely deduction is on mobile TBT,
  driven by the two "heaviest" client islands (`Wishlist` context and the
  product page's `Purchase panel`) — both are small (a few KB each) but not
  zero.
- **Accessibility:** should score at or near 100 given the semantic HTML,
  labeled controls, and contrast-checked palette described in
  [§7](#7-accessibility-decisions) — run `axe DevTools` alongside Lighthouse
  to catch anything Lighthouse's static audit can't (e.g. focus order during
  actual keyboard navigation of the mobile dialog).
- **Best Practices:** should score 100 — no console errors, no
  insecure/mixed content, correct image aspect ratios, no deprecated APIs.
- **SEO:** should score 100 — every page has a title/description, canonical
  URL, and crawlable server-rendered content; `robots.txt` and
  `sitemap.xml` are generated correctly (verify at `/robots.txt` and
  `/sitemap.xml` once deployed).
- **Core Web Vitals field data** (as opposed to this lab data) can only be
  gathered from real traffic — once deployed, wire up
  `NEXT_PUBLIC_ENABLE_VITALS=true` and inspect the `/api/vitals` logs, or
  view the CrUX report in Vercel Speed Insights / Google Search Console
  after the site has meaningful traffic.

## 12. What could be improved next

Roughly in priority order:

1. **Automated tests.** Add Vitest + React Testing Library for
   `src/lib` (cart totals math, checkout validation, search/sort logic —
   all pure functions, easy to unit test) and Playwright for 3–4 critical
   end-to-end flows (add to cart → checkout → confirmation; search with no
   results; toggle theme; mobile nav keyboard navigation).
2. **Partial Prerendering (PPR).** Once stable in a Next.js release, PPR
   would let the static parts of every page (everything except the
   cookie-dependent cart badge) be served from a static, edge-cached shell
   while only the cart badge itself streams in dynamically — recovering both
   the CDN-cacheable-HTML benefit and correct `404` status codes on unknown
   product/category slugs that the current cookie-in-header design gives up
   (see [§6](#6-trade-offs) for the precise mechanism).
3. **A real database and payment processor.** Swap `src/lib/data/products.ts`
   for a real database (the function signatures wouldn't need to change) and
   `src/lib/actions/checkout-actions.ts` for a real Stripe/Braintree
   integration with webhook-driven order state instead of a synchronous
   in-memory write.
4. **Real product photography** (or AI-generated photoreal imagery, with
   appropriate rights) in place of the generated SVG placeholders, once a
   real brand shoot exists.
5. **Internationalization.** The App Router's `[locale]` segment pattern
   would let this scale to multiple languages/currencies without disturbing
   the existing route structure.
6. **A visual regression suite** (e.g. Chromatic/Percy) to catch unintended
   design-system drift as the component library grows.
7. **Rate limiting on Server Actions** (e.g. via Upstash) before this ever
   saw real traffic, since Server Actions are public HTTP endpoints under
   the hood.
