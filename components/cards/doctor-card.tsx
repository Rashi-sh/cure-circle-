"use client"

import Image from "next/image"
import { Star, MapPin, Calendar, Phone, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Doctor {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  reviewCount: number
  hospital: string
  location: string
  distance: string
  availability: string
  isAvailable: boolean
  imageUrl: string
  healingSystems?: string[]
}

interface DoctorCardProps {
  doctor: Doctor
  onBookNow?: (doctor: Doctor) => void
  className?: string
}

export function DoctorCard({ doctor, onBookNow, className }: DoctorCardProps) {
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={doctor.imageUrl}
          alt={doctor.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {doctor.isAvailable && (
          <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
            Available
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
        <p className="text-sm font-medium text-primary">{doctor.specialty}</p>

        {/* Stats Row */}
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{doctor.experience} years</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span>
              {doctor.rating} ({doctor.reviewCount})
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
          <div>
            <p>{doctor.hospital}</p>
            <p className="text-xs">{doctor.distance} away</p>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Next available:</span>
          <span className="font-medium text-primary">{doctor.availability}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <Button
            onClick={() => onBookNow?.(doctor)}
            className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 rounded-xl border-primary text-primary hover:bg-primary/10"
          >
            <Navigation className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 rounded-xl border-primary text-primary hover:bg-primary/10"
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
