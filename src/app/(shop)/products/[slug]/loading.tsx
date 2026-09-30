import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <div className="container-page">
        <Skeleton className="my-4 h-4 w-52" />
      </div>
      <div className="container-page grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
        <div>
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="mt-3 h-4 w-1/2" />
          <Skeleton className="mt-6 h-12 w-full rounded-full" />
          <Skeleton className="mt-4 h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
