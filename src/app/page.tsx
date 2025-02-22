"use client"


import { useState } from "react"
import { FlightResult, OrderBy } from "@/types"
import { SearchForm } from "@/components/flights/search-form"
import { FlightResults } from "@/components/flights/flight-result"
import { generateDummyFlights } from "@/data/dummyData"

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [flights, setFlights] = useState<FlightResult[]>([])
  const [error, setError] = useState("")

  const handleSearch = async (searchData: {
    origin: string
    destination: string
    startDate: string
    endDate: string
    orderBy: OrderBy
  }) => {
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      try {
        const dummyFlights = generateDummyFlights(searchData)

        // Sort based on orderBy parameter
        if (searchData.orderBy === "lowest_mileage") {
          dummyFlights.sort((a, b) => {
            const aPrice = Math.min(
              Number.parseInt(a.YMileageCost || "999999"),
              Number.parseInt(a.WMileageCost || "999999"),
              Number.parseInt(a.JMileageCost || "999999"),
              Number.parseInt(a.FMileageCost || "999999"),
            )
            const bPrice = Math.min(
              Number.parseInt(b.YMileageCost || "999999"),
              Number.parseInt(b.WMileageCost || "999999"),
              Number.parseInt(b.JMileageCost || "999999"),
              Number.parseInt(b.FMileageCost || "999999"),
            )
            return aPrice - bPrice
          })
        }

        setFlights(dummyFlights)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch flights. Please try again.")
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Award Flight Search</h1>
        <SearchForm onSearch={handleSearch} />
        {error && <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">{error}</div>}
        <FlightResults isLoading={isLoading} flights={flights} />
      </div>
    </div>
  )
}

