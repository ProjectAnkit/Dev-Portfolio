"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.6 }
    )
  }, [])

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-[9000] transition-all duration-500 ${
        scrolled ? "backdrop-blur-md" : ""
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(250,250,247,0.82)" : "transparent",
        borderBottom: scrolled ? "1px solid #E4E0D6" : "1px solid transparent",
        opacity: 0,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="group flex items-center gap-1 focus:outline-none"
          aria-label="Ankit — Home"
        >
          <span
            className="font-signature text-3xl md:text-[34px] font-bold text-[#16140F] transition-colors duration-300 group-hover:text-[#0E7490] -rotate-2 inline-block select-none tracking-wide"
          >
            Ankit
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full mb-1 transition-all duration-300 group-hover:scale-125"
            style={{ backgroundColor: "#0E7490" }}
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="text-[13px] font-mono tracking-wide transition-colors duration-300 hover:text-[#0E7490]"
              style={{ color: "#6E675C" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => scrollTo(e, "#contact")}
          className="flex items-center gap-2 text-[11px] font-mono tracking-[0.14em] uppercase px-4 py-2 rounded-full transition-all duration-300 hover:gap-2.5"
          style={{
            border: "1px solid #E4E0D6",
            color: "#16140F",
            backgroundColor: "#FFFFFF",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#16A34A" }}
          />
          Open to work
        </a>
      </div>
    </nav>
  )
}
