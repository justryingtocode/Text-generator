import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Image as ImageIcon, Upload, ExternalLink, Loader2, Sparkles, CheckCircle } from 'lucide-react'

const ImageSearch = ({ onImageSelect, currentImage }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSource, setSelectedSource] = useState('unsplash')
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState('')
  const [selectedImage, setSelectedImage] = useState(currentImage)
  const [showSelectionFeedback, setShowSelectionFeedback] = useState(false)

  // Sample images for demonstration and fallback
  const sampleImages = {
    morning: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop'
    ],
    night: [
      'https://images.unsplash.com/photo-1532978379173-523e16f371f9?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop'
    ],
    love: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop'
    ],
    spiritual: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
    ]
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    
    try {
      // Call Unsplash API directly
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=8&orientation=landscape`,
        {
          headers: {
            'Authorization': 'Client-ID MMWA6vb9LZv7m_gd24GKC9C5scWYUcVYRKVU3cgO008'
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        const images = data.results.map(photo => photo.urls.regular)
        setSearchResults(images)
      } else {
        console.error('Unsplash API error:', response.status)
        // Fallback to sample images
        setSearchResults(sampleImages.morning.slice(0, 4))
      }
    } catch (error) {
      console.error('Search failed:', error)
      // Fallback to sample images
      setSearchResults(sampleImages.morning.slice(0, 4))
    } finally {
      setIsLoading(false)
    }
  }

  const handleN8nWebhook = async () => {
    if (!n8nWebhookUrl.trim()) {
      alert('Please enter your n8n webhook URL')
      return
    }

    setIsLoading(true)
    
    try {
      // In production, this would call your n8n webhook
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery || 'spiritual nature',
          count: 4
        })
      })

      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.images || sampleImages.morning)
      } else {
        throw new Error('Webhook call failed')
      }
    } catch (error) {
      console.error('n8n webhook failed:', error)
      // Fallback to sample images
      setSearchResults(sampleImages.morning)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl)
    onImageSelect(imageUrl)
    
    // Show selection feedback
    setShowSelectionFeedback(true)
    setTimeout(() => setShowSelectionFeedback(false), 2000)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleImageSelect(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif font-semibold text-spiritual-800 flex items-center gap-2">
          <ImageIcon className="w-6 h-6" />
          Image Search & Upload
        </h2>
        
        {/* Selection feedback */}
        <AnimatePresence>
          {showSelectionFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Image Selected!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Source Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-spiritual-700 mb-2">Image Source</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'unsplash', label: 'Unsplash', icon: ExternalLink },
            { id: 'n8n', label: 'n8n Webhook', icon: Upload },
            { id: 'upload', label: 'Upload', icon: Upload }
          ].map((source) => (
            <button
              key={source.id}
              onClick={() => setSelectedSource(source.id)}
              className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${
                selectedSource === source.id
                  ? 'bg-spiritual-500 text-white'
                  : 'bg-white/50 hover:bg-white/70 text-spiritual-700'
              }`}
            >
              <source.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{source.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      {selectedSource !== 'upload' && (
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for images (e.g., sunrise, nature, spiritual)..."
              className="flex-1 p-3 rounded-lg border border-spiritual-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-spiritual-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={selectedSource === 'n8n' ? handleN8nWebhook : handleSearch}
              disabled={isLoading}
              className="px-4 py-3 bg-spiritual-500 text-white rounded-lg hover:bg-spiritual-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Search
            </button>
          </div>
        </div>
      )}

      {/* n8n Webhook URL Input */}
      {selectedSource === 'n8n' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-spiritual-700 mb-2">n8n Webhook URL</label>
          <input
            type="url"
            value={n8nWebhookUrl}
            onChange={(e) => setN8nWebhookUrl(e.target.value)}
            placeholder="https://your-n8n-instance.com/webhook/image-search"
            className="w-full p-3 rounded-lg border border-spiritual-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-spiritual-500"
          />
          <p className="text-xs text-spiritual-600 mt-1">
            Configure your n8n workflow to return images in JSON format: {"{images: [url1, url2, ...]}"}
          </p>
        </div>
      )}

      {/* File Upload */}
      {selectedSource === 'upload' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-spiritual-700 mb-2">Upload Image</label>
          <div className="border-2 border-dashed border-spiritual-300 rounded-lg p-6 text-center hover:border-spiritual-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-spiritual-500" />
              <p className="text-spiritual-700">Click to upload or drag and drop</p>
              <p className="text-xs text-spiritual-600">PNG, JPG, GIF up to 10MB</p>
            </label>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-spiritual-800 mb-3">Search Results</h3>
          <div className="grid grid-cols-2 gap-3">
            {searchResults.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
              >
                                 <img
                   src={image}
                   alt={`Search result ${index + 1}`}
                   className="w-full h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                   onClick={() => handleImageSelect(image)}
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                   <motion.button
                     onClick={() => handleImageSelect(image)}
                     className="opacity-0 group-hover:opacity-100 bg-white/90 text-spiritual-800 px-2 py-1 rounded text-xs font-medium transition-opacity"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     Select
                   </motion.button>
                 </div>
                 
                 {/* Selected indicator */}
                 {selectedImage === image && (
                   <motion.div
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1"
                   >
                     <CheckCircle className="w-3 h-3" />
                   </motion.div>
                 )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Selection */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-spiritual-800 mb-3">Quick Selection</h3>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(sampleImages).map(([category, images]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-spiritual-700 capitalize">{category}</h4>
              <div className="grid grid-cols-2 gap-1">
                {images.slice(0, 2).map((image, index) => (
                                     <motion.button
                     key={index}
                     onClick={() => handleImageSelect(image)}
                     className="relative group"
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                   >
                     <img
                       src={image}
                       alt={`${category} ${index + 1}`}
                       className="w-full h-12 object-cover rounded-lg hover:opacity-80 transition-opacity"
                     />
                     <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/40 transition-colors flex items-center justify-center">
                       <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium transition-opacity">
                         Select
                       </span>
                     </div>
                     
                     {/* Selected indicator */}
                     {selectedImage === image && (
                       <motion.div
                         initial={{ opacity: 0, scale: 0 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="absolute top-0 right-0 bg-green-500 text-white rounded-full p-0.5"
                       >
                         <CheckCircle className="w-2 h-2" />
                       </motion.div>
                     )}
                   </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageSearch
