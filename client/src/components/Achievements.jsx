import { useEffect, useState } from 'react'
import { playTick, playClick, playSuccess } from '../utils/audioUX'

const dossierData = {
  ACADEMICS: [
    {
      id: 'snu-scholar',
      title: 'Academic Performance SNUC',
      meta: 'CGPA: 9.563 / 10.0',
      desc: 'Ranked in the top tier of the CSE (IoT) department. Maintained rigorous scores in operating systems, database queries, and system architectures.',
      stats: { Completion: 95, Performance: 98 }
    },
    {
      id: 'iot-gold',
      title: 'NPTEL Introduction to IoT',
      meta: 'Gold Medalist - Elite Tier',
      desc: 'Completed advanced IoT specialization. Scored highly in networking topologies, routing tables, and ESP32 programming metrics.',
      stats: { Sensors: 92, Telemetry: 96 }
    }
  ],
  COMPETITIONS: [
    {
      id: 'sih-2025',
      title: 'Smart India Hackathon 2025',
      meta: 'Finalist - System Architect',
      desc: 'Designed dynamic network routing layers and databases for centralized logistics telemetry. Solved packet delivery limits under simulation.',
      stats: { Architecture: 94, Database: 90 }
    },
    {
      id: 'iot-hack',
      title: 'IoT Innovators Challenge',
      meta: 'Top 3 Placement',
      desc: 'Configured and deployed a smart campus node setup with battery optimization sleep cycles and low-latency sensor queries.',
      stats: { Firmware: 95, PowerOpt: 88 }
    }
  ],
  CREDENTIALS: [
    {
      id: 'mern-dev',
      title: 'Full Stack MERN Developer',
      meta: 'System Verified',
      desc: 'Completed comprehensive backend integration pathways. Proficient in Express endpoint controls and index optimizations in MongoDB.',
      stats: { Backend: 92, Frontend: 88 }
    }
  ]
}

export default function Achievements() {
  const [activeFolder, setActiveFolder] = useState('ACADEMICS')
  const [selectedFile, setSelectedFile] = useState(dossierData.ACADEMICS[0])
  const [decrypting, setDecrypting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleFolderChange = (folder) => {
    playClick()
    setActiveFolder(folder)
    setSelectedFile(dossierData[folder][0])
  }

  const handleFileChange = async (file) => {
    playClick()
    setDecrypting(true)
    await new Promise(r => setTimeout(r, 600))
    setSelectedFile(file)
    setDecrypting(false)
    playSuccess()
  }

  return (
    <section id="achievements">
      <div className="section-header reveal">
        <span className="section-number">// 03</span>
        <span className="section-title">Achievements Dossier</span>
        <div className="section-line" />
      </div>

      <div className="reveal" style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: '2rem',
        alignItems: 'stretch',
        background: 'rgba(255, 255, 255, 0.01)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '2rem',
        minHeight: '440px'
      }}>
        {/* LEFT COLUMN: RETRO FILE DIRECTORY TREE */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          
          {/* Folders */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
              📁 VOLUMETRIC_DIRECTORIES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {Object.keys(dossierData).map(folder => (
                <button
                  key={folder}
                  onClick={() => handleFolderChange(folder)}
                  style={{
                    background: activeFolder === folder ? 'rgba(255, 153, 51, 0.08)' : 'transparent',
                    border: 'none',
                    color: activeFolder === folder ? 'var(--flag-saffron)' : 'rgba(255,255,255,0.5)',
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '0.62rem', padding: '0.4rem 0.6rem', borderRadius: '4px',
                    cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.4rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '0.7rem' }}>{activeFolder === folder ? '📂' : '📁'}</span>
                  {folder}
                </button>
              ))}
            </div>
          </div>

          {/* Files inside active folder */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
              📄 FILES_IN_SECTOR
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {dossierData[activeFolder].map(file => {
                const isSelected = selectedFile.id === file.id
                return (
                  <button
                    key={file.id}
                    onClick={() => handleFileChange(file)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isSelected ? 'var(--cyan)' : 'rgba(255,255,255,0.4)',
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '0.55rem', padding: '0.3rem 0.4rem',
                      cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.4rem',
                      transition: 'all 0.2s', textDecoration: isSelected ? 'underline' : 'none'
                    }}
                  >
                    <span>➔</span>
                    {file.id.toUpperCase()}.dat
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: COGNITIVE FILE INSPECT WINDOW */}
        <div style={{
          position: 'relative',
          background: '#02050d',
          border: '1px solid rgba(255,255,255,0.03)',
          borderRadius: '12px',
          padding: '2.2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}>
          {/* CONFIDENTIAL watermarked background */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-25deg)',
            fontFamily: "'Orbitron', monospace", fontSize: 'clamp(2.5rem, 8vw, 6.2rem)', fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.012)', pointerEvents: 'none', letterSpacing: '8px', zIndex: 1,
            userSelect: 'none', whiteSpace: 'nowrap'
          }}>
            VERIFIED
          </div>

          {decrypting ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              flex: 1, zIndex: 2, fontFamily: "'Share Tech Mono', monospace", color: 'var(--cyan)', gap: '0.5rem'
            }}>
              <span style={{ fontSize: '0.65rem' }}>RESOLVING SECURITY SIGNATURE...</span>
              <div style={{ width: '120px', height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: '100%', background: 'var(--cyan)',
                  animation: 'sweep 0.6s linear infinite'
                }} />
              </div>
            </div>
          ) : (
            <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: 'var(--pink)', letterSpacing: '2.5px' }}>
                    📄 FILE_INSPECTION_BUFFER://{selectedFile.id.toUpperCase()}.DAT
                  </span>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.48rem', color: 'rgba(255,255,255,0.3)' }}>
                    SIZE: 2.4KB
                  </span>
                </div>

                <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.25rem', fontWeight: 900, color: '#fff', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                  {selectedFile.title}
                </h3>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--flag-saffron)', letterSpacing: '1.5px', marginBottom: '1.2rem' }}>
                  {selectedFile.meta}
                </div>

                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1.8rem', maxWidth: '580px' }}>
                  {selectedFile.desc}
                </p>
              </div>

              {/* Holographic Stats Gauges */}
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: 'rgba(255,255,255,0.25)', marginBottom: '0.6rem' }}>
                  // PERFORMANCE INDEX SPECIFICATIONS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  {Object.entries(selectedFile.stats).map(([label, val]) => (
                    <div key={label} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', marginBottom: '0.2rem' }}>
                        <span>{label.toUpperCase()}</span>
                        <span>{val}%</span>
                      </div>
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${val}%`, background: 'var(--green)', boxShadow: '0 0 5px var(--green)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}