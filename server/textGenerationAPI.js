// Server-side Text Generation API
// This can be integrated with OpenAI, GPT, or other AI services

const express = require('express')
const cors = require('cors')
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Enhanced message templates for server-side generation
const serverTemplates = {
  morning: [
    {
      template: "As the {time} rises, may your spirit awaken to {emotion} and {opportunity}. Good morning, {endearment}! {emoji}",
      variables: {
        time: ['sun', 'dawn', 'morning light', 'new day', 'golden hour', 'first light', 'rosy dawn'],
        emotion: ['hope', 'joy', 'peace', 'clarity', 'gratitude', 'wonder', 'excitement', 'serenity'],
        opportunity: ['new possibilities', 'endless opportunities', 'beautiful moments', 'divine blessings', 'magical experiences', 'growth', 'transformation'],
        endearment: ['beautiful soul', 'dear one', 'precious spirit', 'beloved', 'wonderful being', 'amazing person', 'treasured friend'],
        emoji: ['🌅', '🌞', '✨', '🌟', '💫', '🌺', '🌸', '🌼', '🌻', '🌷']
      }
    },
    {
      template: "With each {time} comes a {quality} start. May your day be filled with {blessing1} and {blessing2}. Good morning! {emoji}",
      variables: {
        time: ['dawn', 'sunrise', 'morning', 'new day', 'fresh start', 'first light'],
        quality: ['fresh', 'beautiful', 'magical', 'sacred', 'inspiring', 'transformative', 'blessed'],
        blessing1: ['love', 'light', 'peace', 'joy', 'wisdom', 'creativity', 'abundance'],
        blessing2: ['divine blessings', 'endless possibilities', 'beautiful moments', 'spiritual growth', 'inner peace', 'miracles'],
        emoji: ['✨', '🌅', '🌟', '💫', '🌞', '🌺', '🌸', '🌼']
      }
    }
  ],
  night: [
    {
      template: "As the {time} twinkle above, may your dreams be filled with {emotion} and your heart with {feeling}. Good night, {endearment}! {emoji}",
      variables: {
        time: ['stars', 'moonlight', 'night sky', 'cosmos', 'twinkling lights', 'celestial bodies'],
        emotion: ['peace', 'tranquility', 'love', 'hope', 'wonder', 'serenity'],
        feeling: ['tranquility', 'peace', 'calm', 'serenity', 'contentment', 'warmth'],
        endearment: ['sweet soul', 'beautiful spirit', 'dear one', 'beloved', 'precious being', 'treasured heart'],
        emoji: ['🌙', '✨', '🌟', '💫', '🌌', '🌠', '⭐', '🌃']
      }
    }
  ],
  love: [
    {
      template: "Love is the most {quality} force in the universe. May your heart overflow with {emotion} and {virtue}. {emoji}",
      variables: {
        quality: ['powerful', 'beautiful', 'sacred', 'divine', 'transformative', 'healing'],
        emotion: ['love', 'compassion', 'kindness', 'warmth', 'tenderness', 'affection'],
        virtue: ['compassion', 'understanding', 'forgiveness', 'generosity', 'patience', 'empathy'],
        emoji: ['💖', '✨', '💫', '🌟', '💝', '💕', '💗', '💓', '💞']
      }
    }
  ],
  spiritual: [
    {
      template: "You are a {nature} being of light, connected to {connection}. Remember your true nature and {action}. {emoji}",
      variables: {
        nature: ['divine', 'sacred', 'spiritual', 'eternal', 'magnificent', 'radiant'],
        connection: ['all that is', 'the universe', 'divine source', 'infinite love', 'cosmic energy', 'higher consciousness'],
        action: ['shine your light', 'embrace your power', 'trust your journey', 'follow your path', 'express your truth', 'manifest your dreams'],
        emoji: ['✨', '🌟', '💫', '🙏', '🌸', '🕊️', '🌺', '🌼', '🌿']
      }
    }
  ]
}

