"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: "Nebula UI",
    tag: "Design System",
    description:
      "A component library for dark-mode-first interfaces with fluid animations and accessible patterns — tokens become components, components become products.",
    timeline: "3 Months",
    role: "Design & Build",
    stack: ["React", "TypeScript", "Framer Motion"],
    outcome: "40+ accessible components",
    year: "2026",
  },
  {
    title: "Void Commerce",
    tag: "E-Commerce",
    description:
      "High-performance storefront with 3D product visualization and seamless checkout. The LCP problem nobody could kill — killed it.",
    timeline: "4 Months",
    role: "Sole Frontend",
    stack: ["Next.js", "Three.js", "Stripe"],
    outcome: "Sub-second LCP",
    year: "2025",
  },
  {
    title: "Pulse Analytics",
    tag: "Dashboard",
    description:
      "Real-time data visualization processing millions of events — live feeds, interactive charts, and a canvas renderer that replaced 40 DOM nodes with one.",
    timeline: "2 Months",
    role: "Frontend Lead",
    stack: ["React", "D3.js", "WebSocket"],
    outcome: "Million-event live feeds",
    year: "2025",
  },
  {
    title: "Echo Studio",
    tag: "Creative Tool",
    description:
      "Browser-based audio workstation with waveform visualization and collaborative editing. WebAudio has no docs for what we made it do.",
    timeline: "3 Months",
    role: "Design & Build",
    stack: ["TypeScript", "WebAudio", "Canvas"],
    outcome: "Real-time collaboration",
    year: "2024",
  },
]

function WorkRow({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    gsap.set(el, { opacity: 0, y: 36 })
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: index * 0.06 })
      },
      once: true,
    })
    return () => st.kill()
  }, [index])

  useEffect(() => {
    const body = rowRef.current?.querySelector<HTMLDivElement>("[data-row-body]")
    if (!body) return
    gsap.to(body, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.55,
      ease: "power3.inOut",
    })
  }, [open])

  return (
    <div
      ref={rowRef}
      className="group relative border-t border-[#E4E0D6] bg-white/30 hover:bg-white transition-colors duration-300"
      style={{ opacity: 0 }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left py-8 md:py-10 px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        style={{ cursor: "pointer" }}
        aria-expanded={open}
      >
        {/* Left: Index & Title (col 5) */}
        <div className="lg:col-span-5 flex items-baseline gap-4 md:gap-6 lg:border-r border-[#E4E0D6] lg:pr-8">
          <span className="text-[12px] font-mono font-bold text-[#0E7490] shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-sans font-bold tracking-tight text-2xl md:text-3xl text-[#16140F] transition-colors group-hover:text-[#0E7490]">
              {project.title}
            </h3>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#A39B8B] block mt-1">
              {project.tag} · {project.year}
            </span>
          </div>
        </div>

        {/* Right: Description & Action (col 7) */}
        <div className="lg:col-span-7 flex items-center justify-between gap-6 lg:pl-4">
          <p className="text-sm md:text-[15px] leading-relaxed text-[#6E675C] max-w-xl">
            {project.description}
          </p>

          <span
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#0E7490] group-hover:text-white border border-[#E4E0D6] bg-white text-[#16140F]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              className={`transition-transform duration-300 ${open ? "rotate-90 text-white" : "group-hover:rotate-45"}`}
            >
              <path
                d="M2.5 12.5 12.5 2.5M12.5 2.5H4.5m8 0v8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </button>

      {/* Expandable meta — Jithin-style structured case info with vertical dividers */}
      <div data-row-body style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <div className="px-4 sm:px-6 md:px-8 pb-8 pt-2">
          <div className="border border-[#E4E0D6] grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#E4E0D6] bg-white/70">
            <div className="p-4 sm:p-5">
              <span className="block text-[10px] font-mono tracking-[0.2em] uppercase mb-1 text-[#A39B8B]">
                Timeline
              </span>
              <span className="text-sm font-sans font-semibold text-[#16140F]">
                {project.timeline}
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <span className="block text-[10px] font-mono tracking-[0.2em] uppercase mb-1 text-[#A39B8B]">
                Role
              </span>
              <span className="text-sm font-sans font-semibold text-[#16140F]">
                {project.role}
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <span className="block text-[10px] font-mono tracking-[0.2em] uppercase mb-1 text-[#A39B8B]">
                Stack
              </span>
              <span className="text-sm font-sans font-semibold text-[#16140F]">
                {project.stack.join(" · ")}
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <span className="block text-[10px] font-mono tracking-[0.2em] uppercase mb-1 text-[#A39B8B]">
                Outcome
              </span>
              <span className="text-sm font-sans font-semibold text-[#0E7490]">
                {project.outcome}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header Band with Left/Right Segregation */}
        <div
          ref={headerRef}
          className="relative border-t border-b border-[#E4E0D6] py-8 grid grid-cols-1 md:grid-cols-12 bg-white/30 backdrop-blur-xs"
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
              03 / SELECTED WORKS
            </span>
            <h2 className="font-sans font-bold tracking-[-0.03em] leading-[1.08] text-[clamp(1.8rem,4vw,3.2rem)] text-[#16140F]">
              A curated catalog of production systems & experiments.
            </h2>
          </div>

          {/* Right Meta */}
          <div className="md:col-span-4 md:pl-10 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 border-[#E4E0D6]">
            <p className="text-sm leading-relaxed text-[#6E675C]">
              Click any project to inspect technical details, timelines, architecture choices, and key deliverables.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#A39B8B] uppercase">
              <span>ACTIVE ARCHIVE</span>
              <span>—</span>
              <span className="text-[#0E7490]">4 FEATURED</span>
            </div>
          </div>
        </div>

        {/* Works Rows Grid */}
        <div className="border-b border-[#E4E0D6]">
          {PROJECTS.map((project, i) => (
            <WorkRow key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-6 flex items-center justify-between text-[12px] font-mono text-[#A39B8B]">
          <p>
            More open-source experiments and repositories on{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#16140F] underline underline-offset-4 hover:text-[#0E7490] transition-colors"
            >
              GitHub
            </a>
            .
          </p>
          <span className="text-[#0E7490] font-bold">● 2026</span>
        </div>
      </div>
    </section>
  )
}
