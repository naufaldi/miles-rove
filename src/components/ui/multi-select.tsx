"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface Option {
  code: string
  name: string
}

interface MultipleSelectorProps {
  options: Option[]
  value: string[] // Changed to string array
  onChange: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  maxItems?: number
  minItems?: number
  className?: string
  disabled?: boolean
  required?: boolean
  name?: string
  label: string
  error?: string
  showValidation?: boolean
}

export function MultipleSelector({
  options,
  value,
  onChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search items...",
  emptyMessage = "No items found.",
  maxItems,
  minItems = 1,
  className,
  disabled = false,
  required = false,
  name,
  label,
  error,
  showValidation = false
}: MultipleSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [inputValue, setInputValue] = React.useState("")

  const handleSelect = (itemCode: string) => {
    const newValue = value.includes(itemCode)
      ? value.filter((item) => item !== itemCode)
      : maxItems && value.length >= maxItems
        ? value
        : [...value, itemCode]
    onChange(newValue)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      const newValue = value.slice(0, -1)
      onChange(newValue)
    }
  }

  const selectedItemsText = value.length > 0
    ? `${value.length} item${value.length === 1 ? '' : 's'} selected`
    : ''

  const isError = error || (showValidation && required && value.length < minItems)


  return (
    <div className="relative">
      <div role="combobox" aria-expanded={open} aria-haspopup="listbox" aria-labelledby={`${name}-label`}>
        <label
          id={`${name}-label`}
          className={cn(
            "block text-sm font-medium mb-1",
            isError ? "text-red-500" : "text-gray-700"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={buttonRef}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-controls={`${name}-options`}
              aria-required={required}
              aria-invalid={isError ? "true" : "false"}
              aria-describedby={isError ? `${name}-error` : undefined}
              className={cn(
                "w-full justify-between pointer cursor-pointer",
                disabled && "opacity-50 cursor-not-allowed",
                isError && "border-red-500 focus:ring-red-500",
                className
              )}
              disabled={disabled}
            >
              <div className="flex flex-wrap gap-2 items-center overflow-x-auto">
                {value.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {value.map((code) => {
                      const option = options.find((opt) => opt.code === code)
                      return (
                        <div
                          key={code}
                          className="px-2 py-1 rounded-xl border bg-slate-100 text-xs font-medium"
                        >
                          {option ? `${option.name}` : code}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder={searchPlaceholder}
                value={inputValue}
                onValueChange={setInputValue}
                onKeyDown={handleKeyDown}
                className="border-none "
              />
              <CommandEmpty className="py-2 px-4 text-sm">{emptyMessage}</CommandEmpty>
              <CommandGroup>
                <CommandList id={`${name}-options`}>
                  {options
                    .filter((option) =>
                      `${option.code} ${option.name}`.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((option) => {
                      const isSelected = value.includes(option.code)
                      return (
                        <CommandItem
                          key={option.code}
                          value={option.code}
                          onSelect={() => handleSelect(option.code)}
                          className="cursor-pointer aria-selected:bg-accent"
                          aria-selected={isSelected}
                        >
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                isSelected ? "opacity-100" : "opacity-0"
                              )}
                              aria-hidden="true"
                            />
                            <span>{option.code} - {option.name}</span>
                          </div>
                        </CommandItem>
                      )
                    })}
                </CommandList>
              </CommandGroup>
            </Command>
            {maxItems && (
              <div className="p-2 text-xs text-muted-foreground border-t">
                {value.length} of {maxItems} items selected
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      {/* Error message */}

      {/* Visually hidden live region for screen readers */}
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {selectedItemsText}
      </div>
    </div>
  )
}