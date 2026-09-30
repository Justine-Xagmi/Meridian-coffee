import type { Metadata } from 'next';
import { getCart, cartTotals } from '@/lib/cart';
import { clearCartAction } from '@/lib/actions/cart-actions';
import { CartItemRow } from '@/components/cart/cart-item-row';
import { OrderSummary } from '@/components/cart/order-summary';
import { EmptyState } from '@/components/ui/empty-state';
import { ButtonLink } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Your Cart',
  robots: { index: false, follow: false },
};

export default function CartPage() {
  const items = getCart();
  const totals = cartTotals(items);

  return (
    <div className="container-page py-4">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Your Cart</h1>

      {items.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Your cart is empty"
            description="Browse the catalog and add something to your cart to see it here."
            action={<ButtonLink href="/products">Continue shopping</ButtonLink>}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {items.map((item) => (
                <CartItemRow key={`${item.productId}-${item.variantId}`} item={item} />
              ))}
            </ul>
            <form action={clearCartAction} className="mt-4">
              <button type="submit" className="focus-ring text-sm text-muted underline-offset-2 hover:text-danger hover:underline">
                Clear cart
              </button>
            </form>
          </div>

          <div>
            <OrderSummary {...totals} />
            <ButtonLink href="/checkout" size="lg" className="mt-4 w-full">
              Proceed to checkout
            </ButtonLink>
            <ButtonLink href="/products" variant="ghost" size="md" className="mt-2 w-full">
              Continue shopping
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  );
}
