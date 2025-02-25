import { FlightSearchParams, FlightSearchResponse } from '@/types/flight';

export async function fetchFlights(
  params: FlightSearchParams
): Promise<FlightSearchResponse> {
  if (!params.originAirport || !params.destinationAirport) {
    return {
      data: [],
      count: 0,
      hasMore: false,
      moreURL: '',
      cursor: 0,
    };
  }

  const searchParams = new URLSearchParams({
    origin_airport: params.originAirport,
    destination_airport: params.destinationAirport,
    take: params.take?.toString() || '20',
    ...(params.skip && { skip: params.skip.toString() }),
    ...(params.cursor && { cursor: params.cursor.toString() }),
    ...(params.startDate && { start_date: params.startDate }),
    ...(params.endDate && { end_date: params.endDate }),
    ...(params.orderBy && { order_by: params.orderBy }),
  });

  const response = await fetch(`/api/flights?${searchParams}`);

  if (!response.ok) {
    throw new Error('Failed to fetch flights');
  }

  return response.json();
}
