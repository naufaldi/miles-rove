import { FC } from 'react';
import { CabinClass } from '@/types/flight';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, ArrowRight } from "lucide-react";
import { FormattedDate } from "@/components/ui/format-date";
import { formatAirlines, formatDistance } from "@/lib/utils";
import { CabinBadges } from "./cabin-badge";
import { AvailabilityText } from "./avaibility-text";
import { PriceDisplay } from "./price-display";
import { FlightResult } from '@/types';

interface FlightCardProps {
  flight: FlightResult;
  selectedCabin: CabinClass | "all";
  ref?: React.Ref<HTMLDivElement>;
}

const FlightCard: FC<FlightCardProps> = ({ flight, selectedCabin, ref }) => {
  // const hasAnyDirectFlight = (flight: FlightResult) =>
  //   Object.values(CabinClass).some(cabin => flight[`${cabin}Direct`]);

  // const isDirectFlight = (flight: FlightResult, cabin: CabinClass | "all") =>
  //   cabin === "all" ? hasAnyDirectFlight(flight) : flight[`${cabin}Direct`];

  const isDirectFlight = (flight: FlightResult, cabin: CabinClass | "all") =>
    cabin === "all" ? Object.values(CabinClass).some(cabin => flight[`${cabin}Direct`]) : flight[`${cabin}Direct`];

  return (
    <Card ref={ref}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            <span className="capitalize">{flight.Source}</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <CabinBadges flight={flight} selectedCabin={selectedCabin} />
            <Badge variant="outline">
              {formatDistance(flight.Route.Distance)}
            </Badge>
            <Badge variant={isDirectFlight(flight, selectedCabin) ? "default" : "secondary"}>
              {isDirectFlight(flight, selectedCabin) ? "Nonstop" : "Connection"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <div className="text-sm font-medium">Route</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="text-xl font-bold">{flight.Route.OriginAirport}</div>
              <ArrowRight className="h-4 w-4" />
              <div className="text-xl font-bold">{flight.Route.DestinationAirport}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedCabin === "all"
                ? formatAirlines(Object.entries(CabinClass)
                  .filter(([, cabin]) => flight[`${cabin}Available`])
                  .map(([, cabin]) => flight[`${cabin}Airlines`])
                  .filter(Boolean)
                  .join(', '))
                : formatAirlines(flight[`${selectedCabin}Airlines`])}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Date</div>
            <div className="mt-1">
              <FormattedDate
                date={flight.Date}
                className="text-xl font-bold"
              />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Availability</div>
            <div className="mt-1">
              <AvailabilityText flight={flight} selectedCabin={selectedCabin} />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Price</div>
            <div className="mt-1">
              <PriceDisplay flight={flight} selectedCabin={selectedCabin} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;