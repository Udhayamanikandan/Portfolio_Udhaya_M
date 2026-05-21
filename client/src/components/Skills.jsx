import { useEffect, useState, useRef } from 'react'
import { playTick, playClick, playSuccess } from '../utils/audioUX'

// Node structures for the SVG Neural Skills Graph
const nodeData = {
  // Categories (Hubs)
  'Web Systems': { name: 'Web Systems', type: 'hub', x: 250, y: 110, color: 'var(--cyan)', desc: 'Front-end applications, router flows, state management, and real-time sockets.', exp: '2+ Years', snippets: 'import { useState } from "react"', projects: ['Criclytics'] },
  'AI/ML': { name: 'AI/ML', type: 'hub', x: 120, y: 190, color: 'var(--flag-saffron)', desc: 'Predictive statistical models, classification arrays, and data normalization.', exp: '1.5 Years', snippets: 'from sklearn.ensemble import IsolationForest', projects: ['Wildlife Inspector'] },
  'Backend': { name: 'Backend', type: 'hub', x: 380, y: 190, color: 'var(--purple)', desc: 'RESTful endpoints, database schemas, connection pooling, and controllers.', exp: '2 Years', snippets: 'const express = require("express")', projects: ['Criclytics'] },
  'IoT & Hardware': { name: 'IoT & Hardware', type: 'hub', x: 150, y: 290, color: 'var(--flag-green)', desc: 'Microcontrollers, sensor telemetry streams, serial protocols, and firmware.', exp: '2 Years', snippets: 'Serial.begin(115200);', projects: ['GPS Shuttle Tracker', 'Smart Water Tracker'] },
  'Systems Programming': { name: 'Systems Programming', type: 'hub', x: 350, y: 290, color: '#fff', desc: 'Data structures, network routing tables, operating system schedulers, and memory allocation.', exp: '2 Years', snippets: 'int main() { printf("OK"); return 0; }', projects: ['Academic Core'] },

  // Orbiting Skills (Nodes)
  'React.js': { name: 'React.js', type: 'skill', x: 250, y: 40, hub: 'Web Systems', color: 'var(--cyan)', desc: 'Component structures, custom hooks, virtual DOM reconciliations.', exp: 'Proficient', snippets: 'const [state, setState] = useState(null)', projects: ['Criclytics', 'Portfolio OS'] },
  'REST APIs': { name: 'REST APIs', type: 'skill', x: 320, y: 80, hub: 'Web Systems', color: 'var(--cyan)', desc: 'Request protocols, routing handlers, JSON payload processing.', exp: 'Proficient', snippets: 'app.get("/api", (req, res) => res.json({}))', projects: ['Criclytics', 'Wildlife Inspector'] },
  'Python': { name: 'Python', type: 'skill', x: 50, y: 150, hub: 'AI/ML', color: 'var(--flag-saffron)', desc: 'Scripting, model training, dataset formatting, and Flask pipelines.', exp: 'Proficient', snippets: 'df = pd.read_csv("telemetry.csv")', projects: ['Wildlife Inspector'] },
  'Scikit-learn': { name: 'Scikit-learn', type: 'skill', x: 70, y: 240, hub: 'AI/ML', color: 'var(--flag-saffron)', desc: 'Isolation forest classifiers, random state estimators, anomaly scaling.', exp: 'Intermediate', snippets: 'model.fit_predict(X_train)', projects: ['Wildlife Inspector'] },
  'Node.js': { name: 'Node.js', type: 'skill', x: 450, y: 150, hub: 'Backend', color: 'var(--purple)', desc: 'Express API engines, non-blocking asynchronous event handling loops.', exp: 'Proficient', snippets: 'const app = express(); app.use(express.json());', projects: ['Criclytics'] },
  'MySQL / MongoDB': { name: 'MySQL / MongoDB', type: 'skill', x: 430, y: 240, hub: 'Backend', color: 'var(--purple)', desc: 'Database schema configuration, indexes, connection pools, and aggregations.', exp: 'Proficient', snippets: 'mongoose.connect(process.env.MONGODB_URI)', projects: ['Criclytics', 'Wildlife Inspector'] },
  'ESP32 / Arduino': { name: 'ESP32 / Arduino', type: 'skill', x: 80, y: 310, hub: 'IoT & Hardware', color: 'var(--flag-green)', desc: 'Firmware design, WiFi calibration profiles, GPIO pin management.', exp: 'Proficient', snippets: 'pinMode(BUZZER_PIN, OUTPUT);', projects: ['GPS Shuttle Tracker', 'Smart Water Tracker'] },
  'UART / WiFi': { name: 'UART / WiFi', type: 'skill', x: 170, y: 355, hub: 'IoT & Hardware', color: 'var(--flag-green)', desc: 'Serial buffers, HTTP requests, MQTT client bindings, location streams.', exp: 'Proficient', snippets: 'WiFi.begin(ssid, password);', projects: ['GPS Shuttle Tracker'] },
  'C / C++': { name: 'C / C++', type: 'skill', x: 420, y: 310, hub: 'Systems Programming', color: '#fff', desc: 'Embedded compilation, pointer buffers, array manipulations.', exp: 'Proficient', snippets: '#include <iostream>\nusing namespace std;', projects: ['Smart Water Tracker'] },
  'Java': { name: 'Java', type: 'skill', x: 330, y: 355, hub: 'Systems Programming', color: '#fff', desc: 'Object-oriented structures, algorithms, sorting matrices.', exp: 'Intermediate', snippets: 'public static void main(String[] args)', projects: [] }
}