// Generate text with enhanced variety
function generateEnhancedText(messageType, options = {}) {
  const templates = serverTemplates[messageType]
  if (!templates || templates.length === 0) {
    return getFallbackMessage(messageType)
  }

  // Select a random template
  const randomTemplateIndex = Math.floor(Math.random() * templates.length)
  const template = templates[randomTemplateIndex]
  
  // Generate the message by replacing placeholders
  let message = template.template
  
  // Replace each placeholder with a random value from its variables
  Object.keys(template.variables).forEach(placeholder => {
    const values = template.variables[placeholder]
    const randomValue = values[Math.floor(Math.random() * values.length)]
    message = message.replace(`{${placeholder}}`, randomValue)
  })

  // Add enhancements based on options
  if (options.enhanced) {
    message = addEnhancements(message, messageType)
  }
  
  return message
}

// Add creative enhancements to messages
function addEnhancements(message, messageType) {
  const enhancements = {
    morning: [
      " 🌅 Take a deep breath and feel the energy of this new day.",
      " 💫 You have the power to create something beautiful today.",
      " 🌸 Remember, every moment is a fresh opportunity to shine.",
      " 🌟 Trust in your journey and embrace the magic within you."
    ],
    night: [
      " 🌙 Let go of today's worries and embrace peaceful dreams.",
      " ✨ Tomorrow holds new possibilities and fresh beginnings.",
      " 🌟 Rest well, for you are loved beyond measure.",
      " 🌌 May your dreams be filled with healing and renewal."
    ],
    love: [
      " 💖 Your love has the power to heal and transform.",
      " ✨ Share your light with the world around you.",
      " 🌸 Love yourself as deeply as you love others.",
      " 💫 Every act of love creates ripples of positive change."
    ],
    spiritual: [
      " 🙏 Trust in the divine timing of your journey.",
      " ✨ You are exactly where you need to be right now.",
      " 🌟 Your presence in this world is a gift.",
      " 🌸 Embrace the sacredness of your unique path."
    ]
  }

  const typeEnhancements = enhancements[messageType] || []
  if (typeEnhancements.length > 0 && Math.random() > 0.3) {
    const randomEnhancement = typeEnhancements[Math.floor(Math.random() * typeEnhancements.length)]
    message += randomEnhancement
  }

  return message
}

// Fallback messages
function getFallbackMessage(messageType) {
  const fallbacks = {
    morning: [
      "As the sun rises, may your spirit awaken to new possibilities and endless opportunities. Good morning, beautiful soul! 🌅",
      "With each dawn comes a fresh start. May your day be filled with love, light, and divine blessings. Good morning! ✨",
      "The morning sun whispers secrets of hope and renewal. Embrace this new day with gratitude and joy. Good morning! 🌟"
    ],
    night: [
      "As the stars twinkle above, may your dreams be filled with peace and your heart with tranquility. Good night, sweet soul! 🌙",
      "Let the gentle night embrace you with its calming presence. Rest well and awaken refreshed. Good night! ✨",
      "May the moonlight guide you to peaceful dreams and restorative sleep. Good night, beautiful spirit! 🌟"
    ],
    love: [
      "Love is the most powerful force in the universe. May your heart overflow with love and compassion. 💖",
      "You are surrounded by infinite love. Open your heart and let it flow freely to all beings. Love and light! ✨",
      "Every breath you take is a gift of love from the universe. Share this love with everyone you meet. 💫"
    ],
    spiritual: [
      "You are a divine being of light, connected to all that is. Remember your true nature and shine your light. ✨",
      "The universe conspires in your favor. Trust the journey and embrace the magic of your existence. 🌟",
      "Your soul knows the way. Listen to its whispers and follow the path of your highest good. 💫"
    ]
  }

  const messages = fallbacks[messageType] || fallbacks.morning
  return messages[Math.floor(Math.random() * messages.length)]
}

// API Routes
app.post('/api/generate-text', async (req, res) => {
  try {
    const { messageType, options = {} } = req.body
    
    if (!messageType) {
      return res.status(400).json({ error: 'Message type is required' })
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Generate enhanced text
    const text = generateEnhancedText(messageType, options)
    
    res.json({
      success: true,
      text,
      messageType,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Text generation error:', error)
    res.status(500).json({
      error: 'Failed to generate text',
      message: error.message
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'text-generation-api',
    timestamp: new Date().toISOString()
  })
})

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Text Generation API running on port ${PORT}`)
})

module.exports = app

