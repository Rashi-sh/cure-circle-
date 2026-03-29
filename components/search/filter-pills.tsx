"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterPillsProps<T extends string> {
  options: T[]
  selected: T | T[] | null
  onChange: (value: T | T[] | null) => void
  multiple?: boolean
  allowDeselect?: boolean
  className?: string
  pillClassName?: string
}

export function FilterPills<T extends string>({
  options,
  selected,
  onChange,
  multiple = false,
  allowDeselect = true,
  className,
  pillClassName,
}: FilterPillsProps<T>) {
  const isSelected = (option: T) => {
    if (Array.isArray(selected)) {
      return selected.includes(option)
    }
    return selected === option
  }

  const handleClick = (option: T) => {
    if (multiple) {
      const currentSelected = Array.isArray(selected) ? selected : selected ? [selected] : []
      if (currentSelected.includes(option)) {
        const newSelected = currentSelected.filter(s => s !== option)
        onChange(newSelected.length > 0 ? (newSelected as T[]) : null)
      } else {
        onChange([...currentSelected, option] as T[])
      }
    } else {
      if (selected === option && allowDeselect) {
        onChange(null)
      } else {
        onChange(option)
      }
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <Badge
          key={option}
          variant={isSelected(option) ? "default" : "outline"}
          className={cn(
            "cursor-pointer rounded-full px-4 py-1.5 transition-colors",
            isSelected(option)
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "hover:bg-secondary",
            pillClassName
          )}
          onClick={() => handleClick(option)}
        >
          {option}
          {isSelected(option) && allowDeselect && (
            <X className="ml-1 h-3 w-3" />
          )}
        </Badge>
      ))}
    </div>
  )
}

interface ActiveFiltersProps {
  filters: { label: string; value: string; onRemove: () => void }[]
  onClearAll?: () => void
  className?: string
}

export function ActiveFilters({ filters, onClearAll, className }: ActiveFiltersProps) {
  if (filters.length === 0) return null

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {filters.map((filter, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="gap-1 rounded-full"
        >
          {filter.label}: {filter.value}
          <button
            onClick={filter.onRemove}
            className="ml-1 rounded-full hover:bg-muted"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      {filters.length > 1 && onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
          onClick={onClearAll}
        >
          Clear all
        </Button>
      )}
    </div>
  )
}
