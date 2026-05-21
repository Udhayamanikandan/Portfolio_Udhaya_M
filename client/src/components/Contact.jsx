import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { playTick, playClick, playSuccess, playTransmission } from '../utils/audioUX'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [uploadProgress, setUploadProgress] = useState(-1) // -1 means idle
  const [focusedInput, setFocusedInput] = useState(null)
  
  const canvasRef = useRef(null)
  const typingTimerRef = useRef(null)
  const amplitudeRef = useRef(0)

  // Real-time canvas typing wave generator
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let angle = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Decay amplitude slowly
      amplitudeRef.current += (0 - amplitudeRef.current) * 0.08

      const width = canvas.width
      const height = canvas.height
      ctx.beginPath()
      ctx.strokeStyle = focusedInput ? 'var(--cyan)' : 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1

      for (let x = 0; x < width; x++) {
        // Multi-frequency sine wave
        const y = height / 2 + 
          Math.sin(x * 0.04 + angle) * amplitudeRef.current * 10 + 
          Math.sin(x * 0.08 - angle) * amplitudeRef.current * 4
        
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.stroke()
      angle += 0.15
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [focusedInput])

  const handleInputChange = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }))
    playTick()

    // Kick start wave amplitude on keypress
    amplitudeRef.current = 1.2
    
    // Clear and set idle decay
    clearTimeout(typingTimerRef.current)
    typingTimerRef.current = setTimeout(() => {
      amplitudeRef.current = 0
    }, 400)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('ERROR: ALL FIELD BUFFERS REQUIRE DATA')
      return
    }

    playTransmission()
    setStatus('')
    setUploadProgress(0)

    // Simulate cyber-uplink loader
    for (let progress = 5; progress <= 100; progress += 15) {
      await new Promise(r => setTimeout(r, 140))
      setUploadProgress(Math.min(100, progress))
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        form
      )

      setStatus('✅ MESSAGE TRANSMITTED SUCCESSFULLY')
      setForm({ name: '', email: '', message: '' })
      playSuccess()
    } catch {
      setStatus('❌ TRANSMISSION FAILURE. CHECK GATEWAY NETWORK LINK.')
    } finally {
      setUploadProgress(-1)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(2, 5, 13, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    color: '#f8fafc',
    padding: '0.75rem 1rem',
    fontFamily: "'Share Tech Mono', sans-serif",
    fontSize: '0.75rem',
    outline: 'none',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 2
  }

  return (
    <section id="contact">
      <div className="section-header reveal">
        <span className="section-number">// 04</span>
        <span className="section-title">Establish Link</span>
        <div className="section-line" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '3rem',
        alignItems: 'start'
      }}>
        {/* LEFT COMMS ARCHIVE */}
        <div className="reveal" style={{ padding: '1rem 0' }}>
          <h3 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '1.15rem',
            color: '#fff',
            letterSpacing: '2px',
            marginBottom: '1.2rem',
            fontWeight: 700
          }}>
            SYSTEM OPERATIONS CONTACT
          </h3>
          <p style={{
            color: '#94a3b8',
            fontSize: '0.88rem',
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>
            Ready to collaborate on machine learning classifications, IoT sensor layouts, and full-stack MERN engines. Deploy custom telemetry bridges or request architectural files.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[
              { label: 'udhayamanikandan3@gmail.com', href: 'mailto:udhayamanikandan3@gmail.com', color: 'var(--flag-saffron)' },
              { label: 'GitHub Network', href: 'https://github.com/Udhayamanikandan', color: '#ffffff' },
              { label: 'LinkedIn Link', href: 'https://linkedin.com/in/connectwithudhayamanikandan', color: 'var(--flag-green)' }
            ].map(({ label, href, color }) => (
              <a key={label} href={href}
                onClick={playClick}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.72rem',
                  color: 'rgba(255, 255, 255, 0.45)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  letterSpacing: '1.5px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateX(6px)';
                  playTick();
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span style={{ fontSize: '0.45rem', color }}>▶</span>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT TRANSMITTER PANEL */}
        <div className="reveal" style={{
          background: 'rgba(255, 255, 255, 0.015)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          padding: '2.2rem 2rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.1rem'
        }}>
          {/* Header console */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            paddingBottom: '0.8rem',
            marginBottom: '0.4rem'
          }}>
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.52rem',
              color: 'rgba(255, 255, 255, 0.25)',
              letterSpacing: '1.5px'
            }}>
              secure_comm_link.bin
            </div>
          </div>

          {[
            { label: '// TRANSMITTER NAME', key: 'name', type: 'text', placeholder: 'IDENTIFIER_ID' },
            { label: '// DESTINATION EMAIL', key: 'email', type: 'email', placeholder: 'NET_IP_ADDR' }
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.52rem',
                color: 'rgba(255, 255, 255, 0.35)',
                letterSpacing: '2px',
                display: 'block',
                marginBottom: '0.4rem'
              }}>{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={e => handleInputChange(key, e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: focusedInput === key
                    ? (key === 'name' ? 'var(--flag-saffron)' : '#ffffff')
                    : 'rgba(255, 255, 255, 0.06)',
                  boxShadow: focusedInput === key
                    ? `0 0 10px ${key === 'name' ? 'var(--flag-saffron)' : '#ffffff'}12`
                    : 'none'
                }}
                onFocus={() => setFocusedInput(key)}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          ))}

          <div>
            <label style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.52rem',
              color: 'rgba(255, 255, 255, 0.35)',
              letterSpacing: '2px',
              display: 'block',
              marginBottom: '0.4rem'
            }}>// TELEMETRY PAYLOAD</label>
            <textarea
              placeholder="Inject transaction message coordinates..."
              value={form.message}
              onChange={e => handleInputChange('message', e.target.value)}
              style={{
                ...inputStyle,
                height: '95px',
                resize: 'none',
                borderColor: focusedInput === 'message'
                  ? 'var(--flag-green)'
                  : 'rgba(255, 255, 255, 0.06)',
                boxShadow: focusedInput === 'message'
                  ? '0 0 10px var(--flag-green)12'
                  : 'none'
              }}
              onFocus={() => setFocusedInput('message')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          {/* Typing Wave Oscillator Canvas */}
          <div style={{ position: 'relative', width: '100%', height: '30px', background: 'rgba(2, 5, 13, 0.4)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.03)', overflow: 'hidden' }}>
            <canvas ref={canvasRef} width="320" height="30" style={{ width: '100%', height: '100%' }} />
            <span style={{
              position: 'absolute', top: '2px', right: '5px',
              fontFamily: "'Share Tech Mono', monospace", fontSize: '0.42rem',
              color: 'rgba(255,255,255,0.2)'
            }}>OSCILLATOR_BUFFER</span>
          </div>

          {/* Action Uplink Submit Button */}
          {uploadProgress >= 0 ? (
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: 'var(--cyan)' }}>
              UPLINK PROTOCOL INITIATED... SENDING DATA: {uploadProgress}%
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginTop: '0.3rem' }}>
                <div style={{ height: '100%', width: `${uploadProgress}%`, background: 'var(--cyan)' }} />
              </div>
            </div>
          ) : (
            <button
              className="btn btn-cyan"
              onClick={handleSubmit}
              style={{
                alignSelf: 'flex-start',
                fontSize: '0.58rem',
                padding: '0.75rem 1.8rem'
              }}
            >
              TRANSMIT UPLINK PACKET
            </button>
          )}

          {status && (
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.62rem',
              color: status.startsWith('✅') ? 'var(--green)' : 'var(--flag-saffron)',
              letterSpacing: '2px',
              marginTop: '0.4rem',
              textAlign: 'left'
            }}>{status}</div>
          )}
        </div>
      </div>
    </section>
  )
}
