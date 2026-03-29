"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowRight,
  Compass,
  Pill,
  Users,
  Stethoscope,
  Heart,
  Calendar,
  Clock,
  Sparkles,
  Shield,
  Leaf,
  CheckCircle,
} from "lucide-react"

export default function PatientHomePage() {
  const { patientProfile } = useAuth()

  const firstName = patientProfile?.name.split(" ")[0] || "Guest"
  const initials = (patientProfile?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  // Mock upcoming consultations
  const upcomingConsultations = [
    {
      id: "1",
      doctorName: "Dr. Ayesha Khan",
      specialty: "Ayurveda",
      date: "March 22, 2026",
      time: "10:00 AM",
      type: "Video",
    },
    {
      id: "2",
      doctorName: "Dr. Rahul Sharma",
      specialty: "Homeopathy",
      date: "March 25, 2026",
      time: "2:30 PM",
      type: "In-person",
    },
  ]

  return (
    <section className="py-12 lg:py-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div className="space-y-6">
              {/* Personalized Welcome */}
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-primary">
                  Welcome back, {firstName}!
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl xl:text-6xl">
                <span className="text-balance">Care That Connects,</span>
                <br />
                <span className="text-primary">Healing That Lasts</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                Explore traditional healing systems, discover doctor-approved
                remedies, book consultations, and manage your family's health
                journey - all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/explore-pathy">
                  <Button
                    size="lg"
                    className="rounded-full bg-primary px-8 hover:bg-primary/90"
                  >
                    <Compass className="mr-2 h-5 w-5" />
                    Explore Pathies
                  </Button>
                </Link>
                <Link href="/consult">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-primary px-8 text-primary hover:bg-primary/10"
                  >
                    <Stethoscope className="mr-2 h-5 w-5" />
                    Book Consultation
                  </Button>
                </Link>
                <Link href="/family">
                  <Button
                    size="lg"
                    className="rounded-full bg-maternal px-8 text-maternal-foreground hover:bg-maternal/90"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Mom & Baby Hub
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative mx-auto aspect-square max-w-lg lg:max-w-none">
                <div className="absolute inset-4 overflow-hidden rounded-3xl border-4 border-primary bg-card shadow-2xl shadow-primary/10">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=600&fit=crop"
                    alt="Healthcare professionals providing care"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-xl">
                  <p className="text-xs text-muted-foreground">Your health, your way</p>
                  <p className="text-2xl font-bold text-primary">Holistic</p>
                  <p className="text-sm text-muted-foreground">Wellness Journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
              Quick Access
            </h2>
            <p className="mt-2 text-muted-foreground">
              Everything you need for your wellness journey
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/explore-pathy">
              <Card className="group cursor-pointer border-0 shadow-md transition-all hover:shadow-xl hover:ring-2 hover:ring-primary/20">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Compass className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Explore Pathies</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare healing systems
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/remedies">
              <Card className="group cursor-pointer border-0 shadow-md transition-all hover:shadow-xl hover:ring-2 hover:ring-green-500/20">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 transition-colors group-hover:bg-green-500/20">
                    <Pill className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Remedies</h3>
                  <p className="text-sm text-muted-foreground">
                    Doctor-approved cures
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/family">
              <Card className="group cursor-pointer border-0 shadow-md transition-all hover:shadow-xl hover:ring-2 hover:ring-maternal/20">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-maternal/10 transition-colors group-hover:bg-maternal/20">
                    <Users className="h-8 w-8 text-maternal" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Family</h3>
                  <p className="text-sm text-muted-foreground">
                    Mom & Baby profiles
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/consult">
              <Card className="group cursor-pointer border-0 shadow-md transition-all hover:shadow-xl hover:ring-2 hover:ring-blue-500/20">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                    <Stethoscope className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Consult</h3>
                  <p className="text-sm text-muted-foreground">
                    Find specialists
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Personalized Section with Health Summary & Upcoming */}
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Continue Your Journey */}
            <Card className="border-0 shadow-md lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Continue Your Care Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Health Profile</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Blood Group: {patientProfile.bloodGroup || "Not set"}
                        </p>
                        <Link href="/profile">
                          <Button
                            variant="link"
                            size="sm"
                            className="mt-2 h-auto p-0 text-primary"
                          >
                            Update Profile <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-br from-green-500/5 to-green-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Recommended</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Explore Ayurveda for holistic wellness
                        </p>
                        <Link href="/explore-pathy">
                          <Button
                            variant="link"
                            size="sm"
                            className="mt-2 h-auto p-0 text-green-600"
                          >
                            Explore Now <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {patientProfile.allergies && patientProfile.allergies.length > 0 && (
                    <div className="rounded-xl bg-secondary/50 p-4 sm:col-span-2">
                      <p className="text-sm text-muted-foreground">Known Allergies</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {patientProfile.allergies.map((allergy, idx) => (
                          <Badge key={idx} variant="outline">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Consultations */}
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming
                </CardTitle>
                <Link href="/consult">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingConsultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="flex items-start gap-3 rounded-xl bg-secondary/50 p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Stethoscope className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {consultation.doctorName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {consultation.specialty}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {consultation.date}, {consultation.time}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {consultation.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why CureCircle Section */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
              Why Choose CureCircle?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Your trusted partner in holistic healthcare
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Verified Doctors</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  All practitioners are thoroughly verified and certified in their
                  respective healing systems.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Approved Remedies</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Every remedy is reviewed and approved by qualified doctors before
                  being shared.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maternal/10">
                <Heart className="h-6 w-6 text-maternal" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Family Care</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Special focus on maternal and child health with dedicated tracking
                  and care features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Book a consultation with verified practitioners across Ayurveda,
            Homeopathy, Naturopathy, and more.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/consult">
              <Button size="lg" className="rounded-full px-8">
                <Stethoscope className="mr-2 h-5 w-5" />
                Book Consultation
              </Button>
            </Link>
            <Link href="/explore-pathy">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                <Compass className="mr-2 h-5 w-5" />
                Learn About Pathies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  )
}
