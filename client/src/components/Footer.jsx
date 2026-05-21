export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 5,
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '1.5rem 4rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'rgba(3, 7, 18, 0.7)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)'
    }}>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.58rem', color: 'rgba(224,232,240,0.18)', letterSpacing: '2px'
      }}>
        © 2025 M_
        <span style={{
          backgroundImage: 'linear-gradient(to right, var(--flag-saffron) 33%, #FFFFFF 33%, #FFFFFF 66%, var(--flag-green) 66%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>UDHAYA</span> · ALL SYSTEMS OPERATIONAL · SNU CHENNAI
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '6px', height: '6px', background: 'var(--green)',
          borderRadius: '50%', boxShadow: '0 0 8px var(--green)',
          animation: 'pulse 2s infinite'
        }} />
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.52rem', color: 'var(--green)', letterSpacing: '1.5px'
        }}>ACTIVE</span>
      </div>
    </footer>
  )
}