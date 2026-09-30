import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-48 w-full rounded-none sm:h-64" />
      <div className="container-page py-4">
        <Skeleton className="mb-4 h-4 w-40" />
        <Skeleton className="h-4 w-96 max-w-full" />
        <div className="mt-8">
          <Skeleton className="mb-8 h-10 w-full" />
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    </div>
  );
}
