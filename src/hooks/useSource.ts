import fetchSources from '@/api/source';
import { useQuery } from '@tanstack/react-query';

function useSources() {
  return useQuery({
    queryKey: ['sources'],
    queryFn: fetchSources,
    staleTime: Infinity,
  });
}

export default useSources;
