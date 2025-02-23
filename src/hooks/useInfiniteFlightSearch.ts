import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFlights } from '@/api/flight';
import { FlightSearchParams, FlightSearchResponse } from '@/types/flight';
import { parseMoreUrl } from '@/lib/parse-flight-params';

export function useInfiniteFlightSearch(initialParams: FlightSearchParams) {
  return useInfiniteQuery<FlightSearchResponse, Error>({
    queryKey: ['flights', initialParams],
    queryFn: ({ pageParam = initialParams }) => fetchFlights(pageParam as FlightSearchParams),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return parseMoreUrl(lastPage.moreURL);
      }
      return undefined;
    },
    initialPageParam: initialParams,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}