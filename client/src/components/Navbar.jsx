import { useState, useEffect } from 'react'
import { playTick, playClick, isAudioMuted, toggleAudioMute } from '../utils/audioUX'

export default function Navbar() {
  const links = ['skills', 'projects', 'achievements', 'contact']
  const [muted, setMuted] = useState(isAudioMuted())
  const [time, setTime] = useState('')
  const [uptime, setUptime] = useState(0)

  // System time and simulated uptime clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date()
      const hrs = String(d.getHours()).padStart(2, '0')
      const mins = String(d.getMinutes()).padStart(2, '0')
      const secs = String(d.getSeconds()).padStart(2, '0')
      setTime(`${hrs}:${mins}:${secs}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)

    const uptimeTimer = setInterval(() => {
      setUptime(prev => prev + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(uptimeTimer)
    }
  }, [])

  const formatUptime = (s) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins}m ${secs}s`
  }

  const handleMuteToggle = () => {
    playClick()
    const isNowMuted = toggleAudioMute()
    setMuted(isNowMuted)
  }

  return (
    <nav style={{
      position: 'fixed',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 2rem)',
      maxWidth: '1200px',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.8rem 1.8rem',
      background: 'rgba(2, 5, 13, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '50px',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6)'
    }}>

      {/* LOGO */}
      <div style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: '0.82rem',
        fontWeight: 900,
        color: '#fff',
        letterSpacing: '2.5px',
      }}>
        M<span style={{ color: 'var(--flag-saffron)' }}>_</span>
        <span style={{
          backgroundImage: 'linear-gradient(to right, var(--flag-saffron) 33%, #FFFFFF 33%, #FFFFFF 66%, var(--flag-green) 66%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none'
        }}>UDHAYA</span>
      </div>

      {/* NAV LINKS */}
      <ul style={{
        display: 'flex',
        gap: '1.6rem',
        listStyle: 'none',
        alignItems: 'center'
      }}>
        {links.map(s => (
          <li key={s}>
            <a
              href={`#${s}`}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.62rem',
                color: 'rgba(255, 255, 255, 0.45)',
                textDecoration: 'none',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.target.style.color = '#fff';
                e.target.style.textShadow = '0 0 10px rgba(0, 245, 255, 0.4)';
                playTick()
              }}
              onMouseLeave={e => {
                e.target.style.color = 'rgba(255, 255, 255, 0.45)';
                e.target.style.textShadow = 'none';
              }}
              onClick={playClick}
            >
              {s}
            </a>
          </li>
        ))}
      </ul>

      {/* OS META TELEMETRY (AUDIO WAVE TOGGLE & STATUS & CLOCK) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem'
      }}>
        {/* AUDIO SYNTH WAVE TOGGLE */}
        <div 
          onClick={handleMuteToggle}
          onMouseEnter={playTick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
            padding: '0.3rem 0.6rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            transition: 'all 0.2s'
          }}
          title={muted ? 'Unmute procedural audio' : 'Mute procedural audio'}
        >
          {muted ? (
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.45rem',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '1px'
            }}>AUDIO: OFF</span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '8px' }}>
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.45rem',
                color: 'var(--cyan)',
                marginRight: '3px',
                letterSpacing: '1px'
              }}>AUDIO: ON</span>
              {[6, 10, 4, 8].map((h, i) => (
                <div 
                  key={i} 
                  style={{
                    width: '1.5px',
                    height: '100%',
                    background: 'var(--cyan)',
                    transformOrigin: 'bottom',
                    animation: `bounce-bar 0.8s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.15}s`
                  }} 
                />
              ))}
            </div>
          )}
        </div>

        {/* SYSTEM STATUS LED */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <div className="status-led status-led-green" />
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.52rem',
            color: 'var(--green)',
            letterSpacing: '1px'
          }}>
            SYS_OK
          </span>
        </div>

        {/* SYSTEM TIME & UPTIME */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          paddingLeft: '0.8rem',
          fontFamily: "'Share Tech Mono', monospace",
        }}>
          <span style={{
            fontSize: '0.58rem',
            color: '#ffffff',
            letterSpacing: '0.5px'
          }}>{time}</span>
          <span style={{
            fontSize: '0.42rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.5px'
          }}>UPTIME: {formatUptime(uptime)}</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce-bar {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1.2); }
        }
      `}</style>
    </nav>
  )
}