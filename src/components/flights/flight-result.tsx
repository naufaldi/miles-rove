import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


import type { FlightResult } from "@/types"


import { CabinClass, cabinLabels, FlightSearchParams } from '@/types/flight';

import FlightSkeleton from "@/components/flights/skeleton"

import { EmptyState } from "./empty-state"
import { useCallback, useRef, useState, useMemo } from "react"
import { useInfiniteFlightSearch } from "@/hooks/useInfiniteFlightSearch"
import FlightCard from "./card/flight-card"
import SourceFilter from "./filter/source";

interface FlightResultsProps {
  isLoading: boolean
  flights: FlightResult[]
  searchParams: FlightSearchParams
  onSortChange: (orderBy: "default" | "lowest_mileage") => void
  onCabinChange: (cabin: CabinClass) => void
}


export function FlightResults({ isLoading, flights: initialFlights, searchParams, onSortChange, onCabinChange }: FlightResultsProps) {
  const [selectedSource, setSelectedSource] = useState('all');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteFlightSearch(searchParams);


  const observer = useRef<IntersectionObserver | null>(null);
  const lastFlightElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const flights = data?.pages.flatMap(page => page.data) || initialFlights;
  const selectedCabin = searchParams.cabin || "all";

  const availableFlights = useMemo(() =>
    flights.filter((flight) =>
      (selectedCabin === "all" || flight[`${selectedCabin}Available`]) &&
      (selectedSource === 'all' || flight.Source === selectedSource)
    ),
    [flights, selectedCabin, selectedSource]
  );

  if (isLoading) {
    return <FlightSkeleton />;
  }

  if (!flights?.length && !isLoading) {
    return <EmptyState searchParams={searchParams} />;
  }

  if (error) {
    return (
      <div className="mt-8 text-center space-y-4" role="alert" aria-live="assertive">
        <div className="text-red-500">
          <p className="text-lg font-semibold">Error loading flights</p>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }

  if (isLoading && !availableFlights.length) {
    return <FlightSkeleton />;
  }

  return (
    <div className="mt-8">
      <div
        className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        aria-live="polite"
      >
        <h2 className="text-xl font-semibold">{availableFlights.length} flights found</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <SourceFilter selectedSource={selectedSource} onSourceChange={setSelectedSource} />

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
      <div
        className="space-y-4"
        role="region"
        aria-label="Flight search results"
      >
        {availableFlights.length > 0 ? availableFlights.map((flight, index) => {
          if (availableFlights.length === index + 1) {
            return (
              <FlightCard key={flight.ID} flight={flight} selectedCabin={selectedCabin} ref={lastFlightElementRef} />
            );
          } else {
            return (
              <FlightCard key={flight.ID} flight={flight} selectedCabin={selectedCabin} />
            );
          }
        }) : (
          <div className="mt-8 text-center space-y-4">
            <div className="text-gray-500">
              <p className="text-lg font-semibold">No {cabinLabels[selectedCabin as CabinClass]} seats available</p>
            </div>
          </div>
        )}
        {isFetchingNextPage && (
          <div aria-live="polite" aria-label="Loading more flights">
            <FlightSkeleton />
          </div>
        )}
      </div>
    </div>
  )
}

