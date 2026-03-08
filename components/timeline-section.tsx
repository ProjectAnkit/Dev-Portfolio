"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: "2026",
    title: "Senior Frontend Engineer",
    company: "Leading AI Startup",
    description: "Architecting next-gen AI interfaces with real-time streaming, adaptive layouts, and sub-100ms interactions.",
  },
  {
    year: "2024",
    title: "Frontend Lead",
    company: "Design Studio",
    description: "Led a team of 6 engineers building award-winning interactive experiences for global brands.",
  },
  {
    year: "2022",
    title: "Full-Stack Developer",
    company: "SaaS Platform",
    description: "Built and scaled a dashboard product from 0 to 50k users with complex real-time data visualization.",
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "Creative Agency",
    description: "Shipped 30+ production websites with a focus on animation, performance, and accessibility.",
  },
  {
    year: "2018",
    title: "The Beginning",
    company: "Self-taught",
    description: "Wrote my first line of JavaScript and fell in love with building things for the web.",
  },
]

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const milestonesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches

      if (isMobile) {
        gsap.set(headerRef.current, { opacity: 0, y: 40 })
        gsap.set(lineRef.current, { scaleY: 0 })

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 82%",
          onEnter: () => {
            gsap.to(headerRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            })
          },
          once: true,
        })

        if (lineRef.current) {
          gsap.to(lineRef.current, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.8,
            },
          })
        }

        milestonesRef.current.forEach((milestone) => {
          if (!milestone) return
          gsap.set(milestone, { opacity: 0, y: 30 })

          ScrollTrigger.create({
            trigger: milestone,
            start: "top 88%",
            onEnter: () => {
              gsap.to(milestone, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
              })

              const dot = milestone.querySelector(".milestone-dot")
              if (dot) {
                gsap.fromTo(
                  dot,
                  { scale: 0 },
                  {
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.8)",
                    delay: 0.12,
                  }
                )
              }
            },
            once: true,
          })
        })

        return
      }

      // Header
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

      // Animated progress line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 40%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        )
      }

      // Milestone reveals
      milestonesRef.current.forEach((milestone, i) => {
        if (!milestone) return

        ScrollTrigger.create({
          trigger: milestone,
          start: "top 75%",
          onEnter: () => {
            gsap.fromTo(
              milestone,
              { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
              { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
            )

            // Glow the dot
            const dot = milestone.querySelector(".milestone-dot")
            if (dot) {
              gsap.fromTo(
                dot,
                { scale: 0 },
                {
                  scale: 1,
                  duration: 0.6,
                  ease: "elastic.out(1, 0.5)",
                  delay: 0.2,
                }
              )
            }
          },
          once: true,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">

      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-8 h-8 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: "rgba(0,240,255,0.3)" }} />
        <div className="absolute top-0 left-0 w-px h-full" style={{ backgroundColor: "rgba(0,240,255,0.3)" }} />
      </div>
      <div className="absolute bottom-6 right-6 w-8 h-8 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-px" style={{ backgroundColor: "rgba(0,240,255,0.3)" }} />
        <div className="absolute bottom-0 right-0 w-px h-full" style={{ backgroundColor: "rgba(0,240,255,0.3)" }} />
      </div>

      <div className="relative z-10 px-6 sm:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "#00F0FF" }} />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: "#00F0FF" }}>
              The Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight" style={{ color: "#E8E8E8" }}>
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (background) */}
          <div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          />

          {/* Vertical line (animated progress) */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              backgroundColor: "#00F0FF",
              boxShadow: "0 0 10px rgba(0,240,255,0.4)",
            }}
          />

          {/* Milestones */}
          <div className="flex flex-col gap-20">
            {milestones.map((milestone, i) => (
              <div
                key={milestone.year}
                ref={(el) => { milestonesRef.current[i] = el }}
                className={`relative flex items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
                style={{ opacity: 0 }}
              >
                {/* Content */}
                <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}>
                  <span className="text-xs font-mono tracking-wider" style={{ color: "#00F0FF" }}>
                    {milestone.year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-sans font-bold mt-2 mb-1" style={{ color: "#E8E8E8" }}>
                    {milestone.title}
                  </h3>
                  <p className="text-xs font-mono mb-3" style={{ color: "#666666" }}>
                    {milestone.company}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    {milestone.description}
                  </p>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 top-1">
                  <div
                    className="milestone-dot w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: "#00F0FF",
                      boxShadow: "0 0 12px rgba(0,240,255,0.5)",
                      transform: "scale(0)",
                    }}
                  />
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
