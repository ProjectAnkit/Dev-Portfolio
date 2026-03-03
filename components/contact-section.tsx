"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MagneticButton } from "./magnetic-button"

gsap.registerPlugin(ScrollTrigger)

const INQUIRY_TYPES = [
  { id: "collab", label: "Collaboration", icon: "+" },
  { id: "hire", label: "Hire Me", icon: ">" },
  { id: "freelance", label: "Freelance", icon: "*" },
  { id: "coffee", label: "Just Say Hi", icon: "~" },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "$ init contact_protocol",
    "> Awaiting transmission...",
  ])
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches

      if (isMobile) {
        gsap.set(headlineRef.current, { opacity: 1, x: 0, clearProps: "transform" })
        gsap.set(terminalRef.current, { opacity: 1, y: 0, scale: 1, clearProps: "transform" })
        gsap.set(rightPanelRef.current, { opacity: 1, x: 0, clearProps: "transform" })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      })

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, x: -80 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power4.out" }
      )
        .fromTo(
          terminalRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          rightPanelRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addTerminalLine = useCallback((line: string) => {
    setTerminalLines((prev) => [...prev, line])
  }, [])

  const handleTypeSelect = useCallback(
    (type: (typeof INQUIRY_TYPES)[number]) => {
      setSelectedType(type.id)
      addTerminalLine(`> type.set("${type.label}")`)
      addTerminalLine(`  [OK] Inquiry type locked.`)
      setTimeout(() => setStep(1), 400)
    },
    [addTerminalLine]
  )

  const handleInputChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const handleNextStep = useCallback(() => {
    if (step === 1 && formData.name) {
      addTerminalLine(`> user.name = "${formData.name}"`)
      setStep(2)
    } else if (step === 2 && formData.email) {
      addTerminalLine(`> user.email = "${formData.email}"`)
      setStep(3)
    } else if (step === 3 && formData.message) {
      addTerminalLine(`> payload.message = "${formData.message.slice(0, 30)}..."`)
      addTerminalLine(`$ transmit --encrypt --priority=high`)
      setStep(4)
    }
  }, [step, formData, addTerminalLine])

  const handleSubmit = useCallback(() => {
    addTerminalLine(`> Encrypting payload...`)
    addTerminalLine(`> Establishing secure channel...`)

    setTimeout(() => {
      addTerminalLine(`  [SUCCESS] Message transmitted.`)
      addTerminalLine(`  Response ETA: < 24h`)
      addTerminalLine(`$ _`)
      setSubmitted(true)
    }, 1200)
  }, [addTerminalLine])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        if (step < 4) handleNextStep()
        else if (!submitted) handleSubmit()
      }
    },
    [step, submitted, handleNextStep, handleSubmit]
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`vl-${i}`}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${(i + 1) * (100 / 13)}%`, backgroundColor: "#E8E8E8" }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`hl-${i}`}
            className="absolute left-0 right-0 h-px"
            style={{ top: `${(i + 1) * (100 / 9)}%`, backgroundColor: "#E8E8E8" }}
          />
        ))}
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-6 h-6 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: "#00F0FF", opacity: 0.4 }} />
        <div className="absolute top-0 left-0 h-full w-px" style={{ backgroundColor: "#00F0FF", opacity: 0.4 }} />
      </div>
      <div className="absolute bottom-8 right-8 w-6 h-6 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-px" style={{ backgroundColor: "#00F0FF", opacity: 0.4 }} />
        <div className="absolute bottom-0 right-0 h-full w-px" style={{ backgroundColor: "#00F0FF", opacity: 0.4 }} />
      </div>

      <div className="relative z-10 px-5 sm:px-6 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        {/* Top row: section label + time */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 md:mb-20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#00F0FF" }} />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase" style={{ color: "#00F0FF" }}>
              Transmission
            </span>
          </div>
          <span className="text-[10px] font-mono tabular-nums" style={{ color: "#333" }}>
            {currentTime} UTC
          </span>
        </div>

        {/* Headline - editorial, left-aligned */}
        <div ref={headlineRef} className="mb-14 md:mb-24" style={{ opacity: 0 }}>
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter leading-[0.9]"
            style={{ color: "#E8E8E8" }}
          >
            {"Let's"}
            <br />
            <span className="inline-flex items-baseline gap-4 md:gap-6">
              <span style={{ color: "#00F0FF" }}>Build</span>
              <span
                className="text-lg md:text-2xl font-mono font-normal tracking-normal"
                style={{ color: "#333" }}
              >
                something
              </span>
            </span>
            <br />
            Together
          </h2>
        </div>

        {/* Main content: two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Terminal feed */}
          <div ref={terminalRef} style={{ opacity: 0 }}>
            <div
              className="relative border rounded-lg overflow-hidden"
              style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(17,17,17,0.6)" }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF4444" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FFAA00" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#00CC66" }} />
                </div>
                <span className="text-[9px] font-mono tracking-wider uppercase" style={{ color: "#333" }}>
                  contact_protocol v2.0
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 h-[320px] md:h-[380px] overflow-y-auto flex flex-col gap-1.5">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className="text-xs font-mono leading-relaxed"
                    style={{
                      color: line.startsWith("$")
                        ? "#00F0FF"
                        : line.includes("[SUCCESS]")
                          ? "#00CC66"
                          : line.includes("[OK]")
                            ? "#00F0FF"
                            : line.startsWith(">")
                              ? "#888"
                              : line.startsWith("  ")
                                ? "#555"
                                : "#666",
                    }}
                  >
                    {line}
                  </div>
                ))}
                <div
                  className="w-1.5 h-4 mt-1"
                  style={{
                    backgroundColor: "#00F0FF",
                    animation: "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite",
                  }}
                />
              </div>
            </div>

            {/* Status row below terminal */}
            <div className="flex items-center justify-between mt-4 px-1">
              <span className="text-[9px] font-mono" style={{ color: "#333" }}>
                {submitted ? "TRANSMISSION COMPLETE" : `STEP ${Math.min(step + 1, 4)} / 4`}
              </span>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className="w-6 h-0.5 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: s <= step ? "#00F0FF" : "rgba(255,255,255,0.06)",
                      boxShadow: s <= step ? "0 0 6px rgba(0,240,255,0.4)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive form steps */}
          <div ref={rightPanelRef} className="flex flex-col justify-center" style={{ opacity: 0 }}>
            {!submitted ? (
              <>
                {/* Step 0: Choose inquiry type */}
                {step === 0 && (
                  <StepWrapper label="01" title="What brings you here?">
                    <div className="grid grid-cols-2 gap-3">
                      {INQUIRY_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleTypeSelect(type)}
                          className="group relative text-left p-5 border rounded-lg cursor-pointer transition-all duration-400 hover:scale-[1.02]"
                          style={{
                            borderColor:
                              selectedType === type.id
                                ? "rgba(0,240,255,0.4)"
                                : "rgba(255,255,255,0.06)",
                            backgroundColor:
                              selectedType === type.id
                                ? "rgba(0,240,255,0.04)"
                                : "transparent",
                          }}
                        >
                          <span
                            className="text-lg font-mono block mb-2 transition-colors duration-300 group-hover:text-[#00F0FF]"
                            style={{ color: "#333" }}
                          >
                            {type.icon}
                          </span>
                          <span
                            className="text-sm font-sans font-medium tracking-tight"
                            style={{ color: "#E8E8E8" }}
                          >
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </StepWrapper>
                )}

                {/* Step 1: Name */}
                {step === 1 && (
                  <StepWrapper key="step-1" label="02" title="What should I call you?">
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Your name"
                        autoFocus
                        className="w-full text-2xl md:text-3xl font-sans font-medium bg-transparent border-none outline-none py-4 placeholder:text-[#1F1F1F]"
                        style={{ color: "#E8E8E8", caretColor: "#00F0FF" }}
                      />
                      <div
                        className="h-px mt-1 transition-all duration-700"
                        style={{
                          background: formData.name
                            ? "linear-gradient(90deg, #00F0FF, transparent)"
                            : "rgba(255,255,255,0.06)",
                          width: formData.name ? "100%" : "30%",
                        }}
                      />
                    </div>
                    <ContinueHint onContinue={handleNextStep} visible={!!formData.name} />
                  </StepWrapper>
                )}

                {/* Step 2: Email */}
                {step === 2 && (
                  <StepWrapper key="step-2" label="03" title={`Nice to meet you, ${formData.name}. Your email?`}>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="you@domain.com"
                        autoFocus
                        className="w-full text-2xl md:text-3xl font-sans font-medium bg-transparent border-none outline-none py-4 placeholder:text-[#1F1F1F]"
                        style={{ color: "#E8E8E8", caretColor: "#00F0FF" }}
                      />
                      <div
                        className="h-px mt-1 transition-all duration-700"
                        style={{
                          background: formData.email
                            ? "linear-gradient(90deg, #00F0FF, transparent)"
                            : "rgba(255,255,255,0.06)",
                          width: formData.email ? "100%" : "30%",
                        }}
                      />
                    </div>
                    <ContinueHint onContinue={handleNextStep} visible={!!formData.email} />
                  </StepWrapper>
                )}

                {/* Step 3: Message */}
                {step === 3 && (
                  <StepWrapper key="step-3" label="04" title="Tell me about your project.">
                    <div className="relative">
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe your vision..."
                        autoFocus
                        rows={4}
                        className="w-full text-lg md:text-xl font-sans bg-transparent border-none outline-none py-4 resize-none leading-relaxed placeholder:text-[#1F1F1F]"
                        style={{ color: "#E8E8E8", caretColor: "#00F0FF" }}
                      />
                      <div
                        className="h-px mt-1 transition-all duration-700"
                        style={{
                          background: formData.message
                            ? "linear-gradient(90deg, #00F0FF, transparent)"
                            : "rgba(255,255,255,0.06)",
                          width: formData.message ? "100%" : "30%",
                        }}
                      />
                    </div>
                    <ContinueHint onContinue={handleNextStep} visible={!!formData.message} />
                  </StepWrapper>
                )}

                {/* Step 4: Review + Send */}
                {step === 4 && (
                  <StepWrapper key="step-4" label="--" title="Ready to transmit.">
                    <div className="flex flex-col gap-4 mb-8">
                      <ReviewLine label="Type" value={INQUIRY_TYPES.find((t) => t.id === selectedType)?.label || ""} />
                      <ReviewLine label="Name" value={formData.name} />
                      <ReviewLine label="Email" value={formData.email} />
                      <ReviewLine label="Message" value={formData.message.length > 60 ? formData.message.slice(0, 60) + "..." : formData.message} />
                    </div>

                    <MagneticButton onClick={handleSubmit}>
                      <span
                        className="text-xs font-mono tracking-[0.3em] uppercase px-10 py-4 block"
                        style={{ color: "#E8E8E8" }}
                      >
                        Transmit
                      </span>
                    </MagneticButton>
                  </StepWrapper>
                )}
              </>
            ) : (
              /* Success state */
              <div className="flex flex-col items-start">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-8"
                  style={{
                    border: "1px solid rgba(0,240,255,0.3)",
                    boxShadow: "0 0 30px rgba(0,240,255,0.15)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h3
                  className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-3"
                  style={{ color: "#E8E8E8" }}
                >
                  Transmission Received
                </h3>
                <p className="text-sm font-mono leading-relaxed max-w-md" style={{ color: "#555" }}>
                  {"Your message is in the queue. I'll respond within 24 hours. In the meantime, feel free to explore the rest of the portfolio."}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#00CC66" }} />
                  <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: "#00CC66" }}>
                    Status: Delivered
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-32 pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-mono" style={{ color: "#444" }}>
              Crafted with obsessive precision
            </span>
            <span className="text-[10px] font-mono" style={{ color: "#222" }}>
              {new Date().getFullYear()} / All systems nominal
            </span>
          </div>

          <div className="flex gap-8">
            {[
              { name: "GitHub", href: "#" },
              { name: "LinkedIn", href: "#" },
              { name: "Twitter", href: "#" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-mono tracking-[0.25em] uppercase transition-colors duration-300"
                style={{ color: "#444" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00F0FF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Sub-components ---- */

function StepWrapper({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-mono tracking-[0.3em] uppercase mb-3" style={{ color: "#333" }}>
        {label}
      </span>
      <h3
        className="text-xl md:text-2xl font-sans font-semibold tracking-tight mb-8"
        style={{ color: "#E8E8E8" }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

function ContinueHint({ onContinue, visible }: { onContinue: () => void; visible: boolean }) {
  return (
    <button
      type="button"
      onClick={onContinue}
      className="mt-8 flex items-center gap-3 group cursor-pointer transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "#555" }}>
        Press Enter or click to continue
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#555" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

function ReviewLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-[10px] font-mono tracking-[0.2em] uppercase w-16 shrink-0 pt-1" style={{ color: "#333" }}>
        {label}
      </span>
      <span className="text-sm font-sans" style={{ color: "#888" }}>
        {value}
      </span>
    </div>
  )
}
