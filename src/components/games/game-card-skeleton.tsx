import { Skeleton } from "@/components/ui/skeleton";

export function GameCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#1a1a1a]">
      <Skeleton className="aspect-[4/3] w-full rounded-none bg-[#222]" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-2/3 bg-[#222]" />
        <Skeleton className="h-3 w-1/2 bg-[#222]" />
      </div>
    </div>
  );
}
