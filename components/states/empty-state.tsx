"use client"

import { type LucideIcon, Calendar, FileText, Users, Stethoscope, Heart, Search, Bell, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type EmptyStateType = 
  | "appointments"
  | "remedies"
  | "patients"
  | "doctors"
  | "notifications"
  | "search"
  | "general"

interface EmptyStateProps {
  type?: EmptyStateType
  title?: string
  description?: string
  icon?: LucideIcon
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

const defaultConfigs: Record<EmptyStateType, { icon: LucideIcon; title: string; description: string }> = {
  appointments: {
    icon: Calendar,
    title: "No appointments yet",
    description: "Book a consultation with a doctor to get started with your health journey.",
  },
  remedies: {
    icon: Heart,
    title: "No remedies found",
    description: "Try adjusting your search or filters to find what you're looking for.",
  },
  patients: {
    icon: Users,
    title: "No patients yet",
    description: "Your patient list will appear here once patients book consultations with you.",
  },
  doctors: {
    icon: Stethoscope,
    title: "No doctors found",
    description: "Try adjusting your search criteria or check back later.",
  },
  notifications: {
    icon: Bell,
    title: "No notifications",
    description: "You're all caught up! New notifications will appear here.",
  },
  search: {
    icon: Search,
    title: "No results found",
    description: "Try different keywords or remove some filters.",
  },
  general: {
    icon: Inbox,
    title: "Nothing here yet",
    description: "There's no data to display at the moment.",
  },
}

export function EmptyState({
  type = "general",
  title,
  description,
  icon: CustomIcon,
  action,
  className,
}: EmptyStateProps) {
  const config = defaultConfigs[type]
  const Icon = CustomIcon || config.icon

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center",
      className
    )}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        {title || config.title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description || config.description}
      </p>
      {action && (
        <Button
          className="mt-6 rounded-full"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}
