import { FlightResult } from "@/types";
import { CabinClass } from "@/types/flight";

interface PriceDisplayProps {
  flight: FlightResult;
  selectedCabin: CabinClass | "all";
}

export function PriceDisplay({ flight, selectedCabin }: PriceDisplayProps) {
  if (selectedCabin === "all") {
    return (
      <div className="text-xl font-bold">
        -
      </div>
    );
  }

  return (
    <>
      <div className="text-xl font-bold">
        {Number.parseInt(flight[`${selectedCabin}MileageCost`] || "0").toLocaleString()} miles
      </div>
      {flight[`${selectedCabin}TotalTaxes`] > 0 && (
        <div className="text-sm text-muted-foreground">
          + {flight[`${selectedCabin}TotalTaxes`].toLocaleString()}
          {flight.TaxesCurrency ? ` ${flight.TaxesCurrency}` : ''} taxes
        </div>
      )}
    </>
  );
}