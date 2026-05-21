// Procedural Synthesized Sounds (Web Audio API)
// 0-byte asset strategy for futuristic UI feedback

let audioCtx = null
let ambientHumSource = null
let ambientHumGain = null
let lfoNode = null
let isMuted = true // Browser autoplay policy: start muted

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function isAudioMuted() {
  return isMuted
}

export function toggleAudioMute() {
  isMuted = !isMuted
  if (isMuted) {
    stopAmbientHum()
    if (audioCtx) {
      audioCtx.suspend()
    }
  } else {
    getAudioContext()
    startAmbientHum()
    playConfirmation()
  }
  return isMuted
}

// Subtle high-pitch tick for hover indicators
export function playTick() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.03)

    gain.gain.setValueAtTime(0.008, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.03)
  } catch (e) {
    // Fail silently
  }
}

// Futuristic terminal switch click
export function playClick() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(180, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.06)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.06)
  } catch (e) {
    // Fail silently
  }
}

// Digital completion chime
export function playSuccess() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const notes = [523.25, 659.25, 783.99, 1046.50] // C E G C chord
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05)

      gain.gain.setValueAtTime(0.015, ctx.currentTime + idx * 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime + idx * 0.05)
      osc.stop(ctx.currentTime + idx * 0.05 + 0.2)
    })
  } catch (e) {
    // Fail silently
  }
}

// Ascending booting hum
export function playBoot() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(110, ctx.currentTime)
    osc1.frequency.linearRampToValueAtTime(440, ctx.currentTime + 1.0)

    osc2.type = 'sawtooth'
    osc2.frequency.setValueAtTime(55, ctx.currentTime)
    osc2.frequency.linearRampToValueAtTime(220, ctx.currentTime + 1.0)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(160, ctx.currentTime)

    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.6)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0)

    osc1.connect(gain)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc1.start()
    osc2.start()
    osc1.stop(ctx.currentTime + 1.0)
    osc2.stop(ctx.currentTime + 1.0)
  } catch (e) {
    // Fail silently
  }
}

// Digital confirmation chirps (double beep)
export function playConfirmation() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, now)
    osc.frequency.setValueAtTime(1320, now + 0.06)

    gain.gain.setValueAtTime(0.02, now)
    gain.gain.setValueAtTime(0.02, now + 0.06)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.12)
  } catch (e) {
    // Fail silently
  }
}

// Data encryption transmission sound (scattered laser pulses)
export function playTransmission() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const now = ctx.currentTime
    const pulses = 5
    for (let i = 0; i < pulses; i++) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const delay = i * 0.08

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(600 + Math.random() * 800, now + delay)
      osc.frequency.exponentialRampToValueAtTime(100, now + delay + 0.08)

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1200, now + delay)

      gain.gain.setValueAtTime(0.008, now + delay)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.08)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + delay)
      osc.stop(now + delay + 0.08)
    }
  } catch (e) {
    // Fail silently
  }
}

// Ambient operating system humming
export function startAmbientHum() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return
    if (ambientHumSource) return // Hum already running

    ambientHumSource = ctx.createOscillator()
    ambientHumGain = ctx.createGain()
    lfoNode = ctx.createOscillator()

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(90, ctx.currentTime)

    ambientHumSource.type = 'sawtooth'
    ambientHumSource.frequency.setValueAtTime(55, ctx.currentTime) // Low A node

    // Create an LFO to modulate volume slightly (creating breathing effect)
    lfoNode.frequency.setValueAtTime(0.2, ctx.currentTime) // 0.2Hz
    const lfoGain = ctx.createGain()
    lfoGain.gain.setValueAtTime(0.004, ctx.currentTime)

    lfoNode.connect(lfoGain)
    lfoGain.connect(ambientHumGain.gain)

    // Base volume
    ambientHumGain.gain.setValueAtTime(0.008, ctx.currentTime)

    ambientHumSource.connect(filter)
    filter.connect(ambientHumGain)
    ambientHumGain.connect(ctx.destination)

    ambientHumSource.start()
    lfoNode.start()
  } catch (e) {
    // Fail silently
  }
}

export function stopAmbientHum() {
  try {
    if (ambientHumSource) {
      ambientHumSource.stop()
      ambientHumSource.disconnect()
      ambientHumSource = null
    }
    if (lfoNode) {
      lfoNode.stop()
      lfoNode.disconnect()
      lfoNode = null
    }
    if (ambientHumGain) {
      ambientHumGain.disconnect()
      ambientHumGain = null
    }
  } catch (e) {
    // Fail silently
  }
}
