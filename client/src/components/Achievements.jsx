const achievements = [
  { icon: '◈', title: 'CGPA 9.563', sub: 'TOP OF CLASS · SNU CHENNAI', color: '#00f5ff' },
  { icon: '◆', title: 'NPTEL Elite', sub: 'AR/VR CERTIFICATION · 81%', color: '#39ff14' },
  { icon: '✦', title: 'SIH Participant', sub: 'SMART INDIA HACKATHON', color: '#ff006e' },
  { icon: '⬡', title: 'School Topper', sub: 'CBSE CLASS XII · 93.6%', color: '#bf00ff' },
  { icon: '⬟', title: 'Event Organizer', sub: 'EDUQUEST 2025 · SNUC', color: '#00f5ff' },
  { icon: '◉', title: 'NSS Volunteer', sub: 'SOCIAL IMPACT CONTRIBUTOR', color: '#39ff14' }
]

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="section-header reveal">
        <span className="section-number">// 03</span>
        <span className="section-title">Achievements</span>
        <div className="section-line" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {achievements.map((a) => (
          <div key={a.title} className="reveal ach-card"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,245,255,0.2)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,245,255,0.07)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            style={{
              background: '#080f1a',
              border: '1px solid rgba(0,245,255,0.07)',
              padding: '1.3rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s',
              cursor: 'default'
            }}
          >
            <div style={{ fontSize: '1.4rem', color: a.color, marginBottom: '0.7rem', lineHeight: 1 }}>
              {a.icon}
            </div>
            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '0.68rem', color: '#fff',
              letterSpacing: '2px', marginBottom: '0.35rem'
            }}>{a.title}</div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.55rem', color: 'rgba(0,245,255,0.45)', letterSpacing: '1px'
            }}>{a.sub}</div>
            {/* Background glow */}
            <div style={{
              position: 'absolute', top: '-20px', right: '-20px',
              width: '80px', height: '80px', borderRadius: '50%',
              background: a.color, opacity: 0.06, pointerEvents: 'none'
            }} />
          </div>
        ))}
      </div>
    </section>
  )
}