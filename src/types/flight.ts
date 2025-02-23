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
  cabin?: CabinClass | null;
}

export interface FlightSearchResponse {
  data: FlightResult[];
  count: number;
  hasMore: boolean;
  moreURL: string;
  cursor: number;
}

export const CabinClass = {
  Y: 'Y',
  W: 'W',
  J: 'J',
  F: 'F',
} as const;

export type CabinClass = (typeof CabinClass)[keyof typeof CabinClass];

export const cabinLabels: Record<CabinClass, string> = {
  [CabinClass.Y]: 'Economy',
  [CabinClass.W]: 'Premium Economy',
  [CabinClass.J]: 'Business',
  [CabinClass.F]: 'First',
} as const;

export const cabinVariants: Record<
  CabinClass,
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'economy'
  | 'premiumEconomy'
  | 'business'
  | 'first'
> = {
  [CabinClass.Y]: 'economy',
  [CabinClass.W]: 'premiumEconomy',
  [CabinClass.J]: 'business',
  [CabinClass.F]: 'first',
} as const;
