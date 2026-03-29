import Link from "next/link"
import { ArrowRight, Pill, Leaf, Sparkles, Activity, Hand } from "lucide-react"

const approaches = [
  {
    icon: Pill,
    title: "Allopathy",
    description: "Evidence-based modern medicine with quick symptom relief",
    color: "bg-blue-500",
  },
  {
    icon: Leaf,
    title: "Ayurveda",
    description: "Ancient Indian healing focusing on balance and prevention",
    color: "bg-green-500",
  },
  {
    icon: Sparkles,
    title: "Homeopathy",
    description: "Gentle healing through personalized natural remedies",
    color: "bg-teal-500",
  },
  {
    icon: Activity,
    title: "Naturopathy",
    description: "Harnessing the body's natural healing abilities",
    color: "bg-emerald-500",
  },
  {
    icon: Hand,
    title: "Acupuncture",
    description: "Traditional Chinese medicine for pain and wellness",
    color: "bg-orange-500",
  },
]

export function TreatmentApproaches() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
            Explore Diverse Treatment Approaches
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Compare and understand different healing systems to make informed decisions about your health
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {approaches.map((approach) => (
            <Link
              key={approach.title}
              href="/explore-pathy"
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${approach.color} transition-transform group-hover:scale-110`}
              >
                <approach.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">{approach.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {approach.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
