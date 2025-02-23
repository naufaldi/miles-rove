import { FlightResult } from '@/types';

export interface FlightSearchParams {
  originAirport: string;
  destinationAirport: string;
  take?: number;
  skip?: number;
  cursor?: number;
  startDate?: string;
  endDate?: string;
}

export interface FlightSearchResponse {
  data: FlightResult[];
  count: number;
  hasMore: boolean;
  moreURL: string;
  cursor: number;
}
