"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const NOW_ITEMS = [
  { label: "Role", value: "Senior Frontend Engineer, AI Startup" },
  { label: "Lab", value: "Open-source tooling & WebGL experiments" },
  { label: "Prior", value: "Frontend Lead, Design Studio" },
  { label: "Base", value: "Bengaluru, India (IST / Remote friendly)" },
]

const RECOGNITION = [
  { org: "Awwwards", item: "Honorable Mention, 2025" },
  { org: "CSS Design Awards", item: "Site of the Day, 2024" },
  { org: "GitHub", item: "2k+ stars across repositories" },
  { org: "Dev Community", item: "Top 10 Interface Articles" },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
          )
          gsap.fromTo(
            leftRef.current,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1 }
          )
          gsap.fromTo(
            rightRef.current,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 }
          )
        },
        once: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Header Band with Crosshairs */}
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
              04 / BIOGRAPHY & ETHOS
            </span>
            <h2 className="font-sans font-bold tracking-[-0.03em] leading-[1.08] text-[clamp(1.8rem,4vw,3.2rem)] text-[#16140F]">
              Crafting at the intersection of logic, design & speed.
            </h2>
          </div>

          <div className="md:col-span-4 md:pl-10 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 border-[#E4E0D6]">
            <p className="text-sm leading-relaxed text-[#6E675C]">
              Treating the web browser as a tactile workbench. Dedicated to building digital products people actually love using.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#A39B8B] uppercase">
              <span>BACKGROUND LOG</span>
              <span>—</span>
              <span className="text-[#0E7490]">VERIFIED</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Segregating Left and Right with Vertical and Horizontal Lines */}
        <div className="relative border-b border-[#E4E0D6] grid grid-cols-1 lg:grid-cols-12 bg-white/40">
          <span className="grid-plus top-0 left-0 hidden lg:block">+</span>
          <span className="grid-plus top-0 right-0 hidden lg:block">+</span>
          <span className="grid-plus bottom-0 left-0 hidden lg:block">+</span>
          <span className="grid-plus bottom-0 right-0 hidden lg:block">+</span>
          <span className="grid-plus top-0 left-7/12 hidden lg:block">+</span>
          <span className="grid-plus bottom-0 left-7/12 hidden lg:block">+</span>

          {/* LEFT SIDE: The Narrative & Human Behind the Pixels */}
          <div
            ref={leftRef}
            className="lg:col-span-7 p-6 sm:p-8 md:p-12 lg:border-r border-b lg:border-b-0 border-[#E4E0D6] flex flex-col justify-between"
            style={{ opacity: 0 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#0E7490]">
                  [ PERSONAL PERSPECTIVE ]
                </span>
              </div>

              <h3 className="font-sans font-bold text-2xl md:text-3xl text-[#16140F] tracking-tight mb-6">
                Crafting interfaces at the edge of the web.
              </h3>

              <div className="flex flex-col gap-5 text-[15px] sm:text-base leading-relaxed text-[#6E675C]">
                <p>
                  I treat the browser as a craft bench. 5+ years shipping interfaces — from
                  complex design systems and data-intensive dashboards to WebGL scenes that
                  make product teams ask <span className="text-[#16140F] font-medium">"wait, that's possible on the web?"</span>
                </p>
                <p>
                  My obsession lives in the details nobody thought to specify: the easing curve
                  that feels physically tactile, the thoughtful empty state, and the 200 milliseconds
                  between click and confidence.
                </p>
                <p>
                  Outside the terminal, you'll find me exploring specialty coffee roasters, long
                  evening rides, and brainstorming wild ideas that start with "what if we just built it?"
                </p>
              </div>
            </div>

            {/* Clean metadata badge */}
            <div className="mt-10 pt-8 border-t border-[#E4E0D6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-mono font-semibold text-[#16140F] uppercase tracking-wider">
                  ENGINEERING CRAFT
                </span>
                <span className="text-[11px] font-mono text-[#A39B8B] uppercase tracking-wider">
                  / BENGALURU, IN
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#0E7490] font-medium tracking-wider">
                ● 2026 LOG
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Structured Data, Status & Recognition */}
          <div
            ref={rightRef}
            className="lg:col-span-5 flex flex-col divide-y divide-[#E4E0D6]"
            style={{ opacity: 0 }}
          >
            {/* Right Cell 1: Live Status & Roles */}
            <div className="p-6 sm:p-8 bg-white/20">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#A39B8B] block mb-5">
                [ CURRENT TELEMETRY ]
              </span>
              <div className="flex flex-col gap-4">
                {NOW_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-3 border-b border-[#E4E0D6] last:border-0 last:pb-0"
                  >
                    <span className="text-[11px] font-mono font-bold text-[#0E7490] w-14 shrink-0 uppercase">
                      {item.label}
                    </span>
                    <span className="text-[13px] sm:text-sm font-sans font-medium text-[#16140F]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Cell 2: Recognition & Milestones */}
            <div className="p-6 sm:p-8 bg-white/40">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#A39B8B] block mb-5">
                [ HONORS & RECOGNITION ]
              </span>
              <div className="flex flex-col divide-y divide-[#E4E0D6]">
                {RECOGNITION.map((r) => (
                  <div
                    key={r.org + r.item}
                    className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                  >
                    <span className="text-sm font-sans font-semibold text-[#16140F]">
                      {r.org}
                    </span>
                    <span className="text-[12px] font-mono text-right text-[#6E675C]">
                      {r.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Cell 3: Technical Arsenal Quick Matrix */}
            <div className="p-6 sm:p-8 bg-white/20">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#A39B8B] block mb-3">
                [ ARCHITECTURAL ARSENAL ]
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "Next.js Turbopack",
                  "GSAP",
                  "Three.js",
                  "Tailwind CSS",
                  "Node.js",
                  "WebAudio",
                  "Figma to Code",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2.5 py-1 border border-[#E4E0D6] bg-white text-[#16140F] rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
