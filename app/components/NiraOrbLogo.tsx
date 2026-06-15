"use client"
import { useEffect, useRef } from "react"

export default function NiraOrbLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const size = 120
    canvas.width = size
    canvas.height = size

    let angle = 0

    function draw() {
      ctx.clearRect(0, 0, size, size)

      const center = size / 2

      // Glow background
      const gradient = ctx.createRadialGradient(
        center, center, 10,
        center, center, 60
      )
      gradient.addColorStop(0, "rgba(59,130,246,0.4)")
      gradient.addColorStop(1, "rgba(59,130,246,0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(center, center, 60, 0, Math.PI * 2)
      ctx.fill()

      // Orb core
      ctx.strokeStyle = "rgba(255,255,255,0.4)"
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(center, center, 28, 0, Math.PI * 2)
      ctx.stroke()

      // Orbit ring
      ctx.save()
      ctx.translate(center, center)
      ctx.rotate(angle)
      ctx.strokeStyle = "rgba(59,130,246,0.6)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(0, 0, 40, 18, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()

      // Particles
      for (let i = 0; i < 40; i++) {
        const a = (i / 40) * Math.PI * 2 + angle
        const r = 28
        const x = center + Math.cos(a) * r
        const y = center + Math.sin(a) * r

        ctx.fillStyle = "rgba(255,255,255,0.6)"
        ctx.beginPath()
        ctx.arc(x, y, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }

      angle += 0.01
      requestAnimationFrame(draw)
    }

    draw()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain"
    />
  )
}