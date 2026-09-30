import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container-page py-16">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="mt-4 h-4 w-2/3" />
    </div>
  );
}
