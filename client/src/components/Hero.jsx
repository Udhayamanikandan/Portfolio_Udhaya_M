import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const [typed, setTyped] = useState('')
  const cardRef = useRef(null)

  // Typewriter effect
  useEffect(() => {
    const phrases = [
      'npm run build-the-future',
      'const life = code + create()',
      'git commit -m "shipping 🚀"',
      'python train.py --model MERN',
      'docker compose up --world'
    ]
    let pi = 0, ci = 0, deleting = false

    const type = () => {
      const word = phrases[pi]
      if (!deleting) {
        setTyped(word.slice(0, ++ci))
        if (ci === word.length) {
          deleting = true
          setTimeout(type, 2000)
          return
        }
      } else {
        setTyped(word.slice(0, --ci))
        if (ci === 0) {
          deleting = false
          pi = (pi + 1) % phrases.length
        }
      }
      setTimeout(type, deleting ? 40 : 80)
    }
    type()
  }, [])

  // 3D tilt on ID card
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - 0.5) * 18
      const y = -((e.clientY - r.top) / r.height - 0.5) * 18
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

  // Generate barcode bars
  const bars = Array.from({ length: 38 }, (_, i) => ({
    h: Math.floor(Math.random() * 14 + 5),
    w: Math.random() > 0.35 ? 2 : 1
  }))

  return (
    <section style={{
      position: 'relative', zIndex: 5,
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      alignItems: 'center',
      padding: '6rem 4rem 3rem',
      gap: '3rem'
    }}>
      {/* LEFT SIDE */}
      <div>
        {/* Tag */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.65rem', color: 'var(--pink)',
          letterSpacing: '5px', textTransform: 'uppercase',
          marginBottom: '0.8rem',
          display: 'flex', alignItems: 'center', gap: '0.6rem'
        }}>
          <span style={{ width: '20px', height: '1px', background: 'var(--pink)', boxShadow: '0 0 8px var(--pink)', display: 'inline-block' }} />
          INITIALIZING PORTFOLIO_v2.0
        </div>

        {/* Glitch Name */}
        <div style={{ position: 'relative', marginBottom: '0.3rem' }}>
          <h1 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 'clamp(2.5rem, 4.5vw, 4.8rem)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '2px', lineHeight: 1.05,
            position: 'relative'
          }}>
            M UDHAYA
            {/* Cyan glitch layer */}
            <span style={{
              position: 'absolute', top: 0, left: 0,
              color: 'var(--cyan)', opacity: 0.8,
              clipPath: 'polygon(0 15%, 100% 15%, 100% 35%, 0 35%)',
              animation: 'glitch1 4s infinite'
            }}>M UDHAYA</span>
            {/* Pink glitch layer */}
            <span style={{
              position: 'absolute', top: 0, left: 0,
              color: 'var(--pink)', opacity: 0.8,
              clipPath: 'polygon(0 65%, 100% 65%, 100% 85%, 0 85%)',
              animation: 'glitch2 4s infinite'
            }}>M UDHAYA</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.75rem', color: 'rgba(0,245,255,0.35)',
          letterSpacing: '5px', marginBottom: '1.3rem'
        }}>
          CSE (IoT) · SHIV NADAR UNIVERSITY CHENNAI
        </div>

        {/* Terminal */}
        <div style={{
          background: 'rgba(0,0,0,0.7)',
          border: '1px solid rgba(0,245,255,0.15)',
          padding: '1rem 1.2rem',
          marginBottom: '1.8rem',
          maxWidth: '500px'
        }}>
          {/* Terminal top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            marginBottom: '0.7rem', paddingBottom: '0.6rem',
            borderBottom: '1px solid rgba(0,245,255,0.07)'
          }}>
            {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
            ))}
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.52rem', color: 'rgba(255,255,255,0.2)',
              marginLeft: '0.3rem', letterSpacing: '1px'
            }}>~/portfolio — bash</span>
          </div>

          {/* Terminal lines */}
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', lineHeight: 2 }}>
            <span style={{ color: 'var(--green)' }}>udhaya@snuc:~$</span>
            <span style={{ color: 'rgba(255,255,255,0.45)', marginLeft: '0.5rem' }}>whoami</span>
          </div>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.68rem', color: 'rgba(0,245,255,0.65)',
            paddingLeft: '0.8rem', lineHeight: 1.8
          }}>
            Full Stack Dev · IoT Engineer · ML Builder
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', lineHeight: 2 }}>
            <span style={{ color: 'var(--green)' }}>udhaya@snuc:~$</span>
            <span style={{ color: '#fff', marginLeft: '0.5rem' }}>{typed}</span>
            <span style={{
              display: 'inline-block', width: '7px', height: '0.82rem',
              background: 'var(--cyan)', marginLeft: '2px',
              verticalAlign: 'middle', animation: 'pulse 0.7s infinite'
            }} />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '2rem' }}>
          {[
            { val: '9.56', label: 'CGPA', color: 'var(--cyan)', shadow: 'rgba(0,245,255,0.5)' },
            { val: '4+',   label: 'Projects', color: 'var(--pink)', shadow: 'rgba(255,0,110,0.5)' },
            { val: '10+',  label: 'Tech Stack', color: 'var(--green)', shadow: 'rgba(57,255,20,0.5)' },
            { val: '3x',   label: 'Hackathons', color: 'var(--purple)', shadow: 'rgba(191,0,255,0.5)' }
          ].map(({ val, label, color, shadow }) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: '2.1rem', fontWeight: 900,
                color, textShadow: `0 0 20px ${shadow}`, lineHeight: 1
              }}>{val}</div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.5rem', color: 'rgba(224,232,240,0.3)',
                letterSpacing: '3px', marginTop: '0.2rem'
              }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-cyan"
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            VIEW PROJECTS
          </button>
          <button className="btn btn-pink">DOWNLOAD CV</button>
        </div>
      </div>

      {/* RIGHT SIDE — ID CARD */}
      <div style={{ position: 'relative' }}>
        <div ref={cardRef} style={{
          background: 'rgba(0,10,30,0.85)',
          border: '1px solid rgba(0,245,255,0.2)',
          padding: '1.8rem 1.5rem',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s'
        }}>
          {/* Corner accents */}
          {[
            { top: '-1px', left: '-1px', borderWidth: '2px 0 0 2px' },
            { top: '-1px', right: '-1px', borderWidth: '2px 2px 0 0' },
            { bottom: '-1px', left: '-1px', borderWidth: '0 0 2px 2px' },
            { bottom: '-1px', right: '-1px', borderWidth: '0 2px 2px 0' }
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', width: '14px', height: '14px',
              borderColor: 'var(--cyan)', borderStyle: 'solid', ...s
            }} />
          ))}

          {/* Card header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.48rem', color: 'rgba(0,245,255,0.4)', letterSpacing: '3px' }}>DEVELOPER ID</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.42rem', color: 'rgba(255,255,255,0.12)', marginTop: '0.2rem' }}>SNU-CHEN-2024</div>
            </div>
            {/* Chip */}
            <div style={{
              width: '32px', height: '22px',
              background: 'linear-gradient(135deg, #ffd700, #b8860b)',
              borderRadius: '3px', position: 'relative', overflow: 'hidden'
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
            background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,80,180,0.2))'
          }}>
            <div style={{
              position: 'absolute', inset: '3px',
              clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
              background: 'linear-gradient(135deg, #0a1628, #050d1a)'
            }} />
            <span style={{
              fontFamily: "'Orbitron', monospace", fontSize: '1.4rem', fontWeight: 900,
              background: 'linear-gradient(135deg, var(--cyan), #0066ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', position: 'relative', zIndex: 1
            }}>MU</span>
          </div>

          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.9rem', fontWeight: 700, color: '#fff', textAlign: 'center', letterSpacing: '2px', marginBottom: '0.2rem' }}>M UDHAYA</div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: 'var(--cyan)', textAlign: 'center', letterSpacing: '3px', marginBottom: '0.9rem' }}>FULL STACK · IoT · ML</div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)', marginBottom: '0.9rem' }} />

          {[
            { k: 'UNIVERSITY', v: 'SNU CHENNAI', vc: 'rgba(0,245,255,0.7)' },
            { k: 'CGPA', v: '9.563 / 10', vc: 'var(--green)' },
            { k: 'BATCH', v: '2024 – 2028', vc: 'rgba(0,245,255,0.7)' },
            { k: 'STATUS', v: '● ACTIVE', vc: 'var(--green)' }
          ].map(({ k, v, vc }) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.48rem', color: 'rgba(224,232,240,0.2)', letterSpacing: '2px' }}>{k}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: vc, letterSpacing: '1px' }}>{v}</span>
            </div>
          ))}

          {/* Barcode */}
          <div style={{ display: 'flex', gap: '1.5px', marginTop: '1.2rem', justifyContent: 'center', alignItems: 'flex-end', height: '20px' }}>
            {bars.map((b, i) => (
              <div key={i} style={{ width: `${b.w}px`, height: `${b.h}px`, background: 'rgba(0,245,255,0.45)' }} />
            ))}
          </div>

          {/* Floating badges */}
          {[
            { label: 'CGPA 9.563', style: { top: '8px', right: '-12px', borderColor: 'rgba(0,245,255,0.3)', color: 'var(--cyan)' } },
            { label: 'IoT + ML',   style: { bottom: '55px', right: '-18px', borderColor: 'rgba(57,255,20,0.3)', color: 'var(--green)' } },
            { label: 'MERN STACK', style: { bottom: '25px', left: '-12px', borderColor: 'rgba(255,0,110,0.3)', color: 'var(--pink)' } }
          ].map(({ label, style }) => (
            <div key={label} style={{
              position: 'absolute', fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.48rem', letterSpacing: '1px',
              padding: '0.28rem 0.55rem',
              background: 'rgba(8,15,26,0.95)',
              border: '1px solid',
              clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
              ...style
            }}>{label}</div>
          ))}
        </div>
      </div>

      {/* Glitch keyframes */}
      <style>{`
        @keyframes glitch1 {
          0%, 88%, 100% { transform: translate(0); }
          90% { transform: translate(-5px, 2px); }
          93% { transform: translate(5px, -2px); }
          96% { transform: translate(0); }
        }
        @keyframes glitch2 {
          0%, 88%, 100% { transform: translate(0); }
          89% { transform: translate(5px, -2px); }
          92% { transform: translate(-5px, 2px); }
          95% { transform: translate(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}