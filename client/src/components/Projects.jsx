import { useState, useEffect } from 'react'
import { playTick, playClick, playSuccess, playConfirmation } from '../utils/audioUX'

const projectsData = [
  {
    id: 'water-tracker',
    title: 'Smart Water Tracker',
    category: 'IoT',
    tags: ['ESP32', 'C++', 'Firebase', 'WhatsApp API'],
    shortDesc: 'A cyber-physical hydration tracking node using flow sensor readings and remote WhatsApp alert protocols.',
    problem: 'Hydration neglect leads to systemic fatigue. Static app trackers rely on manual inputs, which users abandon. We needed a hardware-connected node that automatically tracks intake and triggers localized push reminders.',
    diagnostics: [
      { time: '11:14 PM', status: 'ESP32 WiFi Connected. Local IP: 192.168.1.42' },
      { time: '11:15 PM', status: 'Flow Sensor calibration completed. Pulse coefficient: 4.5' },
      { time: '11:32 PM', status: 'FAIL: Twilio WhatsApp client request timeout. Re-routing gateway...' },
      { time: '11:35 PM', status: 'RECOVERY: Telemetry packet transmitted to Firebase. Status: 200' }
    ],
    flow: ['Flow Sensor', 'ESP32 Core', 'Firebase Realtime DB', 'Node.js Server', 'Twilio WhatsApp API']
  },
  {
    id: 'criclytics',
    title: 'Criclytics',
    category: 'Web',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Python'],
    shortDesc: 'A web operating dashboard analyzing historical player performance metrics and team profiles.',
    problem: 'Sports analytics engines are bloated and slow. We engineered a fast, index-optimized MERN web client that pulls player datasets and provides dynamic comparisons and radar-profile overlays.',
    diagnostics: [
      { time: '02:11 AM', status: 'Aggregated cricket database indices configured on player_id' },
      { time: '02:14 AM', status: 'REST endpoint /api/v1/compare resolved (14ms response time)' },
      { time: '02:44 AM', status: 'Memory heap clean completed. Released 118MB un-referenced frames' }
    ],
    flow: ['Dataset Import', 'MongoDB Indexing', 'Express Endpoint Router', 'React Client', 'Radar Render']
  },
  {
    id: 'wildlife-inspector',
    title: 'Wildlife Trade Inspector',
    category: 'ML',
    tags: ['Python', 'Scikit-learn', 'Flask', 'MERN Stack'],
    shortDesc: 'An anomaly detection model inspecting illegal cross-border commerce logs via Isolation Forest estimations.',
    problem: 'Border customs agents process millions of packages daily. Hidden trends of illegal wildlife commerce slip through standard static heuristics. We trained an unsupervised Isolation Forest model to flag anomalies.',
    diagnostics: [
      { time: '09:05 AM', status: 'Dataset Loaded: 148,000 entries. Normalizing feature vectors...' },
      { time: '09:08 AM', status: 'Isolation Forest Model instantiated. Estimators = 150' },
      { time: '09:12 AM', status: 'Model compilation success. Anomaly boundary limit set to 0.08' }
    ],
    flow: ['Log Telemetry', 'Feature Extraction', 'Isolation Forest Parser', 'Flask Prediction API', 'Admin Alert Terminal']
  }
]

