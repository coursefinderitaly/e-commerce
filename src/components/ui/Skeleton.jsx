export default function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-paper/10 rounded ${className}`} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-transparent rounded-lg overflow-hidden">
      <Skeleton className="w-full aspect-[3/4]" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
