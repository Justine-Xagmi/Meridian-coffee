import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container-page py-4">
      <Skeleton className="mb-4 h-4 w-40" />
      <Skeleton className="h-9 w-40" />
      <Skeleton className="mt-5 h-10 w-full max-w-md rounded-full" />
      <div className="mt-10">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
