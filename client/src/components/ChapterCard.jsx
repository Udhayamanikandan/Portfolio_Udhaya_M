import { useEffect, useRef } from 'react'

export default function ChapterCard({ number, title, subtitle, description }) {
  return (
    <div style={{
      padding: '5rem 2rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: '650px',
      margin: '0 auto',
      fontFamily: "'Share Tech Mono', monospace"
    }}>
      {/* Visual cyber track lines */}
      <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12))', marginBottom: '1.5rem' }} />
      
      {/* Chapter Badge */}
      <div style={{
        fontSize: '0.62rem',
        color: 'var(--flag-saffron)',
        letterSpacing: '6px',
        textTransform: 'uppercase',
        border: '1px solid rgba(255, 153, 51, 0.25)',
        padding: '0.45rem 1rem',
        borderRadius: '30px',
        background: 'rgba(255, 153, 51, 0.02)',
        marginBottom: '1rem',
        boxShadow: '0 0 15px rgba(255, 153, 51, 0.05)'
      }}>
        CHAPTER {number}
      </div>

      {/* Main Title */}
      <h3 style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: '1.4rem',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '3px',
        marginBottom: '0.5rem',
        textTransform: 'uppercase'
      }}>
        {title}
      </h3>

      {/* Subtitle */}
      <div style={{
        fontSize: '0.7rem',
        color: '#94a3b8',
        letterSpacing: '2px',
        marginBottom: '1.2rem',
        fontStyle: 'italic'
      }}>
        "{subtitle}"
      </div>

      {/* Description */}
      <p style={{
        color: 'rgba(255,255,255,0.42)',
        fontSize: '0.78rem',
        lineHeight: 1.8,
        maxWidth: '480px',
        margin: 0
      }}>
        {description}
      </p>

      {/* Visual cyber track lines */}
      <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to top, transparent, rgba(255,255,255,0.12))', marginTop: '1.5rem' }} />
    </div>
  )
}
