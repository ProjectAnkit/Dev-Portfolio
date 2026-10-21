"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"

const MAX_XP = 1000

// Career ladder — the dev progression reads as the theme, not a game skin
const LEVELS = [
  { level: 1, title: "INTERN", at: 0 },
  { level: 2, title: "JUNIOR DEV", at: 150 },
  { level: 3, title: "MID-LEVEL DEV", at: 350 },
  { level: 4, title: "SENIOR DEV", at: 600 },
  { level: 5, title: "STAFF ENGINEER", at: 850 },
  { level: 6, title: "PRINCIPAL", at: 1000 },
]

const SECTOR_ACHIEVEMENTS: Record<string, { title: string; desc: string; xp: number }> = {
  work: { title: "EXPLORER", desc: "Selected works discovered", xp: 60 },
  about: { title: "HUMAN_SIDE", desc: "Met the person behind the pixels", xp: 60 },
  experience: { title: "TIMEWALKER", desc: "Journey log unlocked", xp: 60 },
  contact: { title: "SIGNAL_SENT", desc: "Comms channel located", xp: 80 },
}

type Toast = {
  id: number
  kind: "achievement" | "rank"
  title: string
  desc: string
}

function getLevel(xp: number) {
  return LEVELS.reduce((acc, l) => (xp >= l.at ? l : acc), LEVELS[0])
}

function AchievementToast({ toast, onDone }: { toast: Toast; onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tl = gsap.timeline({ onComplete: onDone })
    tl.fromTo(
      el,
      { x: 140, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
    )
    tl.to(el, {
      x: 140,
      opacity: 0,
      duration: 0.45,
      ease: "power2.in",
      delay: 3.4,
    })

    return () => {
      tl.kill()
    }
  }, [onDone])

  const isRank = toast.kind === "rank"

  return (
    <div
      ref={ref}
      className="relative w-64 font-mono px-4 py-3 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(255,255,255,0.94)",
        border: `1px solid ${isRank ? "#0E7490" : "#E4E0D6"}`,
        boxShadow: isRank ? "0 8px 30px rgba(14,116,144,0.15)" : "0 8px 24px rgba(22,20,15,0.08)",
      }}
    role="status"
  >
    {/* Corner brackets */}
    <div className="absolute top-0 left-0 w-2.5 h-2.5 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: "#0E7490" }} />
      <div className="absolute top-0 left-0 w-px h-full" style={{ backgroundColor: "#0E7490" }} />
    </div>
    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 pointer-events-none">
      <div className="absolute bottom-0 right-0 w-full h-px" style={{ backgroundColor: "#0E7490" }} />
      <div className="absolute bottom-0 right-0 w-px h-full" style={{ backgroundColor: "#0E7490" }} />
    </div>

    <div className="flex items-center justify-between text-[9px] tracking-[0.3em] uppercase mb-1.5">
      <span style={{ color: isRank ? "#0E7490" : "#A39B8B" }}>
        {isRank ? "\u25B2 Rank Up" : "\u2713 Achievement"}
      </span>
      <span style={{ color: "#C7BFB0" }}>SYS.NOTIFY</span>
    </div>

    <div
      className="text-sm font-sans font-semibold tracking-[0.08em] mb-0.5"
      style={{ color: isRank ? "#0E7490" : "#16140F" }}
    >
      {toast.title}
    </div>
    <div className="text-[10px] tracking-[0.12em] uppercase" style={{ color: "#6E675C" }}>
      {toast.desc}
    </div>
    </div>
  )
}

