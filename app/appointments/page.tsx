"use client"

import { useState, useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatInterface } from "@/components/communication"
import { VideoCallInterface } from "@/components/communication"
import { BookConsultationModal } from "@/components/consultation"
import { PaymentStatusBadge, PaymentModal } from "@/components/payment"
import { EmptyState } from "@/components/states"
import { SearchInput } from "@/components/search"
import {
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  MessageSquare,
  Video,
  Phone,
  X,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  History,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { AppointmentStatus, PaymentStatus } from "@/lib/types"

// Mock appointments data with payment status
const mockAppointments = [
  {
    id: "apt-001",
    doctorId: "doc-001",
    doctorName: "Dr. Ayesha Khan",
    specialty: "Ayurveda",
    doctorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    date: "2026-03-22",
    time: "10:00 AM",
    type: "video" as const,
    status: "confirmed" as AppointmentStatus,
    reason: "Consultation for chronic fatigue",
    hospital: "Ayurvedic Wellness Center",
    location: "Mumbai, India",
    paymentStatus: "success" as PaymentStatus,
    paymentAmount: 500,
  },
  {
    id: "apt-002",
    doctorId: "doc-002",
    doctorName: "Dr. Rahul Sharma",
    specialty: "Homeopathy",
    doctorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    date: "2026-03-25",
    time: "2:30 PM",
    type: "in-person" as const,
    status: "pending" as AppointmentStatus,
    reason: "Follow-up for allergies",
    hospital: "Homeopathy Clinic",
    location: "Delhi, India",
    paymentStatus: "pending" as PaymentStatus,
    paymentAmount: 400,
  },
  {
    id: "apt-003",
    doctorId: "doc-003",
    doctorName: "Dr. Priya Patel",
    specialty: "Naturopathy",
    doctorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    date: "2026-03-15",
    time: "11:00 AM",
    type: "chat" as const,
    status: "completed" as AppointmentStatus,
    reason: "Nutrition consultation",
    hospital: "Nature's Care",
    location: "Bangalore, India",
    paymentStatus: "success" as PaymentStatus,
    paymentAmount: 350,
  },
  {
    id: "apt-004",
    doctorId: "doc-004",
    doctorName: "Dr. Amit Verma",
    specialty: "General Medicine",
    doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    date: "2026-03-20",
    time: "4:00 PM",
    type: "video" as const,
    status: "rescheduled" as AppointmentStatus,
    reason: "Regular checkup",
    hospital: "City Hospital",
    location: "Chennai, India",
    paymentStatus: "success" as PaymentStatus,
    paymentAmount: 600,
    rescheduledFrom: "2026-03-18",
  },
  {
    id: "apt-005",
    doctorId: "doc-005",
    doctorName: "Dr. Neha Singh",
    specialty: "Pediatrics",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    date: "2026-03-10",
    time: "9:00 AM",
    type: "in-person" as const,
    status: "cancelled" as AppointmentStatus,
    reason: "Child vaccination",
    hospital: "Kids Care Hospital",
    location: "Pune, India",
    paymentStatus: "refunded" as PaymentStatus,
    paymentAmount: 450,
  },
]

export default function AppointmentsPage() {
  const { isPatient } = useAuth()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedPaymentAppointment, setSelectedPaymentAppointment] = useState<typeof mockAppointments[0] | null>(null)

  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter(apt => {
      const matchesSearch = 
        apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [searchQuery])

  const upcomingAppointments = filteredAppointments.filter(
    (apt) => apt.status === "pending" || apt.status === "confirmed" || apt.status === "rescheduled"
  )
  const completedAppointments = filteredAppointments.filter(
    (apt) => apt.status === "completed"
  )
  const cancelledAppointments = filteredAppointments.filter(
    (apt) => apt.status === "cancelled"
  )

  if (!isPatient) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <EmptyState
            type="general"
            title="Access Restricted"
            description="You need to be signed in as a patient to view appointments."
            action={{
              label: "Sign In",
              onClick: () => window.location.href = "/sign-in",
            }}
          />
        </div>
      </section>
    )
  }

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="default" className="bg-blue-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Confirmed
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive">
            <X className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        )
      case "rescheduled":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-600">
            <RefreshCw className="mr-1 h-3 w-3" />
            Rescheduled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleRetryPayment = (appointment: typeof mockAppointments[0]) => {
    setSelectedPaymentAppointment(appointment)
    setPaymentModalOpen(true)
  }

  const AppointmentCard = ({ appointment }: { appointment: (typeof mockAppointments)[0] }) => (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Left: Doctor Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <h3 className="font-semibold text-foreground">{appointment.doctorName}</h3>
              <span className="text-sm text-muted-foreground">({appointment.specialty})</span>
              <div className="flex flex-wrap gap-2 ml-auto sm:ml-0">
                {getStatusBadge(appointment.status)}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{appointment.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Stethoscope className="h-4 w-4 shrink-0" />
                <span className="capitalize">{appointment.type}</span>
              </div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Reason:</span> {appointment.reason}
            </p>

            {/* Rescheduled info */}
            {appointment.status === "rescheduled" && appointment.rescheduledFrom && (
              <div className="mt-2 flex items-center gap-2 text-sm text-purple-600">
                <History className="h-4 w-4" />
                <span>Rescheduled from {new Date(appointment.rescheduledFrom).toLocaleDateString()}</span>
              </div>
            )}

            {/* Payment Status */}
            <div className="mt-3">
              <PaymentStatusBadge 
                status={appointment.paymentStatus} 
                amount={appointment.paymentAmount}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
          {appointment.status !== "completed" && appointment.status !== "cancelled" && (
            <>
              {appointment.type === "chat" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 rounded-full"
                  onClick={() => setSelectedChat(appointment.id)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Open Chat</span>
                  <span className="sm:hidden">Chat</span>
                </Button>
              )}
              {appointment.type === "video" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 rounded-full"
                  onClick={() => setSelectedVideo(appointment.id)}
                >
                  <Video className="h-4 w-4" />
                  <span className="hidden sm:inline">Start Video Call</span>
                  <span className="sm:hidden">Video</span>
                </Button>
              )}
              {appointment.type === "in-person" && (
                <Button size="sm" variant="outline" className="gap-2 rounded-full">
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">Call Doctor</span>
                  <span className="sm:hidden">Call</span>
                </Button>
              )}
              {appointment.paymentStatus === "failed" && (
                <Button 
                  size="sm" 
                  className="gap-2 rounded-full bg-primary"
                  onClick={() => handleRetryPayment(appointment)}
                >
                  Retry Payment
                </Button>
              )}
              {appointment.paymentStatus === "pending" && (
                <Button 
                  size="sm" 
                  className="gap-2 rounded-full bg-primary"
                  onClick={() => handleRetryPayment(appointment)}
                >
                  Complete Payment
                </Button>
              )}
              {appointment.status === "pending" && (
                <Button size="sm" variant="ghost" className="gap-2 text-destructive rounded-full">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      {/* Chat Modal */}
      {selectedChat && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-card rounded-2xl shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b border-border p-4 flex items-center justify-between">
              <h2 className="font-semibold">Chat with {mockAppointments.find(a => a.id === selectedChat)?.doctorName}</h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSelectedChat(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        </div>
      )}

      {/* Video Call Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b border-border p-4 flex items-center justify-between">
              <h2 className="font-semibold">Video Call with {mockAppointments.find(a => a.id === selectedVideo)?.doctorName}</h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <VideoCallInterface />
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {selectedPaymentAppointment && (
        <PaymentModal
          open={paymentModalOpen}
          onOpenChange={setPaymentModalOpen}
          amount={selectedPaymentAppointment.paymentAmount}
          doctorName={selectedPaymentAppointment.doctorName}
          appointmentId={selectedPaymentAppointment.id}
          onPaymentComplete={() => {
            setPaymentModalOpen(false)
            setSelectedPaymentAppointment(null)
          }}
        />
      )}

      {/* Main Content */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Your Appointments</h1>
              <p className="mt-1 text-muted-foreground">
                Manage and track all your consultations
              </p>
            </div>
            <BookConsultationModal
              trigger={
                <Button className="rounded-full bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book New
                </Button>
              }
            />
          </div>

          {/* Search */}
          <div className="mb-6">
            <SearchInput
              placeholder="Search by doctor, specialty, or reason..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="max-w-md"
            />
          </div>

          {/* Tabs */}
          <Card className="border-0 shadow-sm">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3 rounded-t-lg border-b bg-secondary/50 p-1">
                <TabsTrigger value="upcoming" className="text-xs sm:text-sm">
                  Upcoming ({upcomingAppointments.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-xs sm:text-sm">
                  Completed ({completedAppointments.length})
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="text-xs sm:text-sm">
                  Cancelled ({cancelledAppointments.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-0 space-y-4 p-4 sm:p-6">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))
                ) : (
                  <EmptyState
                    type="appointments"
                    action={{
                      label: "Book an Appointment",
                      onClick: () => {},
                    }}
                  />
                )}
              </TabsContent>

              <TabsContent value="completed" className="mt-0 space-y-4 p-4 sm:p-6">
                {completedAppointments.length > 0 ? (
                  completedAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))
                ) : (
                  <EmptyState
                    type="appointments"
                    title="No completed appointments"
                    description="Your completed consultations will appear here."
                  />
                )}
              </TabsContent>

              <TabsContent value="cancelled" className="mt-0 space-y-4 p-4 sm:p-6">
                {cancelledAppointments.length > 0 ? (
                  cancelledAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))
                ) : (
                  <EmptyState
                    type="general"
                    title="No cancelled appointments"
                    description="You haven't cancelled any appointments."
                  />
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </section>
    </>
  )
}
