"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookConsultationModal } from "@/components/consultation"

export function ExpertCTA() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="gradient-primary rounded-3xl p-8 text-center lg:p-12">
          <h2 className="text-2xl font-bold text-white lg:text-3xl">
            Need Help Choosing?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Our healthcare experts can guide you to the most suitable treatment approach for your condition
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <BookConsultationModal
              trigger={
                <Button
                  size="lg"
                  className="rounded-full bg-white px-8 text-primary hover:bg-white/90"
                >
                  Book Now
                </Button>
              }
            />
            <Link href="/consult">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-white border-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
