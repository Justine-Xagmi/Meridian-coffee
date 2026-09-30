import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container-page py-4">
      <Skeleton className="mb-4 h-4 w-32" />
      <Skeleton className="h-9 w-48" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6 border-y border-line py-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-24 w-24 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    </div>
  );
}
