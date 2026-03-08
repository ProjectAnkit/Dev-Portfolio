"use client"

import { useState, useEffect } from "react"

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement
      const b = document.body
      const st = "scrollTop"
      const sh = "scrollHeight"
      const scrollProgress = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)
      setProgress(scrollProgress || 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return progress
}
