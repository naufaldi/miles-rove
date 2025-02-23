import { FlightResult } from "@/types";
import { CabinClass, cabinLabels, cabinVariants } from "@/types/flight";
import { Badge } from "@/components/ui/badge";

interface CabinBadgesProps {
  flight: FlightResult;
  selectedCabin: CabinClass | "all";
}

export function CabinBadges({ flight, selectedCabin }: CabinBadgesProps) {
  if (selectedCabin === "all") {
    return (
      <div className="flex items-center gap-2">
        {Object.entries(cabinLabels)
          .filter(([cabin]) => flight[`${cabin}Available` as keyof FlightResult])
          .map(([cabin, label]) => (
            <Badge key={cabin} variant={cabinVariants[cabin as CabinClass]}>
              {label}
            </Badge>
          ))}
      </div>
    );
  }

  return flight[`${selectedCabin}Available`] ? (
    <div className="flex items-center gap-2">
      <Badge variant={cabinVariants[selectedCabin]}>
        {cabinLabels[selectedCabin]}
      </Badge>
    </div>
  ) : null;
}