export function XPSystem() {
  const [xp, setXp] = useState(0)
  const [toasts, setToasts] = useState<Toast[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const levelRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const floatiesRef = useRef<HTMLDivElement>(null)

  const prevXp = useRef(0)
  const prevLevel = useRef(1)
  const unlocked = useRef(new Set<string>())
  const toastId = useRef(0)
  const xpRef = useRef(0)

  const pushToast = useCallback((kind: Toast["kind"], title: string, desc: string) => {
    const id = ++toastId.current
    setToasts((prev) => [...prev.slice(-2), { id, kind, title, desc }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const unlockAchievement = useCallback(
    (title: string, desc: string, xpAmount: number) => {
      if (unlocked.current.has(title)) return
      unlocked.current.add(title)
      pushToast("achievement", title, desc)
      setXp((prev) => Math.min(prev + xpAmount, MAX_XP))
    },
    [pushToast]
  )

  const addXP = useCallback((amount: number) => {
    setXp((prev) => Math.min(prev + amount, MAX_XP))
  }, [])

  // ===== XP sources: scroll, clicks, custom events from 3D avatar =====
  useEffect(() => {
    let scrollTicking = false
    let lastScrollY = 0
    let interactionCount = 0
    let lastFloaty = 0

    const spawnFloaty = (x: number, y: number, amount: number) => {
      const container = floatiesRef.current
      if (!container) return
      const el = document.createElement("span")
      el.textContent = `+${amount} XP`
      el.style.cssText = `position:fixed;left:${x + 10}px;top:${y - 10}px;color:#0E7490;font-family:monospace;font-size:10px;letter-spacing:0.15em;pointer-events:none;z-index:10002;font-weight:600;`
      container.appendChild(el)
      gsap.to(el, {
        y: -44,
        opacity: 0,
        duration: 0.9,
        ease: "power1.out",
        onComplete: () => el.remove(),
      })
    }

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

    const onClick = (e: MouseEvent) => {
      interactionCount++
      if (interactionCount > 50) return
      addXP(10)
      if (Date.now() - lastFloaty > 400) {
        lastFloaty = Date.now()
        spawnFloaty(e.clientX, e.clientY, 10)
      }
    }

    const onXpEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ amount?: number }>).detail
      if (detail?.amount) addXP(detail.amount)
    }

    const onAchievementEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ title?: string; desc?: string; xp?: number }>).detail
      if (detail?.title) {
        unlockAchievement(detail.title, detail.desc || "", detail.xp || 0)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("click", onClick)
    window.addEventListener("dev-portfolio:xp", onXpEvent)
    window.addEventListener("dev-portfolio:achievement", onAchievementEvent)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("click", onClick)
      window.removeEventListener("dev-portfolio:xp", onXpEvent)
      window.removeEventListener("dev-portfolio:achievement", onAchievementEvent)
    }
  }, [addXP, unlockAchievement])

  // ===== Sector discovery achievements =====
  useEffect(() => {
    const targets = ["work", "about", "experience", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.id
          const achievement = SECTOR_ACHIEVEMENTS[id]
          if (achievement) {
            unlockAchievement(achievement.title, achievement.desc, achievement.xp)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.2 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [unlockAchievement])

  // ===== Animated HUD + rank-up detection =====
  useEffect(() => {
    const progress = progressRef.current
    const counter = counterRef.current
    const levelEl = levelRef.current
    const titleEl = titleRef.current
    if (!progress || !counter || !levelEl || !titleEl) return

    const pct = (xp / MAX_XP) * 100
    const level = getLevel(xp)

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

    if (level.level !== prevLevel.current) {
      const goingUp = level.level > prevLevel.current
      prevLevel.current = level.level
      if (goingUp) {
        // Rank-up flash + toast
        pushToast("rank", level.title, `Promoted to LVL ${level.level}`)
        if (flashRef.current) {
          gsap.fromTo(
            flashRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              yoyo: true,
              repeat: 1,
              ease: "power1.inOut",
            }
          )
        }
        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.2 }
        )
      }
    }

    levelEl.textContent = `LV ${level.level}`
    titleEl.textContent = level.title
  }, [xp, pushToast])

  const currentLevel = getLevel(xp)

  return (
    <>
      {/* Screen-edge flash on rank-up */}
      <div
        ref={flashRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{
          opacity: 0,
          boxShadow: "inset 0 0 80px rgba(14,116,144,0.25)",
        }}
      />

      {/* Floating +XP particles */}
      <div ref={floatiesRef} className="fixed inset-0 pointer-events-none z-[10002]" />

      {/* XP progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[9998] flex items-center">
        <div
          className="w-full h-[2px] relative"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        >
          <div
            ref={progressRef}
            className="h-full"
            style={{
              width: "0%",
              backgroundColor: "#0E7490",
            }}
          />
        </div>
      </div>

      {/* Dev-rank HUD — sits below the nav, aligned right */}
      <div className="fixed top-20 right-6 md:right-8 flex items-center gap-2 z-[9999]">
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "#A39B8B" }}>
          XP
        </span>
        <span
          ref={counterRef}
          className="text-xs font-mono tabular-nums"
          style={{ color: "#0E7490" }}
        >
          0
        </span>
        <span className="text-[9px] font-mono" style={{ color: "#C7BFB0" }}>
          /{MAX_XP}
        </span>
        <span className="w-px h-3" style={{ backgroundColor: "#E4E0D6" }} />
        <div
          className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full"
          style={{ border: "1px solid #E4E0D6", backgroundColor: "rgba(250,250,247,0.85)" }}
        >
          <span
            ref={levelRef}
            className="text-[10px] font-mono tracking-[0.15em]"
            style={{ color: "#0E7490" }}
          >
            LV 1
          </span>
          <span
            ref={titleRef}
            className="text-[10px] font-mono tracking-[0.15em] uppercase"
            style={{ color: "#6E675C" }}
          >
            INTERN
          </span>
        </div>
      </div>

      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[10001] flex flex-col gap-3 items-end">
        {toasts.map((toast) => (
          <AchievementToast key={toast.id} toast={toast} onDone={() => removeToast(toast.id)} />
        ))}
      </div>
    </>
  )
}
