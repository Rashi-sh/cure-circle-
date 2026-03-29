"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Eye } from "lucide-react"
import { toast } from "sonner"
import type { ModeratableRemedy } from "@/lib/types"

interface RemedyApprovalListProps {
  remedies: ModeratableRemedy[]
}

export function RemedyApprovalList({ remedies }: RemedyApprovalListProps) {
  const [selectedRemedy, setSelectedRemedy] = useState<ModeratableRemedy | null>(
    null
  )
  const [reviewNotes, setReviewNotes] = useState("")
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)

  const pendingRemedies = useMemo(() => {
    return remedies.filter((r) => r.status === "pending")
  }, [remedies])

  const handleApprove = () => {
    if (!selectedRemedy) return
    toast.success(`Remedy "${selectedRemedy.title}" approved!`)
    setSelectedRemedy(null)
    setReviewNotes("")
    setActionType(null)
  }

  const handleReject = () => {
    if (!selectedRemedy) return
    if (!reviewNotes.trim()) {
      toast.error("Please provide feedback for rejection")
      return
    }
    toast.success(`Remedy "${selectedRemedy.title}" rejected with feedback`)
    setSelectedRemedy(null)
    setReviewNotes("")
    setActionType(null)
  }

  if (pendingRemedies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Remedy Approvals</CardTitle>
          <CardDescription>
            All submitted remedies have been reviewed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No pending remedies to review</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Remedy Approvals</CardTitle>
          <CardDescription>
            {pendingRemedies.length} remedy{pendingRemedies.length !== 1 ? "ies" : ""} awaiting review
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingRemedies.map((remedy) => (
            <div
              key={remedy.id}
              className="flex items-start justify-between rounded-lg border border-border p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {remedy.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {remedy.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline">{remedy.category}</Badge>
                      <Badge variant="secondary">
                        Submitted by {remedy.uploadedBy}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRemedy(remedy)}
                className="ml-4 shrink-0"
              >
                <Eye className="mr-2 h-4 w-4" />
                Review
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedRemedy && (
        <Dialog
          open={!!selectedRemedy}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedRemedy(null)
              setReviewNotes("")
              setActionType(null)
            }
          }}
        >
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Review Remedy: {selectedRemedy.title}</DialogTitle>
              <DialogDescription>
                Review the submission details and approve or reject
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground">Description</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedRemedy.description}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground">Category</h4>
                <Badge className="mt-1">{selectedRemedy.category}</Badge>
              </div>

              <div>
                <h4 className="font-semibold text-foreground">Ingredients</h4>
                <ul className="mt-2 space-y-1">
                  {selectedRemedy.ingredients.map((ing, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      • {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground">Preparation Steps</h4>
                <ol className="mt-2 space-y-1">
                  {selectedRemedy.steps.map((step, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {idx + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>

              {selectedRemedy.safetyNotes && (
                <div>
                  <h4 className="font-semibold text-foreground">Safety Notes</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedRemedy.safetyNotes}
                  </p>
                </div>
              )}

              {actionType === "reject" && (
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback for Rejection *</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Explain why this remedy is being rejected..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={3}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedRemedy(null)
                  setReviewNotes("")
                  setActionType(null)
                }}
              >
                Cancel
              </Button>

              {actionType === null && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => setActionType("reject")}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => setActionType("approve")}>
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}

              {actionType === "approve" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setActionType(null)}
                  >
                    Back
                  </Button>
                  <Button onClick={handleApprove}>
                    <Check className="mr-2 h-4 w-4" />
                    Confirm Approval
                  </Button>
                </>
              )}

              {actionType === "reject" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setActionType(null)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleReject}
                    disabled={!reviewNotes.trim()}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Confirm Rejection
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
