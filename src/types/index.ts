export interface Route {
  ID: string;
  OriginAirport: string;
  OriginRegion: string;
  DestinationAirport: string;
  DestinationRegion: string;
  NumDaysOut: number;
  Distance: number;
  Source: string;
}

export interface FlightResult {
  ID: string;
  Route: Route;
  Date: string;
  Source: string;
  YAvailable: boolean;
  WAvailable: boolean;
  JAvailable: boolean;
  FAvailable: boolean;
  YMileageCost: string;
  WMileageCost: string;
  JMileageCost: string;
  FMileageCost: string;
  TaxesCurrency: string;
  YTotalTaxes: number;
  WTotalTaxes: number;
  JTotalTaxes: number;
  FTotalTaxes: number;
  YDirect: boolean;
  WDirect: boolean;
  JDirect: boolean;
  FDirect: boolean;
  YAirlines: string;
  WAirlines: string;
  JAirlines: string;
  FAirlines: string;
  YRemainingSeats: number;
  WRemainingSeats: number;
  JRemainingSeats: number;
  FRemainingSeats: number;
}

export interface SearchResponse {
  data: FlightResult[];
  count: number;
  hasMore: boolean;
  moreURL: string;
  cursor: number;
}

export type CabinClass = 'Y' | 'W' | 'J' | 'F';

export type OrderBy = 'default' | 'lowest_mileage';

export interface SearchParams {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  orderBy: OrderBy;
}
