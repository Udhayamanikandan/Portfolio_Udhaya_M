import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import IntroLoader from './components/IntroLoader'
import DevConsole from './components/DevConsole'
import ChapterCard from './components/ChapterCard'
import { playTransmission } from './utils/audioUX'

function App() {
  const [loading, setLoading] = useState(true)
  const [userInterest, setUserInterest] = useState('none') // 'none', 'ai', 'web', 'iot'
  const [ambientFlash, setAmbientFlash] = useState(false)
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  // Cursor following and GPU-accelerated CSS parallax
  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'

      // GPU accelerated Parallax offsets
      const px = (e.clientX / window.innerWidth - 0.5).toFixed(3)
      const py = (e.clientY / window.innerHeight - 0.5).toFixed(3)
      document.documentElement.style.setProperty('--mouse-x', px)
      document.documentElement.style.setProperty('--mouse-y', py)
    }

    const animRing = () => {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      requestAnimationFrame(animRing)
    }

    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)
      document.documentElement.style.setProperty('--scroll-percent', scrolled.toFixed(4))
    }

    document.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)
    animRing()

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [loading])

  // Periodic Ambient Operating System Diagnostics Events
  useEffect(() => {
    if (loading) return

    const triggerDiagnosticEvent = () => {
      setAmbientFlash(true)
      playTransmission()
      
      setTimeout(() => {
        setAmbientFlash(false)
      }, 900)
    }

    // Trigger every 45 seconds
    const interval = setInterval(triggerDiagnosticEvent, 45000)

    // Initial slight delay trigger
    const initialDelay = setTimeout(triggerDiagnosticEvent, 8000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialDelay)
    }
  }, [loading])

  return (
    <>
      {loading && <IntroLoader onFinish={() => setLoading(false)} />}
      <ParticleBackground />
      
      {/* Cinematic CRT Scan overlays */}
      <div className="scanline-sweep" />
      <div className={`ambient-scan-flash ${ambientFlash ? 'active' : ''}`} />

      {/* Futuristic Custom Cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      
      <Navbar />
      
      {/* Perspective layer for dynamic depth parallax */}
      <div style={{
        transform: 'translate3d(calc(var(--mouse-x) * 10px), calc(var(--mouse-y) * 10px), 0)',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        willChange: 'transform'
      }}>
        <Hero />
        
        <ChapterCard
          number="01"
          title="THE SPARK"
          subtitle="How curiosity became obsession"
          description="From dismantling broken household electronics in childhood to designing complex machine algorithms, the journey began with one simple question: 'How does it work?'"
        />
        <Skills />
        
        <ChapterCard
          number="02"
          title="THE BUILDER"
          subtitle="Turning concepts into physical and digital systems"
          description="Assembling blueprint lines, tracing hardware schematics, and writing MERN architectures to bridge the virtual space with real-world physical telemetry."
        />
        <Projects userInterest={userInterest} onInterestChange={setUserInterest} />
        
        <ChapterCard
          number="03"
          title="THE OPERATOR"
          subtitle="Systems actively running in real time"
          description="Monitoring data streams, coordinating network sockets, and tracing performance benchmarks to operate code under real-world loads."
        />
        <Achievements />
        
        <ChapterCard
          number="04"
          title="THE FUTURE"
          subtitle="Speculative innovation and predictive systems"
          description="Exploring autonomous campus networks, adaptive AI modules, and what technologies will shape the builder's world in the decade to come."
        />
        <Contact />
        <Footer />
      </div>
      
      <DevConsole />
    </>
  )
}

export default App