"use client"

import { useState } from "react"
import { Calendar, Clock, AlertCircle, CheckCircle, CreditCard } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Doctor } from "@/components/cards"
import { PaymentModal } from "@/components/payment"
import { useNotifications } from "@/lib/notification-context"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import type { PaymentStatus } from "@/lib/types"

interface DoctorBookingModalProps {
  doctor: Doctor | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const paymentMethods = [
  { id: "card", name: "Card", icon: "💳" },
  { id: "upi", name: "UPI", icon: "📱" },
  { id: "netbanking", name: "Net Banking", icon: "🏦" },
  { id: "wallet", name: "Wallet", icon: "👛" },
]

export function DoctorBookingModal({
  doctor,
  open,
  onOpenChange,
}: DoctorBookingModalProps) {
  const { addNotification } = useNotifications()
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [consultationType, setConsultationType] = useState("video")
  const [issue, setIssue] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<"details" | "payment" | "success">("details")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)

  if (!doctor) return null

  const consultationFee = 500 // Default fee

  // Generate dates for next 30 days
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ]

  const handleProceedToPayment = () => {
    if (!selectedDate || !selectedTime || !issue) {
      toast.error("Please fill in all required fields")
      return
    }
    setShowPaymentModal(true)
  }

  const handlePaymentComplete = (status: PaymentStatus, transactionId?: string) => {
    setPaymentStatus(status)
    setShowPaymentModal(false)

    if (status === "success") {
      // Add booking notification
      addNotification({
        userId: "current-user",
        type: "booking",
        title: "Appointment Booked",
        message: `Your appointment with ${doctor.name} on ${selectedDate} at ${selectedTime} has been booked. Awaiting confirmation.`,
        link: "/appointments",
      })

      setStep("success")

      // Auto-close after success
      setTimeout(() => {
        resetForm()
      }, 3000)
    } else {
      toast.error("Payment failed. Please try again.")
    }
  }

  const resetForm = () => {
    onOpenChange(false)
    setStep("details")
    setSelectedDate("")
    setSelectedTime("")
    setConsultationType("video")
    setIssue("")
    setPaymentMethod("card")
    setPaymentStatus(null)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              Schedule a consultation with {doctor.name}
            </DialogDescription>
          </DialogHeader>

          {step === "success" ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Booking Confirmed!
              </h3>
              <p className="text-center text-sm text-muted-foreground">
                Your appointment with {doctor.name} is scheduled for{" "}
                <span className="font-medium">{selectedDate}</span> at{" "}
                <span className="font-medium">{selectedTime}</span>
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="border-green-500 text-green-600">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Payment Successful
                </Badge>
                <Badge variant="outline">
                  Status: Pending Confirmation
                </Badge>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleProceedToPayment(); }} className="space-y-6">
              {/* Doctor Info */}
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{doctor.name}</p>
                    <p className="text-sm text-primary">{doctor.specialty}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {doctor.experience} years experience
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{doctor.rating}</p>
                    <p className="text-xs text-muted-foreground">
                      ({doctor.reviewCount} reviews)
                    </p>
                    <p className="mt-2 text-sm font-medium text-primary">
                      Rs. {consultationFee}
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Consultation Type</Label>
                <div className="flex gap-3">
                  {["video", "chat", "in-person"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setConsultationType(type)}
                      className={`flex-1 rounded-xl border-2 px-4 py-3 text-center text-sm font-medium transition-colors ${
                        consultationType === type
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {type === "video"
                        ? "Video Call"
                        : type === "chat"
                          ? "Chat"
                          : "In-Person"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Date *</Label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choose a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateDates().map((date) => (
                      <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Time *</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choose a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Issue Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {"What's your concern? *"}
                </Label>
                <Textarea
                  placeholder="Describe your health concern or reason for consultation..."
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="min-h-24 rounded-xl"
                  required
                />
              </div>

              {/* Payment Summary */}
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Consultation Fee</span>
                  </div>
                  <span className="font-semibold text-foreground">Rs. {consultationFee}</span>
                </div>
              </div>

              {/* Info Alert */}
              <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-blue-600" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Secure Payment</p>
                  <p>
                    You will be redirected to our secure payment gateway. Doctor will confirm your appointment within 24 hours.
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || !issue}
                  className="flex-1 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  Proceed to Pay Rs. {consultationFee}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        amount={consultationFee}
        doctorName={doctor.name}
        appointmentId={`apt-${Date.now()}`}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  )
}
