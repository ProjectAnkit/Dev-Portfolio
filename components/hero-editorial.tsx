"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const MARQUEE_ITEMS = [
  "NEXT.JS 16",
  "TYPESCRIPT",
  "GSAP MOTION",
  "REACT 19",
  "THREE.JS & WEBGL",
  "DESIGN SYSTEMS",
  "PERFORMANCE FIRST",
  "FLUID INTERACTIONS",
]

export function HeroEditorial() {
  const sectionRef = useRef<HTMLElement>(null)
  const metaBarRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const signatureRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 1.2 })

      // Reveal top metadata bar
      tl.fromTo(
        metaBarRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.8 },
        0
      )

      // Reveal main name characters/words
      const nameWords = nameRef.current?.querySelectorAll("[data-word]")
      if (nameWords?.length) {
        tl.fromTo(
          nameWords,
          { y: "115%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1.0, stagger: 0.08 },
          0.15
        )
      }

      // Subtitle tag reveal
      if (signatureRef.current) {
        tl.fromTo(
          signatureRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.45
        )
      }

      // Reveal right column elements
      if (rightColRef.current) {
        tl.fromTo(
          rightColRef.current.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.4
        )
      }

      // Bottom bar & marquee
      tl.fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7 },
        0.8
      )

      tl.fromTo(
        marqueeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        0.9
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 pt-24 pb-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Architectural Meta Band */}
        <div
          ref={metaBarRef}
          className="relative grid grid-cols-2 md:grid-cols-4 border-t border-b border-[#E4E0D6] bg-[#FFFFFF]/60 backdrop-blur-xs"
          style={{ opacity: 0 }}
        >
          {/* Corner plus crosshairs */}
          <span className="grid-plus top-0 left-0">+</span>
          <span className="grid-plus top-0 right-0">+</span>
          <span className="grid-plus bottom-0 left-0">+</span>
          <span className="grid-plus bottom-0 right-0">+</span>

          {/* Cell 1 */}
          <div className="p-3.5 sm:p-4 border-r border-b md:border-b-0 border-[#E4E0D6] flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#A39B8B]">
              01 / SYSTEM
            </span>
            <span className="text-[12px] sm:text-[13px] font-sans font-semibold text-[#16140F]">
              Selected Archive
            </span>
          </div>

          {/* Cell 2 */}
          <div className="p-3.5 sm:p-4 md:border-r border-b md:border-b-0 border-[#E4E0D6] flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#A39B8B]">
              02 / DISCIPLINE
            </span>
            <span className="text-[12px] sm:text-[13px] font-sans font-medium text-[#16140F]">
              Frontend Engineer
            </span>
          </div>

          {/* Cell 3 */}
          <div className="p-3.5 sm:p-4 border-r border-[#E4E0D6] flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#A39B8B]">
              03 / LOCATION
            </span>
            <span className="text-[12px] sm:text-[13px] font-sans font-medium text-[#16140F]">
              Bengaluru, IN
            </span>
          </div>

          {/* Cell 4 */}
          <div className="p-3.5 sm:p-4 flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#0E7490]">
              04 / STATUS
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-[12px] sm:text-[13px] font-sans font-medium text-[#16140F]">
                Available for Roles
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Segregating Left and Right with Crisp Vertical & Horizontal Lines */}
        <div className="relative border-b border-[#E4E0D6] grid grid-cols-1 lg:grid-cols-12 bg-transparent">
          {/* Corner intersection plus marks */}
          <span className="grid-plus top-0 left-0 hidden lg:block">+</span>
          <span className="grid-plus top-0 right-0 hidden lg:block">+</span>
          <span className="grid-plus bottom-0 left-0 hidden lg:block">+</span>
          <span className="grid-plus bottom-0 right-0 hidden lg:block">+</span>
          <span className="grid-plus top-0 left-[58.333%] hidden lg:block">+</span>
          <span className="grid-plus bottom-0 left-[58.333%] hidden lg:block">+</span>

          {/* LEFT SIDE: The Main Display of Name & Identity (col 7 / 12) */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-12 lg:border-r border-b lg:border-b-0 border-[#E4E0D6] flex flex-col justify-between relative overflow-hidden bg-white/40">
            {/* Watermark / Index */}
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#0E7490] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-[#0E7490] flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-[#0E7490]" />
                </span>
                PORTFOLIO — 2026
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#A39B8B] uppercase">
                VOL. 02
              </span>
            </div>

            {/* THE MAIN DISPLAY: Ankit Thakur */}
            <div className="my-auto">
              <span className="text-[12px] sm:text-[13px] font-mono tracking-[0.24em] uppercase text-[#6E675C] block mb-3">
                CREATIVE DEVELOPER & ARCHITECT
              </span>

              <h1
                ref={nameRef}
                className="font-sans font-extrabold text-[clamp(2.9rem,7.8vw,6.4rem)] leading-[0.92] tracking-[-0.04em] text-[#16140F] select-none"
              >
                <div className="overflow-hidden">
                  <span data-word className="inline-block">
                    ANKIT
                  </span>
                </div>
                <div className="overflow-hidden mt-1">
                  <span data-word className="inline-block text-[#16140F]">
                    THAKUR
                  </span>
                </div>
              </h1>

              {/* Sub-role descriptor */}
              <div ref={signatureRef} className="mt-5 flex items-center gap-3.5" style={{ opacity: 0 }}>
                <span className="w-8 h-px bg-[#0E7490]" />
                <span className="text-[12px] font-mono tracking-[0.2em] uppercase text-[#0E7490] font-medium">
                  ENGINEER & CREATIVE DEVELOPER
                </span>
                <span className="text-[11px] font-mono text-[#A39B8B] uppercase tracking-wider">
                  / 2026
                </span>
              </div>
            </div>

            {/* Bottom mini-descriptors */}
            <div className="mt-8 pt-6 border-t border-[#E4E0D6] flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono tracking-wider text-[#6E675C]">
              <span className="flex items-center gap-1.5">
                <span className="text-[#0E7490]">/</span> High Performance
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#0E7490]">/</span> 60fps Micro-interactions
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#0E7490]">/</span> Fluid Design Systems
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Narrative, Philosophy, Metrics & Actions (col 5 / 12) */}
          <div ref={rightColRef} className="lg:col-span-5 flex flex-col justify-between divide-y divide-[#E4E0D6]">
            {/* Cell 1: Philosophy / Lede Statement */}
            <div className="p-6 sm:p-8 md:p-10 bg-white/20">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#0E7490]">
                  [ PERSPECTIVE ]
                </span>
              </div>
              <h2 className="font-sans text-xl sm:text-2xl md:text-[26px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#16140F]">
                I turn complex product problems into interfaces that feel{" "}
                <span className="text-[#0E7490] italic font-normal">effortless</span> — obsessing over the 60fps details nobody thought to ask for.
              </h2>
              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#6E675C]">
                5+ years bridging engineering rigor and editorial design craft. From zero-latency dashboards to fluid brand interactions.
              </p>
            </div>

            {/* Cell 2: Key Metrics Grid (2x2 sub-cells with lines) */}
            <div className="grid grid-cols-2 divide-x divide-y divide-[#E4E0D6] bg-white/40">
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <span className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-[#16140F]">
                  5+
                </span>
                <span className="text-[11px] font-mono tracking-wider text-[#A39B8B] mt-1 uppercase">
                  Years of Craft
                </span>
              </div>
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <span className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-[#16140F]">
                  40+
                </span>
                <span className="text-[11px] font-mono tracking-wider text-[#A39B8B] mt-1 uppercase">
                  Production Screens
                </span>
              </div>
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <span className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-[#0E7490]">
                  &lt;100ms
                </span>
                <span className="text-[11px] font-mono tracking-wider text-[#A39B8B] mt-1 uppercase">
                  Target Latency
                </span>
              </div>
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <span className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-[#16140F]">
                  60 FPS
                </span>
                <span className="text-[11px] font-mono tracking-wider text-[#A39B8B] mt-1 uppercase">
                  Fluid Framerate
                </span>
              </div>
            </div>

            {/* Cell 3: Direct Actions & Coordinates */}
            <div className="p-6 sm:p-8 bg-white/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                onClick={scrollToWork}
                className="group flex items-center justify-center gap-3 text-[12px] font-mono tracking-[0.16em] uppercase px-6 py-3.5 rounded-full transition-all duration-300 hover:gap-4 bg-[#16140F] text-[#FAFAF7] hover:bg-[#0E7490] cursor-pointer"
              >
                Explore Works
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </button>

              <a
                href="mailto:hello@ankitthakur.dev"
                className="flex items-center justify-center gap-2 text-[12px] font-mono tracking-[0.16em] uppercase px-5 py-3.5 rounded-full border border-[#E4E0D6] bg-white text-[#16140F] hover:border-[#0E7490] hover:text-[#0E7490] transition-colors"
              >
                hello@ankitthakur.dev
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Kinetic Line Marquee (inspired by jithinrp.com) */}
        <div
          ref={marqueeRef}
          className="relative overflow-hidden border-b border-[#E4E0D6] py-3.5 bg-[#FFFFFF]/40"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center whitespace-nowrap animate-marquee">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div key={i} className="flex items-center gap-6 mr-6">
                <span className="text-[12px] font-mono tracking-[0.24em] uppercase text-[#6E675C]">
                  {item}
                </span>
                <span className="text-[#0E7490] text-[11px] font-mono">+</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint strip */}
        <div
          ref={bottomBarRef}
          className="pt-6 flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-[#A39B8B] uppercase"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E7490]" />
            <span>SCROLL TO DISCOVER</span>
          </div>
          <div className="flex items-center gap-4">
            <span>INDEX 01 — 05</span>
            <span className="text-[#16140F]">↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}
