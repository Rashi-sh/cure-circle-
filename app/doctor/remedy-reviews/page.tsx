"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MoreHorizontal,
  User,
  Calendar,
  Leaf,
  ListOrdered,
  Shield,
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useAccessControl } from "@/components/auth/protected-route"
import { mockModeratableRemedies } from "@/lib/mock-data"
import { EmptyState } from "@/components/states"
import { SearchInput } from "@/components/search"
import type { ModeratableRemedy, RemedyStatus } from "@/lib/types"
import { toast } from "sonner"

type FilterType = "all" | "pending" | "approved" | "rejected"

export default function RemedyReviewsPage() {
  const { doctorProfile } = useAuth()
  const { canApproveRemedies, isDoctorVerified } = useAccessControl()
  const [filter, setFilter] = useState<FilterType>("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [remedies, setRemedies] = useState<ModeratableRemedy[]>(mockModeratableRemedies)
  const [selectedRemedy, setSelectedRemedy] = useState<ModeratableRemedy | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | null>(null)

  const filteredRemedies = useMemo(() => {
    let filtered = remedies
    
    // Filter by status
    if (filter !== "all") {
      filtered = filtered.filter((r) => r.status === filter)
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((r) => 
        r.title.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query) ||
        r.uploadedBy.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [remedies, filter, searchQuery])

  const counts = useMemo(
    () => ({
      all: remedies.length,
      pending: remedies.filter((r) => r.status === "pending").length,
      approved: remedies.filter((r) => r.status === "approved").length,
      rejected: remedies.filter((r) => r.status === "rejected").length,
    }),
    [remedies]
  )

  const handleReview = (action: "approve" | "reject") => {
    if (!selectedRemedy) return

    const updatedRemedies = remedies.map((r) => {
      if (r.id === selectedRemedy.id) {
        return {
          ...r,
          status: action === "approve" ? "approved" : "rejected" as RemedyStatus,
          reviewedBy: doctorProfile?.name || "Doctor",
          reviewedAt: new Date().toISOString(),
          reviewNotes: reviewNotes,
          isPublic: action === "approve",
        }
      }
      return r
    })

    setRemedies(updatedRemedies)
    setSelectedRemedy(null)
    setReviewNotes("")
    setReviewAction(null)

    toast.success(
      action === "approve"
        ? "Remedy approved and published"
        : "Remedy rejected"
    )
  }

  const getStatusIcon = (status: RemedyStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "needs-revision":
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: RemedyStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700"
      case "approved":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "needs-revision":
        return "bg-orange-100 text-orange-700"
    }
  }

  const filters: { key: FilterType; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "All", icon: <FileCheck className="h-4 w-4" /> },
    { key: "pending", label: "Pending", icon: <Clock className="h-4 w-4" /> },
    { key: "approved", label: "Approved", icon: <CheckCircle className="h-4 w-4" /> },
    { key: "rejected", label: "Rejected", icon: <XCircle className="h-4 w-4" /> },
  ]

  // Security check: Only verified doctors can approve remedies
  if (!isDoctorVerified) {
    return (
      <div className="p-6 lg:p-8">
        <EmptyState
          title="Verification Required"
          description="Only verified doctors can review and approve remedies. Please wait for your account to be verified."
        />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
            Remedy Reviews
          </h1>
          <p className="mt-1 text-muted-foreground">
            Review and approve user-submitted home remedies
          </p>
        </div>
        <SearchInput
          placeholder="Search remedies..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="sm:w-64"
        />
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full gap-2",
              filter === f.key && "bg-primary text-primary-foreground"
            )}
            onClick={() => setFilter(f.key)}
          >
            {f.icon}
            {f.label}
            <Badge
              variant="secondary"
              className={cn(
                "rounded-full",
                filter === f.key
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {counts[f.key]}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Remedies List */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">
            {filters.find((f) => f.key === filter)?.label} Remedies
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRemedies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileCheck className="mb-2 h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium text-foreground">
                No remedies found
              </p>
              <p className="text-muted-foreground">
                {filter === "pending"
                  ? "All remedies have been reviewed"
                  : `No ${filter} remedies`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRemedies.map((remedy) => (
                <div
                  key={remedy.id}
                  className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/30"
                >
                  <div className="flex flex-col gap-4 lg:flex-row">
                    {/* Image */}
                    <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl lg:h-32 lg:w-48">
                      <Image
                        src={remedy.imageUrl}
                        alt={remedy.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {remedy.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className="rounded-full text-xs"
                            >
                              {remedy.category}
                            </Badge>
                            <Badge
                              className={cn(
                                "rounded-full text-xs capitalize",
                                getStatusColor(remedy.status)
                              )}
                            >
                              {getStatusIcon(remedy.status)}
                              <span className="ml-1">{remedy.status}</span>
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {remedy.description}
                          </p>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 shrink-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRemedy(remedy)
                                setReviewAction(null)
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            {remedy.status === "pending" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedRemedy(remedy)
                                    setReviewAction("approve")
                                  }}
                                  className="text-green-600"
                                >
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedRemedy(remedy)
                                    setReviewAction("reject")
                                  }}
                                  className="text-destructive"
                                >
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Meta Info */}
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{remedy.uploadedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(remedy.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                        {remedy.reviewedBy && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>Reviewed by {remedy.reviewedBy}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions for pending */}
                      {remedy.status === "pending" && (
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            className="rounded-full bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              setSelectedRemedy(remedy)
                              setReviewAction("approve")
                            }}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              setSelectedRemedy(remedy)
                              setReviewAction("reject")
                            }}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => {
                              setSelectedRemedy(remedy)
                              setReviewAction(null)
                            }}
                          >
                            View Full Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog
        open={!!selectedRemedy}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRemedy(null)
            setReviewNotes("")
            setReviewAction(null)
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {selectedRemedy && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedRemedy.title}
                  <Badge
                    className={cn(
                      "rounded-full text-xs capitalize",
                      getStatusColor(selectedRemedy.status)
                    )}
                  >
                    {selectedRemedy.status}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Submitted by {selectedRemedy.uploadedBy} on{" "}
                  {new Date(selectedRemedy.uploadedAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={selectedRemedy.imageUrl}
                    alt={selectedRemedy.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute right-2 top-2 rounded-full">
                    {selectedRemedy.category}
                  </Badge>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedRemedy.description}
                  </p>
                </div>

                {/* Ingredients */}
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Leaf className="h-4 w-4 text-green-600" />
                    Ingredients
                  </div>
                  <ul className="mt-2 space-y-1">
                    {selectedRemedy.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground before:content-['•'] before:mr-2 before:text-primary"
                      >
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <ListOrdered className="h-4 w-4 text-blue-600" />
                    Preparation Steps
                  </div>
                  <ol className="mt-2 space-y-2">
                    {selectedRemedy.steps.map((step, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Safety Notes */}
                {selectedRemedy.safetyNotes && (
                  <div className="rounded-lg bg-amber-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Shield className="h-4 w-4 text-amber-600" />
                      Safety Notes
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {selectedRemedy.safetyNotes}
                    </p>
                  </div>
                )}

                {/* Claimed Benefit */}
                {selectedRemedy.benefit && (
                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Heart className="h-4 w-4 text-green-600" />
                      Claimed Benefit
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {selectedRemedy.benefit}
                    </p>
                  </div>
                )}

                {/* Previous Review Notes */}
                {selectedRemedy.reviewNotes && (
                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Review Notes from {selectedRemedy.reviewedBy}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {selectedRemedy.reviewNotes}
                    </p>
                  </div>
                )}

                {/* Review Form */}
                {reviewAction && selectedRemedy.status === "pending" && (
                  <div className="space-y-4 border-t border-border pt-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Review Notes{" "}
                        <span className="text-muted-foreground">(optional)</span>
                      </label>
                      <Textarea
                        placeholder="Add any notes for the submitter or for your records..."
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                {selectedRemedy.status === "pending" ? (
                  reviewAction ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setReviewAction(null)}
                      >
                        Back
                      </Button>
                      <Button
                        className={cn(
                          reviewAction === "approve"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-destructive hover:bg-destructive/90"
                        )}
                        onClick={() => handleReview(reviewAction)}
                      >
                        {reviewAction === "approve" ? (
                          <>
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Confirm Approval
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-1 h-4 w-4" />
                            Confirm Rejection
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => setReviewAction("reject")}
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => setReviewAction("approve")}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                    </>
                  )
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRemedy(null)}
                  >
                    Close
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
