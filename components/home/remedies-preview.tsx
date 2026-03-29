import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Eye, ArrowRight } from "lucide-react"

const featuredRemedies = [
  {
    id: "1",
    title: "Herbal Cough Relief",
    description: "A soothing mix of tulsi and honey to calm coughs and sore throat.",
    imageUrl: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=300&h=200&fit=crop",
    likes: "1.2k",
    views: "8.4k",
  },
  {
    id: "2",
    title: "Digestive Tonic",
    description: "Warm ginger and lemon drink to aid digestion and reduce bloating.",
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop",
    likes: "980",
    views: "6.1k",
  },
]

export function RemediesPreview() {
  return (
    <section className="bg-card py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary lg:text-3xl">HOME REMEDIES</h2>
            <p className="text-primary/80">DADI-KE-NUSKHE</p>
            <p className="mt-2 text-muted-foreground">
              Time-tested home remedies based on traditional wisdom.
            </p>
          </div>
          <Link href="/remedies">
            <Button className="rounded-full bg-primary hover:bg-primary/90">
              View All Remedies
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featuredRemedies.map((remedy) => (
            <div
              key={remedy.id}
              className="group flex gap-4 rounded-2xl border border-border bg-background p-4 transition-all hover:shadow-lg"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={remedy.imageUrl}
                  alt={remedy.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{remedy.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {remedy.description}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {remedy.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {remedy.views}
                    </span>
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
          ))}
        </div>
      </div>
    </section>
  )
}
