import React, { useEffect, useState } from 'react'

const PerformanceMonitor = ({ enabled = false }) => {
  const [fps, setFps] = useState(0)
  const [memory, setMemory] = useState(null)

  useEffect(() => {
    if (!enabled) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    const measureMemory = () => {
      if ('memory' in performance) {
        const mem = performance.memory
        setMemory({
          used: Math.round(mem.usedJSHeapSize / 1048576), // MB
          total: Math.round(mem.totalJSHeapSize / 1048576), // MB
          limit: Math.round(mem.jsHeapSizeLimit / 1048576) // MB
        })
      }
    }

    measureFPS()
    const memoryInterval = setInterval(measureMemory, 2000)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      clearInterval(memoryInterval)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>FPS: {fps}</div>
      {memory && (
        <div>
          Memory: {memory.used}MB / {memory.total}MB
        </div>
      )}
    </div>
  )
}

export default PerformanceMonitor
