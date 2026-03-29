"use client"

import Link from "next/link"
import { ConditionalLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookConsultationModal } from "@/components/consultation"
import {
  CheckCircle,
  MessageSquare,
  Video,
  Calendar,
  Stethoscope,
  AlertCircle,
} from "lucide-react"

export default function DemoPage() {
  return (
    <ConditionalLayout>
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground">Feature Demo</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Test all the interactive features that have been integrated into CureCircle
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Book Consultation Modal */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Book Consultation Modal</CardTitle>
                </div>
                <CardDescription>
                  Test the booking modal with date, time, type selection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Date selection (30 days)
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Time slot picker
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Consultation type (Chat, Video, In-person)
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Loading state and success confirmation
                  </div>
                </div>
                <BookConsultationModal
                  trigger={
                    <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">
                      Open Modal
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            {/* 2. Appointments Page */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Appointments Page</CardTitle>
                </div>
                <CardDescription>
                  View and manage all patient appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Upcoming &amp; Completed tabs
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Status badges (Pending, Confirmed, Completed)
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Integration with Chat &amp; Video
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Quick booking from page
                  </div>
                </div>
                <Link href="/appointments">
                  <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">
                    View Page
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 3. Chat Interface */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Chat Interface</CardTitle>
                </div>
                <CardDescription>
                  Real-time messaging for consultations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Message thread display
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Timestamps on messages
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Send button with validation
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Accessible from appointments
                  </div>
                </div>
                <Button disabled className="w-full rounded-xl opacity-50">
                  View in Appointments
                </Button>
              </CardContent>
            </Card>

            {/* 4. Video Call Interface */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Video className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Video Call Interface</CardTitle>
                </div>
                <CardDescription>
                  Video consultation with controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Camera toggle (on/off)
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Microphone toggle
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Call timer with formatting
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Video preview and remote view
                  </div>
                </div>
                <Button disabled className="w-full rounded-xl opacity-50">
                  View in Appointments
                </Button>
              </CardContent>
            </Card>

            {/* 5. Doctor Appointments */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Doctor Appointments</CardTitle>
                </div>
                <CardDescription>
                  Doctor-side appointment management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Pending request review
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Confirm/Reject actions
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Confirmed appointments view
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Completed history
                  </div>
                </div>
                <Link href="/doctor/appointments-list">
                  <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">
                    View Page
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 6. Consult Page Integration */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Consult Page</CardTitle>
                </div>
                <CardDescription>
                  Find doctors with integrated booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Doctor cards with booking modal
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Specialty filtering
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Click "Book Now" on any card
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Doctor pre-filled in modal
                  </div>
                </div>
                <Link href="/consult">
                  <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">
                    View Page
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Integration Summary */}
          <Card className="mt-12 border-0 shadow-sm bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <CardTitle>Integration Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Patient Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Book consultations from Home, Consult, Explore-Pathy pages</li>
                    <li>✓ View all appointments with status badges</li>
                    <li>✓ Access Chat/Video from confirmed appointments</li>
                    <li>✓ Track appointment lifecycle (Pending → Confirmed → Completed)</li>
                    <li>✓ Appointments section in patient navbar</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Doctor Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Review pending appointment requests</li>
                    <li>✓ Confirm or reject appointment requests</li>
                    <li>✓ View confirmed upcoming appointments</li>
                    <li>✓ Access Chat/Video from appointments</li>
                    <li>✓ Appointments section in doctor navbar</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </ConditionalLayout>
  )
}
