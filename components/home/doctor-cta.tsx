import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function DoctorCTA() {
  return (
    <section className="bg-secondary/50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-card">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="relative flex flex-col items-center gap-8 p-8 text-center lg:p-12">
            {/* Doctor Image */}
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-primary/20">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop"
                alt="Doctor consultation"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
                Find Specialists near you
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Verified doctors across all fields for you to consult. Use filtered search for best results. 
                Book online or visit in person.
              </p>
            </div>

            <Link href="/consult">
              <Button size="lg" className="rounded-full bg-primary px-8 hover:bg-primary/90">
                Find Doctor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
