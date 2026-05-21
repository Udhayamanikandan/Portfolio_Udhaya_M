import { useEffect, useState } from 'react'
import { playBoot, playTick } from '../utils/audioUX'

export default function IntroLoader({ onFinish }) {
  const [logs, setLogs] = useState([])
  const [progress, setProgress] = useState(0)
  const [fade, setFade] = useState(false)

  const logLines = [
    'udhaya_kernel_v2.0.4 booting...',
    'checking neural_link status... OK',
    'establishing encrypted node... OK',
    'assembling tricolor modules... OK',
    'systems online. welcome to my world.'
  ]

  useEffect(() => {
    playBoot()
    let index = 0
    const logInterval = setInterval(() => {
      if (index < logLines.length) {
        setLogs(prev => [...prev, logLines[index]])
        playTick()
        index++
      } else {
        clearInterval(logInterval)
      }
    }, 300)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setFade(true)
            setTimeout(onFinish, 600)
          }, 350)
          return 100
        }
        return prev + 5
      })
    }, 70)

    return () => {
      clearInterval(logInterval)
      clearInterval(progressInterval)
    }
  }, [onFinish])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#030712',
      color: '#ffffff',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      opacity: fade ? 0 : 1,
      pointerEvents: fade ? 'none' : 'auto',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '400px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Terminal Header */}
        <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }} />
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.48rem',
            color: 'rgba(255,255,255,0.2)',
            marginLeft: '0.5rem',
            letterSpacing: '1.5px'
          }}>SYSTEM_INITIALIZE</span>
        </div>

        {/* Logs */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.65rem',
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.7)',
          minHeight: '120px'
        }}>
          {logs.map((log, i) => (
            <div key={i}>
              <span style={{ color: i === logLines.length - 1 ? 'var(--flag-green)' : 'var(--flag-saffron)' }}>▶</span> {log}
            </div>
          ))}
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '0.7rem',
            background: '#ffffff',
            marginLeft: '4px',
            animation: 'pulse 0.8s infinite',
            verticalAlign: 'middle'
          }} />
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>
            <span>BOOTING DIRECTORY</span>
            <span>{progress}%</span>
          </div>
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(to right, var(--flag-saffron), #ffffff, var(--flag-green))',
              transition: 'width 0.1s ease-out'
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}
