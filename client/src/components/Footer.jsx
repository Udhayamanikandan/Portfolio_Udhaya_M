export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 5,
      borderTop: '1px solid rgba(0,245,255,0.08)',
      padding: '1.5rem 4rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'rgba(2,4,9,0.9)'
    }}>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.58rem', color: 'rgba(224,232,240,0.18)', letterSpacing: '2px'
      }}>
        © 2025 M_UDHAYA · ALL SYSTEMS OPERATIONAL · SNU CHENNAI
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '6px', height: '6px', background: '#39ff14',
          borderRadius: '50%', boxShadow: '0 0 8px #39ff14',
          animation: 'pulse 2s infinite'
        }} />
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.55rem', color: '#39ff14', letterSpacing: '2px'
        }}>AVAILABLE FOR HIRE</span>
      </div>
    </footer>
  )
}