import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Palette, Type, AlignCenter, AlignLeft, AlignRight, Sparkles, Heart, Zap, Loader2, Star, Moon, Sun } from 'lucide-react'
import textGenerationService from '../services/textGenerationService'

const fontOptions = [
  { value: 'cursive', label: 'Dancing Script', icon: <Type className="w-4 h-4" /> },
  { value: 'serif', label: 'Playfair Display', icon: <Type className="w-4 h-4" /> },
  { value: 'sans', label: 'Inter', icon: <Type className="w-4 h-4" /> }
]

const sizeOptions = [
  { value: 'text-lg', label: 'Small', icon: <Type className="w-4 h-4" /> },
  { value: 'text-2xl', label: 'Medium', icon: <Type className="w-4 h-4" /> },
  { value: 'text-4xl', label: 'Large', icon: <Type className="w-4 h-4" /> }
]

const colorOptions = [
  { value: '#ffffff', label: 'White', color: '#ffffff' },
  { value: '#fef7ee', label: 'Cream', color: '#fef7ee' },
  { value: '#ed7516', label: 'Spiritual', color: '#ed7516' },
  { value: '#000000', label: 'Black', color: '#000000' },
  { value: '#f1943d', label: 'Golden', color: '#f1943d' }
]

const alignmentOptions = [
  { value: 'center', label: 'Center', icon: <AlignCenter className="w-4 h-4" /> },
  { value: 'left', label: 'Left', icon: <AlignLeft className="w-4 h-4" /> },
  { value: 'right', label: 'Right', icon: <AlignRight className="w-4 h-4" /> }
]

const TextCustomizer = ({ messageType, customText, onTextChange, textStyle, onStyleChange }) => {
  const [generatedText, setGeneratedText] = useState('')
  const [showStylePanel, setShowStylePanel] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationCount, setGenerationCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    generateRandomText()
  }, [messageType])

  const generateRandomText = async () => {
    setIsGenerating(true)
    setShowSuccess(false)

    try {
      const newText = await textGenerationService.generateText(messageType, {
        enhanced: true,
        count: generationCount
      })

      setGeneratedText(newText)
      onTextChange(newText)
      setGenerationCount(prev => prev + 1)

      // Show success animation
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)

    } catch (error) {
      console.error('Error generating text:', error)
      // Fallback to local generation
      const fallbackText = textGenerationService.getFallbackMessage(messageType)
      setGeneratedText(fallbackText)
      onTextChange(fallbackText)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleTextInput = (e) => {
    const text = e.target.value
    onTextChange(text)
  }

  const handleStyleChange = (property, value) => {
    onStyleChange({ [property]: value })
  }

  const getMessageTypeIcon = () => {
    switch (messageType) {
      case 'morning': return <Sun className="w-5 h-5 text-yellow-500" />
      case 'night': return <Moon className="w-5 h-5 text-blue-500" />
      case 'love': return <Heart className="w-5 h-5 text-red-500" />
      case 'spiritual': return <Sparkles className="w-5 h-5 text-purple-500" />
      default: return <Star className="w-5 h-5 text-yellow-400" />
    }
  }

  const getMessageTypeColor = () => {
    switch (messageType) {
      case 'morning': return 'from-yellow-400 to-orange-500'
      case 'night': return 'from-blue-400 to-purple-500'
      case 'love': return 'from-red-400 to-pink-500'
      case 'spiritual': return 'from-purple-400 to-indigo-500'
      default: return 'from-spiritual-400 to-spiritual-500'
    }
  }

  return (
    <motion.div 
      className="glass-effect rounded-2xl p-6 spiritual-glow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-serif font-semibold text-spiritual-800 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          Text Customizer
        </h2>

        {/* Message type indicator */}
        <motion.div 
          className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getMessageTypeColor()} text-white text-sm font-medium`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          {getMessageTypeIcon()}
          <span className="capitalize">{messageType}</span>
        </motion.div>
      </motion.div>

      {/* Text Generation */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <motion.button
            onClick={generateRandomText}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-spiritual-500 text-white rounded-lg hover:bg-spiritual-600 transition-colors disabled:opacity-50 ripple shimmer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {isGenerating ? 'Generating...' : 'Generate New Text'}
          </motion.button>

          {/* Success indicator */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">Generated!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <textarea
            value={customText}
            onChange={handleTextInput}
            placeholder="Enter your custom message or use generated text..."
            className="w-full h-32 p-3 rounded-lg border border-spiritual-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-spiritual-500 resize-none transition-all duration-300 hover:bg-white/80"
          />

          {/* Removed floating sparkles for better performance */}
        </motion.div>
      </div>

      {/* Style Panel Toggle */}
      <motion.button
        onClick={() => setShowStylePanel(!showStylePanel)}
        className="flex items-center gap-2 text-spiritual-700 hover:text-spiritual-800 transition-colors mb-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: showStylePanel ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Palette className="w-4 h-4" />
        </motion.div>
        <span className="font-medium">Customize Style</span>
      </motion.button>

      {/* Style Panel */}
      <AnimatePresence>
        {showStylePanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-4 border-t border-spiritual-200 overflow-hidden"
          >
            {/* Font Selection */}
            <div>
              <h4 className="text-sm font-medium text-spiritual-700 mb-2">Font Style</h4>
              <div className="flex gap-2">
                {fontOptions.map((font) => (
                  <motion.button
                    key={font.value}
                    onClick={() => handleStyleChange('font', font.value)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                      textStyle.font === font.value
                        ? 'bg-spiritual-500 text-white spiritual-glow'
                        : 'bg-white/50 text-spiritual-700 hover:bg-white/70'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {font.icon}
                    <span className="text-xs">{font.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h4 className="text-sm font-medium text-spiritual-700 mb-2">Text Size</h4>
              <div className="flex gap-2">
                {sizeOptions.map((size) => (
                  <motion.button
                    key={size.value}
                    onClick={() => handleStyleChange('size', size.value)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                      textStyle.size === size.value
                        ? 'bg-spiritual-500 text-white spiritual-glow'
                        : 'bg-white/50 text-spiritual-700 hover:bg-white/70'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size.icon}
                    <span className="text-xs">{size.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h4 className="text-sm font-medium text-spiritual-700 mb-2">Text Color</h4>
              <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <motion.button
                    key={color.value}
                    onClick={() => handleStyleChange('color', color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      textStyle.color === color.value
                        ? 'border-spiritual-500 scale-110 spiritual-glow'
                        : 'border-spiritual-200 hover:border-spiritual-300'
                    }`}
                    style={{ backgroundColor: color.color }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            {/* Alignment Selection */}
            <div>
              <h4 className="text-sm font-medium text-spiritual-700 mb-2">Text Alignment</h4>
              <div className="flex gap-2">
                {alignmentOptions.map((alignment) => (
                  <motion.button
                    key={alignment.value}
                    onClick={() => handleStyleChange('alignment', alignment.value)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                      textStyle.alignment === alignment.value
                        ? 'bg-spiritual-500 text-white spiritual-glow'
                        : 'bg-white/50 text-spiritual-700 hover:bg-white/70'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {alignment.icon}
                    <span className="text-xs">{alignment.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TextCustomizer
