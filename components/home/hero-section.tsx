import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl xl:text-6xl">
              <span className="text-balance">Care That Connects,</span>
              <br />
              <span className="text-primary">Healing That Lasts</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
              Discover the perfect balance between traditional wisdom and modern medicine. 
              Connect with verified doctors across diverse healing systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/remedies">
                <Button size="lg" className="rounded-full bg-primary px-8 hover:bg-primary/90">
                  Explore Remedies
                </Button>
              </Link>
              <Link href="/consult">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary px-8 text-primary hover:bg-primary/10"
                >
                  Book Consultation
                </Button>
              </Link>
              <Link href="/mom-baby-hub">
                <Button
                  size="lg"
                  className="rounded-full bg-maternal px-8 text-maternal-foreground hover:bg-maternal/90"
                >
                  Mom & Baby Hub
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
              {/* Decorative frame */}
              <div className="absolute inset-4 rounded-3xl border-4 border-primary bg-card shadow-2xl shadow-primary/10 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=600&fit=crop"
                  alt="Healthcare professionals providing care"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Trust badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-2xl bg-card p-4 shadow-xl border border-border">
                <p className="text-xs text-muted-foreground">Trusted by</p>
                <p className="text-2xl font-bold text-primary">10,000+</p>
                <p className="text-sm text-muted-foreground">Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
