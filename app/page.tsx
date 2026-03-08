"use client"

import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { CursorFollower } from "@/components/cursor-follower"
import { XPSystem } from "@/components/xp-system"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { TimelineSection } from "@/components/timeline-section"
import { ContactSection } from "@/components/contact-section"
import { CinematicBackground } from "@/components/cinematic-background"
import { LoadingScreen } from "@/components/loading-screen"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E8E8E8] selection:bg-cyan-500/30">
      <LoadingScreen />
      <SmoothScrollProvider>
        <CinematicBackground />
        
        {/* Dark overlay to ensure text readability over the complex 3D background */}
        <div className="fixed inset-0 bg-black/65 z-[5] pointer-events-none" />
        
        <div className="grain-overlay">
          <CursorFollower />
          <XPSystem />
          <div className="relative z-10">
            <HeroSection />
            <ProjectsSection />
            <SkillsSection />
            <TimelineSection />
            <ContactSection />
          </div>
        </div>
      </SmoothScrollProvider>
    </main>
  )
}
