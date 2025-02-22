import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Plane, ArrowRight } from "lucide-react"
import type { FlightResult, CabinClass } from "@/types"
import { useState } from "react"
import { FormattedDate } from "@/components/ui/format-date"

interface FlightResultsProps {
  isLoading: boolean
  flights: FlightResult[]
}

export function FlightResults({ isLoading, flights }: FlightResultsProps) {
  const [selectedCabin, setSelectedCabin] = useState<CabinClass>("Y")
  const [sortBy, setSortBy] = useState<"price" | "source">("price")

  if (isLoading) {
    return (
      <div className="mt-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (flights.length === 0) {
    return null
  }

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "price") {
      const aPrice = Number.parseInt(a[`${selectedCabin}MileageCost`] || "0")
      const bPrice = Number.parseInt(b[`${selectedCabin}MileageCost`] || "0")
      return aPrice - bPrice
    }
    return a.Source.localeCompare(b.Source)
  })

  const availableFlights = sortedFlights.filter((flight) => flight[`${selectedCabin}Available`])

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
          <Select value={sortBy} onValueChange={(value: "price" | "source") => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Sort by Price</SelectItem>
              <SelectItem value="source">Sort by Program</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {availableFlights.map((flight) => (
          <Card key={flight.ID}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  <span className="capitalize">{flight.Source}</span>
                </CardTitle>
                <Badge variant={flight[`${selectedCabin}Direct`] ? "default" : "secondary"}>
                  {flight[`${selectedCabin}Direct`] ? "Nonstop" : "Connection"}
                </Badge>
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
                  <div className="text-sm text-muted-foreground">{flight[`${selectedCabin}Airlines`]}</div>
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
                        : "Available"}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Price</div>
                  <div className="mt-1">
                    <div className="text-xl font-bold">
                      {Number.parseInt(flight[`${selectedCabin}MileageCost`]).toLocaleString()} miles
                    </div>
                    {flight[`${selectedCabin}TotalTaxes`] > 0 && (
                      <div className="text-sm text-muted-foreground">
                        + {flight[`${selectedCabin}TotalTaxes`].toLocaleString()} {flight.TaxesCurrency} taxes
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

