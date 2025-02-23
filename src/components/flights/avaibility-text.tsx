import { FlightResult } from "@/types";
import { CabinClass, cabinLabels } from "@/types/flight";

interface AvailabilityTextProps {
  flight: FlightResult;
  selectedCabin: CabinClass | "all";
}

const formatCabinAvailability = (flight: FlightResult, cabin: CabinClass) => {
  if (!flight[`${cabin}Available`]) return null;

  const seats = flight[`${cabin}RemainingSeats`];
  if (seats > 0) {
    return `${seats} seats`;
  }

  return "Available";
};

export function AvailabilityText({ flight, selectedCabin }: AvailabilityTextProps) {
  if (selectedCabin === "all") {
    return (
      <div className="flex flex-col gap-1 text-sm">
        {Object.entries(cabinLabels)
          .filter(([cabin]) => flight[`${cabin}Available` as keyof FlightResult])
          .map(([cabin, label]) => (
            <p key={cabin} className="flex items-center gap-2">
              <span className="font-bold">{label}:</span>
              <span>{formatCabinAvailability(flight, cabin as CabinClass)}</span>
            </p>
          ))}
      </div>
    );
  }

  return (
    <div className="text-lg font-bold">
      {formatCabinAvailability(flight, selectedCabin)}
    </div>
  );
}