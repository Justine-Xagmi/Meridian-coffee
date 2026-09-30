import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container-page py-4">
      <Skeleton className="mb-4 h-4 w-40" />
      <Skeleton className="h-9 w-60" />
      <Skeleton className="mt-3 h-4 w-96 max-w-full" />
      <div className="mt-8">
        <Skeleton className="mb-8 h-10 w-full" />
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
}
