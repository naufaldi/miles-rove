import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"
import { Plane, ArrowRight } from "lucide-react"
import type { FlightResult } from "@/types"

import { FormattedDate } from "@/components/ui/format-date"
import { formatAirlines, formatDistance } from "@/lib/utils"
import { CabinClass, cabinLabels, cabinVariants, FlightSearchParams } from '@/types/flight';

import FlightSkeleton from "@/components/flights/skeleton"
import { AvailabilityText } from "./avaibility-text"
import { PriceDisplay } from "./price-display"
import { CabinBadges } from "./cabin-badge"
import { EmptyState } from "./empty-state"

interface FlightResultsProps {
  isLoading: boolean
  flights: FlightResult[]
  searchParams: FlightSearchParams
  onSortChange: (orderBy: "default" | "lowest_mileage") => void
  onCabinChange: (cabin: CabinClass) => void
}

export function FlightResults({ isLoading, flights, searchParams, onSortChange, onCabinChange }: FlightResultsProps) {
  const selectedCabin = searchParams.cabin || "all";
  if (isLoading) {
    return (
      <FlightSkeleton />
    )
  }

  if (!flights?.length && !isLoading) {
    return <EmptyState searchParams={searchParams} />;
  }




  const availableFlights = selectedCabin === "all"
    ? flights
    : flights.filter((flight) => flight[`${selectedCabin}Available`]);

  const hasAnyDirectFlight = (flight: FlightResult) =>
    Object.values(CabinClass).some(cabin => flight[`${cabin}Direct`]);

  const isDirectFlight = (flight: FlightResult, cabin: CabinClass | "all") =>
    cabin === "all" ? hasAnyDirectFlight(flight) : flight[`${cabin}Direct`];


  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{availableFlights.length} flights found</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select
            value={selectedCabin}
            onValueChange={onCabinChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Cabins" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cabins</SelectItem>
              <SelectItem value={CabinClass.Y}>{cabinLabels[CabinClass.Y]}</SelectItem>
              <SelectItem value={CabinClass.W}>{cabinLabels[CabinClass.W]}</SelectItem>
              <SelectItem value={CabinClass.J}>{cabinLabels[CabinClass.J]}</SelectItem>
              <SelectItem value={CabinClass.F}>{cabinLabels[CabinClass.F]}</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={searchParams.orderBy || "default"}
            onValueChange={(value: "default" | "lowest_mileage") => onSortChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Best Available</SelectItem>
              <SelectItem value="lowest_mileage">Lowest Miles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {availableFlights.length > 0 ? availableFlights.map((flight) => (
          <Card key={flight.ID}>
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
        )) : (
          <div className="mt-8 text-center space-y-4">
            <div className="text-gray-500">
              <p className="text-lg font-semibold">No {cabinLabels[selectedCabin as CabinClass]} seats available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

