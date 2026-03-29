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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, X } from "lucide-react"
import type { HealingSystem } from "@/components/cards/pathy-card"

interface TherapyComparisonModalProps {
  therapies: HealingSystem[]
}

export function TherapyComparisonModal({ therapies }: TherapyComparisonModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [therapy1Id, setTherapy1Id] = useState<string>("")
  const [therapy2Id, setTherapy2Id] = useState<string>("")

  const therapy1 = therapies.find((t) => t.id === therapy1Id)
  const therapy2 = therapies.find((t) => t.id === therapy2Id)

  const handleCompare = () => {
    if (therapy1Id && therapy2Id && therapy1Id !== therapy2Id) {
      setIsOpen(true)
    }
  }

  const availableTherapies = therapies.filter(
    (t) => t.id !== therapy1Id && t.id !== therapy2Id
  )

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Compare Therapies</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Therapy</label>
            <Select value={therapy1Id} onValueChange={setTherapy1Id}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Select therapy" />
              </SelectTrigger>
              <SelectContent>
                {therapies.map((therapy) => (
                  <SelectItem key={therapy.id} value={therapy.id}>
                    {therapy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Second Therapy</label>
            <Select value={therapy2Id} onValueChange={setTherapy2Id}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Select therapy" />
              </SelectTrigger>
              <SelectContent>
                {therapies.map((therapy) => (
                  <SelectItem key={therapy.id} value={therapy.id}>
                    {therapy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleCompare}
          disabled={!therapy1Id || !therapy2Id || therapy1Id === therapy2Id}
          className="w-full rounded-lg"
        >
          Compare
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {therapy1?.name} vs {therapy2?.name}
            </DialogTitle>
            <DialogDescription>
              Detailed comparison of these healing approaches
            </DialogDescription>
          </DialogHeader>

          {therapy1 && therapy2 && (
            <div className="space-y-6">
              {/* Principles */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Principles</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{therapy1.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {therapy1.principles.map((p, idx) => (
                          <li key={idx} className="flex gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{therapy2.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {therapy2.principles.map((p, idx) => (
                          <li key={idx} className="flex gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Approach */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Approach</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-4">
                      <ul className="space-y-2">
                        {therapy1.approach.map((a, idx) => (
                          <li key={idx} className="flex gap-2 text-sm">
                            <span className="text-primary">→</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <ul className="space-y-2">
                        {therapy2.approach.map((a, idx) => (
                          <li key={idx} className="flex gap-2 text-sm">
                            <span className="text-primary">→</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Best For */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Best For</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-4">
                      <ul className="space-y-2">
                        {therapy1.bestFor.map((b, idx) => (
                          <li key={idx} className="flex gap-2 text-sm">
                            <Badge variant="secondary" className="shrink-0">
                              {b}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <ul className="space-y-2">
                        {therapy2.bestFor.map((b, idx) => (
                          <li key={idx} className="flex gap-2 text-sm">
                            <Badge variant="secondary" className="shrink-0">
                              {b}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Key Metrics */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Metrics</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Side Effects:</span>
                        <Badge variant="outline">{therapy1.sideEffects}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Time Frame:</span>
                        <Badge variant="outline">{therapy1.timeFrame}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Cost:</span>
                        <Badge variant="outline">{therapy1.cost}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Prevention:</span>
                        <Badge variant="outline">{therapy1.prevention}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Side Effects:</span>
                        <Badge variant="outline">{therapy2.sideEffects}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Time Frame:</span>
                        <Badge variant="outline">{therapy2.timeFrame}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Cost:</span>
                        <Badge variant="outline">{therapy2.cost}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Prevention:</span>
                        <Badge variant="outline">{therapy2.prevention}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
