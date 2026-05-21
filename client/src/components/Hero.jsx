import { useEffect, useRef, useState } from 'react'
import { playTick, playClick } from '../utils/audioUX'

function StatDial({ value, label, color, percentage }) {
  const radius = 26;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius; // ~163.36
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: '72px',
      height: '72px',
    }}>
      <svg width="68" height="68" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
            filter: `drop-shadow(0 0 3px ${color})`
          }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '28%',
        fontFamily: "'Orbitron', monospace",
        fontSize: '0.78rem',
        fontWeight: 900,
        color: '#fff',
        textShadow: `0 0 6px ${color}`
      }}>
        {value}
      </div>
      <div style={{
        position: 'absolute',
        bottom: '-12px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.45rem',
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        {label}
      </div>
    </div>
  )
}

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [hoveredWord, setHoveredWord] = useState(null)
  const [showLog, setShowLog] = useState(false)
  const cardRef = useRef(null)

  // Real-time telemetry fluctuations
  const [telemetry, setTelemetry] = useState({
    cpu: 42,
    mem: 54.2,
    temp: 39,
    ping: 18,
    heartbeat: 'STABLE'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        cpu: Math.round(30 + Math.random() * 25),
        mem: parseFloat((52.1 + Math.random() * 4).toFixed(1)),
        temp: Math.round(38 + Math.random() * 4),
        ping: Math.round(12 + Math.random() * 10),
        heartbeat: Math.random() > 0.05 ? 'STABLE' : 'SCANNING'
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Command compiler sequences
  useEffect(() => {
    const phrases = [
      'npm run compile-human-mind',
      'const builder = Udhaya.init()',
      'git commit -m "pushing code boundaries"',
      'python train.py --network-skills --epochs inf',
      'docker run -d --name system-thinking -p 80:80'
    ]
    let pi = 0, ci = 0, deleting = false

    const type = () => {
      const word = phrases[pi]
      if (!deleting) {
        setTyped(word.slice(0, ++ci))
        if (ci === word.length) {
          deleting = true
          setTimeout(type, 2200)
          return
        }
      } else {
        setTyped(word.slice(0, --ci))
        if (ci === 0) {
          deleting = false
          pi = (pi + 1) % phrases.length
        }
      }
      setTimeout(type, deleting ? 30 : 60)
    }
    type()
  }, [])

  // Interactive 3D tilt card
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - 0.5) * 16
      const y = -((e.clientY - r.top) / r.height - 0.5) * 16
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg)`
    }
    const onLeave = () => {
      card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)'
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const bars = Array.from({ length: 38 }, (_, i) => ({
    h: Math.floor(Math.random() * 14 + 5),
    w: Math.random() > 0.35 ? 2 : 1
  }))

  return (
    <section style={{
      position: 'relative', 
      zIndex: 5,
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      alignItems: 'center',
      padding: '7rem 4rem 3rem',
      gap: '4rem'
    }}>
      {/* LEFT SIDE: COMMAND SYSTEM */}
      <div>
        {/* Sub-Header / Core ID */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.62rem', 
          color: 'var(--pink)',
          letterSpacing: '5px', 
          textTransform: 'uppercase',
          marginBottom: '0.8rem',
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.6rem'
        }}>
          <span style={{ width: '20px', height: '1px', background: 'var(--pink)', boxShadow: '0 0 8px var(--pink)', display: 'inline-block' }} />
          UDHAYA_OS://BOOT_SECTOR/ACTIVE
        </div>

        {/* Glitch Name */}
        <div style={{ position: 'relative', marginBottom: '0.3rem' }}>
          <h1 
            data-text="M UDHAYA"
            className="glitch-text"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(2.5rem, 4.5vw, 4.4rem)',
              fontWeight: 900, 
              color: '#fff',
              letterSpacing: '1px', 
              lineHeight: 1.05,
              position: 'relative'
            }}
          >
            M{' '}
            <span style={{
              backgroundImage: 'linear-gradient(to right, var(--flag-saffron) 33%, #FFFFFF 33%, #FFFFFF 66%, var(--flag-green) 66%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none'
            }}>UDHAYA</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.7rem', 
          color: 'rgba(0, 245, 255, 0.45)',
          letterSpacing: '4px', 
          marginBottom: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>CSE (IoT)</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span>SHIV NADAR UNIVERSITY CHENNAI</span>
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.82rem',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.8,
          marginBottom: '1.5rem',
          maxWidth: '520px'
        }}>
          Designing networks and applications that{' '}
          <span
            style={{
              color: 'var(--flag-saffron)',
              cursor: 'pointer',
              fontWeight: 700,
              textDecoration: 'underline dotted',
              position: 'relative',
              display: 'inline-block'
            }}
            onMouseEnter={() => { playTick(); setHoveredWord('think') }}
            onMouseLeave={() => setHoveredWord(null)}
          >
            think
            {hoveredWord === 'think' && (
              <div style={{
                position: 'absolute', bottom: '100%', left: '50%',
                transform: 'translateX(-50%) translateY(-8px)',
                background: 'rgba(2,5,13,0.96)', border: '1px solid var(--flag-saffron)',
                borderRadius: '6px', padding: '0.5rem 0.7rem', zIndex: 12, width: '180px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.8)', fontSize: '0.55rem', color: '#fff',
                pointerEvents: 'none', lineHeight: 1.4, textAlign: 'left'
              }}>
                <span style={{ color: 'var(--flag-saffron)', fontWeight: 700 }}>▶ COGNITIVE AI/ML</span>
                <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.2rem' }}>
                  Isolation Forest classifiers, predictive statistics, and custom Flask pipelines.
                </div>
              </div>
            )}
          </span>
          ,{' '}
          <span
            style={{
              color: '#ffffff',
              cursor: 'pointer',
              fontWeight: 700,
              textDecoration: 'underline dotted',
              position: 'relative',
              display: 'inline-block'
            }}
            onMouseEnter={() => { playTick(); setHoveredWord('adapt') }}
            onMouseLeave={() => setHoveredWord(null)}
          >
            adapt
            {hoveredWord === 'adapt' && (
              <div style={{
                position: 'absolute', bottom: '100%', left: '50%',
                transform: 'translateX(-50%) translateY(-8px)',
                background: 'rgba(2,5,13,0.96)', border: '1px solid #ffffff',
                borderRadius: '6px', padding: '0.5rem 0.7rem', zIndex: 12, width: '180px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.8)', fontSize: '0.55rem', color: '#fff',
                pointerEvents: 'none', lineHeight: 1.4, textAlign: 'left'
              }}>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>▶ PHYSICAL CYBERNETICS</span>
                <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.2rem' }}>
                  ESP32 embedded firmware, sensor filters, and local hardware loops.
                </div>
              </div>
            )}
          </span>
          , and{' '}
          <span
            style={{
              color: 'var(--flag-green)',
              cursor: 'pointer',
              fontWeight: 700,
              textDecoration: 'underline dotted',
              position: 'relative',
              display: 'inline-block'
            }}
            onMouseEnter={() => { playTick(); setHoveredWord('communicate') }}
            onMouseLeave={() => setHoveredWord(null)}
          >
            communicate
            {hoveredWord === 'communicate' && (
              <div style={{
                position: 'absolute', bottom: '100%', left: '50%',
                transform: 'translateX(-50%) translateY(-8px)',
                background: 'rgba(2,5,13,0.96)', border: '1px solid var(--flag-green)',
                borderRadius: '6px', padding: '0.5rem 0.7rem', zIndex: 12, width: '180px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.8)', fontSize: '0.55rem', color: '#fff',
                pointerEvents: 'none', lineHeight: 1.4, textAlign: 'left'
              }}>
                <span style={{ color: 'var(--flag-green)', fontWeight: 700 }}>▶ WEB PLATFORMS</span>
                <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.2rem' }}>
                  Real-time network sockets, MERN architectures, and modular APIs.
                </div>
              </div>
            )}
          </span>
          .
        </div>

        {/* Live Operating System Telemetry Bar */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          maxWidth: '520px',
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px dashed rgba(255, 255, 255, 0.08)',
          padding: '0.5rem 0.8rem',
          marginBottom: '1rem',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.52rem',
          color: 'rgba(255, 255, 255, 0.45)',
          justifyContent: 'space-between',
          borderRadius: '4px'
        }}>
          <div>CPU_LOAD: <span style={{ color: 'var(--cyan)' }}>{telemetry.cpu}%</span></div>
          <div>MEM_LOAD: <span style={{ color: 'var(--pink)' }}>{telemetry.mem}%</span></div>
          <div>CORE_TEMP: <span style={{ color: 'var(--flag-saffron)' }}>{telemetry.temp}°C</span></div>
          <div>NET_PING: <span style={{ color: 'var(--green)' }}>{telemetry.ping}ms</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span className="status-led status-led-green" style={{ width: '4px', height: '4px' }} />
            {telemetry.heartbeat}
          </div>
        </div>

        {/* Interactive Shell / Terminal */}
        <div style={{
          background: 'rgba(0,0,0,0.8)',
          border: '1px solid rgba(0,245,255,0.15)',
          boxShadow: '0 0 15px rgba(0, 245, 255, 0.04) inset, 0 10px 30px rgba(0,0,0,0.6)',
          padding: '1rem 1.2rem',
          marginBottom: '1.8rem',
          maxWidth: '520px',
          borderRadius: '8px',
          position: 'relative'
        }}>
          {/* Scanline sweep element for terminal */}
          <div style={{
            position: 'absolute', inset: 0, 
            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 2px, 3px 100%', pointerEvents: 'none', borderRadius: '8px'
          }} />

          {/* Terminal Window Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            marginBottom: '0.7rem', paddingBottom: '0.6rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}>
            {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
              <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />
            ))}
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.52rem', color: 'rgba(255,255,255,0.25)',
              marginLeft: '0.3rem', letterSpacing: '1px'
            }}>~/udhaya_os/console — bash</span>
          </div>

          {/* Terminal output */}
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', lineHeight: 1.8, position: 'relative', zIndex: 2 }}>
            <div>
              <span style={{ color: 'var(--green)' }}>udhaya@snuc:~$</span>
              <span style={{ color: 'rgba(255,255,255,0.45)', marginLeft: '0.5rem' }}>whoami</span>
            </div>
            <div style={{ color: 'rgba(0,245,255,0.7)', paddingLeft: '0.8rem', marginBottom: '0.3rem' }}>
              Full Stack Dev · IoT Engineer · ML Builder
            </div>
            <div>
              <span style={{ color: 'var(--green)' }}>udhaya@snuc:~$</span>
              <span style={{ color: '#fff', marginLeft: '0.5rem' }}>{typed}</span>
              <span style={{
                display: 'inline-block', width: '6px', height: '0.8rem',
                background: 'var(--cyan)', marginLeft: '2px',
                verticalAlign: 'middle', animation: 'pulse 0.7s infinite'
              }} />
            </div>
          </div>
        </div>

        {/* Human Storytelling Drawer - Engineering Log */}
        {showLog && (
          <div style={{
            background: 'rgba(255,153,51,0.02)',
            border: '1px dashed rgba(255,153,51,0.2)',
            padding: '1rem',
            marginBottom: '1.8rem',
            maxWidth: '520px',
            borderRadius: '8px',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.65rem',
            lineHeight: '1.6',
            color: 'rgba(255,255,255,0.75)',
            textAlign: 'left'
          }}>
            <div style={{ color: 'var(--flag-saffron)', fontWeight: 'bold', borderBottom: '1px solid rgba(255,153,51,0.1)', paddingBottom: '0.3rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>📂 METADATA: LATE_NIGHT_BUILD_LOG.log</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }} onClick={() => { playClick(); setShowLog(false) }}>[X]</span>
            </div>
            <div>[LOG TIMESTAMP: 02:47 AM]</div>
            <div style={{ marginTop: '0.4rem', color: '#cbd5e1' }}>
              "The obsession started early: taking apart old radios. Realizing that code could trigger physical pins (ESP32) and predict variables (ML) bridge the barrier between screen pixels and the physical environment. Udhaya_OS represents this boundary: complex systems engineered to remain performant under load."
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'flex', gap: '2.2rem', marginBottom: '2.5rem', flexWrap: 'wrap', paddingLeft: '0.2rem' }}>
          <StatDial value="9.56" label="CGPA" color="var(--flag-saffron)" percentage={95.6} />
          <StatDial value="4+" label="Projects" color="#ffffff" percentage={75} />
          <StatDial value="10+" label="Tech Stack" color="var(--flag-green)" percentage={85} />
          <StatDial value="3x" label="Hackathons" color="var(--purple)" percentage={60} />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-cyan"
            onClick={() => { playClick(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) }}>
            EXPLORE ARCHIVES
          </button>
          <button 
            className="btn btn-pink"
            onClick={() => { playClick(); setShowLog(!showLog) }}
          >
            {showLog ? 'HIDE CONSOLE LOGS' : 'DECRYPT JOURNEY LOG'}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: INTERACTIVE SCI-FI ID CARD */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div ref={cardRef} style={{
          background: 'rgba(255, 255, 255, 0.015)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 245, 255, 0.02)',
          padding: '1.8rem 1.5rem',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease',
          width: '290px'
        }}>
          {/* Interactive UI breathing ambient glow */}
          <div style={{
            position: 'absolute', inset: '-1px', border: '1px solid rgba(0,245,255,0.06)', borderRadius: '16px',
            pointerEvents: 'none', animation: 'card-glow 3s ease-in-out infinite alternate'
          }} />

          {/* Corner accents */}
          {[
            { top: '-1px', left: '-1px', borderWidth: '2px 0 0 2px' },
            { top: '-1px', right: '-1px', borderWidth: '2px 2px 0 0' },
            { bottom: '-1px', left: '-1px', borderWidth: '0 0 2px 2px' },
            { bottom: '-1px', right: '-1px', borderWidth: '0 2px 2px 0' }
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', width: '12px', height: '12px',
              borderColor: i < 2 ? 'var(--flag-saffron)' : 'var(--flag-green)', borderStyle: 'solid', ...s
            }} />
          ))}

          {/* Card header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.48rem', color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '3px' }}>SYSTEM OPERATOR</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.42rem', color: 'rgba(255,255,255,0.1)', marginTop: '0.2rem' }}>SNU-CHEN-2024</div>
            </div>
            {/* Holographic Chip */}
            <div style={{
              width: '30px', height: '20px',
              background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)',
              borderRadius: '3px', position: 'relative', overflow: 'hidden',
              boxShadow: '0 0 10px rgba(255,215,0,0.2)'
            }}>
              <div style={{ position: 'absolute', inset: '3px', border: '1px solid rgba(0,0,0,0.3)', borderRadius: '2px' }} />
            </div>
          </div>

          {/* Hexagon avatar */}
          <div style={{
            width: '80px', height: '80px', margin: '0 auto 0.9rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
            background: 'linear-gradient(135deg, var(--flag-saffron), #ffffff, var(--flag-green))'
          }}>
            <div style={{
              position: 'absolute', inset: '2px',
              clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
              background: '#02050d'
            }} />
            <span style={{
              fontFamily: "'Orbitron', monospace", fontSize: '1.4rem', fontWeight: 900,
              backgroundImage: 'linear-gradient(135deg, var(--flag-saffron), #ffffff, var(--flag-green))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', position: 'relative', zIndex: 1
            }}>MU</span>
          </div>

          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.85rem', fontWeight: 700, color: '#fff', textAlign: 'center', letterSpacing: '2px', marginBottom: '0.2rem' }}>
            M{' '}
            <span style={{
              backgroundImage: 'linear-gradient(to right, var(--flag-saffron) 33%, #FFFFFF 33%, #FFFFFF 66%, var(--flag-green) 66%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>UDHAYA</span>
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.48rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', letterSpacing: '3px', marginBottom: '0.9rem' }}>FULL STACK · IoT · ML</div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', marginBottom: '0.9rem' }} />

          {[
            { k: 'INSTITUTE', v: 'SNU CHENNAI', vc: 'rgba(255,255,255,0.65)' },
            { k: 'EST_CGPA', v: '9.563 / 10', vc: 'var(--green)' },
            { k: 'DURATION', v: '2024 – 2028', vc: 'rgba(255,255,255,0.65)' },
            { k: 'SYS_STATUS', v: '● OPERATIONAL', vc: 'var(--green)' }
          ].map(({ k, v, vc }) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.46rem', color: 'rgba(224,232,240,0.2)', letterSpacing: '2px' }}>{k}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: vc, letterSpacing: '1px' }}>{v}</span>
            </div>
          ))}

          {/* Symmetrical Barcode */}
          <div style={{ display: 'flex', gap: '1.5px', marginTop: '1.2rem', justifyContent: 'center', alignItems: 'flex-end', height: '18px' }}>
            {bars.map((b, i) => (
              <div key={i} style={{
                width: `${b.w}px`,
                height: `${b.h}px`,
                background: i < 12 ? 'var(--flag-saffron)' : i < 26 ? 'rgba(255,255,255,0.5)' : 'var(--flag-green)',
                opacity: 0.75
              }} />
            ))}
          </div>

          {/* Positioned Badge Overlays */}
          {[
            { label: 'CGPA 9.563', style: { top: '8px', right: '-10px', borderColor: 'rgba(255,153,51,0.25)', color: 'var(--flag-saffron)' } },
            { label: 'IoT + ML',   style: { bottom: '55px', right: '-14px', borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff' } },
            { label: 'MERN STACK', style: { bottom: '25px', left: '-10px', borderColor: 'rgba(19,136,8,0.2)', color: 'var(--flag-green)' } }
          ].map(({ label, style }) => (
            <div key={label} style={{
              position: 'absolute', fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.45rem', letterSpacing: '1px',
              padding: '0.22rem 0.5rem',
              background: 'rgba(2, 5, 13, 0.95)',
              border: '1px solid',
              clipPath: 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)',
              ...style
            }}>{label}</div>
          ))}
        </div>
      </div>

      {styleDefinitions}
    </section>
  )
}

const styleDefinitions = (
  <style>{`
    @keyframes card-glow {
      0% { box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 10px rgba(0, 245, 255, 0.01); }
      100% { box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 245, 255, 0.05); }
    }
  `}</style>
)