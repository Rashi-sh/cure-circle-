import { Navbar, Footer } from "@/components/layout"
import { HeroSection } from "@/components/home/hero-section"
import { TreatmentApproaches } from "@/components/home/treatment-approaches"
import { RemediesPreview } from "@/components/home/remedies-preview"
import { DoctorCTA } from "@/components/home/doctor-cta"
import { FAQSection } from "@/components/home/faq-section"
import { WhyChooseUs } from "@/components/home/why-choose-us"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TreatmentApproaches />
        <RemediesPreview />
        <DoctorCTA />
        <FAQSection />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  )
}
