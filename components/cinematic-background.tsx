"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Float } from "@react-three/drei"
import { useScrollProgress } from "@/hooks/use-scroll-progress"

const PARTICLE_COUNT = 15000

// Helper to create a texture with "0" and "1" side-by-side
const createBinaryTexture = () => {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 64
  const ctx = canvas.getContext("2d")
  if (!ctx) return null
  
  // Transparent background
  ctx.clearRect(0, 0, 128, 64)
  
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 52px monospace"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  
  ctx.fillText("0", 32, 35)
  ctx.fillText("1", 96, 35)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

function ParticleSystem() {
  const scrollProgress = useScrollProgress()
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Create binary texture
  const binaryTexture = useMemo(() => createBinaryTexture(), [])

  // Create geometry attributes
  const { spherePositions, gridPositions, randoms } = useMemo(() => {
    const sphere = new Float32Array(PARTICLE_COUNT * 3)
    const grid = new Float32Array(PARTICLE_COUNT * 3)
    const rands = new Float32Array(PARTICLE_COUNT)

    // Calculate grid dimensions to fit count
    const gridSize = Math.ceil(Math.pow(PARTICLE_COUNT, 1 / 3))
    const spacing = 1.2
    let gridIndex = 0

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        rands[i] = Math.random()

        // Neural Sphere
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const radius = 2 + Math.random() * 2
        sphere[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        sphere[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        sphere[i * 3 + 2] = radius * Math.cos(phi)

        // Matrix Grid
        if (gridIndex < Math.pow(gridSize, 3)) {
            const x = (gridIndex % gridSize) - gridSize / 2
            const y = (Math.floor(gridIndex / gridSize) % gridSize) - gridSize / 2
            const z = (Math.floor(gridIndex / (gridSize * gridSize))) - gridSize / 2
            
            grid[i * 3] = x * spacing
            grid[i * 3 + 1] = y * spacing
            grid[i * 3 + 2] = z * spacing
            gridIndex++
        } else {
             // Fallback if particles exceed grid (shouldn't happen with ceil, but safe to scale sphere)
             grid[i * 3] = sphere[i * 3] * 1.5
             grid[i * 3 + 1] = sphere[i * 3 + 1] * 1.5
             grid[i * 3 + 2] = sphere[i * 3 + 2] * 1.5
        }
    }
    return { spherePositions: sphere, gridPositions: grid, randoms: rands }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uTexture: { value: binaryTexture }
    }),
    [binaryTexture]
  )

  useFrame(({ clock }) => {
    if (!pointsRef.current || !materialRef.current) return

    // Smoothly animate between sphere and grid based on scroll progression
    let interpolationVal = 0
    if (scrollProgress > 0.2 && scrollProgress < 0.6) {
        interpolationVal = (scrollProgress - 0.2) / 0.4
    } else if (scrollProgress >= 0.6) {
        interpolationVal = 1
    }

    // Apply cubic easing for smoother transition
    const easeProgress = interpolationVal < 0.5 
        ? 4 * interpolationVal * interpolationVal * interpolationVal 
        : 1 - Math.pow(-2 * interpolationVal + 2, 3) / 2

    // Slowly rotate the entire swarm
    pointsRef.current.rotation.y += 0.001 + (scrollProgress * 0.005)
    pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1

    // Update uniforms
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    materialRef.current.uniforms.uScroll.value = easeProgress
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[spherePositions, 3]}
            count={PARTICLE_COUNT}
            array={spherePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aGridPosition"
            args={[gridPositions, 3]}
            count={PARTICLE_COUNT}
            array={gridPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aRandom"
            args={[randoms, 1]}
            count={PARTICLE_COUNT}
            array={randoms}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={uniforms}
          vertexShader={`
            uniform float uTime;
            uniform float uScroll;
            attribute vec3 aGridPosition;
            attribute float aRandom;
            varying float vAlpha;
            varying float vRandom;
            
            void main() {
              vRandom = aRandom;
              float particleProgress = uScroll;
              
              // Interpolate between sphere and grid positions
              vec3 currentPos = mix(position, aGridPosition, particleProgress);
              
              // Add floating jitter that disappears as it becomes the rigid matrix grid
              float jitter = (1.0 - particleProgress) * sin(uTime * 2.0 + vRandom * 100.0) * 0.4;
              currentPos.y += jitter;
              currentPos.x += jitter * 0.5;
              
              // Fade out closer points and points during transition
              vAlpha = 1.0 - (particleProgress * 0.4);
              
              vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
              
              // Scale point size based on depth and scroll progress to make numbers readable
              gl_PointSize = (45.0 / -mvPosition.z) * (1.0 + aRandom * 0.5) * (1.0 + particleProgress * 0.5);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform sampler2D uTexture;
            varying float vAlpha;
            varying float vRandom;
            
            void main() {
              // Create a binary flip that changes over time, staggered by the random attribute
              // using a step function to snap between 0 and 1
              float flip = step(0.5, fract(uTime * 3.0 + vRandom * 15.0));
              
              vec2 uv = gl_PointCoord;
              // Map the 0-1 gl_PointCoord to either the left or right half of our texture
              uv.x = uv.x * 0.5 + (flip * 0.5);
              
              // Sample the generated texture
              vec4 texColor = texture2D(uTexture, uv);
              
              // Base matrix cyan color
              vec3 color = vec3(0.0, 0.94, 1.0);
              
              gl_FragColor = vec4(color, texColor.a * vAlpha * 0.7);
            }
          `}
        />
    </points>
  )
}

function Scene() {
  const scrollProgress = useScrollProgress()

  useFrame((state) => {
    // Cinematic camera fly-through
    // Start far away, fly through the cloud as it grids up, end inside the grid
    const targetZ = 12 - (scrollProgress * 10)
    const targetY = scrollProgress * 3
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, scrollProgress * 0.15, 0.05)
  })

  return (
    <>
      <fog attach="fog" args={["#0A0A0A", 2, 25]} />
      <ambientLight intensity={0.5} />
      
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
        <ParticleSystem />
      </Float>
    </>
  )
}

export function CinematicBackground() {
  return (
    <div className="cinematic-bg">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
