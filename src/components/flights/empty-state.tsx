import { FormattedDate } from "@/components/ui/format-date";
import { FlightSearchParams } from "@/types/flight";

interface EmptyStateProps {
  searchParams?: FlightSearchParams;
}

export function EmptyState({ searchParams }: EmptyStateProps) {
  if (!searchParams?.originAirport && !searchParams?.destinationAirport) {
    return (
      <div className="mt-8 text-center space-y-4">
        <div className="text-gray-500">
          <p className="text-lg font-semibold">Ready to search flights</p>
          <p className="text-sm mt-2">Use the search form above to find available flights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 text-center space-y-4">
      <div className="text-gray-500">
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
      </div>
    </div>
  );
}