// Hub-to-Hub lines
const hubConnections = [
  ['Web Systems', 'AI/ML'],
  ['Web Systems', 'Backend'],
  ['IoT & Hardware', 'AI/ML'],
  ['Backend', 'Systems Programming'],
  ['IoT & Hardware', 'Systems Programming']
]

export default function Skills() {
  const [selectedNode, setSelectedNode] = useState(nodeData['Web Systems'])
  const [activeLabTab, setActiveLabTab] = useState('pathfinder')

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

  return (
    <section id="skills">
      <div className="section-header reveal">
        <span className="section-number">// 01</span>
        <span className="section-title">Technical Graph & Labs</span>
        <div className="section-line" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center',
        marginBottom: '5rem'
      }}>
        {/* LEFT COLUMN: INTERACTIVE SVG NEURAL SKILL MAP */}
        <div className="reveal" style={{ position: 'relative', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.2rem', display: 'flex', justifyContent: 'center', minHeight: '400px' }}>
          
          {/* Volumetric background core light */}
          <div style={{
            position: 'absolute', width: '220px', height: '220px',
            background: 'radial-gradient(circle, var(--glow-cyan) 0%, transparent 70%)',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            pointerEvents: 'none', zIndex: 1
          }} />

          <svg width="100%" height="400" viewBox="0 0 500 400" style={{ overflow: 'visible', zIndex: 2 }}>
            {/* Render Hub-to-Hub lines */}
            {hubConnections.map(([h1, h2], idx) => {
              const n1 = nodeData[h1]
              const n2 = nodeData[h2]
              const isSelectedPath = selectedNode.name === h1 || selectedNode.name === h2
              return (
                <line
                  key={idx}
                  x1={n1.x} y1={n1.y}
                  x2={n2.x} y2={n2.y}
                  stroke={isSelectedPath ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255,255,255,0.06)'}
                  strokeWidth={isSelectedPath ? 1.5 : 1}
                  strokeDasharray={isSelectedPath ? 'none' : '3 3'}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                />
              )
            })}

            {/* Render Node-to-Hub lines */}
            {Object.entries(nodeData).map(([name, node]) => {
              if (node.type !== 'skill') return null
              const hubNode = nodeData[node.hub]
              const isSelectedPath = selectedNode.name === name || selectedNode.name === node.hub
              return (
                <line
                  key={name}
                  x1={node.x} y1={node.y}
                  x2={hubNode.x} y2={hubNode.y}
                  stroke={isSelectedPath ? node.color : 'rgba(255,255,255,0.05)'}
                  strokeWidth={isSelectedPath ? 1.2 : 0.8}
                  style={{ transition: 'stroke 0.3s' }}
                />
              )
            })}

            {/* Render interactive dots */}
            {Object.entries(nodeData).map(([name, node]) => {
              const isHub = node.type === 'hub'
              const isSelected = selectedNode.name === name
              const r = isHub ? 9 : 5
              const activeColor = node.color
              
              return (
                <g 
                  key={name} 
                  style={{ cursor: 'pointer' }}
                  onClick={() => { playClick(); setSelectedNode(node); }}
                  onMouseEnter={() => playTick()}
                >
                  {/* Glowing halo for selected nodes */}
                  {isSelected && (
                    <circle
                      cx={node.x} cy={node.y} r={r + 8}
                      fill="none" stroke={activeColor} strokeWidth="1"
                      style={{ opacity: 0.8, animation: 'pulse 1.5s infinite' }}
                    />
                  )}
                  {/* Core Node Circle */}
                  <circle
                    cx={node.x} cy={node.y} r={r}
                    fill={isHub ? '#02050d' : activeColor}
                    stroke={activeColor}
                    strokeWidth={isHub ? 2 : 1}
                  />
                  {/* Node Label Text */}
                  <text
                    x={node.x} y={node.y - (r + 5)}
                    fill={isSelected ? '#fff' : 'rgba(255,255,255,0.5)'}
                    fontSize="9"
                    fontFamily="'Share Tech Mono', monospace"
                    textAnchor="middle"
                    style={{ transition: 'fill 0.2s', fontWeight: isSelected ? 'bold' : 'normal' }}
                  >
                    {name}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* RIGHT COLUMN: DYNAMIC NODE SPECIFICATIONS SIDEBAR */}
        <div className="reveal" style={{
          background: 'rgba(255, 255, 255, 0.015)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          padding: '2rem 1.8rem',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          {/* Top category specs */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.6rem', marginBottom: '1.2rem' }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: selectedNode.color, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                📂 SYSTEM_NODE://{selectedNode.type.toUpperCase()}
              </span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.48rem', color: 'rgba(255,255,255,0.3)' }}>
                TELEMETRY: OK
              </span>
            </div>

            <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: selectedNode.color, boxShadow: `0 0 8px ${selectedNode.color}` }} />
              {selectedNode.name}
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1.2rem' }}>
              {selectedNode.desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ background: '#02050d', padding: '0.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ fontSize: '0.42rem', color: '#888', fontFamily: "'Share Tech Mono', monospace" }}>EXPERIENCE LEVEL</div>
                <div style={{ fontSize: '0.72rem', color: '#fff', fontFamily: "'Share Tech Mono', monospace", fontWeight: 'bold' }}>{selectedNode.exp}</div>
              </div>
              <div style={{ background: '#02050d', padding: '0.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ fontSize: '0.42rem', color: '#888', fontFamily: "'Share Tech Mono', monospace" }}>ASSOCIATED ARCHIVE</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--green)', fontFamily: "'Share Tech Mono', monospace", fontWeight: 'bold' }}>
                  {selectedNode.projects.length > 0 ? selectedNode.projects[0] : 'None'}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Code snippet */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: '#888', marginBottom: '0.3rem' }}>
              // ARCHITECTURE DEPLOYMENT SNIPPET
            </div>
            <pre style={{
              background: '#02050d',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '0.8rem',
              borderRadius: '8px',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.55rem',
              color: '#00ff66',
              overflowX: 'auto',
              maxHeight: '120px',
              textAlign: 'left'
            }}>
              <code>{selectedNode.snippets}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* PROOF-OF-SKILL LABORATORIES INTERACTION DECK */}
      <div className="reveal" style={{ marginTop: '5rem' }}>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: '0.82rem',
          color: '#fff',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '1.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <span style={{ color: 'var(--flag-saffron)' }}>//</span> Proof-of-Skill Laboratories
        </div>

        {/* Labs Tab Navigation Bar */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: '0.8rem',
          marginBottom: '2rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {[
            { id: 'pathfinder', label: '01. PATH RESOLVER' },
            { id: 'scheduler', label: '02. TASK SCHEDULER' },
            { id: 'router', label: '03. PACKET ROUTER' },
            { id: 'subnet', label: '04. CIDR SUBNETTING' },
            { id: 'telemetry', label: '05. IoT MQTT CONSOLE' },
            { id: 'api', label: '06. REST API TESTER' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { playClick(); setActiveLabTab(tab.id) }}
              style={{
                background: activeLabTab === tab.id ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
                border: `1px solid ${activeLabTab === tab.id ? 'var(--cyan)' : 'transparent'}`,
                color: activeLabTab === tab.id ? 'var(--cyan)' : 'rgba(255,255,255,0.4)',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.58rem',
                padding: '0.4rem 0.8rem',
                borderRadius: '4px',
                cursor: 'pointer',
                letterSpacing: '1px',
                transition: 'all 0.3s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Lab Display Panel */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.015)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '1.8rem',
          minHeight: '340px'
        }}>
          {activeLabTab === 'pathfinder' && <PathfinderLab />}
          {activeLabTab === 'scheduler' && <SchedulerLab />}
          {activeLabTab === 'router' && <RouterLab />}
          {activeLabTab === 'subnet' && <SubnetLab />}
          {activeLabTab === 'telemetry' && <TelemetryLab />}
          {activeLabTab === 'api' && <ApiLab />}
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// LAB COMPONENT 1: PATHFINDING (DIJKSTRA / BFS / DFS)
// ----------------------------------------------------
function PathfinderLab() {
  const [algo, setAlgo] = useState('Dijkstra')
  const [targetNode, setTargetNode] = useState('E')
  const [visited, setVisited] = useState([])
  const [activeNode, setActiveNode] = useState(null)
  const [path, setPath] = useState([])
  const [running, setRunning] = useState(false)
  const [log, setLog] = useState('Select parameters and execute compiler.')

  const nodes = {
    A: { x: 40, y: 50 },
    B: { x: 130, y: 20 },
    C: { x: 130, y: 80 },
    D: { x: 220, y: 20 },
    E: { x: 310, y: 50 }
  }

  const runSolver = async () => {
    if (running) return
    setRunning(true)
    setVisited([])
    setActiveNode(null)
    setPath([])
    playClick()

    // Step sequences mapped by algorithm and target
    let steps = []
    let finalPath = []

    if (algo === 'Dijkstra') {
      steps = [
        { active: 'A', visited: ['A'], log: 'Start Dijkstra at Source A. Distances: A=0, others=inf' },
        { active: 'C', visited: ['A', 'C'], log: 'Explore links from A: Visited C (cost 2). B cost is 4.' },
        { active: 'B', visited: ['A', 'C', 'B'], log: 'Visited B (shortest weight via C is 3).' },
        { active: 'D', visited: ['A', 'C', 'B', 'D'], log: 'Visited D (cost 8 via B).' },
        { active: 'E', visited: ['A', 'C', 'B', 'D', 'E'], log: 'Visited E (cost 10 via D). Resolved shortest path.' }
      ]
      finalPath = targetNode === 'B' ? ['A', 'C', 'B'] : targetNode === 'C' ? ['A', 'C'] : targetNode === 'D' ? ['A', 'C', 'B', 'D'] : ['A', 'C', 'B', 'D', 'E']
    } else if (algo === 'BFS') {
      steps = [
        { active: 'A', visited: ['A'], log: 'Start BFS. Queue: [A]' },
        { active: 'B', visited: ['A', 'B'], log: 'De-queue A. Queue: [B, C]. Visited B.' },
        { active: 'C', visited: ['A', 'B', 'C'], log: 'De-queue B. Queue: [C, D]. Visited C.' },
        { active: 'D', visited: ['A', 'B', 'C', 'D'], log: 'De-queue C. Queue: [D, E]. Visited D.' },
        { active: 'E', visited: ['A', 'B', 'C', 'D', 'E'], log: 'De-queue D. Queue: [E]. Target E reached!' }
      ]
      finalPath = targetNode === 'B' ? ['A', 'B'] : targetNode === 'C' ? ['A', 'C'] : targetNode === 'D' ? ['A', 'B', 'D'] : ['A', 'C', 'E']
    } else { // DFS
      steps = [
        { active: 'A', visited: ['A'], log: 'Start DFS. Stack: [A]' },
        { active: 'B', visited: ['A', 'B'], log: 'Pop A. Push neighbors. Stack: [C, B]. Visit B.' },
        { active: 'D', visited: ['A', 'B', 'D'], log: 'Pop B. Push neighbors. Stack: [C, D]. Visit D.' },
        { active: 'E', visited: ['A', 'B', 'D', 'E'], log: 'Pop D. Push neighbors. Stack: [C, E]. Visit E. Found target!' }
      ]
      finalPath = targetNode === 'B' ? ['A', 'B'] : targetNode === 'C' ? ['A', 'C'] : targetNode === 'D' ? ['A', 'B', 'D'] : ['A', 'B', 'D', 'E']
    }

    // Filter sequences depending on where target is located
    const filteredSteps = []
    for (let i = 0; i < steps.length; i++) {
      filteredSteps.push(steps[i])
      if (steps[i].active === targetNode) break
    }

    for (let i = 0; i < filteredSteps.length; i++) {
      await new Promise(r => setTimeout(r, 600))
      setActiveNode(filteredSteps[i].active)
      setVisited(filteredSteps[i].visited)
      setLog(filteredSteps[i].log)
      playTick()
    }

    await new Promise(r => setTimeout(r, 500))
    setPath(finalPath)
    setActiveNode(null)
    setLog(`✓ PATH SOLVED USING ${algo.toUpperCase()}: ${finalPath.join(' -> ')}`)
    setRunning(false)
    playSuccess()
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      <div>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.68rem', color: '#fff', letterSpacing: '2px', marginBottom: '0.8rem' }}>// GRAPH SOLVER CONFIG</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Share Tech Mono', monospace", display: 'block', marginBottom: '0.4rem' }}>SELECT ALGORITHM</label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['Dijkstra', 'BFS', 'DFS'].map(a => (
                <button
                  key={a} disabled={running} onClick={() => { playTick(); setAlgo(a); }}
                  style={{
                    background: algo === a ? 'var(--flag-saffron)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '0.35rem 0.6rem',
                    fontSize: '0.52rem', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace"
                  }}
                >
                  {a.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Share Tech Mono', monospace", display: 'block', marginBottom: '0.4rem' }}>TARGET NODE</label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['B', 'C', 'D', 'E'].map(n => (
                <button
                  key={n} disabled={running} onClick={() => { playTick(); setTargetNode(n); }}
                  style={{
                    background: targetNode === n ? 'var(--cyan)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '0.3rem 0.55rem',
                    fontSize: '0.52rem', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace"
                  }}
                >
                  NODE_{n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={runSolver} disabled={running}
          className="btn btn-cyan"
          style={{ width: '100%', fontSize: '0.55rem', padding: '0.6rem 0' }}
        >
          {running ? 'COMPILING PATH...' : 'EXECUTE RESOLVER'}
        </button>
      </div>

      <div>
        {/* Graph representation */}
        <div style={{ position: 'relative', height: '140px', background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
          <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
            {/* Draw connecting edges */}
            <line x1="40" y1="50" x2="130" y2="20" stroke={path.includes('A') && path.includes('B') ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'} strokeWidth="1" />
            <line x1="40" y1="50" x2="130" y2="80" stroke={path.includes('A') && path.includes('C') ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'} strokeWidth="1" />
            <line x1="130" y1="80" x2="130" y2="20" stroke={path.includes('C') && path.includes('B') ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'} strokeWidth="1" />
            <line x1="130" y1="20" x2="220" y2="20" stroke={path.includes('B') && path.includes('D') ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'} strokeWidth="1" />
            <line x1="130" y1="80" x2="310" y2="50" stroke={path.includes('C') && path.includes('E') ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'} strokeWidth="1" />
            <line x1="220" y1="20" x2="310" y2="50" stroke={path.includes('D') && path.includes('E') ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'} strokeWidth="1" />
          </svg>

          {Object.entries(nodes).map(([name, pos]) => {
            const isVisited = visited.includes(name)
            const isActive = activeNode === name
            const isInPath = path.includes(name)
            let color = 'rgba(255,255,255,0.15)'
            if (isActive) color = 'var(--flag-saffron)'
            else if (isInPath) color = 'var(--cyan)'
            else if (isVisited) color = '#fff'

            return (
              <div
                key={name}
                style={{
                  position: 'absolute', left: `${pos.x}px`, top: `${pos.y}px`,
                  width: '18px', height: '18px', borderRadius: '50%', background: '#02050d',
                  border: `2px solid ${color}`, color: '#fff', fontSize: '0.52rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: 'translate(-50%, -50%)', fontFamily: "'Share Tech Mono', monospace",
                  fontWeight: 'bold', boxShadow: isActive || isInPath ? `0 0 10px ${color}` : 'none',
                  transition: 'all 0.3s'
                }}
              >
                {name}
              </div>
            )
          })}
        </div>

        {/* Console Log */}
        <div style={{ background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', padding: '0.6rem 0.8rem', borderRadius: '6px', minHeight: '38px', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#cbd5e1' }}>
          <span style={{ color: 'var(--flag-saffron)' }}>&gt;</span> {log}
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// LAB COMPONENT 2: OS SCHEDULER (ROUND ROBIN / SJF)
// ----------------------------------------------------
function SchedulerLab() {
  const [algo, setAlgo] = useState('Round Robin')
  const [quantum, setQuantum] = useState(3)
  const [running, setRunning] = useState(false)
  const [gantt, setGantt] = useState([])
  const [log, setLog] = useState('Trigger simulator deployment.')
  const [cpu, setCpu] = useState(0)

  const runSimulation = async () => {
    if (running) return
    setRunning(true)
    setGantt([])
    setCpu(0)
    playClick()

    let steps = []
    if (algo === 'Round Robin') {
      steps = [
        { gantt: ['T1', 'T1', 'T1'], cpu: 40, log: 'T1 runs quantum (3ms). Remaining T1: 5ms.' },
        { gantt: ['T1', 'T1', 'T1', 'T2', 'T2', 'T2'], cpu: 65, log: 'T2 runs quantum (3ms). Remaining T2: 1ms.' },
        { gantt: ['T1', 'T1', 'T1', 'T2', 'T2', 'T2', 'T3', 'T3', 'T3'], cpu: 80, log: 'T3 runs quantum (3ms). Remaining T3: 3ms.' },
        { gantt: ['T1', 'T1', 'T1', 'T2', 'T2', 'T2', 'T3', 'T3', 'T3', 'T1', 'T1', 'T1'], cpu: 90, log: 'T1 runs quantum (3ms). Remaining T1: 2ms.' },
        { gantt: ['T1', 'T1', 'T1', 'T2', 'T2', 'T2', 'T3', 'T3', 'T3', 'T1', 'T1', 'T1', 'T2'], cpu: 94, log: 'T2 runs final 1ms and terminates.' },
        { gantt: ['T1', 'T1', 'T1', 'T2', 'T2', 'T2', 'T3', 'T3', 'T3', 'T1', 'T1', 'T1', 'T2', 'T3', 'T3', 'T3'], cpu: 97, log: 'T3 runs final 3ms and terminates.' },
        { gantt: ['T1', 'T1', 'T1', 'T2', 'T2', 'T2', 'T3', 'T3', 'T3', 'T1', 'T1', 'T1', 'T2', 'T3', 'T3', 'T3', 'T1', 'T1'], cpu: 100, log: 'T1 runs final 2ms and completes execution.' }
      ]
    } else { // Shortest Job First
      steps = [
        { gantt: ['T2'], cpu: 30, log: 'T2 burst (4ms) is shortest. Dispatching T2.' },
        { gantt: ['T2', 'T2', 'T2', 'T2'], cpu: 55, log: 'T2 completes. Dispatching next shortest: T3 (6ms).' },
        { gantt: ['T2', 'T2', 'T2', 'T2', 'T3', 'T3', 'T3', 'T3', 'T3', 'T3'], cpu: 85, log: 'T3 completes. Dispatching final job: T1 (8ms).' },
        { gantt: ['T2', 'T2', 'T2', 'T2', 'T3', 'T3', 'T3', 'T3', 'T3', 'T3', 'T1', 'T1', 'T1', 'T1', 'T1', 'T1', 'T1', 'T1'], cpu: 100, log: 'T1 completes. CPU idle. All processes terminated.' }
      ]
    }

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 600))
      setGantt(steps[i].gantt)
      setCpu(steps[i].cpu)
      setLog(steps[i].log)
      playTick()
    }
    setRunning(false)
    playSuccess()
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      <div>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.68rem', color: '#fff', letterSpacing: '2px', marginBottom: '0.8rem' }}>// TASK SCHEDULER ALGO</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Share Tech Mono', monospace", display: 'block', marginBottom: '0.4rem' }}>SCHEDULING ALGORITHM</label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['Round Robin', 'Shortest Job First'].map(a => (
                <button
                  key={a} disabled={running} onClick={() => { playTick(); setAlgo(a); }}
                  style={{
                    background: algo === a ? 'var(--flag-saffron)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '0.35rem 0.6rem',
                    fontSize: '0.52rem', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace"
                  }}
                >
                  {a.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {algo === 'Round Robin' && (
            <div>
              <label style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Share Tech Mono', monospace", display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span>TIME QUANTUM</span>
                <span>{quantum}ms</span>
              </label>
              <input
                type="range" min="2" max="5" step="1" value={quantum}
                onChange={e => { playTick(); setQuantum(parseInt(e.target.value)) }}
                disabled={running}
                style={{ width: '100%', accentColor: 'var(--flag-saffron)' }}
              />
            </div>
          )}
        </div>

        <button
          onClick={runSimulation} disabled={running}
          className="btn btn-cyan"
          style={{ width: '100%', fontSize: '0.55rem', padding: '0.6rem 0' }}
        >
          {running ? 'DEPLOYING SIMULATOR...' : 'RUN PROCESS SCHEDULER'}
        </button>
      </div>

      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.4rem', color: '#888', display: 'block', fontFamily: "'Share Tech Mono', monospace" }}>CPU STRESS</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--flag-saffron)', fontWeight: 'bold', fontFamily: "'Orbitron', monospace" }}>{cpu}%</span>
          </div>
          <div style={{ background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.4rem', color: '#888', display: 'block', fontFamily: "'Share Tech Mono', monospace" }}>JOBS IN QUEUE</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--cyan)', fontWeight: 'bold', fontFamily: "'Orbitron', monospace" }}>T1, T2, T3</span>
          </div>
        </div>

        {/* Gantt Chart block */}
        <div style={{
          background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', padding: '0.7rem',
          borderRadius: '8px', minHeight: '44px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {gantt.length === 0 ? (
            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Share Tech Mono', monospace" }}>[ CPU_CORE_IDLE ]</span>
          ) : (
            <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', width: '100%' }}>
              {gantt.map((task, idx) => {
                const bg = task === 'T1' ? 'var(--flag-saffron)' : task === 'T2' ? '#fff' : 'var(--flag-green)'
                const col = task === 'T2' ? '#000' : '#fff'
                return (
                  <div key={idx} style={{
                    flex: 1, minWidth: '10px', background: bg, color: col, fontWeight: 'bold',
                    fontSize: '0.45rem', padding: '0.2rem 0', textAlign: 'center', borderRadius: '2px',
                    fontFamily: "'Share Tech Mono', monospace"
                  }}>{task}</div>
                )
              })}
            </div>
          )}
        </div>

        {/* Console Log */}
        <div style={{ background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', padding: '0.6rem 0.8rem', borderRadius: '6px', minHeight: '38px', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#cbd5e1' }}>
          <span style={{ color: 'var(--flag-saffron)' }}>&gt;</span> {log}
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// LAB COMPONENT 3: PACKET ROUTER
// ----------------------------------------------------
function RouterLab() {
  const [step, setStep] = useState(0)
  const [transmitting, setTransmitting] = useState(false)
  const logs = [
    'Idle. Waiting for network package injection...',
    'IP Packet generated. Src: 192.168.1.12 -> Dst: 10.0.0.8',
    'Gateway Router R1 table lookup: matching gateway interface...',
    'R1 forwarded packet to core relay R2. (Hop Count = 1)',
    'R2 determined optimal path: forwarding to gateway node R3. (Hop Count = 2)',
    'R3 dispatched packet to Destination interface 10.0.0.8.',
    '✓ Transmission Successful. ACK signal received back at Gateway (RTT: 4.8ms).'
  ]

  const triggerRouting = async () => {
    if (transmitting) return
    setTransmitting(true)
    setStep(1)
    playClick()

    for (let i = 2; i < logs.length; i++) {
      await new Promise(r => setTimeout(r, 900))
      setStep(i)
      playTick()
    }
    setTransmitting(false)
    playSuccess()
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      <div>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.68rem', color: '#fff', letterSpacing: '2px', marginBottom: '0.8rem' }}>// NETWORK PACKET SIMULATOR</div>
        
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Simulate a virtual data packet traversing local area network hops. Shows dynamic gateway routing tables and latency logs.
        </p>

        <button
          onClick={triggerRouting} disabled={transmitting}
          className="btn btn-cyan"
          style={{ width: '100%', fontSize: '0.55rem', padding: '0.6rem 0' }}
        >
          {transmitting ? 'TRANSMITTING...' : 'INJECT IP DATA PACKET'}
        </button>
      </div>

      <div>
        {/* Visual Router Node Loop */}
        <div style={{
          height: '90px', background: '#02050d', border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '8px', display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          position: 'relative', overflow: 'hidden', padding: '0 1rem', marginBottom: '1rem'
        }}>
          {['Src', 'R1', 'R2', 'R3', 'Dst'].map((name, i) => {
            const isActive = step >= i && step !== 0
            const isCurrent = step === i
            return (
              <div key={name} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2
              }}>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: isCurrent ? 'var(--cyan)' : 'rgba(255,255,255,0.03)',
                  border: `2px solid ${isActive ? 'var(--cyan)' : 'rgba(255,255,255,0.1)'}`,
                  color: isCurrent ? '#000' : '#fff', fontWeight: 'bold', fontSize: '0.52rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Share Tech Mono', monospace",
                  boxShadow: isCurrent ? '0 0 12px var(--cyan)' : 'none',
                  transition: 'all 0.3s'
                }}>{name}</div>
              </div>
            )
          })}
          {/* Background horizontal line */}
          <div style={{
            position: 'absolute', left: '10%', right: '10%', height: '1px',
            background: 'rgba(255,255,255,0.05)', zIndex: 1
          }} />
          {/* Active progress line */}
          <div style={{
            position: 'absolute', left: '10%', width: `${Math.min(80, (step / 4) * 80)}%`, height: '2px',
            background: 'var(--cyan)', zIndex: 1, transition: 'width 0.4s ease-out',
            boxShadow: '0 0 6px var(--cyan)'
          }} />
        </div>

        {/* Logs */}
        <div style={{ background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', padding: '0.6rem 0.8rem', borderRadius: '6px', minHeight: '38px', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#cbd5e1' }}>
          <span style={{ color: 'var(--flag-saffron)' }}>&gt;</span> {logs[step]}
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// LAB COMPONENT 4: CIDR SUBNETTING PLAYGROUND
// ----------------------------------------------------
function SubnetLab() {
  const [cidr, setCidr] = useState(24)
  const [ip, setIp] = useState('192.168.1.10')

  // Calculated subnet details
  const getSubnetInfo = () => {
    let mask = '255.255.255.0'
    let network = '192.168.1.0'
    let hosts = '192.168.1.1 - 192.168.1.254'
    let total = 254
    let binMask = '11111111.11111111.11111111.00000000'

    if (cidr === 24) {
      // default
    } else if (cidr === 25) {
      mask = '255.255.255.128'
      network = '192.168.1.0'
      hosts = '192.168.1.1 - 192.168.1.126'
      total = 126
      binMask = '11111111.11111111.11111111.10000000'
    } else if (cidr === 26) {
      mask = '255.255.255.192'
      network = '192.168.1.0'
      hosts = '192.168.1.1 - 192.168.1.62'
      total = 62
      binMask = '11111111.11111111.11111111.11000000'
    } else if (cidr === 27) {
      mask = '255.255.255.224'
      network = '192.168.1.0'
      hosts = '192.168.1.1 - 192.168.1.30'
      total = 30
      binMask = '11111111.11111111.11111111.11100000'
    } else if (cidr === 28) {
      mask = '255.255.255.240'
      network = '192.168.1.0'
      hosts = '192.168.1.1 - 192.168.1.14'
      total = 14
      binMask = '11111111.11111111.11111111.11110000'
    } else if (cidr === 29) {
      mask = '255.255.255.248'
      network = '192.168.1.0'
      hosts = '192.168.1.1 - 192.168.1.6'
      total = 6
      binMask = '11111111.11111111.11111111.11111000'
    } else if (cidr === 30) {
      mask = '255.255.255.252'
      network = '192.168.1.8'
      hosts = '192.168.1.9 - 192.168.1.10'
      total = 2
      binMask = '11111111.11111111.11111111.11111100'
    }

    return { mask, network, hosts, total, binMask }
  }

  const info = getSubnetInfo()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      <div>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.68rem', color: '#fff', letterSpacing: '2px', marginBottom: '0.8rem' }}>// CIDR CONFIGURATION DECK</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.2rem' }}>
          <div>
            <label style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Share Tech Mono', monospace", display: 'block', marginBottom: '0.3rem' }}>BASE IP ADDRESS</label>
            <input
              type="text" value={ip} onChange={e => setIp(e.target.value)}
              style={{
                width: '100%', background: '#02050d', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px', color: '#fff', fontSize: '0.65rem', padding: '0.4rem',
                fontFamily: "'Share Tech Mono', monospace", outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Share Tech Mono', monospace", display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span>SUBNET MASK RANGE</span>
              <span>/{cidr}</span>
            </label>
            <input
              type="range" min="24" max="30" step="1" value={cidr}
              onChange={e => { playTick(); setCidr(parseInt(e.target.value)); }}
              style={{ width: '100%', accentColor: 'var(--cyan)' }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.3rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>NET_MASK:</span>
          <span style={{ color: '#fff' }}>{info.mask}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.3rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>BINARY:</span>
          <span style={{ color: 'var(--cyan)' }}>{info.binMask}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.3rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>NET_ID:</span>
          <span style={{ color: '#fff' }}>{info.network}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.3rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>HOST_RANGE:</span>
          <span style={{ color: '#fff' }}>{info.hosts}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.3rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>USABLE_IPS:</span>
          <span style={{ color: 'var(--green)' }}>{info.total} hosts</span>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// LAB COMPONENT 5: IoT MQTT TELEMETRY SIMULATOR
// ----------------------------------------------------
function TelemetryLab() {
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('OFFLINE')
  const timerRef = useRef(null)

  const toggleBroker = () => {
    playClick()
    if (status === 'ONLINE') {
      setStatus('OFFLINE')
      clearInterval(timerRef.current)
    } else {
      setStatus('ONLINE')
      setMessages([])
      timerRef.current = setInterval(() => {
        const temp = (22.5 + Math.random() * 4).toFixed(1)
        const hum = Math.round(55 + Math.random() * 15)
        const newMsg = `[DHT11] PUBLISH -> snuc/bus/sensor: {"temp":${temp},"humidity":${hum}}`
        setMessages(prev => [newMsg, ...prev].slice(0, 4))
        playTick()
      }, 1500)
    }
  }

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      <div>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.68rem', color: '#fff', letterSpacing: '2px', marginBottom: '0.8rem' }}>// MQTT IoT STATION</div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#02050d', padding: '0.4rem 0.6rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Share Tech Mono', monospace" }}>BROKER:</span>
            <span style={{ fontSize: '0.52rem', fontWeight: 'bold', color: status === 'ONLINE' ? 'var(--green)' : '#ff3366', fontFamily: "'Share Tech Mono', monospace" }}>{status}</span>
          </div>
          <button
            onClick={toggleBroker}
            className="btn"
            style={{
              padding: '0.4rem 0.8rem', fontSize: '0.52rem', margin: 0,
              background: status === 'ONLINE' ? 'rgba(255,51,102,0.15)' : 'rgba(0,245,255,0.15)',
              border: `1px solid ${status === 'ONLINE' ? '#ff3366' : 'var(--cyan)'}`,
              color: status === 'ONLINE' ? '#ff3366' : 'var(--cyan)',
              borderRadius: '4px'
            }}
          >
            {status === 'ONLINE' ? 'DISCONNECT' : 'CONNECT BROKER'}
          </button>
        </div>

        <pre style={{
          background: '#02050d', border: '1px solid rgba(255,255,255,0.05)',
          padding: '0.6rem', borderRadius: '6px', fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.52rem', color: 'rgba(255,255,255,0.4)', textAlign: 'left'
        }}>
          <code>
            {`// MQTT Setup Configuration\n`}
            {`WiFiClient espClient;\n`}
            {`PubSubClient client(espClient);\n`}
            {`client.connect("esp32_bus_node");\n`}
            {`client.publish("snuc/bus/sensor", payload);`}
          </code>
        </pre>
      </div>

      <div>
        <div style={{
          background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px',
          padding: '0.8rem', minHeight: '120px', display: 'flex', flexDirection: 'column', gap: '0.3rem',
          fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: '#00ff66', textAlign: 'left'
        }}>
          <div style={{ color: '#888', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.2rem', marginBottom: '0.2rem' }}>MQTT_BROKER_LOG:</div>
          {messages.length === 0 ? (
            <div style={{ color: 'rgba(255,255,255,0.15)' }}>No telemetry packets received. Connect Broker.</div>
          ) : (
            messages.map((m, idx) => (
              <div key={idx}>{m}</div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// LAB COMPONENT 6: REST API TESTING CONSOLE
// ----------------------------------------------------
function ApiLab() {
  const [method, setMethod] = useState('GET')
  const [endpoint, setEndpoint] = useState('/api/v2/anomaly/inspect')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const triggerApiRequest = async () => {
    setLoading(true)
    playClick()
    await new Promise(r => setTimeout(r, 700))
    
    let data = {}
    if (method === 'GET') {
      data = {
        status: 'SUCCESS',
        uptime: '34902s',
        version: 'Udhaya_OS/v2.1',
        metrics: {
          active_workers: 3,
          queue_depth: 0,
          ping_latency: '14ms'
        }
      }
    } else {
      data = {
        status: 'TRANSMITTED',
        timestamp: Date.now(),
        ip: '192.168.1.110',
        message: 'Telemetry coordinates dispatched.'
      }
    }
    setResponse(data)
    setLoading(false)
    playSuccess()
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      <div>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.68rem', color: '#fff', letterSpacing: '2px', marginBottom: '0.8rem' }}>// API DIAGNOSTIC CONSOLE</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['GET', 'POST'].map(m => (
              <button
                key={m} onClick={() => { playTick(); setMethod(m); }}
                style={{
                  background: method === m ? 'var(--flag-saffron)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '0.3rem 0.6rem',
                  fontSize: '0.52rem', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace"
                }}
              >
                {m}
              </button>
            ))}
          </div>

          <input
            type="text" value={endpoint} onChange={e => setEndpoint(e.target.value)}
            style={{
              width: '100%', background: '#02050d', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px', color: '#fff', fontSize: '0.65rem', padding: '0.4rem',
              fontFamily: "'Share Tech Mono', monospace", outline: 'none'
            }}
          />
        </div>

        <button
          onClick={triggerApiRequest} disabled={loading}
          className="btn btn-cyan"
          style={{ width: '100%', fontSize: '0.55rem', padding: '0.6rem 0' }}
        >
          {loading ? 'SENDING REQUEST...' : 'DISPATCH REQUEST'}
        </button>
      </div>

      <div>
        <div style={{
          background: '#02050d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px',
          padding: '0.8rem', minHeight: '140px', fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.52rem', color: '#cbd5e1', textAlign: 'left'
        }}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.2rem', marginBottom: '0.3rem', color: '#888' }}>
            RESPONSE_PAYLOAD:
          </div>
          {loading ? (
            <div style={{ color: 'var(--cyan)' }}>HTTP/1.1 RESOLVING ENDPOINT...</div>
          ) : response ? (
            <div>
              <div style={{ color: 'var(--green)', marginBottom: '0.3rem' }}>HTTP/1.1 200 OK</div>
              <pre style={{ margin: 0, overflowX: 'auto', color: '#00ff66', fontSize: '0.5rem' }}>
                <code>{JSON.stringify(response, null, 2)}</code>
              </pre>
            </div>
          ) : (
            <div style={{ color: 'rgba(255,255,255,0.15)' }}>Console idle. Dispatch a request packet.</div>
          )}
        </div>
      </div>
    </div>
  )
}