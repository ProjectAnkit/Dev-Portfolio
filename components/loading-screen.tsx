"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

export function LoadingScreen() {
  const [shouldRender, setShouldRender] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const obj = { val: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit: slide the curtain up
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          delay: 0.15,
          onComplete: () => {
            setShouldRender(false)
            document.body.style.overflow = ""
          },
        })
      },
    })

    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
    tl.to(
      obj,
      {
        val: 100,
        duration: 1.0,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.floor(obj.val)
          if (countRef.current) countRef.current.textContent = String(v)
          if (barRef.current) barRef.current.style.width = `${v}%`
        },
      },
      "-=0.2"
    )

    return () => {
      tl.kill()
      document.body.style.overflow = ""
    }
  }, [])

  if (!shouldRender) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#FAFAF7" }}
    >
      <div ref={nameRef} style={{ opacity: 0 }} className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-sm md:text-base font-bold tracking-[0.3em] uppercase"
            style={{ color: "#16140F" }}
          >
            INITIALIZING
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#0E7490" }}
          />
        </div>
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#A39B8B] mt-2">
          INDEX — 2026
        </span>
      </div>

      <div className="mt-8 w-48">
        <div className="h-px w-full" style={{ backgroundColor: "#E4E0D6" }}>
          <div
            ref={barRef}
            className="h-full"
            style={{ width: "0%", backgroundColor: "#0E7490" }}
          />
        </div>
        <div className="mt-3 flex justify-between text-[10px] font-mono tracking-[0.2em]" style={{ color: "#A39B8B" }}>
          <span>LOADING</span>
          <span>
            <span ref={countRef}>0</span>%
          </span>
        </div>
      </div>
    </div>
  )
}
