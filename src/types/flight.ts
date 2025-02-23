import { FlightResult } from '@/types';

export interface FlightSearchParams {
  originAirport: string;
  destinationAirport: string;
  take?: number;
  skip?: number;
  cursor?: number;
  startDate?: string;
  endDate?: string;
  orderBy?: 'default' | 'lowest_mileage';
}

export interface FlightSearchResponse {
  data: FlightResult[];
  count: number;
  hasMore: boolean;
  moreURL: string;
  cursor: number;
}

export const cabinVariants = {
  Y: 'economy',
  W: 'premiumEconomy',
  J: 'business',
  F: 'first',
} as const;

export const cabinLabels = {
  Y: 'Economy',
  W: 'Premium Economy',
  J: 'Business',
  F: 'First',
} as const;
