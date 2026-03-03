"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"

export function XPSystem() {
  const [xp, setXp] = useState(0)
  const [maxXp] = useState(1000)
  const progressRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const prevXp = useRef(0)
  const isComplete = useRef(false)

  const addXP = useCallback((amount: number) => {
    setXp((prev) => {
      const next = Math.min(prev + amount, maxXp)
      return next
    })
  }, [maxXp])

  useEffect(() => {
    let scrollTicking = false
    let lastScrollY = 0
    let interactionCount = 0

    const onScroll = () => {
      if (scrollTicking) return
      scrollTicking = true

      requestAnimationFrame(() => {
        const currentY = window.scrollY
        const delta = Math.abs(currentY - lastScrollY)

        if (delta > 30) {
          addXP(Math.min(Math.floor(delta / 10), 5))
          lastScrollY = currentY
        }

        scrollTicking = false
      })
    }

    const onClick = () => {
      interactionCount++
      if (interactionCount <= 50) {
        addXP(10)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("click", onClick)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("click", onClick)
    }
  }, [addXP])

  useEffect(() => {
    const progress = progressRef.current
    const counter = counterRef.current
    if (!progress || !counter) return

    const pct = (xp / maxXp) * 100

    gsap.to(progress, {
      width: `${pct}%`,
      duration: 0.6,
      ease: "power2.out",
    })

    const obj = { val: prevXp.current }
    gsap.to(obj, {
      val: xp,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        counter.textContent = Math.floor(obj.val).toString()
      },
    })

    prevXp.current = xp

    if (xp >= maxXp && !isComplete.current) {
      isComplete.current = true
      gsap.to(progress, {
        boxShadow: "0 0 20px rgba(0,240,255,0.8), 0 0 40px rgba(0,240,255,0.4)",
        duration: 0.5,
        yoyo: true,
        repeat: 2,
      })
    }
  }, [xp, maxXp])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] flex items-center">
      <div className="w-full h-[2px] relative" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <div
          ref={progressRef}
          className="h-full progress-glow"
          style={{
            width: "0%",
            backgroundColor: "#00F0FF",
            transition: "box-shadow 0.3s ease",
          }}
        />
      </div>
      <div className="fixed top-3 right-4 flex items-center gap-2 z-[9999]">
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "#666666" }}>
          XP
        </span>
        <span
          ref={counterRef}
          className="text-xs font-mono tabular-nums"
          style={{ color: "#00F0FF" }}
        >
          0
        </span>
      </div>
    </div>
  )
}
