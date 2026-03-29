"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"

const remedyCategories = [
  "Respiratory",
  "Digestive",
  "Skin Care",
  "Immunity",
  "Hair Care",
  "Pain Relief",
]

interface RemedyUploadModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function RemedyUploadModal({
  isOpen,
  onOpenChange,
}: RemedyUploadModalProps) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    ingredients: "",
    steps: "",
    safetyNotes: "",
    benefit: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !form.title ||
      !form.category ||
      !form.description ||
      !form.ingredients ||
      !form.steps
    ) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    onOpenChange(false)
    setForm({
      title: "",
      category: "",
      description: "",
      ingredients: "",
      steps: "",
      safetyNotes: "",
      benefit: "",
    })

    toast.success(
      "Your remedy has been submitted for review! It will be published after approval by our medical team."
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Submit a Home Remedy</DialogTitle>
          <DialogDescription>
            Share your traditional remedy with the community. All submissions
            are reviewed by our medical team before publication.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="remedy-title">Remedy Title *</Label>
            <Input
              id="remedy-title"
              placeholder="e.g., Ginger Tea for Cold Relief"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remedy-category">Category *</Label>
            <Select
              value={form.category}
              onValueChange={(value) =>
                setForm({ ...form, category: value })
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {remedyCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remedy-description">Description *</Label>
            <Textarea
              id="remedy-description"
              placeholder="Briefly describe what this remedy is for..."
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="rounded-xl"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remedy-ingredients">
              Ingredients * (one per line)
            </Label>
            <Textarea
              id="remedy-ingredients"
              placeholder="1 tsp ginger
1 cup water
1 tsp honey"
              value={form.ingredients}
              onChange={(e) =>
                setForm({
                  ...form,
                  ingredients: e.target.value,
                })
              }
              className="rounded-xl"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remedy-steps">
              Preparation Steps * (one per line)
            </Label>
            <Textarea
              id="remedy-steps"
              placeholder="Boil water
Add ginger and simmer for 5 minutes
Strain and add honey"
              value={form.steps}
              onChange={(e) =>
                setForm({ ...form, steps: e.target.value })
              }
              className="rounded-xl"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remedy-benefit">Claimed Benefit</Label>
            <Input
              id="remedy-benefit"
              placeholder="e.g., Relieves cold symptoms and sore throat"
              value={form.benefit}
              onChange={(e) =>
                setForm({ ...form, benefit: e.target.value })
              }
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remedy-safety">Safety Notes</Label>
            <Textarea
              id="remedy-safety"
              placeholder="Any precautions or warnings..."
              value={form.safetyNotes}
              onChange={(e) =>
                setForm({
                  ...form,
                  safetyNotes: e.target.value,
                })
              }
              className="rounded-xl"
              rows={2}
            />
          </div>

          {!user && (
            <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
              <AlertTriangle className="mr-2 inline h-4 w-4" />
              You are submitting as a guest. Sign in to track your submissions.
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit for Review"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
