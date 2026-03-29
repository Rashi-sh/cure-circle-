"use client"

import Image from "next/image"
import Link from "next/link"
import { ThumbsUp, MessageCircle, Share2, BadgeCheck, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Remedy {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  likes: number
  comments: number
  shares: number
  isVerified?: boolean
}

interface RemedyCardProps {
  remedy: Remedy
  className?: string
}

export function RemedyCard({ remedy, className }: RemedyCardProps) {
  const categoryColors: Record<string, string> = {
    Respiratory: "bg-blue-500",
    "Skin Care": "bg-emerald-500",
    Digestive: "bg-amber-500",
    Immunity: "bg-green-500",
    "Pain Relief": "bg-red-500",
    default: "bg-primary",
  }

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={remedy.imageUrl}
          alt={remedy.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <Badge
          className={cn(
            "absolute right-3 top-3 text-white",
            categoryColors[remedy.category] || categoryColors.default
          )}
        >
          {remedy.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground leading-tight">
            {remedy.title}
          </h3>
          {remedy.isVerified && (
            <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {remedy.description}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{remedy.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{remedy.comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>{remedy.shares}</span>
            </div>
          </div>
          <Link
            href={`/remedies/${remedy.id}`}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View Recipe
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
