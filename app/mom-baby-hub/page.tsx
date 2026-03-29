"use client"

import { useState } from "react"
import { Navbar, Footer } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Baby, 
  Calendar, 
  Award, 
  Phone, 
  BookOpen, 
  Users,
  Heart
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function MomBabyHubPage() {
  const [activeTab, setActiveTab] = useState<"mom" | "baby">("mom")

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-maternal/10">
        {/* Hero Section */}
        <section className="gradient-maternal py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <Baby className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white lg:text-3xl">
                  Mom & Baby Hub
                </h1>
                <p className="text-white/90">
                  Your pregnancy and postpartum companion
                </p>
              </div>
            </div>

            {/* Week Tracker */}
            <div className="mt-8 rounded-2xl bg-white/20 p-6">
              <p className="text-sm text-white/80">Week 14</p>
              <h2 className="text-xl font-bold text-white">Baby is now 14 cm</h2>
              <p className="text-white/80">About the size of a bell pepper</p>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-4">
              <Button
                variant={activeTab === "mom" ? "default" : "outline"}
                className={cn(
                  "rounded-full px-8",
                  activeTab === "mom" 
                    ? "bg-maternal text-white hover:bg-maternal/90" 
                    : "border-maternal text-maternal-foreground hover:bg-maternal/10"
                )}
                onClick={() => setActiveTab("mom")}
              >
                For Mom
              </Button>
              <Button
                variant={activeTab === "baby" ? "default" : "outline"}
                className={cn(
                  "rounded-full px-8",
                  activeTab === "baby"
                    ? "bg-maternal text-white hover:bg-maternal/90"
                    : "border-maternal text-maternal-foreground hover:bg-maternal/10"
                )}
                onClick={() => setActiveTab("baby")}
              >
                For Baby
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="pb-12 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* AI Trimester Tracker */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-maternal">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    AI Trimester Tracker
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get personalized insights and milestones for your pregnancy journey
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-4">
                    <span className="text-sm text-muted-foreground">
                      Current Trimester
                    </span>
                    <span className="font-medium text-maternal-foreground">
                      Second (Week 14)
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-4">
                    <span className="text-sm text-muted-foreground">
                      Next Checkup
                    </span>
                    <span className="font-medium text-maternal-foreground">
                      In 2 weeks
                    </span>
                  </div>
                </div>

                <Button className="mt-6 w-full rounded-xl bg-maternal text-white hover:bg-maternal/90">
                  View Full Timeline
                </Button>
              </div>

              {/* Government Schemes */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    Government Schemes
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Access information about available maternal benefits and programs
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <h4 className="font-medium text-foreground">
                      Pradhan Mantri Matru Vandana Yojana
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Financial assistance for pregnant women
                    </p>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <h4 className="font-medium text-foreground">
                      Janani Suraksha Yojana
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Safe motherhood intervention
                    </p>
                  </div>
                </div>

                <Button className="mt-6 w-full rounded-xl bg-primary hover:bg-primary/90">
                  Explore All Schemes
                </Button>
              </div>
            </div>

            {/* Lactation Support */}
            <div className="mt-6 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Lactation Support
                </h3>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center rounded-xl bg-secondary/50 p-4 text-center">
                  <Phone className="h-8 w-8 text-purple-500" />
                  <h4 className="mt-2 font-medium text-foreground">24/7 Helpline</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with lactation consultants anytime
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-secondary/50 p-4 text-center">
                  <BookOpen className="h-8 w-8 text-purple-500" />
                  <h4 className="mt-2 font-medium text-foreground">Expert Guides</h4>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step breastfeeding resources
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-secondary/50 p-4 text-center">
                  <Users className="h-8 w-8 text-primary" />
                  <h4 className="mt-2 font-medium text-foreground">Community</h4>
                  <p className="text-sm text-muted-foreground">
                    Share experiences with other moms
                  </p>
                </div>
              </div>
            </div>

            {/* Postpartum Care Tips */}
            <div className="mt-6 rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground">
                Postpartum Care Tips
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-blue-50 p-4">
                  <h4 className="font-medium text-foreground">Rest & Recovery</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Take adequate rest. Sleep when the baby sleeps and don&apos;t hesitate to ask for help.
                  </p>
                </div>
                <div className="rounded-xl bg-green-50 p-4">
                  <h4 className="font-medium text-foreground">Nutrition</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Eat nutritious meals. Include foods rich in protein, iron, and calcium.
                  </p>
                </div>
                <div className="rounded-xl bg-purple-50 p-4">
                  <h4 className="font-medium text-foreground">Emotional Well-being</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Monitor your mental health. Postpartum mood changes are normal but seek help if needed.
                  </p>
                </div>
                <div className="rounded-xl bg-amber-50 p-4">
                  <h4 className="font-medium text-foreground">Physical Activity</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Start with gentle walks. Gradually increase activity after doctor&apos;s approval.
                  </p>
                </div>
              </div>
            </div>

            {/* Ayurvedic Wellness */}
            <div className="mt-6 rounded-2xl border border-border bg-yellow-50 p-6">
              <h3 className="text-lg font-bold text-foreground">
                Ayurvedic Wellness
              </h3>

              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div>
                  <h4 className="font-medium text-foreground">Stress Relief</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>• Warm milk with turmeric before bed</li>
                    <li>• Gentle yoga and meditation</li>
                    <li>• Abhyanga (oil massage)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Immunity Boosters</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>• Chyawanprash (1 tsp daily)</li>
                    <li>• Tulsi tea with ginger</li>
                    <li>• Ghee in warm milk</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Postpartum Diet</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>• Warm, cooked foods</li>
                    <li>• Ghee and healthy fats</li>
                    <li>• Avoiding cold, raw foods</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
