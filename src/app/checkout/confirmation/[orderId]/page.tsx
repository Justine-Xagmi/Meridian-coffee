import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getOrder } from '@/lib/data/orders-store';
import { formatPrice, formatDate } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/button';
import { CheckoutReviewList } from '@/components/checkout/checkout-review-list';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { orderId: string };
}

export default function ConfirmationPage({ params }: PageProps) {
  const order = getOrder(params.orderId);
  if (!order) notFound();

  return (
    <div className="container-page max-w-2xl py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-5 font-display text-3xl text-ink sm:text-4xl">Order confirmed</h1>
      <p className="mt-2 text-sm text-muted">
        Thank you, {order.customer.name.split(' ')[0]}. A confirmation has been sent to {order.customer.email}.
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-6 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Order number</p>
            <p className="font-display text-lg text-ink">#{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-muted">Placed</p>
            <p className="text-sm text-ink">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="mt-4">
          <CheckoutReviewList items={order.items} />
        </div>

        <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="text-ink">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Shipping</dt>
            <dd className="text-ink">{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Tax</dt>
            <dd className="text-ink">{formatPrice(order.tax)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-2 text-base font-medium text-ink">
            <dt>Total</dt>
            <dd>{formatPrice(order.total)}</dd>
          </div>
        </dl>

        <div className="mt-4 border-t border-line pt-4 text-sm text-muted">
          <p className="font-medium text-ink">Shipping to</p>
          <p>{order.customer.address}</p>
          <p>
            {order.customer.city}, {order.customer.postalCode}
          </p>
          <p>{order.customer.country}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/products">Continue shopping</ButtonLink>
        <Link href="/" className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-line px-6 text-sm text-ink hover:bg-surface-2">
          Back to home
        </Link>
      </div>
    </div>
  );
}
