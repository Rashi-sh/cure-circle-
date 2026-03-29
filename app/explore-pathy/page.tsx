import { PathyCard } from "@/components/cards"
import { ComparisonTable } from "@/components/explore-pathy/comparison-table"
import { ExpertCTA } from "@/components/explore-pathy/expert-cta"
import { TherapyComparisonModal } from "@/components/explore-pathy/therapy-comparison-modal"
import { healingSystems } from "@/lib/data"
import { ExplorePathyWrapper } from "./explore-pathy-wrapper"

export const metadata = {
  title: "Explore-Pathy | CureCircle - Compare Healing Systems",
  description: "Compare different healing approaches including Allopathy, Ayurveda, Homeopathy, Naturopathy, and Acupuncture to make informed health decisions.",
}

export default function ExplorePathyPage() {
  return (
    <ExplorePathyWrapper>
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary via-background to-secondary/50 py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
            Explore-Pathy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Compare different healing approaches to make informed decisions
          </p>
        </div>
      </section>

      {/* Healing Systems Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {healingSystems.map((system) => (
              <PathyCard key={system.id} system={system} />
            ))}
          </div>
        </div>
      </section>

      {/* Therapy Comparison */}
      <section className="border-t border-border bg-secondary/30 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            Compare Any Two Therapies
          </h2>
          <div className="max-w-2xl rounded-2xl border border-border bg-card p-8">
            <TherapyComparisonModal therapies={healingSystems} />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Expert CTA */}
      <ExpertCTA />
    </ExplorePathyWrapper>
  )
}
