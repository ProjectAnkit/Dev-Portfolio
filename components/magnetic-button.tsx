"use client"

import { useRef, useCallback } from "react"
import { gsap } from "gsap"

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function MagneticButton({ children, onClick, className = "" }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    })
  }, [])

  return (
    <button
      ref={buttonRef}
      data-magnetic
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-btn relative border cursor-pointer ${className}`}
      style={{
        borderColor: "rgba(255,255,255,0.1)",
        backgroundColor: "transparent",
        borderRadius: "9999px",
      }}
    >
      <span className="relative z-10">{children}</span>
      <div
        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, rgba(0,240,255,0.08), transparent 70%)",
        }}
      />
    </button>
  )
}
