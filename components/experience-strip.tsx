"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ROLES = [
  {
    year: "2026",
    title: "Senior Frontend Engineer",
    company: "Leading AI Startup",
    note: "Architecting next-generation AI interfaces with real-time streaming tokens and sub-100ms response targets.",
  },
  {
    year: "2024",
    title: "Frontend Lead",
    company: "Design Studio",
    note: "Led 6 engineers building award-winning interactive experiences for premier global brands and design teams.",
  },
  {
    year: "2022",
    title: "Full-Stack Developer",
    company: "SaaS Platform",
    note: "Scaled a data-dense dashboard product from 0 to 50k active daily users without compromising render FPS.",
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "Creative Agency",
    note: "Shipped 30+ production sites with obsession over fluid motion, web accessibility, and Lighthouse 99 scores.",
  },
  {
    year: "2018",
    title: "The Genesis",
    company: "Self-taught & Open Source",
    note: "Wrote my first line of JavaScript, built my first canvas particle engine, and committed to mastering the craft.",
  },
]

export function ExperienceStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)

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

      const rows = rowsRef.current?.querySelectorAll("[data-role-row]")
      if (rows?.length) {
        ScrollTrigger.create({
          trigger: rowsRef.current,
          start: "top 82%",
          onEnter: () => {
            gsap.fromTo(
              rows,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }
            )
          },
          once: true,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Band with Crosshairs */}
        <div
          ref={headerRef}
          className="relative border-t border-b border-[#E4E0D6] py-8 grid grid-cols-1 md:grid-cols-12 bg-white/30 backdrop-blur-xs"
          style={{ opacity: 0 }}
        >
          <span className="grid-plus top-0 left-0">+</span>
          <span className="grid-plus top-0 right-0">+</span>
          <span className="grid-plus bottom-0 left-0">+</span>
          <span className="grid-plus bottom-0 right-0">+</span>

          <div className="md:col-span-8 md:pr-10 md:border-r border-[#E4E0D6] pb-6 md:pb-0">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#0E7490] block mb-2">
              05 / TIMELINE & ROLES
            </span>
            <h2 className="font-sans font-bold tracking-[-0.03em] leading-[1.08] text-[clamp(1.8rem,4vw,3.2rem)] text-[#16140F]">
              5+ years. Still curious. Still shipping.
            </h2>
          </div>

          <div className="md:col-span-4 md:pl-10 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 border-[#E4E0D6]">
            <p className="text-sm leading-relaxed text-[#6E675C]">
              A chronological trajectory across fast-paced AI startups, design agencies, and high-growth SaaS environments.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#A39B8B] uppercase">
              <span>CAREER CHRONOLOGY</span>
              <span>—</span>
              <span className="text-[#0E7490]">2018–PRESENT</span>
            </div>
          </div>
        </div>

        {/* Roles Table with Vertical Lines Segregating Columns */}
        <div
          ref={rowsRef}
          className="border-b border-[#E4E0D6] divide-y divide-[#E4E0D6] bg-white/40"
        >
          {ROLES.map((role) => (
            <div
              key={role.year}
              data-role-row
              className="group grid grid-cols-1 md:grid-cols-12 transition-colors duration-300 hover:bg-white"
              style={{ opacity: 0 }}
            >
              {/* Year Column (col 2) */}
              <div className="md:col-span-2 p-6 md:border-r border-[#E4E0D6] flex items-center">
                <span className="font-mono text-base font-bold text-[#0E7490]">
                  {role.year}
                </span>
              </div>

              {/* Title & Company Column (col 4) */}
              <div className="md:col-span-4 p-6 md:border-r border-[#E4E0D6] flex flex-col justify-center">
                <h3 className="font-sans font-bold text-lg md:text-xl tracking-tight text-[#16140F] group-hover:text-[#0E7490] transition-colors">
                  {role.title}
                </h3>
                <span className="text-[12px] font-mono text-[#A39B8B] mt-1">
                  {role.company}
                </span>
              </div>

              {/* Note / Impact Column (col 6) */}
              <div className="md:col-span-6 p-6 flex items-center">
                <p className="text-sm leading-relaxed text-[#6E675C]">
                  {role.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
