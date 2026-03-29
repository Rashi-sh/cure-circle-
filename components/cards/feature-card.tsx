import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  iconBgColor?: string
  iconColor?: string
  className?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconBgColor = "bg-primary",
  iconColor = "text-primary-foreground",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
          iconBgColor
        )}
      >
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
      <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
