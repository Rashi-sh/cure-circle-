"use client"

import { useState } from "react"
import { DoctorCard } from "@/components/cards"
import { DoctorBookingModal } from "@/components/consultation/doctor-booking-modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Filter, Plus } from "lucide-react"
import { doctors, specialties } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function ConsultPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [availableToday, setAvailableToday] = useState(true)
  const [availableThisWeek, setAvailableThisWeek] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty =
      !selectedSpecialty || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <>
        {/* Hero Section */}
        <section className="gradient-primary py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-white lg:text-4xl">
              Find Specialists near you
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/90">
              Verified doctors across all fields for you to consult. Use filtered search for best results. 
              Book Online or Visit in person
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-10 rounded-xl bg-white"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  className="h-12 pl-10 rounded-xl bg-white"
                />
              </div>
              <Button size="lg" className="h-12 rounded-xl bg-primary hover:bg-primary/90">
                Search
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-white bg-transparent text-white hover:bg-white/10"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Doctor
              </Button>
            </div>
          </div>
        </section>

        {/* Specialty Pills */}
        <section className="border-b border-border bg-card py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              {specialties.slice(0, 8).map((specialty) => (
                <Badge
                  key={specialty}
                  variant={selectedSpecialty === specialty ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer rounded-full px-4 py-1.5 transition-colors",
                    selectedSpecialty === specialty
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  )}
                  onClick={() =>
                    setSelectedSpecialty(
                      selectedSpecialty === specialty ? null : specialty
                    )
                  }
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
              {/* Filters Sidebar */}
              <aside className="space-y-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-foreground" />
                    <h3 className="font-semibold text-foreground">Filters</h3>
                  </div>

                  {/* Availability */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-foreground">
                      Availability
                    </h4>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="today"
                          checked={availableToday}
                          onCheckedChange={(checked) =>
                            setAvailableToday(checked as boolean)
                          }
                        />
                        <Label htmlFor="today" className="text-sm text-muted-foreground">
                          Available Today
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="week"
                          checked={availableThisWeek}
                          onCheckedChange={(checked) =>
                            setAvailableThisWeek(checked as boolean)
                          }
                        />
                        <Label htmlFor="week" className="text-sm text-muted-foreground">
                          Available This Week
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-foreground">
                      Experience
                    </h4>
                    <Select defaultValue="any">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Experience</SelectItem>
                        <SelectItem value="5+">5+ Years</SelectItem>
                        <SelectItem value="10+">10+ Years</SelectItem>
                        <SelectItem value="15+">15+ Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-foreground">Rating</h4>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="rating-4.5" />
                        <Label htmlFor="rating-4.5" className="text-sm text-muted-foreground">
                          4.5+ Stars
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="rating-4.0" />
                        <Label htmlFor="rating-4.0" className="text-sm text-muted-foreground">
                          4.0+ Stars
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map View Placeholder */}
                <div className="rounded-2xl border border-border bg-secondary/50 p-6">
                  <h3 className="font-semibold text-foreground">Map View</h3>
                  <div className="mt-4 aspect-video rounded-xl bg-white" />
                </div>
              </aside>

              {/* Doctors Grid */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">
                    Available Doctors
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredDoctors.length} doctors found
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => {
                        setSelectedDoctor(doctor)
                        setBookingModalOpen(true)
                      }}
                      className="cursor-pointer"
                    >
                      <DoctorCard
                        doctor={doctor}
                        onBookNow={(doc) => {
                          setSelectedDoctor(doc)
                          setBookingModalOpen(true)
                        }}
                      />
                    </div>
                  ))}
                </div>

                {filteredDoctors.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No doctors found matching your criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        <DoctorBookingModal
          doctor={selectedDoctor}
          open={bookingModalOpen}
          onOpenChange={setBookingModalOpen}
        />
    </>
  )
}
