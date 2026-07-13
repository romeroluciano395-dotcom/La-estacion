import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-app py-16 sm:py-20">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="mt-5 h-14 w-72" />
      <Skeleton className="mt-4 h-6 w-full max-w-xl" />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-white/10 bg-card/40"
          >
            <Skeleton className="aspect-[16/10] w-full rounded-none" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 pt-3">
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
