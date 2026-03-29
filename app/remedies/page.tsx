"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, Check, AlertTriangle, BadgeCheck, Plus, Loader2 } from "lucide-react"
import { mockModeratableRemedies } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import { ThumbsUp, MessageCircle, Share2, ArrowRight } from "lucide-react"

const remedyCategories = [
  "All",
  "Respiratory",
  "Digestive",
  "Skin Care",
  "Immunity",
  "Hair Care",
  "Pain Relief",
]

export default function RemediesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitForm, setSubmitForm] = useState({
    title: "",
    category: "",
    description: "",
    ingredients: "",
    steps: "",
    safetyNotes: "",
    benefit: "",
  })

  // Only show approved remedies to public
  const approvedRemedies = useMemo(() => {
    return mockModeratableRemedies.filter((r) => r.status === "approved" && r.isPublic)
  }, [])

  const filteredRemedies = approvedRemedies.filter((remedy) => {
    const matchesSearch = remedy.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || remedy.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!submitForm.title || !submitForm.category || !submitForm.description || !submitForm.ingredients || !submitForm.steps) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitOpen(false)
    setSubmitForm({
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

  const categoryColors: Record<string, string> = {
    Respiratory: "bg-blue-500",
    "Skin Care": "bg-emerald-500",
    Digestive: "bg-amber-500",
    Immunity: "bg-green-500",
    "Hair Care": "bg-purple-500",
    "Pain Relief": "bg-red-500",
    default: "bg-primary",
  }

  return (
    <>
        {/* Header */}
        <section className="bg-gradient-to-br from-secondary via-background to-secondary/50 py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
              HOME REMEDIES
            </h1>
            <p className="text-lg font-medium text-primary">DADI-KE-NUSKHE</p>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Doctor-approved traditional remedies passed down through generations
            </p>
            <Badge className="mt-4 gap-1 rounded-full bg-green-100 text-green-700">
              <BadgeCheck className="h-3 w-3" />
              All remedies verified by medical professionals
            </Badge>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="border-b border-border bg-card py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for remedies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full bg-primary hover:bg-primary/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Submit Remedy
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Submit a Home Remedy</DialogTitle>
                      <DialogDescription>
                        Share your traditional remedy with the community. All submissions are reviewed by our medical team before publication.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="remedy-title">Remedy Title *</Label>
                        <Input
                          id="remedy-title"
                          placeholder="e.g., Ginger Tea for Cold Relief"
                          value={submitForm.title}
                          onChange={(e) =>
                            setSubmitForm({ ...submitForm, title: e.target.value })
                          }
                          className="rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="remedy-category">Category *</Label>
                        <Select
                          value={submitForm.category}
                          onValueChange={(value) =>
                            setSubmitForm({ ...submitForm, category: value })
                          }
                        >
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {remedyCategories.slice(1).map((cat) => (
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
                          value={submitForm.description}
                          onChange={(e) =>
                            setSubmitForm({
                              ...submitForm,
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
                          value={submitForm.ingredients}
                          onChange={(e) =>
                            setSubmitForm({
                              ...submitForm,
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
                          value={submitForm.steps}
                          onChange={(e) =>
                            setSubmitForm({ ...submitForm, steps: e.target.value })
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
                          value={submitForm.benefit}
                          onChange={(e) =>
                            setSubmitForm({ ...submitForm, benefit: e.target.value })
                          }
                          className="rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="remedy-safety">Safety Notes</Label>
                        <Textarea
                          id="remedy-safety"
                          placeholder="Any precautions or warnings..."
                          value={submitForm.safetyNotes}
                          onChange={(e) =>
                            setSubmitForm({
                              ...submitForm,
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
                          onClick={() => setIsSubmitOpen(false)}
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
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>
          </div>
        </section>
      </>
    )
}
