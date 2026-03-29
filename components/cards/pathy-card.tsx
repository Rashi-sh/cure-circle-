import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface HealingSystem {
  id: string
  name: string
  principles: string[]
  approach: string[]
  bestFor: string[]
  sideEffects: string
  timeFrame: string
  cost: string
  prevention: string
  color: string
}

interface PathyCardProps {
  system: HealingSystem
  className?: string
}

export function PathyCard({ system, className }: PathyCardProps) {
  const borderColors: Record<string, string> = {
    blue: "border-t-blue-500",
    teal: "border-t-teal-500",
    orange: "border-t-orange-500",
    green: "border-t-green-500",
    purple: "border-t-purple-500",
    default: "border-t-primary",
  }

  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-border bg-card p-6 transition-all hover:shadow-lg",
        borderColors[system.color] || borderColors.default,
        className
      )}
    >
      <h3 className="text-xl font-bold text-foreground">{system.name}</h3>

      {/* Core Principles */}
      <div className="mt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Core Principles
        </h4>
        <ul className="mt-2 space-y-1">
          {system.principles.map((principle, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="h-4 w-4 text-primary" />
              {principle}
            </li>
          ))}
        </ul>
      </div>

      {/* Treatment Approach */}
      <div className="mt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Treatment Approach
        </h4>
        <ul className="mt-2 space-y-1">
          {system.approach.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="h-4 w-4 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Best For */}
      <div className="mt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Best For
        </h4>
        <ul className="mt-2 space-y-1">
          {system.bestFor.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-foreground">
              <Circle className="h-2 w-2 fill-primary text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Side Effects</p>
          <p className="text-sm font-medium text-foreground">{system.sideEffects}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Time Frame</p>
          <p className="text-sm font-medium text-foreground">{system.timeFrame}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Cost</p>
          <p className="text-sm font-medium text-foreground">{system.cost}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Prevention</p>
          <p className="text-sm font-medium text-foreground">{system.prevention}</p>
        </div>
      </div>
    </div>
  )
}
