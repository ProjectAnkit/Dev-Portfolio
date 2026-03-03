"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { MagneticButton } from "./magnetic-button"

const HERO_TITLE_LINE_ONE = "Frontend"
const HERO_TITLE_LINE_TWO = "Engineer"

function DigitalFireflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.parentElement?.clientHeight || window.innerHeight
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener("resize", resize)

    // Firefly class
    class Firefly {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      baseAlpha: number
      alpha: number
      flickerSpeed: number
      flickerPhase: number
      trail: { x: number; y: number; alpha: number }[]
      glitchTimer: number
      glitchDuration: number
      isGlitching: boolean
      targetX: number
      targetY: number
      wanderTimer: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height * 0.6 // Top 60% only
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.6
        this.size = Math.random() * 2.5 + 1
        this.baseAlpha = Math.random() * 0.5 + 0.3
        this.alpha = this.baseAlpha
        this.flickerSpeed = Math.random() * 0.03 + 0.01
        this.flickerPhase = Math.random() * Math.PI * 2
        this.trail = []
        this.glitchTimer = Math.random() * 400 + 200
        this.glitchDuration = 0
        this.isGlitching = false
        this.targetX = this.x + (Math.random() - 0.5) * 300
        this.targetY = this.y + (Math.random() - 0.5) * 200
        this.wanderTimer = Math.random() * 200 + 100
      }

      update(frame: number) {
        // Wander towards target
        this.wanderTimer--
        if (this.wanderTimer <= 0) {
          this.targetX = Math.random() * width
          this.targetY = Math.random() * height * 0.55
          this.wanderTimer = Math.random() * 300 + 150
        }

        const dx = this.targetX - this.x
        const dy = this.targetY - this.y
        this.vx += dx * 0.0003
        this.vy += dy * 0.0003
        this.vx *= 0.98
        this.vy *= 0.98

        // Glitch teleport
        this.glitchTimer--
        if (this.glitchTimer <= 0 && !this.isGlitching) {
          this.isGlitching = true
          this.glitchDuration = Math.random() * 8 + 3
        }
        if (this.isGlitching) {
          this.x += (Math.random() - 0.5) * 15
          this.y += (Math.random() - 0.5) * 10
          this.alpha = Math.random() > 0.5 ? this.baseAlpha * 1.5 : 0
          this.glitchDuration--
          if (this.glitchDuration <= 0) {
            this.isGlitching = false
            this.glitchTimer = Math.random() * 500 + 300
            this.alpha = this.baseAlpha
          }
        } else {
          this.x += this.vx
          this.y += this.vy
          // Flicker
          this.flickerPhase += this.flickerSpeed
          this.alpha = this.baseAlpha + Math.sin(this.flickerPhase + frame * 0.02) * 0.2
        }

        // Store trail
        this.trail.push({ x: this.x, y: this.y, alpha: this.alpha * 0.4 })
        if (this.trail.length > 8) this.trail.shift()

        // Wrap around
        if (this.x < -20) this.x = width + 20
        if (this.x > width + 20) this.x = -20
        if (this.y < -20) this.y = height * 0.6 + 20
        if (this.y > height * 0.65) this.y = -20
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
          const t = this.trail[i]
          const ratio = i / this.trail.length
          ctx.beginPath()
          ctx.arc(t.x, t.y, this.size * ratio * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 240, 255, ${t.alpha * ratio * 0.3})`
          ctx.fill()
        }

        // Draw core
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 240, 255, ${this.alpha})`
        ctx.fill()

        // Draw glow
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4)
        gradient.addColorStop(0, `rgba(0, 240, 255, ${this.alpha * 0.3})`)
        gradient.addColorStop(1, "rgba(0, 240, 255, 0)")
        ctx.fillStyle = gradient
        ctx.fill()

        // Glitch line during glitch
        if (this.isGlitching) {
          ctx.beginPath()
          ctx.moveTo(this.x - 10 - Math.random() * 10, this.y)
          ctx.lineTo(this.x + 10 + Math.random() * 10, this.y)
          ctx.strokeStyle = `rgba(0, 240, 255, ${this.alpha * 0.6})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    const count = Math.min(Math.floor(width / 100), 12)
    const fireflies: Firefly[] = Array.from({ length: Math.max(count, 6) }, () => new Firefly())

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      frame++
      for (const f of fireflies) {
        f.update(frame)
        f.draw(ctx)
      }

      // Occasional connection lines between nearby fireflies
      for (let i = 0; i < fireflies.length; i++) {
        for (let j = i + 1; j < fireflies.length; j++) {
          const ddx = fireflies[i].x - fireflies[j].x
          const ddy = fireflies[i].y - fireflies[j].y
          const dist = Math.sqrt(ddx * ddx + ddy * ddy)
          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.08
            ctx.beginPath()
            ctx.moveTo(fireflies[i].x, fireflies[i].y)
            ctx.lineTo(fireflies[j].x, fireflies[j].y)
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%", zIndex: 1 }}
      aria-hidden="true"
    />
  )
}

function MastermindCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!glowRef.current) return
    if (isFlipped) {
      gsap.to(glowRef.current, {
        boxShadow: "0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
        duration: 0.6,
        ease: "power2.out",
      })
    } else {
      gsap.to(glowRef.current, {
        boxShadow: "0 12px 30px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.05)",
        duration: 0.6,
      })
    }
  }, [isFlipped])

  const handleClick = () => {
    setIsFlipped((prev) => !prev)
  }

  return (
    <div
      className="relative cursor-pointer group"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? "Card showing Ankit Thakur. Click to flip back." : "Mystery card. Click to reveal identity."}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick() } }}
      style={{ perspective: "1000px" }}
    >
      {/* Outer glow wrapper */}
      <div
        ref={glowRef}
        className="rounded-xl"
        style={{
          boxShadow: "0 12px 30px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Flip container */}
        <div
          ref={cardRef}
          className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[26rem] lg:w-[22rem] lg:h-[30rem] xl:w-[24rem] xl:h-[32rem]"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ===== FRONT FACE ===== */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden flex flex-col items-center justify-between py-4 sm:py-6 px-4 sm:px-5"
            style={{
              backfaceVisibility: "hidden",
              backgroundColor: "#121212",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="w-full flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-[0.28em] uppercase" style={{ color: "#666" }}>
                profile card
              </span>
              <span className="text-[9px] font-mono tracking-[0.22em] uppercase" style={{ color: "#505050" }}>
                #01
              </span>
            </div>

            <div className="w-full flex flex-col items-center gap-3 sm:gap-4 py-4 sm:py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.02)" }}>
              <span
                ref={questionRef}
                className="text-4xl sm:text-5xl md:text-6xl font-sans font-semibold select-none"
                style={{
                  color: "#CFCFCF",
                }}
              >
                ?
              </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span
                  className="text-lg sm:text-xl md:text-2xl font-sans font-semibold tracking-[-0.02em]"
                  style={{ color: "#E6E6E6" }}
                >
                  Unknown
                </span>
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase" style={{ color: "#777" }}>
                  Tap to reveal identity
                </span>
              </div>
            </div>

            <div className="w-full flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: "#555" }}>
                secure profile
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: "#555" }}>
                verified
              </span>
            </div>
          </div>

          {/* ===== BACK FACE ===== */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden flex flex-col items-center justify-between py-4 sm:py-6 px-4 sm:px-5"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              backgroundColor: "#111111",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <div className="w-full flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-[0.26em] uppercase" style={{ color: "#8A8A8A" }}>
                identity card
              </span>
              <span className="hidden sm:inline text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: "#5A5A5A" }}>
                id-2401
              </span>
            </div>

            <div className="w-full flex flex-col gap-3 sm:gap-5 py-3 sm:py-5">
              <div className="grid grid-cols-[1fr_auto] items-start gap-3 sm:gap-4 pb-3 sm:pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase" style={{ color: "#6A6A6A" }}>
                    name
                  </span>
                  <span className="text-xl sm:text-3xl md:text-4xl font-sans font-semibold tracking-[-0.03em]" style={{ color: "#E8E8E8" }}>
                    Ankit Thakur
                  </span>
                </div>
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8.2" r="3.2" stroke="#8A8A8A" strokeWidth="1.3" />
                    <path
                      d="M5.8 18.2c.8-2.7 3-4.2 6.2-4.2s5.4 1.5 6.2 4.2"
                      stroke="#8A8A8A"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase" style={{ color: "#6A6A6A" }}>
                    role
                  </span>
                  <span className="text-sm font-sans" style={{ color: "#CFCFCF" }}>
                    Frontend Engineer
                  </span>
                </div>
                <div className="hidden sm:flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase" style={{ color: "#6A6A6A" }}>
                    location
                  </span>
                  <span className="text-sm font-sans" style={{ color: "#CFCFCF" }}>
                    India
                  </span>
                </div>
                <div className="hidden sm:flex flex-col gap-1 col-span-2">
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase" style={{ color: "#6A6A6A" }}>
                    status
                  </span>
                  <span className="text-sm font-sans" style={{ color: "#AFAFAF" }}>
                    Available for freelance and product work
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex w-full items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: "#606060" }}>
                tap to hide
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: "#7F7F7F" }}>
                authentic
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particle on hover */}
      <div
        className="absolute -top-2 -right-2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: "#00F0FF", filter: "blur(3px)" }}
      />
    </div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const toolIconRef = useRef<HTMLDivElement>(null)
  const paintIconRef = useRef<HTMLDivElement>(null)
  const titleLineOneRef = useRef<HTMLDivElement>(null)
  const titleLineTwoRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const statusBlockRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cornerTLRef = useRef<HTMLDivElement>(null)
  const cornerTRRef = useRef<HTMLDivElement>(null)
  const cornerBLRef = useRef<HTMLDivElement>(null)
  const cornerBRRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const scrollLineRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLSpanElement>(null)
  const coordsRef = useRef<HTMLDivElement>(null)
  const cardWrapperRef = useRef<HTMLDivElement>(null)
  const identityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      let lineOneChars: HTMLSpanElement[] = []
      let lineTwoChars: HTMLSpanElement[] = []

      // Corners draw in
      tl.fromTo(
        [cornerTLRef.current, cornerTRRef.current, cornerBLRef.current, cornerBRRef.current],
        { opacity: 0, scale: 1.5 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.05 },
        0
      )

      // Grid fades in
      tl.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.1)

      // Identity block top-left
      if (identityRef.current) {
        tl.fromTo(
          identityRef.current,
          { x: -120, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 },
          0.3
        )
      }

      // Title line one - each character
      if (titleLineOneRef.current) {
        const chars = Array.from(titleLineOneRef.current.querySelectorAll<HTMLSpanElement>("[data-char]"))
        lineOneChars = chars
        tl.to(
          chars,
          { opacity: 1, y: 0, duration: 1.05, stagger: 0.03 },
          0.8
        )
      }

      // Title line two - slides from right
      if (titleLineTwoRef.current) {
        const chars = Array.from(titleLineTwoRef.current.querySelectorAll<HTMLSpanElement>("[data-char]"))
        lineTwoChars = chars
        tl.to(
          chars,
          { opacity: 1, x: 0, duration: 0.95, stagger: 0.025 },
          1.1
        )
      }

      if (headlineRef.current && toolIconRef.current && paintIconRef.current) {
        const randomPick = (items: HTMLSpanElement[], count: number) => {
          const pool = [...items]
          const picked: HTMLSpanElement[] = []
          const total = Math.min(count, pool.length)
          for (let i = 0; i < total; i++) {
            const randomIndex = Math.floor(Math.random() * pool.length)
            const [selected] = pool.splice(randomIndex, 1)
            if (selected) picked.push(selected)
          }
          return picked
        }

        const lineOneFix = randomPick(lineOneChars, 2)
        const lineTwoFix = randomPick(lineTwoChars, 1)
        const fixChars = [...lineOneFix, ...lineTwoFix].filter((char) => (char.textContent || "").trim().length > 0)
        const paintChars = [lineOneChars[0], lineTwoChars[0]].filter(
          (char): char is HTMLSpanElement => !!char && (char.textContent || "").trim().length > 0
        )
        if (fixChars.length > 0 || paintChars.length > 0) {
          const toolIcon = toolIconRef.current
          const paintIcon = paintIconRef.current
          const headline = headlineRef.current

          gsap.set(toolIcon, { opacity: 0, x: 0, y: 0, rotation: -42, scale: 0.9 })
          gsap.set(paintIcon, { opacity: 0, x: 0, y: 0, rotation: -16, scale: 0.92 })
          if (fixChars.length > 0) {
            gsap.set(fixChars, { rotation: -8 })
          }
          if (paintChars.length > 0) {
            gsap.set(paintChars, { "--paint-fill": "0%" })
          }

          const toolTl = gsap.timeline({ delay: 2.15 })
          if (fixChars.length > 0) {
            toolTl.to(toolIcon, { opacity: 1, duration: 0.38, ease: "power1.out" })
          }

          fixChars.forEach((char) => {
            let targetX = 0
            let targetY = 0
            toolTl.to({}, {
              duration: 0.001,
              onStart: () => {
                const charRect = char.getBoundingClientRect()
                const headlineRect = headline.getBoundingClientRect()
                targetX = charRect.left - headlineRect.left + charRect.width * 0.52
                targetY = charRect.top - headlineRect.top - charRect.height * 0.11
              },
            })
            toolTl.to(toolIcon, { x: () => targetX, y: () => targetY, duration: 0.68, ease: "sine.inOut" })
            toolTl.to(toolIcon, { rotation: "+=58", duration: 0.42, ease: "power1.inOut" })
            toolTl.to(char, { rotation: 0, duration: 0.38, ease: "power2.out" }, "<+0.08")
            toolTl.to(toolIcon, { rotation: "-=44", duration: 0.34, ease: "power1.out" })
            toolTl.to({}, { duration: 0.24 })
          })

          if (fixChars.length > 0) {
            toolTl.to(toolIcon, { opacity: 0, duration: 0.36, ease: "power1.in" })
          }

          if (paintChars.length > 0) {
            toolTl.to(paintIcon, { opacity: 1, duration: 0.3, ease: "power1.out" }, "+=0.15")
          }

          paintChars.forEach((char) => {
            let leftX = 0
            let rightX = 0
            let topY = 0
            let midY = 0
            let lowY = 0
            toolTl.to({}, {
              duration: 0.001,
              onStart: () => {
                const charRect = char.getBoundingClientRect()
                const headlineRect = headline.getBoundingClientRect()
                leftX = charRect.left - headlineRect.left + charRect.width * 0.18
                rightX = charRect.left - headlineRect.left + charRect.width * 0.84
                topY = charRect.top - headlineRect.top + charRect.height * 0.12
                midY = charRect.top - headlineRect.top + charRect.height * 0.5
                lowY = charRect.top - headlineRect.top + charRect.height * 0.84
              },
            })
            toolTl.to(paintIcon, { x: () => rightX, y: () => topY, duration: 0.34, ease: "sine.inOut" })
            toolTl.to(paintIcon, { x: () => leftX, y: () => topY, rotation: -7, duration: 0.34, ease: "sine.inOut" })
            toolTl.to(char, { "--paint-fill": "34%", duration: 0.34, ease: "none" } as any, "<+0.03")
            toolTl.to(paintIcon, { x: () => rightX, y: () => midY, rotation: 6, duration: 0.36, ease: "sine.inOut" })
            toolTl.to(char, { "--paint-fill": "70%", duration: 0.36, ease: "none" } as any, "<+0.03")
            toolTl.to(paintIcon, { x: () => leftX, y: () => lowY, rotation: -5, duration: 0.38, ease: "sine.inOut" })
            toolTl.to(char, { "--paint-fill": "100%", duration: 0.38, ease: "none" } as any, "<+0.03")
            toolTl.to({}, { duration: 0.1 })
          })

          if (paintChars.length > 0) {
            toolTl.to(paintIcon, { opacity: 0, duration: 0.32, ease: "power1.in" }, "+=0.2")
          }
        }
      }

      // Mastermind card entrance - dramatic
      if (cardWrapperRef.current) {
        tl.fromTo(
          cardWrapperRef.current,
          { opacity: 0, scale: 0.6, rotateZ: -8, y: 60 },
          { opacity: 1, scale: 1, rotateZ: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" },
          1.0
        )
      }

      // Sidebar
      tl.fromTo(sidebarRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.8 }, 1.3)

      // Status block
      tl.fromTo(statusBlockRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.5)

      // CTA
      tl.fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 1.7)

      // Scroll line
      tl.fromTo(scrollLineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 1, ease: "power3.inOut" }, 1.9)

      // Year counter
      if (yearRef.current) {
        const obj = { val: 0 }
        tl.to(
          obj,
          {
            val: 2026,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              if (yearRef.current)
                yearRef.current.textContent = Math.floor(obj.val).toString()
            },
          },
          0.4
        )
      }

      // Coordinates blink
      if (coordsRef.current) {
        tl.fromTo(coordsRef.current, { opacity: 0 }, { opacity: 0.4, duration: 0.3 }, 2.0)
        gsap.to(coordsRef.current, {
          opacity: 0.15,
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut",
          delay: 3,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToContent = () => {
    const el = document.getElementById("projects")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-20 py-8 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* ===== DIGITAL FIREFLIES ===== */}
      <DigitalFireflies />

      {/* ===== FULL-SECTION GRID ===== */}
      <div ref={gridRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${(i + 1) * (100 / 12)}%`, backgroundColor: "rgba(255,255,255,0.025)" }}
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px"
            style={{ top: `${(i + 1) * (100 / 8)}%`, backgroundColor: "rgba(255,255,255,0.025)" }}
          />
        ))}
      </div>

      {/* ===== CORNER BRACKETS ===== */}
      <div ref={cornerTLRef} className="absolute top-6 left-6 w-12 h-12 pointer-events-none" style={{ opacity: 0 }}>
        <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: "rgba(0,240,255,0.4)" }} />
        <div className="absolute top-0 left-0 w-px h-full" style={{ backgroundColor: "rgba(0,240,255,0.4)" }} />
      </div>
      <div ref={cornerTRRef} className="absolute top-6 right-6 w-12 h-12 pointer-events-none" style={{ opacity: 0 }}>
        <div className="absolute top-0 right-0 w-full h-px" style={{ backgroundColor: "rgba(0,240,255,0.4)" }} />
        <div className="absolute top-0 right-0 w-px h-full" style={{ backgroundColor: "rgba(0,240,255,0.4)" }} />
      </div>
      <div ref={cornerBLRef} className="absolute bottom-6 left-6 w-12 h-12 pointer-events-none" style={{ opacity: 0 }}>
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ backgroundColor: "rgba(0,240,255,0.4)" }} />
        <div className="absolute bottom-0 left-0 w-px h-full" style={{ backgroundColor: "rgba(0,240,255,0.4)" }} />
      </div>
      <div ref={cornerBRRef} className="absolute bottom-6 right-6 w-12 h-12 pointer-events-none" style={{ opacity: 0 }}>
        <div className="absolute bottom-0 right-0 w-full h-px" style={{ backgroundColor: "rgba(0,240,255,0.4)" }} />
        <div className="absolute bottom-0 right-0 w-px h-full" style={{ backgroundColor: "rgba(0,240,255,0.4)" }} />
      </div>

      {/* ===== TOP ROW ===== */}
      <div className="flex items-start justify-between relative z-10">
        {/* Identity block - top left */}
        <div ref={identityRef} className="flex flex-col gap-1" style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#00F0FF", boxShadow: "0 0 8px #00F0FF" }}
            />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase" style={{ color: "#00F0FF" }}>
              Online
            </span>
          </div>
          <span className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: "#666666" }}>
            Portfolio / <span ref={yearRef}>0</span>
          </span>
        </div>

        {/* Coordinates */}
        <div
          ref={coordsRef}
          className="hidden md:flex flex-col items-end gap-1 font-mono text-[10px] tracking-widest"
          style={{ color: "#444444", opacity: 0 }}
        >
          <span>{"40.7128\u00B0 N"}</span>
          <span>{"74.0060\u00B0 W"}</span>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-8 mt-10 md:mt-auto">
        {/* Left: headline + CTA */}
        <div ref={headlineRef} className="relative flex flex-col gap-6 max-w-4xl">
          <div
            ref={toolIconRef}
            className="absolute pointer-events-none z-20"
            style={{ top: 0, left: 0, opacity: 0 }}
            aria-hidden="true"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 7.5a5.5 5.5 0 0 1-7.44 5.14l-6.8 6.8a1.5 1.5 0 0 1-2.12 0l-.08-.08a1.5 1.5 0 0 1 0-2.12l6.8-6.8A5.5 5.5 0 1 1 21 7.5Z"
                stroke="#00F0FF"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="18" cy="6" r="1.2" fill="#00F0FF" />
            </svg>
          </div>
          <div
            ref={paintIconRef}
            className="absolute pointer-events-none z-20"
            style={{ top: 0, left: 0, opacity: 0 }}
            aria-hidden="true"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M5.8 18.2 4.2 19.8" stroke="#00F0FF" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M6.9 17.1 11 13" stroke="#00F0FF" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M11 13 14.2 16.2" stroke="#00F0FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.2 16.2 18.7 11.7c.5-.5.5-1.3 0-1.8l-4.6-4.6c-.5-.5-1.3-.5-1.8 0L7.8 9.8" stroke="#00F0FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.8 9.8 11 13" stroke="#00F0FF" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M16.4 7.3 13.1 10.6" stroke="#00F0FF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
              <circle cx="4.2" cy="19.8" r="1" fill="#00F0FF" />
            </svg>
          </div>
          {/* Line 1 */}
          <div className="overflow-hidden">
            <div
              ref={titleLineOneRef}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] font-sans font-bold tracking-[-0.04em] leading-[0.85]"
              style={{ color: "#E8E8E8" }}
            >
              {Array.from(HERO_TITLE_LINE_ONE).map((char, index) => (
                <span
                  key={`line1-${index}-${char}`}
                  data-char
                  className="inline-block"
                  style={{
                    opacity: 0,
                    transform: "translateY(100%)",
                    color: "transparent",
                    backgroundImage: "linear-gradient(to bottom, #00F0FF 0%, #00F0FF var(--paint-fill, 0%), #E8E8E8 var(--paint-fill, 0%), #E8E8E8 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden flex items-baseline gap-4 md:gap-6">
            <div
              ref={titleLineTwoRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7.5rem] font-sans font-bold tracking-[-0.04em] leading-[0.85]"
              style={{ color: "#E8E8E8" }}
            >
              {Array.from(HERO_TITLE_LINE_TWO).map((char, index) => (
                <span
                  key={`line2-${index}-${char}`}
                  data-char
                  className="inline-block"
                  style={{
                    opacity: 0,
                    transform: "translateX(60px)",
                    color: "transparent",
                    backgroundImage: "linear-gradient(to bottom, #00F0FF 0%, #00F0FF var(--paint-fill, 0%), #E8E8E8 var(--paint-fill, 0%), #E8E8E8 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div
              className="hidden sm:block w-3 h-3 rounded-full flex-shrink-0 -translate-y-2"
              style={{ backgroundColor: "#00F0FF", boxShadow: "0 0 16px #00F0FF" }}
            />
          </div>

          {/* Status strip */}
          <div
            ref={statusBlockRef}
            className="flex flex-wrap items-center gap-4 md:gap-8 mt-4 md:pl-1"
            style={{ opacity: 0 }}
          >
            {["React", "Next.js", "TypeScript", "Motion"].map((tech) => (
              <div key={tech} className="flex items-center gap-2">
                <div className="w-px h-4" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                <span className="text-[11px] font-mono tracking-[0.15em] uppercase" style={{ color: "#666666" }}>
                  {tech}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="mt-6 md:pl-1" style={{ opacity: 0 }}>
            <MagneticButton onClick={scrollToContent}>
              <span className="relative flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase px-8 py-4">
                <span style={{ color: "#E8E8E8" }}>Explore Work</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12m0 0L8 2.5M13 7l-5 4.5" stroke="#00F0FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Right: sidebar stats */}
        <div className="flex items-end gap-8 lg:gap-10 flex-shrink-0">
          {/* Sidebar stats */}
          <div
            ref={sidebarRef}
            className="hidden lg:flex flex-col items-end gap-8 pb-2"
            style={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-3">
              <span
                className="font-mono text-[10px] tracking-[0.5em] uppercase"
                style={{
                  color: "#444444",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  letterSpacing: "0.5em",
                }}
              >
                Scroll to discover
              </span>
              <div
                ref={scrollLineRef}
                className="w-px h-20 origin-top"
                style={{ background: "linear-gradient(to bottom, #00F0FF, transparent)" }}
              />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-3xl font-sans font-bold" style={{ color: "#E8E8E8" }}>5+</span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "#666666" }}>Years Exp</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-3xl font-sans font-bold" style={{ color: "#E8E8E8" }}>40+</span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "#666666" }}>Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM STRIP ===== */}
      <div className="relative z-10 flex items-end justify-between mt-8">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "#333333" }}>
          Based in India
        </span>
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "#333333" }}>
          Available for freelance
        </span>
      </div>

      {/* ===== MASTERMIND CARD - slightly left, vertically centered ===== */}
      <div
        ref={cardWrapperRef}
        className="absolute z-20 hidden md:block"
        style={{
          top: "50%",
          right: "18%",
          transform: "translateY(-50%)",
          opacity: 0,
        }}
      >
        <MastermindCard />
      </div>

      {/* Mobile card placement */}
      <div className="relative z-20 flex justify-center md:hidden mt-8 mb-4">
        <MastermindCard />
      </div>

      {/* Ambient glow - offset to bottom-left */}
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: "60%", height: "60%" }}>
        <div
          className="w-full h-full opacity-15 blur-[150px]"
          style={{ background: "radial-gradient(ellipse at 30% 80%, #00F0FF 0%, transparent 65%)" }}
        />
      </div>
    </section>
  )
}
