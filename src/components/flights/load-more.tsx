import { Button } from "@/components/ui/button";
import FlightSkeleton from "@/components/flights/skeleton";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect } from "react";

interface LoadMoreTriggerProps {
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  isFetchingMore: boolean;
  error?: Error | null;
}

export function LoadMoreTrigger({
  onLoadMore,
  hasMore,
  isFetchingMore,
  error
}: LoadMoreTriggerProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    enabled: hasMore && !isFetchingMore && !error
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !isFetchingMore) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, isFetchingMore, onLoadMore]);

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-2">Failed to load more flights</p>
        <Button variant="outline" onClick={() => onLoadMore()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div ref={ref} className="p-4">
      {isFetchingMore && (
        <div className="space-y-4">
          <FlightSkeleton />
          <FlightSkeleton />
        </div>
      )}
    </div>
  );
}