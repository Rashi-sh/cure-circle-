import { Heart, Leaf, Users } from "lucide-react"

const reasons = [
  {
    icon: Heart,
    title: "Verified Doctors",
    description: "All healthcare providers are thoroughly verified and certified",
    color: "bg-primary",
  },
  {
    icon: Leaf,
    title: "Holistic Approach",
    description: "Combining traditional wisdom with modern medical practices",
    color: "bg-primary",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Share experiences and learn from a supportive community",
    color: "bg-primary",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-maternal/20 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-foreground lg:text-3xl">
          Why Choose CureCircle?
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${reason.color}`}
              >
                <reason.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">{reason.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
