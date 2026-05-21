// Adaptive Performance Manager
// Dynamically adjusts visual quality to maintain high framerates

let currentPerformanceMode = 'high' // 'high' or 'low'
const listeners = new Set()
let fpsHistory = []
let lastTime = performance.now()

function notifyListeners() {
  listeners.forEach(cb => cb(currentPerformanceMode))
}

const checkFps = (time) => {
  const delta = time - lastTime
  lastTime = time
  const fps = Math.round(1000 / delta)
  
  if (fps > 0 && fps < 120) {
    fpsHistory.push(fps)
    if (fpsHistory.length > 60) fpsHistory.shift()
  }

  // Every 60 frames (~1s), evaluate performance
  if (fpsHistory.length === 60) {
    const avgFps = fpsHistory.reduce((a, b) => a + b, 0) / 60
    const targetMode = avgFps < 42 ? 'low' : 'high'
    if (targetMode !== currentPerformanceMode) {
      currentPerformanceMode = targetMode
      notifyListeners()
    }
  }

  requestAnimationFrame(checkFps)
}

if (typeof window !== 'undefined') {
  requestAnimationFrame(checkFps)
}

export function subscribeToPerformance(callback) {
  listeners.add(callback)
  callback(currentPerformanceMode)
  return () => {
    listeners.delete(callback)
  }
}

export function getPerformanceMode() {
  return currentPerformanceMode
}
