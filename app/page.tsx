"use client"

import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { CursorFollower } from "@/components/cursor-follower"
import { XPSystem } from "@/components/xp-system"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { TimelineSection } from "@/components/timeline-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="grain-overlay">
        <CursorFollower />
        <XPSystem />
        <main>
          <HeroSection />
          <ProjectsSection />
          <SkillsSection />
          <TimelineSection />
          <ContactSection />
        </main>
      </div>
    </SmoothScrollProvider>
  )
}
