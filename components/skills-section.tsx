"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    name: "React / Next.js",
    level: 97,
    detail: "Server components, streaming, edge rendering, ISR, middleware, and the full React 19 ecosystem.",
  },
  {
    name: "TypeScript",
    level: 95,
    detail: "Advanced generics, discriminated unions, type-safe APIs, and compiler-level optimizations.",
  },
  {
    name: "Animation / GSAP",
    level: 92,
    detail: "ScrollTrigger, SplitText, complex timelines, physics-based motion, and 60fps performance.",
  },
  {
    name: "CSS Architecture",
    level: 94,
    detail: "Tailwind CSS, design tokens, custom properties, container queries, and fluid typography.",
  },
  {
    name: "Three.js / WebGL",
    level: 85,
    detail: "React Three Fiber, custom shaders, post-processing, and interactive 3D web experiences.",
  },
  {
    name: "Performance",
    level: 96,
    detail: "Core Web Vitals mastery, bundle optimization, lazy loading, and sub-second TTI targets.",
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
          )
        },
        once: true,
      })

      // Stagger card reveals
      const cards = cardsContainerRef.current?.querySelectorAll(".skill-card")
      if (cards) {
        ScrollTrigger.create({
          trigger: cardsContainerRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 60, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
              }
            )
          },
          once: true,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025 }}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={`sv-${i}`} className="absolute top-0 bottom-0 w-px" style={{ left: `${(i + 1) * (100 / 12)}%`, backgroundColor: "#E8E8E8" }} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={`sh-${i}`} className="absolute left-0 right-0 h-px" style={{ top: `${(i + 1) * (100 / 8)}%`, backgroundColor: "#E8E8E8" }} />
        ))}
      </div>
      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-8 h-8 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: "rgba(0,240,255,0.3)" }} />
        <div className="absolute top-0 left-0 w-px h-full" style={{ backgroundColor: "rgba(0,240,255,0.3)" }} />
      </div>
      <div className="absolute bottom-6 right-6 w-8 h-8 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-px" style={{ backgroundColor: "rgba(0,240,255,0.3)" }} />
        <div className="absolute bottom-0 right-0 w-px h-full" style={{ backgroundColor: "rgba(0,240,255,0.3)" }} />
      </div>

      {/* Marquee background text */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-[12rem] md:text-[18rem] font-sans font-bold uppercase mx-8 select-none"
              style={{ color: "rgba(255,255,255,0.015)" }}
            >
              SKILLS
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-6 sm:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "#00F0FF" }} />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: "#00F0FF" }}>
              Skill Unlock Zone
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-4" style={{ color: "#E8E8E8" }}>
            Expertise
          </h2>
          <p className="text-sm font-mono max-w-lg" style={{ color: "#666666" }}>
            Hover to reveal deeper details. Each skill represents years of deliberate practice and production-grade experience.
          </p>
        </div>

        {/* Skills grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ skill }: { skill: (typeof skills)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    gsap.to(card, {
      rotateY: (x - 0.5) * 12,
      rotateX: (0.5 - y) * 12,
      duration: 0.4,
      ease: "power2.out",
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!hasAnimated.current && barRef.current) {
      hasAnimated.current = true
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        { width: `${skill.level}%`, duration: 1.2, ease: "power3.out" }
      )
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current && barRef.current) {
            hasAnimated.current = true
            gsap.fromTo(
              barRef.current,
              { width: "0%" },
              { width: `${skill.level}%`, duration: 1.2, ease: "power3.out", delay: 0.3 }
            )
          }
        })
      },
      { threshold: 0.5 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [skill.level])

  return (
    <div
      ref={cardRef}
      className="skill-card group relative border rounded-lg p-6 transition-colors duration-500"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "800px",
        borderColor: isHovered ? "rgba(0,240,255,0.15)" : "rgba(255,255,255,0.06)",
        backgroundColor: "#111111",
        opacity: 0,
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0,240,255,0.06), transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-sans font-semibold" style={{ color: "#E8E8E8" }}>
            {skill.name}
          </h3>
          <span className="text-xs font-mono" style={{ color: "#00F0FF" }}>
            {skill.level}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-px mb-4 relative" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
          <div
            ref={barRef}
            className="h-full"
            style={{
              width: "0%",
              backgroundColor: "#00F0FF",
              boxShadow: "0 0 8px rgba(0,240,255,0.4)",
            }}
          />
        </div>

        {/* Detail (revealed on hover) */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isHovered ? "120px" : "0px",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <p className="text-xs leading-relaxed pt-2" style={{ color: "#666666" }}>
            {skill.detail}
          </p>
        </div>
      </div>
    </div>
  )
}
