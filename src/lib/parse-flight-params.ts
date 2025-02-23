import { FlightSearchParams } from '@/types/flight';

export function parseMoreUrl(moreUrl: string): FlightSearchParams {
  const url = new URL(moreUrl, window.location.origin);
  const params = url.searchParams;

  return {
    originAirport: params.get('origin_airport') || '',
    destinationAirport: params.get('destination_airport') || '',
    take: params.get('take') ? parseInt(params.get('take') as string, 10) : 20,
    skip: params.get('skip')
      ? parseInt(params.get('skip') as string, 10)
      : undefined,
    cursor: params.get('cursor')
      ? parseInt(params.get('cursor') as string, 10)
      : undefined,
    startDate: params.get('start_date') || undefined,
    endDate: params.get('end_date') || undefined,
  };
}
