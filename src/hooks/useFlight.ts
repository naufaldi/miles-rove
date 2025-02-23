import { fetchFlights } from '@/api/flight';
import { FlightSearchParams } from '@/types/flight';
import { useQuery } from '@tanstack/react-query';

interface UseFlightSearchOptions {
  enabled?: boolean;
}

export function useFlightSearch(
  params: FlightSearchParams,
  options: UseFlightSearchOptions = {}
) {
  return useQuery({
    queryKey: ['flights', params],
    queryFn: () => fetchFlights(params),
    staleTime: 5 * 60 * 1000,
    // placeholderData: (prev) => prev,
    enabled:
      options.enabled &&
      Boolean(params.originAirport && params.destinationAirport),
    retry: 1,
  });
}
