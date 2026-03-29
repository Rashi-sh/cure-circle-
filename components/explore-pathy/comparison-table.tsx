import { Check, X, Minus } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const comparisonData = [
  {
    feature: "Scientific Evidence",
    allopathy: "yes",
    homeopathy: "partial",
    ayurveda: "partial",
    naturopathy: "partial",
  },
  {
    feature: "Natural Ingredients",
    allopathy: "no",
    homeopathy: "yes",
    ayurveda: "yes",
    naturopathy: "yes",
  },
  {
    feature: "Quick Relief",
    allopathy: "yes",
    homeopathy: "no",
    ayurveda: "partial",
    naturopathy: "no",
  },
  {
    feature: "Preventive Focus",
    allopathy: "partial",
    homeopathy: "yes",
    ayurveda: "yes",
    naturopathy: "yes",
  },
  {
    feature: "Lifestyle Changes",
    allopathy: "no",
    homeopathy: "partial",
    ayurveda: "yes",
    naturopathy: "yes",
  },
  {
    feature: "Side Effects",
    allopathy: "Possible",
    homeopathy: "Minimal",
    ayurveda: "Minimal",
    naturopathy: "None",
  },
]

function StatusIcon({ status }: { status: string }) {
  if (status === "yes") {
    return <Check className="h-5 w-5 text-green-500" />
  }
  if (status === "no") {
    return <X className="h-5 w-5 text-red-500" />
  }
  if (status === "partial") {
    return <Minus className="h-5 w-5 text-muted-foreground" />
  }
  return <span className="text-sm text-muted-foreground">{status}</span>
}

export function ComparisonTable() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            Quick Comparison Table
          </h2>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Feature</TableHead>
                  <TableHead className="text-center font-semibold text-blue-600">
                    Allopathy
                  </TableHead>
                  <TableHead className="text-center font-semibold text-teal-600">
                    Homeopathy
                  </TableHead>
                  <TableHead className="text-center font-semibold text-green-600">
                    Ayurveda
                  </TableHead>
                  <TableHead className="text-center font-semibold text-emerald-600">
                    Naturopathy
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <StatusIcon status={row.allopathy} />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <StatusIcon status={row.homeopathy} />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <StatusIcon status={row.ayurveda} />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <StatusIcon status={row.naturopathy} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}
