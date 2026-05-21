import { useState, useEffect, useRef } from 'react'

export default function DevConsole() {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState([
    { text: 'UDHAYA OS [Version 2.0.4]', type: 'system' },
    { text: 'SYSTEM INTERACTIVE TERMINAL READY.', type: 'system' },
    { text: "Type 'help' for command directory, or 'game' for arcade mode.", type: 'system' }
  ])
  const [inputVal, setInputVal] = useState('')
  const [mode, setMode] = useState('cli') // 'cli', 'game', 'matrix'
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const consoleEndRef = useRef(null)
  const canvasRef = useRef(null)
  const inputRef = useRef(null)

  // Auto scroll console
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history])

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && mode === 'cli' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, mode])

  // Matrix Rain effect inside terminal
  useEffect(() => {
    if (mode !== 'matrix' || !isOpen) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame

    canvas.width = canvas.parentElement.clientWidth
    canvas.height = 240

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%*+=-/<>:;'
    const fontSize = 10
    const columns = canvas.width / fontSize
    const rainDrops = Array.from({ length: columns }, () => 1)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f0'
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize)

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0
        }
        rainDrops[i]++
      }
    }

    const interval = setInterval(draw, 33)
    return () => {
      clearInterval(interval)
    }
  }, [mode, isOpen])

  // Playable Snake Game logic inside terminal
  useEffect(() => {
    if (mode !== 'game' || !isOpen) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame

    canvas.width = 280
    canvas.height = 200

    const grid = 10
    let count = 0
    let currentScore = 0

    const snake = {
      x: 140,
      y: 100,
      dx: grid,
      dy: 0,
      cells: [{ x: 140, y: 100 }, { x: 130, y: 100 }, { x: 120, y: 100 }],
      maxCells: 3
    }

    const food = {
      x: 60,
      y: 60
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }

    function placeFood() {
      food.x = getRandomInt(0, 28) * grid
      food.y = getRandomInt(0, 20) * grid
    }

    const handleKeyDown = (e) => {
      // Prevent default page scroll
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

      if (e.key === 'ArrowLeft' && snake.dx === 0) {
        snake.dx = -grid
        snake.dy = 0
      } else if (e.key === 'ArrowUp' && snake.dy === 0) {
        snake.dy = -grid
        snake.dx = 0
      } else if (e.key === 'ArrowRight' && snake.dx === 0) {
        snake.dx = grid
        snake.dy = 0
      } else if (e.key === 'ArrowDown' && snake.dy === 0) {
        snake.dy = grid
        snake.dx = 0
      } else if (e.key === 'Escape') {
        exitGame()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    function loop() {
      animFrame = requestAnimationFrame(loop)

      if (++count < 6) return
      count = 0

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Move snake
      snake.x += snake.dx
      snake.y += snake.dy

      // Wrap snake positions horizontally and vertically
      if (snake.x < 0) snake.x = canvas.width - grid
      else if (snake.x >= canvas.width) snake.x = 0

      if (snake.y < 0) snake.y = canvas.height - grid
      else if (snake.y >= canvas.height) snake.y = 0

      snake.cells.unshift({ x: snake.x, y: snake.y })

      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop()
      }

      // Draw food
      ctx.fillStyle = 'var(--flag-saffron)'
      ctx.fillRect(food.x, food.y, grid - 1, grid - 1)

      // Draw snake
      ctx.fillStyle = 'var(--flag-green)'
      snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1)

        // Snake ate food
        if (cell.x === food.x && cell.y === food.y) {
          snake.maxCells++
          currentScore += 10
          setScore(currentScore)
          placeFood()
        }

        // Check collision with body cells
        for (let i = index + 1; i < snake.cells.length; i++) {
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            // Collision game over
            ctx.fillStyle = '#ff3366'
            ctx.font = '14px monospace'
            ctx.fillText('GAME OVER', 100, 90)
            ctx.font = '9px monospace'
            ctx.fillText("Press ESC to exit or type 'game'", 60, 115)
            cancelAnimationFrame(animFrame)
          }
        }
      })
    }

    animFrame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mode, isOpen])

  const exitGame = () => {
    setHighScore(prev => Math.max(prev, score))
    setMode('cli')
    setHistory(prev => [
      ...prev,
      { text: `GAME OVER. FINAL SCORE: ${score}.`, type: 'output' },
      { text: 'Exited to shell prompt.', type: 'system' }
    ])
  }

  const handleCommand = (cmdText) => {
    const raw = cmdText.trim()
    const parts = raw.toLowerCase().split(' ')
    const cmd = parts[0]

    const newHistory = [...history, { text: `udhaya@shell:~$ ${raw}`, type: 'input' }]

    if (cmd === 'help') {
      newHistory.push(
        { text: 'COMMAND DIRECTORY:', type: 'output' },
        { text: '  skills      - Print core skill matrix', type: 'output' },
        { text: '  projects    - Output featured application log', type: 'output' },
        { text: '  game        - Initialize retro Snake mini-game', type: 'output' },
        { text: '  matrix      - Stream falling digital rain', type: 'output' },
        { text: '  clear       - Clear screen history buffer', type: 'output' },
        { text: '  close       - Shutdown console window', type: 'output' }
      )
    } else if (cmd === 'skills') {
      newHistory.push(
        { text: 'CORE SKILLS:', type: 'output' },
        { text: '  ├── Core Tech: Python, C++, Java, SQL', type: 'output' },
        { text: '  ├── Web Stack: React.js, Node.js, Express, MongoDB', type: 'output' },
        { text: '  ├── Hardware:  ESP32, Arduino, IoT protocols (MQTT)', type: 'output' },
        { text: '  └── ML/Data:   Scikit-Learn, Isolation Forest', type: 'output' }
      )
    } else if (cmd === 'projects') {
      newHistory.push(
        { text: 'PROJECT DIRECTORY:', type: 'output' },
        { text: '  [1] IoT Smart Water Bottle (React + Node + Hardware)', type: 'output' },
        { text: '  [2] ML Machine Anomaly Detector (Python + Isolation Forest)', type: 'output' },
        { text: '  [3] Full Stack Student Portfolio (React + Node)', type: 'output' }
      )
    } else if (cmd === 'game') {
      setScore(0)
      setMode('game')
      return
    } else if (cmd === 'matrix') {
      setMode('matrix')
      return
    } else if (cmd === 'clear') {
      setHistory([])
      return
    } else if (cmd === 'close') {
      setIsOpen(false)
      return
    } else if (cmd !== '') {
      newHistory.push({ text: `Unknown command: '${cmd}'. Type 'help' for directory.`, type: 'error' })
    }

    setHistory(newHistory)
  }

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal)
      setInputVal('')
    }
  }

  return (
    <>
      {/* Floating Toggle Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(3,7,18,0.9)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid var(--flag-saffron)',
          color: '#fff',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '1rem',
          cursor: 'pointer',
          zIndex: 900,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(255, 153, 51, 0.25)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.borderColor = 'var(--flag-green)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(19, 136, 8, 0.35)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.borderColor = 'var(--flag-saffron)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 153, 51, 0.25)'
        }}
      >
        &gt;_
      </button>

      {/* Console Drawer */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '85px',
          right: '24px',
          width: '320px',
          height: '350px',
          background: 'rgba(3, 7, 18, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          zIndex: 900,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: "'Share Tech Mono', monospace"
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.6rem 0.8rem'
          }}>
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ fontSize: '0.52rem', color: '#888', marginLeft: '0.4rem', letterSpacing: '1px' }}>
                {mode === 'cli' ? 'SHELL_SESSION' : mode === 'game' ? 'RETRO_ARCADE' : 'DIGITAL_RAIN'}
              </span>
            </div>
            {mode !== 'cli' && (
              <button
                onClick={() => mode === 'game' ? exitGame() : setMode('cli')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--flag-saffron)',
                  fontSize: '0.55rem',
                  cursor: 'pointer',
                  letterSpacing: '1px'
                }}
              >
                [ EXIT ]
              </button>
            )}
          </div>

          {/* CLI Mode */}
          {mode === 'cli' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0.8rem', overflow: 'hidden' }}>
              <div style={{ flex: 1, overflowY: 'auto', marginBottom: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {history.map((line, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontSize: '0.65rem',
                      lineHeight: 1.4,
                      color:
                        line.type === 'input' ? '#fff' :
                        line.type === 'error' ? '#ff3366' :
                        line.type === 'system' ? 'rgba(255,255,255,0.45)' :
                        '#00ff66'
                    }}
                  >
                    {line.text}
                  </div>
                ))}
                <div ref={consoleEndRef} />
              </div>

              {/* Input row */}
              <div style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.5rem' }}>
                <span style={{ color: 'var(--flag-green)', fontSize: '0.68rem', marginRight: '0.4rem' }}>udhaya@shell:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={handleInputSubmit}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#fff',
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '0.68rem',
                    padding: 0
                  }}
                />
              </div>
            </div>
          )}

          {/* Game Mode */}
          {mode === 'game' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', padding: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '280px', color: '#fff', fontSize: '0.6rem', marginBottom: '0.3rem' }}>
                <span>SCORE: {score}</span>
                <span>HIGH SCORE: {highScore}</span>
              </div>
              <canvas ref={canvasRef} style={{ background: '#050505', border: '1px solid rgba(255,255,255,0.15)' }} />
              <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.5rem', marginTop: '0.5rem', letterSpacing: '1px' }}>
                USE ARROW KEYS TO CONTROL · ESC TO EXIT
              </div>
            </div>
          )}

          {/* Matrix Mode */}
          {mode === 'matrix' && (
            <div
              onClick={() => setMode('cli')}
              style={{ flex: 1, position: 'relative', background: '#000', cursor: 'pointer' }}
            >
              <canvas ref={canvasRef} style={{ display: 'block' }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.4)',
                opacity: 0,
                transition: 'opacity 0.2s',
                color: '#fff',
                fontSize: '0.62rem',
                letterSpacing: '2px'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0}
              >
                CLICK TO RETURN TO CONSOLE
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
