import fetchAirports from '@/api/airports';
import { useQuery } from '@tanstack/react-query';

function useAirports() {
  return useQuery({
    queryKey: ['airports'],
    queryFn: fetchAirports,
    staleTime: Infinity,
  });
}

export default useAirports;
