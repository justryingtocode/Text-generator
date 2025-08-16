import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Eye, EyeOff, RotateCcw } from 'lucide-react'
import html2canvas from 'html2canvas'

const PreviewCard = ({ 
  currentImage, 
  customText, 
  messageType, 
  textStyle, 
  isGenerating, 
  setIsGenerating 
}) => {
  const previewRef = useRef(null)
  const [showOverlay, setShowOverlay] = useState(true)

  const getFontClass = (fontType) => {
    switch (fontType) {
      case 'cursive': return 'font-cursive'
      case 'serif': return 'font-serif'
      case 'sans': return 'font-sans'
      default: return 'font-cursive'
    }
  }

  const getAlignmentClass = (alignment) => {
    switch (alignment) {
      case 'left': return 'text-left'
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      default: return 'text-center'
    }
  }

  const exportAsImage = async () => {
    if (!previewRef.current) return

    setIsGenerating(true)
    
    try {
      // Hide overlay temporarily for export
      setShowOverlay(false)
      
      // Wait for state update and image loading
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 3, // Higher quality for better resolution
        useCORS: true,
        allowTaint: true,
        width: 1200, // Increased width
        height: 900, // Increased height
        imageTimeout: 15000, // Longer timeout for images
        logging: false, // Disable logging for better performance
        removeContainer: true, // Clean up after export
        foreignObjectRendering: true, // Better text rendering
        letterRendering: true, // Better letter rendering
        onclone: (clonedDoc) => {
          // Ensure the cloned element has proper styling
          const clonedElement = clonedDoc.querySelector('[data-html2canvas-clone]') || clonedDoc.body.firstChild
          if (clonedElement) {
            clonedElement.style.transform = 'none'
            clonedElement.style.width = '1200px'
            clonedElement.style.height = '900px'
          }
        }
      })

      // Create download link with high quality
      const link = document.createElement('a')
      link.download = `spiritual-message-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png', 1.0) // Maximum quality
      link.click()

      // Restore overlay
      setShowOverlay(true)
    } catch (error) {
      console.error('Export failed:', error)
      setShowOverlay(true)
    } finally {
      setIsGenerating(false)
    }
  }

  const getBackgroundGradient = () => {
    switch (messageType) {
      case 'morning':
        return 'from-yellow-400 via-orange-300 to-pink-300'
      case 'night':
        return 'from-blue-900 via-purple-900 to-indigo-900'
      case 'love':
        return 'from-pink-400 via-red-300 to-purple-400'
      case 'spiritual':
        return 'from-emerald-400 via-teal-300 to-cyan-400'
      default:
        return 'from-spiritual-400 via-spiritual-300 to-spiritual-500'
    }
  }

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif font-semibold text-spiritual-800 flex items-center gap-2">
          <Eye className="w-6 h-6" />
          Preview & Export
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className="p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
            title={showOverlay ? 'Hide overlay' : 'Show overlay'}
          >
            {showOverlay ? <EyeOff className="w-5 h-5 text-spiritual-700" /> : <Eye className="w-5 h-5 text-spiritual-700" />}
          </button>
          <button
            onClick={exportAsImage}
            disabled={isGenerating || !currentImage || !customText}
            className="flex items-center gap-2 px-4 py-2 bg-spiritual-500 text-white rounded-lg hover:bg-spiritual-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <RotateCcw className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isGenerating ? 'Generating...' : 'Export Image'}
          </button>
        </div>
      </div>

      {/* Preview Card */}
      <div className="relative">
        <div
          ref={previewRef}
          data-html2canvas-clone="true"
          className={`relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl ${
            currentImage ? 'bg-cover bg-center bg-no-repeat' : `bg-gradient-to-br ${getBackgroundGradient()}`
          }`}
          style={currentImage ? { 
            backgroundImage: `url(${currentImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          } : {}}
        >
          {/* Text Overlay */}
          {customText && (
            <div className={`absolute inset-0 flex items-center justify-center p-8 ${
              showOverlay ? 'bg-black/40' : ''
            }`}>
              <div className={`${getAlignmentClass(textStyle.alignment)} max-w-md`}>
                <p
                  className={`${getFontClass(textStyle.font)} ${textStyle.size} text-shadow leading-relaxed font-medium`}
                  style={{ 
                    color: textStyle.color,
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                  }}
                >
                  {customText}
                </p>
              </div>
            </div>
          )}

          {/* Decorative Elements */}
          {showOverlay && (
            <>
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/30 rounded-full"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white/30 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full"></div>
              
              {/* Center sparkle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                <div className="w-full h-full bg-white/40 rounded-full animate-pulse"></div>
              </div>
            </>
          )}
        </div>

        {/* Instructions */}
        {(!currentImage || !customText) && (
          <div className="mt-4 p-4 bg-white/50 rounded-lg">
            <p className="text-spiritual-700 text-center">
              {!currentImage && !customText 
                ? "Select an image and add text to see your message preview"
                : !currentImage 
                ? "Select an image to complete your message"
                : "Add text to complete your message"
              }
            </p>
          </div>
        )}

        {/* Export Options */}
        {currentImage && customText && (
          <div className="mt-4 p-4 bg-white/50 rounded-lg">
            <h3 className="text-lg font-medium text-spiritual-800 mb-2">Export Options</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={exportAsImage}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-spiritual-500 text-white rounded-lg hover:bg-spiritual-600 transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                PNG Image
              </button>
              <button
                onClick={() => {
                  // Copy to clipboard functionality
                  const textToCopy = `${customText}\n\nGenerated with Spiritual Message Generator`
                  navigator.clipboard.writeText(textToCopy)
                  alert('Text copied to clipboard!')
                }}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-white/70 text-spiritual-700 rounded-lg hover:bg-white/90 transition-colors"
              >
                <span className="text-sm">📋</span>
                Copy Text
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreviewCard
