"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Search } from "lucide-react"

const faqs = [
  {
    question: "About us",
    answer:
      "CureCircle is an integrated digital health platform for India that simplifies fragmented healthcare access. We help users explore and compare multiple treatment systems including Allopathy, Ayurveda, Homeopathy, and more.",
  },
  {
    question: "Patient care and Service",
    answer:
      "We provide verified doctor consultations, home remedies, maternal care support, and a comprehensive health vault for managing your medical records securely.",
  },
  {
    question: "Emergency Support",
    answer:
      "Our Emergency SOS feature connects you instantly with nearby hospitals and ambulance services. You can also set up emergency contacts for quick alerts.",
  },
  {
    question: "Clinical Outcomes",
    answer:
      "All our treatment recommendations are based on verified medical expertise. We ensure patients receive quality care backed by scientific evidence and traditional wisdom.",
  },
]

export function FAQSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=450&fit=crop"
              alt="Doctor providing virtual consultation"
              fill
              className="object-cover"
            />
          </div>

          {/* FAQ Content */}
          <div>
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
              Feel Free to ask us
            </h2>
            <p className="mt-2 text-muted-foreground">
              We&apos;re here to answer common questions about our services and care.
            </p>

            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button className="mt-6 rounded-full bg-primary hover:bg-primary/90">
              <Search className="mr-2 h-4 w-4" />
              Ask Your Question
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
