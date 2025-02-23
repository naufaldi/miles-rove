import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFlights } from '@/api/flight';
import { FlightSearchParams } from '@/types/flight';
import { parseMoreUrl } from '@/lib/parse-flight-params';
import { SearchResponseSchema, ValidatedSearchResponse } from '@/schema/flight';

export function useInfiniteFlightSearch(initialParams: FlightSearchParams) {
  return useInfiniteQuery<ValidatedSearchResponse>({
    queryKey: ['flights', initialParams],
    queryFn: async ({ pageParam = initialParams }) => {
      const response = await fetchFlights(pageParam as FlightSearchParams);

      try {
        const validatedData = SearchResponseSchema.parse(response);
        return validatedData;
      } catch (error) {
        console.error('Invalid response format:', error);
        throw new Error('Invalid response format from server');
      }
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore || lastPage.moreURL === false) {
        return undefined;
      }
      return parseMoreUrl(lastPage.moreURL);
    },
    initialPageParam: initialParams,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
