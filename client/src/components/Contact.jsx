import { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('ERROR: ALL FIELDS REQUIRED')
      return
    }
    try {
      await axios.post('http://localhost:5000/api/contact', form)
      setStatus('✅ MESSAGE TRANSMITTED SUCCESSFULLY')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('❌ TRANSMISSION FAILED. TRY AGAIN.')
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(0,245,255,0.02)',
    border: '1px solid rgba(0,245,255,0.12)',
    color: '#e0e8f0', padding: '0.7rem 1rem',
    fontFamily: "'Rajdhani', sans-serif", fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.2s'
  }

  return (
    <section id="contact">
      <div className="section-header reveal">
        <span className="section-number">// 04</span>
        <span className="section-title">Establish Contact</span>
        <div className="section-line" />
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1.2fr',
        gap: '3rem', alignItems: 'start'
      }}>
        {/* LEFT INFO */}
        <div className="reveal">
          <h3 style={{
            fontFamily: "'Orbitron', monospace", fontSize: '1rem',
            color: '#00f5ff', letterSpacing: '2px', marginBottom: '1rem'
          }}>Let's build something.</h3>
          <p style={{
            color: 'rgba(224,232,240,0.45)', fontSize: '0.88rem',
            lineHeight: 1.8, marginBottom: '1.5rem'
          }}>
            Open to internships, collaborations, and interesting problems.
            Whether it's a web app, an IoT system, or an AI-powered tool — let's talk.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { label: 'udhayamanikandan3@gmail.com', href: 'mailto:udhayamanikandan3@gmail.com' },
              { label: 'GitHub Profile', href: 'https://github.com/' },
              { label: 'LinkedIn Profile', href: 'https://linkedin.com/' },
              { label: '+91 6381441633', href: 'tel:+916381441633' }
            ].map(({ label, href }) => (
              <a key={label} href={href}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.68rem', color: 'rgba(0,245,255,0.5)',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  letterSpacing: '1px', transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#00f5ff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,245,255,0.5)'}
              >
                <span style={{ fontSize: '0.42rem', color: '#ff006e' }}>▶</span>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {[
            { label: '// YOUR NAME', key: 'name', type: 'text', placeholder: 'John Doe' },
            { label: '// EMAIL', key: 'email', type: 'email', placeholder: 'john@example.com' }
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.55rem', color: 'rgba(0,245,255,0.38)',
                letterSpacing: '3px', display: 'block', marginBottom: '0.35rem'
              }}>{label}</label>
              <input
                type={type} placeholder={placeholder}
                value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,245,255,0.12)'}
              />
            </div>
          ))}
          <div>
            <label style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.55rem', color: 'rgba(0,245,255,0.38)',
              letterSpacing: '3px', display: 'block', marginBottom: '0.35rem'
            }}>// MESSAGE</label>
            <textarea
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ ...inputStyle, height: '90px', resize: 'none' }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(0,245,255,0.12)'}
            />
          </div>
          <button className="btn btn-cyan" onClick={handleSubmit} style={{ alignSelf: 'flex-start' }}>
            TRANSMIT MESSAGE
          </button>
          {status && (
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.62rem', color: status.startsWith('✅') ? '#39ff14' : '#ff006e',
              letterSpacing: '2px', marginTop: '0.5rem'
            }}>{status}</div>
          )}
        </div>
      </div>
    </section>
  )
}