import { useEffect, useRef } from 'react'
import { subscribeToPerformance } from '../utils/performance'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    let perfMode = 'high'
    const unsub = subscribeToPerformance((mode) => {
      perfMode = mode
    })

    // Section-aware color state
    const palettes = {
      hero: ['rgba(255, 153, 51, 0.25)', 'rgba(255, 255, 255, 0.22)', 'rgba(19, 136, 8, 0.25)'], // Saffron, White, Green
      skills: ['rgba(19, 136, 8, 0.3)', 'rgba(255, 255, 255, 0.25)', 'rgba(0, 245, 255, 0.2)'], // Green, White, Cyan
      projects: ['rgba(0, 245, 255, 0.3)', 'rgba(191, 0, 255, 0.25)', 'rgba(255, 0, 110, 0.2)'], // Cyan, Purple, Pink
      ending: ['rgba(255, 0, 110, 0.25)', 'rgba(255, 153, 51, 0.25)', 'rgba(255, 255, 255, 0.2)'] // Pink, Saffron, White
    }

    const getActivePalette = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = scrollY / (docHeight || 1)
      if (percent < 0.22) return palettes.hero
      if (percent < 0.48) return palettes.skills
      if (percent < 0.74) return palettes.projects
      return palettes.ending
    }

    const particles = []
    const pulses = []

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.35
        this.vy = (Math.random() - 0.5) * 0.35
        this.radius = Math.random() * 1.5 + 0.8
        this.colorIdx = Math.floor(Math.random() * 3)
      }
      
      update(mouseX, mouseY, palette) {
        this.x += this.vx
        this.y += this.vy

        // Wrap around boundaries
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0

        // Gravitational clustering + hover distortion field
        if (mouseX !== null && mouseY !== null) {
          const dx = this.x - mouseX
          const dy = this.y - mouseY
          const dist = Math.hypot(dx, dy)
          
          if (dist < 220 && dist > 80) {
            // Cluster at the outer edge (gravitational pull)
            const force = (220 - dist) / 140
            this.x -= (dx / dist) * force * 0.4
            this.y -= (dy / dist) * force * 0.4
          } else if (dist <= 80) {
            // Strong repulsion when too close
            const force = (80 - dist) / 80
            this.x += (dx / dist) * force * 1.8
            this.y += (dy / dist) * force * 1.8
          }
        }
      }

      draw(palette) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = palette[this.colorIdx] || 'rgba(255,255,255,0.2)'
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles.length = 0
      // Scale count based on performance mode
      const baseCount = perfMode === 'low' ? 35 : 75
      const count = Math.min(baseCount, Math.floor((width * height) / 22000))
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }
    
    initParticles()

    let mouseX = null
    let mouseY = null

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    
    const handleMouseLeave = () => {
      mouseX = null
      mouseY = null
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    // Trigger occasional signal transmission pulse
    const triggerPulse = () => {
      if (perfMode === 'low' || particles.length < 5) return
      const fromIdx = Math.floor(Math.random() * particles.length)
      const fromNode = particles[fromIdx]

      // Find a close node
      let toNode = null
      let minDist = 120
      for (let i = 0; i < particles.length; i++) {
        if (i === fromIdx) continue
        const dist = Math.hypot(fromNode.x - particles[i].x, fromNode.y - particles[i].y)
        if (dist < minDist) {
          minDist = dist
          toNode = particles[i]
        }
      }

      if (toNode) {
        pulses.push({
          from: fromNode,
          to: toNode,
          progress: 0,
          speed: 0.02 + Math.random() * 0.03
        })
      }
    }

    const pulseInterval = setInterval(triggerPulse, 1200)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      const currentPalette = getActivePalette()
      
      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY, currentPalette)
        particles[i].draw(currentPalette)
      }

      // Draw connection lines
      const maxDistance = perfMode === 'low' ? 70 : 100
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)

          if (dist < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            // Color shifts based on palette
            ctx.strokeStyle = currentPalette[0].replace(/[\d.]+\)$/, `${0.045 * (1 - dist / maxDistance)})`)
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Update & Draw traveling connection pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.progress += p.speed
        if (p.progress >= 1) {
          pulses.splice(i, 1)
          continue
        }

        // Linear interpolation
        const px = p.from.x + (p.to.x - p.from.x) * p.progress
        const py = p.from.y + (p.to.y - p.from.y) * p.progress

        ctx.beginPath()
        ctx.arc(px, py, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = '#00f5ff'
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0 // Reset shadow
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Periodically sync particle count with performance modes
    const perfSyncInterval = setInterval(() => {
      const targetCount = perfMode === 'low' ? 35 : 75
      if (particles.length !== targetCount) {
        initParticles()
      }
    }, 5000)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(pulseInterval)
      clearInterval(perfSyncInterval)
      unsub()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  )
}
