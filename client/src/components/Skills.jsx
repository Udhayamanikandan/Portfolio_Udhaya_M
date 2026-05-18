import { useEffect } from 'react'

const skillData = [
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript', pct: 90 },
      { name: 'Python', pct: 85 },
      { name: 'C / C++', pct: 78 },
      { name: 'Java · SQL', pct: 72 }
    ]
  },
  {
    category: 'Web / MERN',
    skills: [
      { name: 'React.js', pct: 88 },
      { name: 'Node + Express', pct: 85 },
      { name: 'MongoDB', pct: 80 },
      { name: 'REST APIs', pct: 87 }
    ]
  },
  {
    category: 'IoT & Embedded',
    skills: [
      { name: 'ESP32 / Arduino', pct: 83 },
      { name: 'GPS / RTC Modules', pct: 78 },
      { name: 'UART / HTTP', pct: 75 }
    ]
  },
  {
    category: 'AI / ML',
    skills: [
      { name: 'Scikit-learn', pct: 76 },
      { name: 'Isolation Forest', pct: 72 },
      { name: 'Flask + Streamlit', pct: 82 }
    ]
  }
]

const colors = ['#00f5ff', '#ff006e', '#39ff14', '#bf00ff']

export default function Skills() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
            setTimeout(() => {
              bar.style.width = bar.dataset.width + '%'
            }, i * 130)
          })
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills">
      <div className="section-header reveal">
        <span className="section-number">// 01</span>
        <span className="section-title">Technical Arsenal</span>
        <div className="section-line" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.3rem'
      }}>
        {skillData.map((cat, ci) => (
          <div key={cat.category} className="reveal" style={{
            background: '#080f1a',
            border: '1px solid rgba(0,245,255,0.07)',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.35s'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,245,255,0.2)'
              e.currentTarget.style.boxShadow = '0 0 25px rgba(0,245,255,0.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,245,255,0.07)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Left accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: '2px', height: '100%',
              background: `linear-gradient(180deg, ${colors[ci]}, transparent)`
            }} />

            {/* Category title */}
            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '0.55rem', color: '#00f5ff',
              letterSpacing: '4px', textTransform: 'uppercase',
              marginBottom: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.4rem'
            }}>
              <div style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: colors[ci], boxShadow: `0 0 6px ${colors[ci]}`
              }} />
              {cat.category}
            </div>

            {/* Skill bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {cat.skills.map((skill, si) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.28rem' }}>
                    <span style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '0.6rem', color: 'rgba(224,232,240,0.6)', letterSpacing: '1px'
                    }}>{skill.name}</span>
                    <span style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '0.55rem', color: 'rgba(0,245,255,0.45)'
                    }}>{skill.pct}%</span>
                  </div>
                  <div style={{
                    height: '2px', background: 'rgba(255,255,255,0.04)',
                    position: 'relative', overflow: 'visible'
                  }}>
                    <div
                      className="skill-fill"
                      data-width={skill.pct}
                      style={{
                        height: '100%', width: '0',
                        background: `linear-gradient(90deg, rgba(${ci === 0 ? '0,245,255' : ci === 1 ? '255,0,110' : ci === 2 ? '57,255,20' : '191,0,255'},0.2), ${colors[ci]})`,
                        transition: 'width 1.5s cubic-bezier(0.4,0,0.2,1)',
                        position: 'relative'
                      }}
                    >
                      <div style={{
                        position: 'absolute', right: '-3px', top: '-3px',
                        width: '7px', height: '7px', borderRadius: '50%',
                        background: colors[ci], boxShadow: `0 0 8px ${colors[ci]}`
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}