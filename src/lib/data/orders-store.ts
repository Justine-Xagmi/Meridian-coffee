import 'server-only';
import type { Order } from '@/lib/types';

// In-memory order store for demo purposes only.
// In production this would be a database (e.g. Postgres via Prisma) or your
// commerce/payment platform's order object (Stripe, Shopify, etc).
// `globalThis` is used so the store survives Next.js dev-mode module reloads.

declare global {
  // eslint-disable-next-line no-var
  var __meridianOrders: Map<string, Order> | undefined;
}

const store: Map<string, Order> = globalThis.__meridianOrders ?? new Map();
if (process.env.NODE_ENV !== 'production') {
  globalThis.__meridianOrders = store;
}

export function saveOrder(order: Order): void {
  store.set(order.id, order);
}

export function getOrder(id: string): Order | undefined {
  return store.get(id);
}
