"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const CAPABILITIES = [
  {
    index: "01",
    tag: "ARCHITECTURE",
    title: "UI Engineering",
    line: "From a blank frame to shipped screens — I take a problem from first sketch to production and stay on it until it feels right.",
    tags: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS"],
  },
  {
    index: "02",
    tag: "CHOREOGRAPHY",
    title: "Motion & Interaction",
    line: "Motion that serves the story. Scroll choreography, physics-based easing, and transitions that make products feel considered.",
    tags: ["GSAP", "ScrollTrigger", "Lenis", "Framer Motion"],
  },
  {
    index: "03",
    tag: "OPTIMIZATION",
    title: "Performance & Polish",
    line: "Fast is a feature. Core Web Vitals in the green, bundles kept honest, and the 4am commit that finally killed the flicker.",
    tags: ["Web Vitals", "Three.js", "Canvas / WebGL", "A11y"],
  },
]

export function CapabilitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
          )
        },
        once: true,
      })

      const cards = gridRef.current?.querySelectorAll("[data-cap-col]")
      if (cards?.length) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 36 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
            )
          },
          once: true,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header Band with Left/Right Segregation */}
        <div
          ref={headerRef}
          className="relative border-t border-b border-[#E4E0D6] py-8 mb-0 grid grid-cols-1 md:grid-cols-12 bg-white/30 backdrop-blur-xs"
          style={{ opacity: 0 }}
        >
          {/* Intersection crosshair plus marks */}
          <span className="grid-plus top-0 left-0">+</span>
          <span className="grid-plus top-0 right-0">+</span>
          <span className="grid-plus bottom-0 left-0">+</span>
          <span className="grid-plus bottom-0 right-0">+</span>

          {/* Left Title Area */}
          <div className="md:col-span-8 md:pr-10 md:border-r border-[#E4E0D6] pb-6 md:pb-0">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#0E7490] block mb-2">
              02 / DISCIPLINE & CRAFT
            </span>
            <h2 className="font-sans font-bold tracking-[-0.03em] leading-[1.08] text-[clamp(1.8rem,4vw,3.2rem)] text-[#16140F]">
              Three disciplines I keep getting hired to lead.
            </h2>
          </div>

          {/* Right Subtext */}
          <div className="md:col-span-4 md:pl-10 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 border-[#E4E0D6]">
            <p className="text-sm leading-relaxed text-[#6E675C]">
              Focused on the intersection of engineering architecture and tactile aesthetics. Every pixel has an intentional reason to exist.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#A39B8B] uppercase">
              <span>SPECIALIZED SUITE</span>
              <span>—</span>
              <span className="text-[#0E7490]">2026 FOCUS</span>
            </div>
          </div>
        </div>

        {/* 3-Column Pillars Grid Segregated by Vertical Hairline Lines (inspired by jithinrp.com) */}
        <div
          ref={gridRef}
          className="relative border-b border-[#E4E0D6] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E4E0D6] bg-white/50"
        >
          {/* Corner intersection plus marks */}
          <span className="grid-plus bottom-0 left-0 hidden md:block">+</span>
          <span className="grid-plus bottom-0 right-0 hidden md:block">+</span>
          <span className="grid-plus bottom-0 left-1/3 hidden md:block">+</span>
          <span className="grid-plus bottom-0 left-2/3 hidden md:block">+</span>

          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              data-cap-col
              className="group relative p-8 sm:p-10 flex flex-col justify-between transition-colors duration-500 hover:bg-white"
              style={{ opacity: 0 }}
            >
              {/* Top Accent line on hover */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: "#0E7490" }}
              />

              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E4E0D6]">
                  <span className="font-mono text-[13px] font-bold text-[#0E7490]">
                    [{cap.index}]
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#A39B8B]">
                    {cap.tag}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-2xl tracking-tight text-[#16140F]">
                  {cap.title}
                </h3>

                <p className="mt-4 text-[14px] leading-relaxed text-[#6E675C]">
                  {cap.line}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E4E0D6] flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono tracking-wide px-2.5 py-1 rounded-sm border border-[#E4E0D6] bg-[#FAFAF7] text-[#6E675C] transition-colors group-hover:border-[#0E7490]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