export default function Projects({ userInterest, onInterestChange }) {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const filteredProjects = projectsData.filter(p => {
    if (activeFilter === 'ALL') return true
    if (activeFilter === 'IoT') return p.category === 'IoT'
    if (activeFilter === 'Web') return p.category === 'Web'
    if (activeFilter === 'ML') return p.category === 'ML'
    return true
  })

  const openDossier = (proj) => {
    playConfirmation()
    setActiveModal(proj)
  }

  const closeDossier = () => {
    playClick()
    setActiveModal(null)
  }

  return (
    <section id="projects">
      <div className="section-header reveal">
        <span className="section-number">// 02</span>
        <span className="section-title">Classified Archives</span>
        <div className="section-line" />
      </div>

      {/* FILTER CONTROLS */}
      <div className="reveal" style={{
        display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap'
      }}>
        {['ALL', 'IoT', 'Web', 'ML'].map(f => (
          <button
            key={f}
            onClick={() => { playClick(); setActiveFilter(f); if (onInterestChange) onInterestChange(f.toLowerCase()); }}
            style={{
              background: activeFilter === f ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
              border: `1px solid ${activeFilter === f ? 'var(--cyan)' : 'rgba(255,255,255,0.06)'}`,
              color: activeFilter === f ? 'var(--cyan)' : 'rgba(255,255,255,0.4)',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.6rem', padding: '0.4rem 1.1rem', borderRadius: '4px',
              cursor: 'pointer', letterSpacing: '2.5px', transition: 'all 0.3s'
            }}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ASYMMETRIC GRID LAYOUT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        alignItems: 'stretch'
      }}>
        {filteredProjects.map((p, idx) => {
          const isFeatured = idx === 0 && activeFilter === 'ALL'
          return (
            <div
              key={p.id}
              className="reveal glass-card"
              style={{
                gridColumn: isFeatured ? 'span 2' : 'auto',
                padding: '2.2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%)',
                background: 'rgba(255, 255, 255, 0.01)'
              }}
              onMouseEnter={playTick}
            >
              {/* Corner status LED */}
              <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span className="status-led status-led-green" style={{ width: '4px', height: '4px' }} />
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.42rem', color: 'var(--green)' }}>ACTIVE</span>
              </div>

              <div>
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.52rem',
                  color: 'var(--pink)',
                  letterSpacing: '2px',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>[ DOSSIER: // {p.category.toUpperCase()}_ARCHIVE ]</span>

                <h3 style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '0.8rem',
                  letterSpacing: '1px'
                }}>{p.title}</h3>

                <p style={{
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  maxWidth: isFeatured ? '640px' : 'none'
                }}>{p.shortDesc}</p>

                {/* Tech tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.8rem' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '0.48rem',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      letterSpacing: '0.5px'
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-cyan"
                onClick={() => openDossier(p)}
                style={{
                  alignSelf: 'flex-start',
                  fontSize: '0.55rem',
                  padding: '0.6rem 1.4rem'
                }}
              >
                DECRYPT CASE DOSSIER
              </button>
            </div>
          )
        })}
      </div>

      {/* FULLSCREEN CASE DOSSIER MODAL */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2, 5, 13, 0.96)',
          zIndex: 9999,
          overflowY: 'auto',
          padding: '2.5rem 1rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* Main modal cockpit panel */}
          <div style={{
            maxWidth: '900px',
            width: '100%',
            background: '#02050d',
            border: '1px solid rgba(0, 245, 255, 0.25)',
            boxShadow: '0 0 50px rgba(0,245,255,0.05)',
            borderRadius: '16px',
            padding: '2rem 2.2rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.8rem'
          }}>
            {/* Corner escape button */}
            <button
              onClick={closeDossier}
              style={{
                position: 'absolute', top: '1.2rem', right: '1.2rem',
                background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%', width: '28px', height: '28px', color: '#fff',
                fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              title="Close Dossier"
            >
              X
            </button>

            {/* Title / Diagnostic Info */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.8rem' }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: 'var(--pink)', letterSpacing: '3px' }}>
                📁 CLASSIFIED_RESEARCH_ARCHIVE://{activeModal.id.toUpperCase()}_DOSSIER
              </span>
              <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.6rem', fontWeight: 900, color: '#fff', letterSpacing: '1px', marginTop: '0.4rem' }}>
                {activeModal.title}
              </h2>
            </div>

            {/* Grid details */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {/* Problem statement & flow */}
              <div>
                <h4 style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.68rem', color: '#fff', letterSpacing: '2px', marginBottom: '0.6rem' }}>// SPECIFICATION OVERVIEW</h4>
                <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '1.2rem' }}>
                  {activeModal.problem}
                </p>

                <h4 style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.68rem', color: '#fff', letterSpacing: '2px', marginBottom: '0.6rem' }}>// SYSTEM ARCHITECTURE PATHWAYS</h4>
                {/* Horizontal schematic path flow */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {activeModal.flow.map((node, i) => (
                    <div key={node} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.48rem', color: 'rgba(255,255,255,0.2)' }}>[0{i+1}]</span>
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.7)' }}>{node}</span>
                      {i < activeModal.flow.length - 1 && <span style={{ color: 'var(--cyan)', fontSize: '0.5rem' }}>➔</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Debug timeline & logs */}
              <div>
                <h4 style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.68rem', color: '#fff', letterSpacing: '2px', marginBottom: '0.6rem' }}>// COMPILED COMPILER DIAGNOSTIC LOGS</h4>
                <div style={{
                  background: '#02050d', border: '1px solid rgba(255,255,255,0.05)',
                  padding: '0.8rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.6rem',
                  maxHeight: '180px', overflowY: 'auto'
                }}>
                  {activeModal.diagnostics.map((d, i) => (
                    <div key={i} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', lineHeight: '1.4' }}>
                      <span style={{ color: 'var(--flag-saffron)' }}>[{d.time}]</span>{' '}
                      <span style={{ color: d.status.includes('FAIL') ? '#ff3366' : 'rgba(255,255,255,0.7)' }}>{d.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Sandbox Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h4 style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.68rem', color: '#fff', letterSpacing: '2px', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="status-led status-led-green" style={{ width: '4px', height: '4px' }} />
                INTERACTIVE SIMULATOR SANDBOX
              </h4>
              
              {activeModal.id === 'water-tracker' && <WaterSandbox />}
              {activeModal.id === 'criclytics' && <CriclyticsSandbox />}
              {activeModal.id === 'wildlife-inspector' && <WildlifeSandbox />}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ----------------------------------------------------
// SANDBOX A: SMART WATER TRACKER (IoT)
// ----------------------------------------------------
function WaterSandbox() {
  const [level, setLevel] = useState(25) // percentage
  const [amount, setAmount] = useState(250)
  const [log, setLog] = useState('ESP32 telemetry loop idle.')

  const triggerDrink = () => {
    playClick()
    const addedPercent = Math.round((amount / 2000) * 100)
    setLevel(prev => {
      const next = Math.min(100, prev + addedPercent)
      if (next === 100) {
        setLog(`[whatsapp_relay] SENT: "Hydration target achieved! System balanced."`)
        playSuccess()
      } else {
        setLog(`[whatsapp_relay] SENT: "Consumed ${amount}ml. Hydration level: ${next}% of target."`)
      }
      return next
    })
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.8rem', alignItems: 'center' }}>
      <div>
        <label style={{ fontSize: '0.52rem', color: '#888', fontFamily: "'Share Tech Mono', monospace", display: 'block', marginBottom: '0.4rem' }}>WATER QUANTITY (ML)</label>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
          {[250, 500, 750].map(v => (
            <button
              key={v} onClick={() => { playTick(); setAmount(v); }}
              style={{
                background: amount === v ? 'var(--flag-saffron)' : 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '0.35rem 0.6rem',
                fontSize: '0.52rem', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace"
              }}
            >
              {v}ML
            </button>
          ))}
        </div>
        <button
          onClick={triggerDrink}
          className="btn btn-cyan"
          style={{ width: '100%', fontSize: '0.55rem', padding: '0.5rem 0' }}
        >
          SIMULATE CONSUMPTION
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {/* CSS Glass Cylinder Water Gauge */}
        <div style={{
          width: '50px', height: '110px', border: '2px solid rgba(255,255,255,0.15)',
          borderRadius: '25px', position: 'relative', overflow: 'hidden', background: 'rgba(255,255,255,0.02)'
        }}>
          {/* Blue liquid */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: `${level}%`, background: 'linear-gradient(180deg, var(--cyan) 0%, #0066ff 100%)',
            transition: 'height 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
            boxShadow: '0 0 10px var(--cyan)88'
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', fontWeight: 'bold', color: '#fff',
            textShadow: '0 1px 4px #000', zIndex: 2
          }}>{level}%</div>
        </div>

        {/* Telemetry Output */}
        <div style={{ background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', padding: '0.6rem 0.8rem', borderRadius: '6px', minHeight: '38px', flex: 1, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#cbd5e1', textAlign: 'left' }}>
          <span style={{ color: 'var(--flag-saffron)' }}>&gt;</span> {log}
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// SANDBOX B: CRICLYTICS (Web/Data)
// ----------------------------------------------------
function CriclyticsSandbox() {
  const [profile, setProfile] = useState('Batter')
  const [metric, setMetric] = useState(85) // skill strength

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.8rem' }}>
      <div>
        <label style={{ fontSize: '0.52rem', color: '#888', fontFamily: "'Share Tech Mono', monospace", display: 'block', marginBottom: '0.4rem' }}>COMPARE ROLE PROFILE</label>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.2rem' }}>
          {['Batter', 'Bowler', 'All-Rounder'].map(p => (
            <button
              key={p} onClick={() => { playTick(); setProfile(p); setMetric(p === 'Batter' ? 88 : p === 'Bowler' ? 72 : 94); }}
              style={{
                background: profile === p ? 'var(--flag-saffron)' : 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '0.35rem 0.6rem',
                fontSize: '0.52rem', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace"
              }}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div>
          <label style={{ fontSize: '0.52rem', color: '#888', fontFamily: "'Share Tech Mono', monospace", display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span>SIMULATED ROLE COEFFICIENT</span>
            <span>{metric}%</span>
          </label>
          <input
            type="range" min="50" max="100" value={metric}
            onChange={e => { playTick(); setMetric(parseInt(e.target.value)) }}
            style={{ width: '100%', accentColor: 'var(--flag-saffron)' }}
          />
        </div>
      </div>

      {/* Simulated radar profile bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', justifyContent: 'center' }}>
        {[
          { stat: 'Strike Rate', val: profile === 'Batter' ? metric : Math.round(metric * 0.7) },
          { stat: 'Economy Rate', val: profile === 'Bowler' ? metric : Math.round(metric * 0.5) },
          { stat: 'System Value', val: Math.round((metric + 80) / 2) }
        ].map(({ stat, val }) => (
          <div key={stat} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', color: 'rgba(255,255,255,0.5)' }}>
              <span>{stat}</span>
              <span>{val}%</span>
            </div>
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${val}%`, background: 'var(--cyan)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ----------------------------------------------------
// SANDBOX C: WILDLIFE INSPECTOR (ML)
// ----------------------------------------------------
function WildlifeSandbox() {
  const [threshold, setThreshold] = useState(8) // 0.08 scaling factor
  const [anomaly, setAnomaly] = useState(false)

  useEffect(() => {
    // If threshold gets too low, more anomalies are flagged
    if (threshold < 6) {
      setAnomaly(true)
    } else {
      setAnomaly(false)
    }
  }, [threshold])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.8rem', alignItems: 'center' }}>
      <div>
        <label style={{ fontSize: '0.52rem', color: '#888', fontFamily: "'Share Tech Mono', monospace", display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span>ISOLATION BOUNDARY FACTOR</span>
          <span>0.0{threshold}</span>
        </label>
        <input
          type="range" min="3" max="15" step="1" value={threshold}
          onChange={e => { playTick(); setThreshold(parseInt(e.target.value)) }}
          style={{ width: '100%', accentColor: 'var(--flag-saffron)' }}
        />
        <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', fontFamily: "'Share Tech Mono', monospace", marginTop: '0.4rem', lineHeight: '1.4' }}>
          Altering boundary shifts model sensitivity to flag package features.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <div style={{
          background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px',
          padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.9rem'
        }}>
          <div style={{
            width: '12px', height: '12px', borderRadius: '50%',
            background: anomaly ? '#ff3366' : 'var(--green)',
            boxShadow: anomaly ? '0 0 10px #ff3366' : '0 0 10px var(--green)',
            transition: 'background 0.3s'
          }} />
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', textAlign: 'left' }}>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>MODEL STATE: {anomaly ? 'CRITICAL ANOMALY' : 'NORMAL'}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.15rem' }}>
              {anomaly ? 'Heuristic matches illegal cargo vector.' : 'No anomalies flagged in customs buffer.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
