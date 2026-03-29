import { Navbar, Footer } from "@/components/layout"
import { Shield, Heart, Users, Sparkles, Award, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "About CureCircle | Bridging Traditional & Modern Healthcare",
  description:
    "Learn about CureCircle's mission to create a holistic healing ecosystem connecting patients with verified practitioners across diverse healing systems.",
}

const coreValues = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "Every doctor on our platform is thoroughly verified. We prioritize patient safety above all else, ensuring all remedies are doctor-approved and evidence-based.",
    color: "bg-primary",
  },
  {
    icon: Heart,
    title: "Holistic Care",
    description:
      "We recognize that true wellness encompasses physical, mental, and emotional health. Our platform offers a comprehensive approach to healing that honors this interconnection.",
    color: "bg-primary",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Healing happens in community. We foster a supportive environment where patients and practitioners can share experiences, learn from each other, and grow together.",
    color: "bg-pink-500",
  },
]

const differentiators = [
  {
    icon: Sparkles,
    title: "Multi-System Approach",
    description:
      "Compare and choose from multiple healing systems in one place—Allopathy, Ayurveda, Homeopathy, Naturopathy, and more.",
  },
  {
    icon: Award,
    title: "Verified Expertise",
    description:
      "All healthcare providers undergo rigorous verification to ensure you receive care from qualified professionals.",
  },
  {
    icon: Leaf,
    title: "Traditional Wisdom",
    description:
      "Access thousands of doctor-approved home remedies (Dadi-ke-Nuskhe) rooted in generations of traditional knowledge.",
  },
  {
    icon: Heart,
    title: "Special Care Programs",
    description:
      "Dedicated Mom & Baby Hub for pregnancy, postpartum care, and early childhood development support.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary via-background to-secondary/50 py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-foreground lg:text-5xl">
              About <span className="text-primary">CureCircle</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Bridging the gap between traditional wisdom and modern medicine to
              create a holistic healing ecosystem for everyone
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 lg:p-12">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                At CureCircle, we believe that healing is not one-size-fits-all.
                Our mission is to empower individuals to make informed healthcare
                choices by connecting them with verified practitioners across
                diverse healing systems—from modern allopathy to time-tested
                Ayurveda, homeopathy, and beyond.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We&apos;re building a community where traditional knowledge meets
                scientific validation, where patients can explore multiple
                treatment approaches, and where healthcare providers can share
                their expertise to benefit millions.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-foreground lg:text-3xl">
              Our Core Values
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${value.color}`}
                  >
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="gradient-primary rounded-3xl p-8 lg:p-12">
              <h2 className="text-center text-2xl font-bold text-white lg:text-3xl">
                What Makes Us Different
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-white/90">
                CureCircle stands apart in the healthcare landscape
              </p>

              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {differentiators.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-white/10 p-6"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-6 w-6 text-white" />
                      <h3 className="font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-white/80">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl border border-border bg-card p-8 text-center lg:p-12">
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
                Join Our Community
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Whether you&apos;re a patient seeking holistic care or a healthcare
                provider wanting to share your expertise, CureCircle welcomes you
                to be part of this healing revolution.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="rounded-full bg-primary px-8 hover:bg-primary/90"
                  >
                    Get Started as a Patient
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-primary px-8 text-primary hover:bg-primary/10"
                  >
                    Join as a Doctor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
