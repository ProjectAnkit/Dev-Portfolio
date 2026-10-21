"use client"

import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { CursorFollower } from "@/components/cursor-follower"
import { LoadingScreen } from "@/components/loading-screen"
import { SiteNav } from "@/components/site-nav"
import { HeroEditorial } from "@/components/hero-editorial"
import { CapabilitySection } from "@/components/capability-section"
import { WorksSection } from "@/components/works-section"
import { ExperienceStrip } from "@/components/experience-strip"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <main className="min-h-screen text-[#16140F]" style={{ backgroundColor: "#FAFAF7" }}>
      <LoadingScreen />
      <SmoothScrollProvider>
        <div className="grain-overlay">
          <CursorFollower />
          <div className="relative z-10">
            <SiteNav />
            <HeroEditorial />
            <CapabilitySection />
            <WorksSection />
            <ExperienceStrip />
            <AboutSection />
            <TestimonialsSection />
            <SiteFooter />
          </div>
        </div>
      </SmoothScrollProvider>
    </main>
  )
}
