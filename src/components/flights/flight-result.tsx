import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"
import { Plane, ArrowRight } from "lucide-react"
import type { FlightResult, CabinClass } from "@/types"
import { useState } from "react"
import { FormattedDate } from "@/components/ui/format-date"
import { formatAirlines, formatDistance } from "@/lib/utils"
import { cabinLabels, cabinVariants, FlightSearchParams } from "@/types/flight"
import FlightSkeleton from "@/components/flights/skeleton"

interface FlightResultsProps {
  isLoading: boolean
  flights: FlightResult[]
  searchParams: FlightSearchParams
  onSortChange: (orderBy: "default" | "lowest_mileage") => void
}

export function FlightResults({ isLoading, flights, searchParams, onSortChange }: FlightResultsProps) {
  const [selectedCabin, setSelectedCabin] = useState<CabinClass>("Y")
  const [sortBy, setSortBy] = useState<"price" | "source">("price")

  if (isLoading) {
    return (
      <FlightSkeleton />
    )
  }

  if (!flights?.length && !isLoading) {
    return (
      <div className="mt-8 text-center space-y-4">
        <div className="text-gray-500">
          {searchParams &&
            (searchParams.originAirport || searchParams.destinationAirport) ? (
            <p className="text-lg font-semibold">
              No flights found
              {searchParams.originAirport && (
                <> from <span className="font-bold">{searchParams.originAirport}</span></>
              )}
              {searchParams.destinationAirport && (
                <> to <span className="font-bold">{searchParams.destinationAirport}</span></>
              )}
              {searchParams.startDate && (
                <> on <FormattedDate
                  date={searchParams.startDate}
                  className="font-bold"
                /></>
              )}
              {searchParams.endDate && (
                <> to <FormattedDate
                  date={searchParams.endDate}
                  className="font-bold"
                /></>
              )}
            </p>
          ) : (
            <>
              <p className="text-lg font-semibold">Ready to search flights</p>
              <p className="text-sm mt-2">Use the search form above to find available flights</p>
            </>
          )}
        </div>
      </div>
    )
  }




  const availableFlights = flights.filter((flight) => flight[`${selectedCabin}Available`])



  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{availableFlights.length} flights found</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={selectedCabin} onValueChange={(value) => setSelectedCabin(value as CabinClass)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Cabin Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Y">Economy</SelectItem>
              <SelectItem value="W">Premium Economy</SelectItem>
              <SelectItem value="J">Business</SelectItem>
              <SelectItem value="F">First</SelectItem>
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
                  <Badge variant={cabinVariants[selectedCabin]}>
                    {cabinLabels[selectedCabin]}
                  </Badge>
                  <Badge variant="outline">
                    {formatDistance(flight.Route.Distance)}
                  </Badge>
                  <Badge variant={flight[`${selectedCabin}Direct`] ? "default" : "secondary"}>
                    {flight[`${selectedCabin}Direct`] ? "Nonstop" : "Connection"}
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
                    {formatAirlines(flight[`${selectedCabin}Airlines`])}
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
                    <div className="text-xl font-bold">
                      {flight[`${selectedCabin}RemainingSeats`] > 0
                        ? `${flight[`${selectedCabin}RemainingSeats`]} seats`
                        : flight[`${selectedCabin}Available`]
                          ? "Available"
                          : "Not Available"}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Price</div>
                  <div className="mt-1">
                    <div className="text-xl font-bold">
                      {Number.parseInt(flight[`${selectedCabin}MileageCost`] || "0").toLocaleString()} miles
                    </div>
                    {flight[`${selectedCabin}TotalTaxes`] > 0 && (
                      <div className="text-sm text-muted-foreground">
                        + {flight[`${selectedCabin}TotalTaxes`].toLocaleString()}
                        {flight.TaxesCurrency ? ` ${flight.TaxesCurrency}` : ''} taxes
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="mt-8 text-center space-y-4">
            <div className="text-gray-500">
              <p className="text-lg font-semibold">No {cabinLabels[selectedCabin]} seats available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

