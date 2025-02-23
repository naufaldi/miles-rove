"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { OrderBy } from "@/types"
import { formSearchSchema } from "@/schema/flight"
import { MultipleSelector } from "@/components/ui/multi-select"
import useAirports from "@/hooks/useAirports"




interface SearchFormProps {
  onSearch: (data: {
    origin: string
    destination: string
    startDate: string
    endDate: string
    orderBy: OrderBy
  }) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const form = useForm<z.infer<typeof formSearchSchema>>({
    resolver: zodResolver(formSearchSchema),
    defaultValues: {
      origin: [],
      destination: [],
      orderBy: "default",
    },
  })

  const { data: airports = [] } = useAirports()


  const airportOptions = airports.map(airport => ({
    code: airport.code,
    name: `${airport.city} ${airport.code} - ${airport.name}`
  }))

  function onSubmit(values: z.infer<typeof formSearchSchema>) {

    onSearch({
      origin: values.origin.join(','),
      destination: values.destination.join(','),
      startDate: format(values.startDate, "yyyy-MM-dd"),
      endDate: format(values.endDate, "yyyy-MM-dd"),
      orderBy: values.orderBy,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <MultipleSelector
                  name="origin"
                  label="Origin Airports"
                  options={airportOptions}
                  value={field.value || []}
                  onChange={field.onChange}
                  error={form.formState.errors.origin?.message}
                  required
                  minItems={1}
                  maxItems={3}
                  placeholder="Select origin airports"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <MultipleSelector
                  name="destination"
                  label="Destination Airports"
                  options={airportOptions}
                  value={field.value || []}
                  onChange={field.onChange}
                  error={form.formState.errors.destination?.message}
                  required
                  minItems={1}
                  maxItems={3}
                  placeholder="Select destination airports"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("justify-start text-left font-normal cursor-pointer", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("justify-start text-left font-normal cursor-pointer", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const startDate = form.getValues("startDate")
                        return date < new Date() || date < new Date("1900-01-01") || (startDate && date < startDate)
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orderBy"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Sort Results</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} >
                  <FormControl>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select sort order" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="default">Best Available</SelectItem>
                    <SelectItem value="lowest_mileage">Lowest Miles</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full md:w-auto cursor-pointer">
          Search Flights
        </Button>
      </form>
    </Form>
  )
}

