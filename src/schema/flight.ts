import { z } from 'zod';

export const formSearchSchema = z
  .object({
    origin: z.array(z.string()).min(1, 'Please select at least one origin airport'),
    destination: z.array(z.string()).min(1, 'Please select at least one destination airport'),
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
     
      return !data.origin.some(org => data.destination.includes(org));
    },
    {
      message: 'Origin and destination airports cannot be the same',
      path: ['destination'],
    }
  );


export type FlightSearchForm = z.infer<typeof formSearchSchema>;