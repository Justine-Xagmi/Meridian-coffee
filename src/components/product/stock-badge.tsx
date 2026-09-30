import { Badge } from '@/components/ui/badge';

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <Badge tone="danger">Out of stock</Badge>;
  if (stock <= 5) return <Badge tone="accent">Only {stock} left</Badge>;
  return <Badge tone="success">In stock</Badge>;
}
