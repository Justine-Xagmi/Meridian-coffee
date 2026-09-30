import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCart, cartTotals } from '@/lib/cart';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { CheckoutReviewList } from '@/components/checkout/checkout-review-list';
import { OrderSummary } from '@/components/cart/order-summary';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  const items = getCart();
  if (items.length === 0) redirect('/cart');

  const totals = cartTotals(items);

  return (
    <div className="container-page py-4">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="font-display text-lg text-ink">Shipping details</h2>
          <div className="mt-4">
            <CheckoutForm />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-display text-lg text-ink">Order review</h2>
            <div className="mt-4">
              <CheckoutReviewList items={items} />
            </div>
          </div>
          <OrderSummary {...totals} showFreeShippingNudge={false} />
        </div>
      </div>
    </div>
  );
}
