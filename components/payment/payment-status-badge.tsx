"use client"

import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { PaymentStatus } from "@/lib/types"

interface PaymentStatusBadgeProps {
  status: PaymentStatus
  amount?: number
  className?: string
}

export function PaymentStatusBadge({ status, amount, className }: PaymentStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          label: "Paid",
          icon: CheckCircle,
          className: "bg-green-100 text-green-700 border-green-200",
        }
      case "pending":
        return {
          label: "Payment Pending",
          icon: Clock,
          className: "bg-amber-100 text-amber-700 border-amber-200",
        }
      case "failed":
        return {
          label: "Payment Failed",
          icon: XCircle,
          className: "bg-red-100 text-red-700 border-red-200",
        }
      case "refunded":
        return {
          label: "Refunded",
          icon: RefreshCw,
          className: "bg-blue-100 text-blue-700 border-blue-200",
        }
      default:
        return {
          label: status,
          icon: Clock,
          className: "bg-gray-100 text-gray-700 border-gray-200",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <Badge
      variant="outline"
      className={cn("gap-1", config.className, className)}
    >
      <Icon className="h-3 w-3" />
      {config.label}
      {amount && status === "success" && (
        <span className="ml-1 font-medium">Rs. {amount}</span>
      )}
    </Badge>
  )
}
