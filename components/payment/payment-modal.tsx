"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  CheckCircle,
  XCircle,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useNotifications } from "@/lib/notification-context"
import type { PaymentStatus } from "@/lib/types"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
  doctorName: string
  appointmentId: string
  onPaymentComplete: (status: PaymentStatus, transactionId?: string) => void
}

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "upi", name: "UPI", icon: Smartphone },
  { id: "netbanking", name: "Net Banking", icon: Building2 },
  { id: "wallet", name: "Digital Wallet", icon: Wallet },
]

export function PaymentModal({
  open,
  onOpenChange,
  amount,
  doctorName,
  appointmentId,
  onPaymentComplete,
}: PaymentModalProps) {
  const { addNotification } = useNotifications()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState<"success" | "failed" | null>(null)
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [upiId, setUpiId] = useState("")

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate success/failure (90% success rate for demo)
    const success = Math.random() > 0.1
    
    if (success) {
      const transactionId = `TXN${Date.now()}`
      setPaymentResult("success")
      
      // Add notification
      addNotification({
        userId: "current-user",
        type: "payment",
        title: "Payment Successful",
        message: `Payment of Rs. ${amount} for your consultation with ${doctorName} was successful.`,
        link: "/appointments",
      })
      
      // Wait a moment to show success state
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      onPaymentComplete("success", transactionId)
      toast.success("Payment successful!")
      resetAndClose()
    } else {
      setPaymentResult("failed")
      
      addNotification({
        userId: "current-user",
        type: "payment",
        title: "Payment Failed",
        message: `Payment of Rs. ${amount} for your consultation with ${doctorName} failed. Please try again.`,
        link: "/appointments",
      })
      
      toast.error("Payment failed. Please try again.")
    }
    
    setIsProcessing(false)
  }

  const resetAndClose = () => {
    setPaymentResult(null)
    setCardNumber("")
    setExpiry("")
    setCvv("")
    setUpiId("")
    setPaymentMethod("card")
    onOpenChange(false)
  }

  const handleRetry = () => {
    setPaymentResult(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Pay Rs. {amount} for consultation with {doctorName}
          </DialogDescription>
        </DialogHeader>

        {paymentResult === "success" ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Payment Successful!</h3>
            <p className="text-center text-sm text-muted-foreground">
              Your payment of Rs. {amount} has been processed successfully.
            </p>
          </div>
        ) : paymentResult === "failed" ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Payment Failed</h3>
            <p className="text-center text-sm text-muted-foreground">
              Something went wrong. Please try again or use a different payment method.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={resetAndClose}>
                Cancel
              </Button>
              <Button onClick={handleRetry}>
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Amount Summary */}
            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Consultation Fee</span>
                <span className="font-semibold text-foreground">Rs. {amount}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label>Select Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-2 gap-3"
              >
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={method.id}
                      className={cn(
                        "flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors",
                        "hover:bg-secondary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                      )}
                    >
                      <method.icon className="h-5 w-5" />
                      <span className="text-xs font-medium">{method.name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Payment Form Fields */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input
                  id="upi-id"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div className="rounded-xl bg-secondary/50 p-4 text-center text-sm text-muted-foreground">
                You will be redirected to your bank's secure payment page.
              </div>
            )}

            {paymentMethod === "wallet" && (
              <div className="rounded-xl bg-secondary/50 p-4 text-center text-sm text-muted-foreground">
                You will be redirected to complete payment via your digital wallet.
              </div>
            )}

            {/* Security Notice */}
            <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">
              <Shield className="h-4 w-4 shrink-0" />
              <span>Your payment is secured with 256-bit encryption</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={resetAndClose}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 rounded-xl"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  `Pay Rs. ${amount}`
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
