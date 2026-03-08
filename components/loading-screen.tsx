"use client"

import { useState, useEffect } from "react"

const BOOT_TEXTS = [
  "ESTABLISHING_CONNECTION...",
  "INITIALIZING_NEURAL_LINK...",
  "ALLOCATING_MEMORY_BANKS...",
  "COMPILING_WEBGL_SHADERS...",
  "GENERATING_PARTICLES...",
  "WAKING_UP_MATRIX..."
]

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)
  const [textIndex, setTextIndex] = useState(0)
  const [binaryGrid, setBinaryGrid] = useState<string[]>([])

  useEffect(() => {
    // Lock scrolling on mount
    document.body.style.overflow = "hidden"

    const duration = 2500 // 2.5s boot sequence
    const interval = 50
    const steps = duration / interval
    let currentStep = 0

    // Binary grid updater
    const binaryInterval = setInterval(() => {
      setBinaryGrid(Array.from({ length: 12 }).map(() => 
        Math.random().toString(2).substring(2, 10)
      ))
    }, 100)

    const timer = setInterval(() => {
      currentStep++
      const currentProgress = Math.min((currentStep / steps) * 100, 100)
      setProgress(currentProgress)

      if (currentStep % Math.max(1, Math.floor(steps / BOOT_TEXTS.length)) === 0) {
        setTextIndex((prev) => Math.min(prev + 1, BOOT_TEXTS.length - 1))
      }

      if (currentProgress >= 100) {
        clearInterval(timer)
        clearInterval(binaryInterval)
        
        // Start fade out slowly
        setTimeout(() => {
          setIsVisible(false)
          // Unlock scroll and unmount after fade transition completes
          setTimeout(() => {
            setShouldRender(false)
            document.body.style.overflow = ""
          }, 800)
        }, 400)
      }
    }, interval)

    return () => {
      clearInterval(timer)
      clearInterval(binaryInterval)
      document.body.style.overflow = ""
    }
  }, [])

  if (!shouldRender) return null

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A] font-mono text-[#00F0FF] transition-opacity duration-700 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="w-full max-w-md px-8 flex flex-col items-center">
        {/* Spinner & Logo Area */}
        <div className="relative w-16 h-16 mb-12 flex items-center justify-center">
          <div className="absolute inset-0 border-t-2 border-b-2 border-[#00F0FF] rounded-full animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 border-l-2 border-r-2 border-[#00F0FF]/40 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          <div className="absolute inset-4 border-t-2 border-b-2 border-[#00F0FF]/20 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
          <span className="text-xs font-bold tracking-widest">SYS</span>
        </div>

        {/* Status Text & Progress */}
        <div className="w-full mb-3 flex justify-between text-[10px] sm:text-xs tracking-widest opacity-80 h-4 uppercase">
          <span>{BOOT_TEXTS[textIndex]}</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-[2px] w-full bg-[#1A1A1A] relative overflow-hidden mb-12">
          <div
            className="absolute top-0 left-0 h-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Binary Grid */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-[10px] opacity-30 w-full justify-center text-center">
          {binaryGrid.map((binary, i) => (
            <div key={i}>{binary}</div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-8 text-[10px] tracking-widest opacity-30">
        SYSTEM.BOOT_SEQUENCE_v1.0.4
      </div>
    </div>
  )
}
