import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sun, Moon, Heart, Sparkles, Download, RefreshCw, Search, ImageIcon, Settings, Palette, Star, Zap
} from 'lucide-react'
import ImageSearch from './components/ImageSearch'
import TextCustomizer from './components/TextCustomizer'
import PreviewCard from './components/PreviewCard'
import WellnessFeatures from './components/WellnessFeatures'
import PerformanceMonitor from './components/PerformanceMonitor'
import PerformanceToggle from './components/PerformanceToggle'
import { prefersReducedMotion } from './utils/performance'

function App() {
  const [currentImage, setCurrentImage] = useState(null)
  const [customText, setCustomText] = useState('')
  const [messageType, setMessageType] = useState('morning')
  const [textStyle, setTextStyle] = useState({
    font: 'cursive',
    color: '#ffffff',
    size: 'text-2xl',
    alignment: 'center'
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    setReducedMotion(prefersReducedMotion())
  }, [])

  const handleImageSelect = (imageUrl) => {
    setCurrentImage(imageUrl)
  }

  const handleTextStyleChange = (newStyle) => {
    setTextStyle(prev => ({ ...prev, ...newStyle }))
  }

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'morning': return <Sun className="w-5 h-5" />
      case 'night': return <Moon className="w-5 h-5" />
      case 'love': return <Heart className="w-5 h-5" />
      case 'spiritual': return <Sparkles className="w-5 h-5" />
      default: return <Star className="w-5 h-5" />
    }
  }

  const messageTypes = [
    { id: 'morning', label: 'Good Morning', icon: <Sun className="w-4 h-4" /> },
    { id: 'night', label: 'Good Night', icon: <Moon className="w-4 h-4" /> },
    { id: 'love', label: 'Love', icon: <Heart className="w-4 h-4" /> },
    { id: 'spiritual', label: 'Spiritual', icon: <Sparkles className="w-4 h-4" /> }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <PerformanceToggle />
      <PerformanceMonitor enabled={false} /> {/* Enable for debugging */}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-8 relative z-10"
      >
        <motion.h1 
          className="text-5xl font-serif font-bold gradient-text mb-2"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          Spiritual Message Generator
        </motion.h1>
        <motion.p 
          className="text-xl text-spiritual-700 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Create beautiful, inspiring messages with divine energy ✨
        </motion.p>
      </motion.div>

      {/* Message Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="glass-effect rounded-2xl p-4 mb-6 relative z-10"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {messageTypes.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => setMessageType(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ripple ${
                messageType === type.id
                  ? 'bg-spiritual-500 text-white spiritual-glow'
                  : 'bg-white/50 text-spiritual-700 hover:bg-white/70 hover:scale-105'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={messageType === type.id ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                {type.icon}
              </motion.div>
              <span className="font-medium">{type.label}</span>
              {messageType === type.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl relative z-10">
        {/* Left Panel - Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-6 lg:col-span-2"
        >
          {/* Text Customizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TextCustomizer
              messageType={messageType}
              customText={customText}
              onTextChange={setCustomText}
              textStyle={textStyle}
              onStyleChange={handleTextStyleChange}
            />
          </motion.div>

          {/* Image Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <ImageSearch onImageSelect={handleImageSelect} currentImage={currentImage} />
          </motion.div>
        </motion.div>

        {/* Right Panel - Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
          >
            <PreviewCard
              currentImage={currentImage}
              customText={customText}
              messageType={messageType}
              textStyle={textStyle}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          </motion.div>
        </motion.div>

        {/* Wellness Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="lg:col-span-3"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.005 }}
          >
            <WellnessFeatures messageType={messageType} />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-12 text-center text-spiritual-600 relative z-10"
      >
        <p className="text-sm">
          Made with 💖 and divine inspiration | Spread love and light ✨
        </p>
      </motion.footer>
    </div>
  )
}

export default App
