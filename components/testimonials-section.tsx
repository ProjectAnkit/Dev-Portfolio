"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote:
      "Ankit's eye for interaction detail raised the bar for our entire team. Handoffs read like documentation — you just build it and it looks and feels exactly right.",
    name: "Rahul Verma",
    role: "Product Lead, Playo",
  },
  {
    quote:
      "He treats performance as an architectural feature, not an afterthought. Our platform went from sluggish to instantaneous, and customers noticed immediately.",
    name: "Sarah Chen",
    role: "Engineering Manager",
  },
  {
    quote:
      "The rare engineer who debates cubic-bezier easing curves and business conversion metrics in the same breath — and is consistently right about both.",
    name: "Emily Torres",
    role: "Design Director",
  },
]

export function TestimonialsSection() {
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

      const cards = gridRef.current?.querySelectorAll("[data-quote-card]")
      if (cards?.length) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 82%",
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 32 },
              { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out" }
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
              06 / TESTIMONIALS & REFERENCES
            </span>
            <h2 className="font-sans font-bold tracking-[-0.03em] leading-[1.08] text-[clamp(1.8rem,4vw,3.2rem)] text-[#16140F]">
              Direct feedback from design & engineering partners.
            </h2>
          </div>

          <div className="md:col-span-4 md:pl-10 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 border-[#E4E0D6]">
            <p className="text-sm leading-relaxed text-[#6E675C]">
              Collaboration across founders, engineering leaders, and product design heads worldwide.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#A39B8B] uppercase">
              <span>PEER REVIEWS</span>
              <span>—</span>
              <span className="text-[#0E7490]">CONFIRMED</span>
            </div>
          </div>
        </div>

        {/* 3-Column Testimonials Grid Segregated by Vertical Lines */}
        <div
          ref={gridRef}
          className="border-b border-[#E4E0D6] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E4E0D6] bg-white/40"
        >
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              data-quote-card
              className="p-8 sm:p-10 flex flex-col justify-between gap-8 transition-colors duration-300 hover:bg-white"
              style={{ opacity: 0 }}
            >
              <div>
                <span className="font-mono text-[11px] text-[#A39B8B] block mb-4">
                  REF / 0{i + 1}
                </span>
                <blockquote className="text-[15px] leading-relaxed text-[#6E675C]">
                  “{t.quote}”
                </blockquote>
              </div>

              <figcaption className="pt-6 border-t border-[#E4E0D6]">
                <div className="text-sm font-sans font-bold text-[#16140F]">
                  {t.name}
                </div>
                <div className="text-[11px] font-mono text-[#0E7490] mt-0.5">
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
