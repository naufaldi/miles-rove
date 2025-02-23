import { z } from 'zod';

export const formSearchSchema = z
  .object({
    origin: z
      .array(z.string())
      .min(1, 'Please select at least one origin airport'),
    destination: z
      .array(z.string())
      .min(1, 'Please select at least one destination airport'),
    startDate: z.date({
      required_error: 'Please select a start date',
    }),
    endDate: z.date({
      required_error: 'Please select an end date',
    }),
    orderBy: z.enum(['default', 'lowest_mileage'] as const).default('default'),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  })
  .refine(
    (data) => {
      return !data.origin.some((org) => data.destination.includes(org));
    },
    {
      message: 'Origin and destination airports cannot be the same',
      path: ['destination'],
    }
  );

export const FlightResultSchema = z.object({
  ID: z.string(),
  RouteID: z.string(),
  Route: z.object({
    ID: z.string(),
    OriginAirport: z.string(),
    OriginRegion: z.string(),
    DestinationAirport: z.string(),
    DestinationRegion: z.string(),
    NumDaysOut: z.number().default(0),
    Distance: z.number().default(0),
    Source: z.string(),
  }),
  Date: z.string(),
  ParsedDate: z.string(),
  YAvailable: z.boolean().default(true),
  WAvailable: z.boolean().default(true),
  JAvailable: z.boolean().default(true),
  FAvailable: z.boolean().default(true),
  YMileageCost: z.string(),
  WMileageCost: z.string(),
  JMileageCost: z.string(),
  FMileageCost: z.string(),
  YRemainingSeats: z.number().default(0),
  WRemainingSeats: z.number().default(0),
  JRemainingSeats: z.number().default(0),
  FRemainingSeats: z.number().default(0),
  YAirlines: z.string(),
  WAirlines: z.string(),
  JAirlines: z.string(),
  FAirlines: z.string(),
  YDirect: z.boolean().default(true),
  WDirect: z.boolean().default(true),
  JDirect: z.boolean().default(true),
  FDirect: z.boolean().default(true),
  Source: z.string(),
  CreatedAt: z.string(),
  UpdatedAt: z.string(),
  AvailabilityTrips: z.string().nullable(),
});

export const SearchResponseSchema = z.object({
  data: z.array(FlightResultSchema),
  count: z.number().default(0),
  hasMore: z.boolean().default(true),
  cursor: z.number().default(0),
});
// Type inference from schema
export type ValidatedFlightResult = z.infer<typeof FlightResultSchema>;
export type ValidatedSearchResponse = z.infer<typeof SearchResponseSchema>;

export type FlightSearchForm = z.infer<typeof formSearchSchema>;
