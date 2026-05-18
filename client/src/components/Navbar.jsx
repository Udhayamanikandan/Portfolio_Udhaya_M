export default function Navbar() {
  const links = ['skills', 'projects', 'achievements', 'contact']

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 4rem',
      background: 'rgba(2,4,9,0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,245,255,0.1)'
    }}>

      {/* LOGO */}
      <div style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: '0.95rem',
        fontWeight: 900,
        color: '#00f5ff',
        letterSpacing: '4px',
        textShadow: '0 0 20px rgba(0,245,255,0.6)'
      }}>
        M<span style={{ color: '#ff006e' }}>_</span>UDHAYA
      </div>

      {/* NAV LINKS */}
      <ul style={{
        display: 'flex',
        gap: '2.5rem',
        listStyle: 'none'
      }}>
        {links.map(s => (
          <li key={s}>
            <a
              href={`#${s}`}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.65rem',
                color: 'rgba(0,245,255,0.45)',
                textDecoration: 'none',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                transition: 'color 0.3s'
              }}
              onMouseEnter={e => e.target.style.color = '#00f5ff'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,245,255,0.45)'}
            >
              {s}
            </a>
          </li>
        ))}
      </ul>

      {/* STATUS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{
          width: '6px',
          height: '6px',
          background: '#39ff14',
          borderRadius: '50%',
          boxShadow: '0 0 8px #39ff14',
          animation: 'pulse 2s infinite'
        }} />

        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.55rem',
          color: '#39ff14',
          letterSpacing: '2px'
        }}>
          AVAILABLE FOR HIRE
        </span>
      </div>

    </nav>
  )
}