import React, { useState, useEffect } from 'react'
import { Settings } from 'lucide-react'

const PerformanceToggle = () => {
  const [highPerformance, setHighPerformance] = useState(false)

  useEffect(() => {
    // Check if user has previously set performance preference
    const saved = localStorage.getItem('highPerformance')
    if (saved) {
      setHighPerformance(JSON.parse(saved))
    }
  }, [])

  const togglePerformance = () => {
    const newValue = !highPerformance
    setHighPerformance(newValue)
    localStorage.setItem('highPerformance', JSON.stringify(newValue))
    
    // Apply performance mode
    if (newValue) {
      document.body.classList.add('high-performance')
    } else {
      document.body.classList.remove('high-performance')
    }
  }

  useEffect(() => {
    // Apply initial performance mode
    if (highPerformance) {
      document.body.classList.add('high-performance')
    }
  }, [highPerformance])

  return (
    <button
      onClick={togglePerformance}
      className={`fixed top-4 left-4 p-2 rounded-full transition-all duration-200 z-50 ${
        highPerformance 
          ? 'bg-green-500 text-white shadow-lg' 
          : 'bg-white/20 text-spiritual-700 backdrop-blur-sm hover:bg-white/30'
      }`}
      title={highPerformance ? 'High Performance Mode: ON' : 'High Performance Mode: OFF'}
    >
      <Settings className={`w-5 h-5 ${highPerformance ? 'animate-spin' : ''}`} />
    </button>
  )
}

export default PerformanceToggle
