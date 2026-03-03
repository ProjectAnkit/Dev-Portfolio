"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Nebula UI",
    category: "Design System",
    year: "2026",
    description: "A component library built for dark-mode-first interfaces with fluid animations and accessible patterns.",
    tech: ["React", "TypeScript", "Framer Motion"],
    color: "#00F0FF",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Void Commerce",
    category: "E-Commerce",
    year: "2025",
    description: "High-performance storefront with sub-second load times, 3D product visualization, and seamless checkout.",
    tech: ["Next.js", "Three.js", "Stripe"],
    color: "#00F0FF",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Pulse Analytics",
    category: "Dashboard",
    year: "2025",
    description: "Real-time data visualization platform processing millions of events with interactive charts and live feeds.",
    tech: ["React", "D3.js", "WebSocket"],
    color: "#00F0FF",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Echo Studio",
    category: "Creative Tool",
    year: "2024",
    description: "Browser-based audio workstation with WebAudio API, waveform visualization, and collaborative editing.",
    tech: ["TypeScript", "WebAudio", "Canvas"],
    color: "#00F0FF",
    githubUrl: "#",
    liveUrl: "#",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      const section = sectionRef.current
      if (!container || !section) return
      const isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches

      if (isMobile) {
        gsap.set(headerRef.current, { opacity: 0, y: 36 })
        gsap.set(container, { x: 0, clearProps: "transform" })

        ScrollTrigger.create({
          trigger: section,
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

        const mobileCards = container.querySelectorAll(".project-card")
        mobileCards.forEach((card) => {
          gsap.set(card, { opacity: 0, y: 36 })
          ScrollTrigger.create({
            trigger: card,
            start: "top 88%",
            onEnter: () => {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
              })
            },
            once: true,
          })
        })

        return
      }

      const cards = container.querySelectorAll(".project-card")

      ScrollTrigger.create({
        trigger: section,
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

      const updateScroll = () => {
        const viewportWidth = window.innerWidth
        const totalScroll = container.scrollWidth - viewportWidth

        // Kill any existing ScrollTrigger/animation on resize
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === section && st.pin === section) {
            st.kill()
          }
        })

        if (totalScroll <= 0) {
          gsap.set(container, { x: 0 })
          return
        }

        gsap.to(container, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })
      }

      updateScroll()
      const handleResize = () => updateScroll()
      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, sectionRef)

    return () => {
      // Parallax for each card
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative" style={{ backgroundColor: "#0A0A0A" }}>
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025 }}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={`pv-${i}`} className="absolute top-0 bottom-0 w-px" style={{ left: `${(i + 1) * (100 / 12)}%`, backgroundColor: "#E8E8E8" }} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={`ph-${i}`} className="absolute left-0 right-0 h-px" style={{ top: `${(i + 1) * (100 / 8)}%`, backgroundColor: "#E8E8E8" }} />
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

      {/* Section header */}
      <div ref={headerRef} className="px-8 pt-32 pb-16" style={{ opacity: 0 }}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-px" style={{ backgroundColor: "#00F0FF" }} />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: "#00F0FF" }}>
            Selected Work
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight" style={{ color: "#E8E8E8" }}>
          Projects
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row gap-6 md:gap-8 px-6 md:pl-8 md:pr-[30vw] overflow-visible pb-8 md:pb-0 w-full md:w-fit"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    gsap.to(card, {
      rotateY: (x - 0.5) * 8,
      rotateX: (0.5 - y) * 8,
      duration: 0.5,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    })
  }

  const handleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  return (
    <div
      ref={cardRef}
      className="project-card md:flex-shrink-0 w-full md:w-[50vw] lg:w-[40vw] relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleFlip()
        }
      }}
      style={{ perspective: "1000px" }}
    >
      <div
        className="card-inner relative h-[60vh] transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 border rounded-lg p-8 md:p-12 flex flex-col justify-between overflow-hidden transition-colors duration-500"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            backgroundColor: "#111111",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(0,240,255,0.04), transparent 60%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: "#666666" }}>
                {project.category}
              </span>
              <span className="text-[10px] font-mono" style={{ color: "#666666" }}>
                {project.year}
              </span>
            </div>

            <h3 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-4" style={{ color: "#E8E8E8" }}>
              {project.title}
            </h3>

            <p className="text-sm leading-relaxed max-w-md" style={{ color: "#666666" }}>
              {project.description}
            </p>
          </div>

          <div className="relative z-10 flex items-end justify-between">
            <div className="flex gap-3 flex-wrap">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono tracking-wider px-3 py-1 rounded-full border"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "#666666",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <span
              className="text-7xl md:text-9xl font-sans font-bold opacity-5 absolute -bottom-4 -right-4"
              style={{ color: "#E8E8E8" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <span className="absolute bottom-4 right-6 text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "#555" }}>
            tap for links
          </span>
        </div>

        <div
          className="absolute inset-0 border rounded-lg p-8 md:p-12 flex flex-col justify-between"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            backgroundColor: "#101010",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: "#6B6B6B" }}>
              project links
            </span>
            <span className="text-[10px] font-mono" style={{ color: "#6B6B6B" }}>
              {project.year}
            </span>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{ border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 6v-3.9c0-1 .1-1.4-.5-2.1 2.3-.3 4.8-1.1 4.8-5A3.9 3.9 0 0 0 18.2 8a3.6 3.6 0 0 0-.1-2.7s-.9-.3-3 .9a10.5 10.5 0 0 0-6.2 0c-2.1-1.2-3-.9-3-.9a3.6 3.6 0 0 0-.1 2.7A3.9 3.9 0 0 0 4.7 11c0 3.9 2.5 4.7 4.8 5-.6.7-.6 1.4-.5 2.1V22"
                  stroke="#E8E8E8"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="w-full flex flex-col gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full border rounded-lg px-4 py-3 text-center text-xs font-mono tracking-[0.22em] uppercase transition-colors duration-300"
                style={{ borderColor: "rgba(255,255,255,0.14)", color: "#D8D8D8" }}
              >
                GitHub Repository
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full rounded-lg px-4 py-3 text-center text-xs font-mono tracking-[0.22em] uppercase transition-opacity duration-300"
                style={{ backgroundColor: "#00F0FF", color: "#0A0A0A" }}
              >
                Live Demo
              </a>
            </div>
          </div>

          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-center" style={{ color: "#5E5E5E" }}>
            tap card to flip back
          </span>
        </div>
      </div>
    </div>
  )
}
