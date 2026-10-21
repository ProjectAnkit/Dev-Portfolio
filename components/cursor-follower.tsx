"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      })

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const onMouseEnterInteractive = () => {
      gsap.to(cursor, {
        scale: 2.5,
        opacity: 0.2,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const onMouseLeaveInteractive = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 0.5,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", onMouseMove)

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-magnetic], input, textarea"
    )
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive)
      el.addEventListener("mouseleave", onMouseLeaveInteractive)
    })

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive)
        el.removeEventListener("mouseleave", onMouseLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          border: "1px solid rgba(22,20,15,0.35)",
          opacity: 0.6,
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ backgroundColor: "#0E7490" }}
      />
    </>
  )
}
