"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SiteFooter() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.fromTo(
            ctaRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
          )
        },
        once: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={sectionRef} id="contact" className="relative pt-24 md:pt-36 pb-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Architectural Contact Band with Left/Right Segregation */}
        <div
          ref={ctaRef}
          className="relative border-t border-b border-[#E4E0D6] grid grid-cols-1 lg:grid-cols-12 bg-white/40"
          style={{ opacity: 0 }}
        >
          {/* Corner crosshairs */}
          <span className="grid-plus top-0 left-0">+</span>
          <span className="grid-plus top-0 right-0">+</span>
          <span className="grid-plus bottom-0 left-0">+</span>
          <span className="grid-plus bottom-0 right-0">+</span>
          <span className="grid-plus top-0 left-7/12 hidden lg:block">+</span>
          <span className="grid-plus bottom-0 left-7/12 hidden lg:block">+</span>

          {/* Left Column: The Main Question & Signature */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:border-r border-b lg:border-b-0 border-[#E4E0D6] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#0E7490] block mb-3">
                07 / TRANSMISSION & INQUIRIES
              </span>
              <h2 className="font-sans font-bold tracking-[-0.035em] leading-[1.04] text-[clamp(2.2rem,5.5vw,4.5rem)] text-[#16140F]">
                Building something that deserves to be{" "}
                <span className="text-[#0E7490] italic font-medium">remembered?</span>
              </h2>
              <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-[#6E675C]">
                Available for full-time senior engineering roles, high-impact design system builds, and creative consulting.
              </p>
            </div>

            {/* Status mark */}
            <div className="mt-12 pt-8 border-t border-[#E4E0D6] flex items-center gap-4">
              <span className="text-[12px] font-mono font-semibold tracking-[0.2em] text-[#16140F] uppercase">
                COMMUNICATIONS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E7490]" />
              <span className="text-[11px] font-mono tracking-widest text-[#A39B8B] uppercase">
                OPEN FOR 2026 ENGAGEMENTS
              </span>
            </div>
          </div>

          {/* Right Column: Channels, Coordinates & Direct Message */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between divide-y divide-[#E4E0D6]">
            {/* Primary Email Channel */}
            <div className="pb-8">
              <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#A39B8B] block mb-3">
                [ DIRECT DISPATCH ]
              </span>
              <a
                href="mailto:hello@ankitthakur.dev"
                className="group inline-flex items-center gap-3 text-[13px] font-mono tracking-[0.16em] uppercase px-7 py-4 rounded-full transition-all duration-300 hover:gap-4 bg-[#16140F] text-[#FAFAF7] hover:bg-[#0E7490]"
              >
                hello@ankitthakur.dev
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Social & Reference Links */}
            <div className="py-8">
              <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#A39B8B] block mb-4">
                [ NETWORK CHANNELS ]
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { label: "GitHub", href: "https://github.com" },
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "Read.cv", href: "#" },
                  { label: "Resume PDF", href: "#" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] font-mono tracking-[0.14em] uppercase px-5 py-3 rounded-full border border-[#E4E0D6] bg-white text-[#6E675C] hover:text-[#0E7490] hover:border-[#0E7490] transition-colors"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Availability details */}
            <div className="pt-8 flex items-center justify-between text-[11px] font-mono text-[#A39B8B]">
              <span>RESPONSE TIME &lt; 24H</span>
              <span className="text-[#0E7490]">IST / UTC+5:30</span>
            </div>
          </div>
        </div>

        {/* Footer Sub-strip */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-[#E4E0D6]">
          <span className="text-[12px] font-mono text-[#A39B8B]">
            © 2026. Crafted with architectural precision, clean typography & zero fluff.
          </span>
          <div className="flex items-center gap-6">
            <span className="text-[12px] font-mono text-[#A39B8B]">
              Bengaluru, IN
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[12px] font-mono text-[#16140F] hover:text-[#0E7490] transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
