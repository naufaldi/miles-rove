import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFlights } from '@/api/flight';
import { FlightSearchParams } from '@/types/flight';
import { SearchResponseSchema, ValidatedSearchResponse } from '@/schema/flight';

export function useInfiniteFlightSearch(initialParams: FlightSearchParams) {
  return useInfiniteQuery<ValidatedSearchResponse>({
    queryKey: ['flights', initialParams],
    queryFn: async ({ pageParam = initialParams }) => {
      const response = await fetchFlights(pageParam as FlightSearchParams);
      return SearchResponseSchema.parse(response);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore && lastPage.cursor) {
        return {
          ...initialParams,
          cursor: lastPage.cursor,
          skip: lastPage.count,
        };
      }
      return undefined;
    },
    initialPageParam: initialParams,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
