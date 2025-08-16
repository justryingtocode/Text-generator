// Text Generation Service - Enhanced local generation with serverless support
class TextGenerationService {
  constructor() {
    this.localTemplates = this.getLocalTemplates()
    this.cache = new Map()
    this.generationCount = 0
  }

  getLocalTemplates() {
    return {
      morning: {
        greetings: [
          "Good morning, beautiful soul! 🌅",
          "Rise and shine, dear one! ✨",
          "Blessed morning to you! 🌸",
          "Welcome to a new day of possibilities! 🌟",
          "Good morning, may your day be filled with light! ☀️"
        ],
        affirmations: [
          "Today is a gift, embrace it with gratitude.",
          "You are capable of amazing things.",
          "Your presence makes the world brighter.",
          "Every breath is a new beginning.",
          "You are stronger than you know."
        ],
        blessings: [
          "May your day be filled with joy and peace.",
          "May you find beauty in every moment.",
          "May your heart be light and your spirit free.",
          "May you spread love wherever you go.",
          "May today bring you closer to your dreams."
        ],
        quotes: [
          "The sun is new each day. - Heraclitus",
          "Every morning is a chance to be reborn. - Unknown",
          "Morning is the best time to be grateful. - Unknown",
          "Wake up with determination, go to bed with satisfaction. - Unknown"
        ]
      },
      night: {
        greetings: [
          "Good night, sweet dreams! 🌙",
          "Rest well, beautiful soul! ✨",
          "Peaceful night to you! 🌟",
          "May your sleep be deep and healing! 💫",
          "Good night, may angels watch over you! 👼"
        ],
        reflections: [
          "Reflect on the blessings of today.",
          "Let go of what no longer serves you.",
          "Tomorrow is a new opportunity.",
          "You've done your best today.",
          "Rest is essential for growth."
        ],
        prayers: [
          "May your dreams be peaceful and healing.",
          "May you wake up refreshed and renewed.",
          "May your heart find rest and comfort.",
          "May tomorrow bring new possibilities.",
          "May you sleep in divine protection."
        ],
        quotes: [
          "Sleep is the best meditation. - Dalai Lama",
          "The night is the hardest time to be alive. - Unknown",
          "Sleep is the golden chain that ties health and our bodies together. - Thomas Dekker"
        ]
      },
      love: {
        greetings: [
          "With love in my heart for you! 💖",
          "Sending you love and light! ✨",
          "You are loved beyond measure! 💕",
          "My heart beats for you! 💓",
          "Love surrounds you always! 💝"
        ],
        expressions: [
          "Your love makes my world complete.",
          "Every moment with you is a blessing.",
          "You are my heart's greatest treasure.",
          "Love is the answer to everything.",
          "You make my soul sing with joy."
        ],
        promises: [
          "I promise to love you more each day.",
          "My love for you grows stronger with time.",
          "You are my forever and always.",
          "Together we are unstoppable.",
          "Our love story is just beginning."
        ],
        quotes: [
          "Love is patient, love is kind. - 1 Corinthians 13:4",
          "The best thing to hold onto in life is each other. - Audrey Hepburn",
          "Love is composed of a single soul inhabiting two bodies. - Aristotle"
        ]
      },
      spiritual: {
        greetings: [
          "Blessings of light upon you! ✨",
          "May divine love surround you! 🙏",
          "Peace be with you, dear soul! 🌟",
          "You are a child of the universe! 💫",
          "Divine light flows through you! 🌸"
        ],
        wisdom: [
          "You are a spiritual being having a human experience.",
          "Your soul knows the way home.",
          "Trust the journey of your spirit.",
          "You are connected to all that is.",
          "Your light shines brighter than you know."
        ],
        meditations: [
          "Breathe in peace, exhale love.",
          "You are one with the divine source.",
          "Your spirit is eternal and free.",
          "Trust in the wisdom of your heart.",
          "You are guided by divine light."
        ],
        quotes: [
          "The soul always knows what to do to heal itself. - Caroline Myss",
          "We are not human beings having a spiritual experience. We are spiritual beings having a human experience. - Pierre Teilhard de Chardin",
          "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it. - Rumi"
        ]
      }
    }
  }

  async generateText(messageType, options = {}) {
    const cacheKey = `${messageType}-${JSON.stringify(options)}-${this.generationCount}`

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      // Try serverless function first (for platforms that support it)
      const serverlessText = await this.generateFromServerless(messageType, options)
      if (serverlessText) {
        this.cache.set(cacheKey, serverlessText)
        this.generationCount++
        return serverlessText
      }
    } catch (error) {
      console.log('Serverless generation failed, using enhanced local generation:', error.message)
    }

    const localText = this.generateFromLocal(messageType, options)
    this.cache.set(cacheKey, localText)
    this.generationCount++
    return localText
  }

  async generateFromServerless(messageType, options) {
    try {
      // Try Vercel serverless function if available
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageType,
          options
        })
      })

      if (response.ok) {
        const data = await response.json()
        return data.text
      } else {
        throw new Error('Serverless API call failed')
      }
    } catch (error) {
      console.log('Serverless API not available, using local generation:', error.message)
      return null
    }
  }

  generateFromLocal(messageType, options = {}) {
    const templates = this.localTemplates[messageType]
    if (!templates) {
      return this.getFallbackMessage(messageType)
    }

    const { enhanced = true, count = this.generationCount } = options
    
    let message = ''
    
    // Generate base message
    const greeting = this.getRandomElement(templates.greetings || [])
    const mainContent = this.getRandomElement(templates.affirmations || templates.reflections || templates.expressions || templates.wisdom || [])
    
    message = `${greeting}\n\n${mainContent}`

    // Add variety based on message type
    if (messageType === 'morning') {
      const blessing = this.getRandomElement(templates.blessings || [])
      message += `\n\n${blessing}`
    } else if (messageType === 'night') {
      const prayer = this.getRandomElement(templates.prayers || [])
      message += `\n\n${prayer}`
    } else if (messageType === 'love') {
      const promise = this.getRandomElement(templates.promises || [])
      message += `\n\n${promise}`
    } else if (messageType === 'spiritual') {
      const meditation = this.getRandomElement(templates.meditations || [])
      message += `\n\n${meditation}`
    }

    // Add quote occasionally
    if (count % 3 === 0 && templates.quotes) {
      const quote = this.getRandomElement(templates.quotes)
      message += `\n\n"${quote}"`
    }

    // Add enhancements
    if (enhanced) {
      message = this.addEnhancements(message, messageType)
    }

    return message
  }

  addEnhancements(message, messageType) {
    const enhancements = {
      morning: [
        "Embrace the new day with courage and hope.",
        "Let your light shine brightly today.",
        "You are capable of creating miracles.",
        "Today holds infinite possibilities for you."
      ],
      night: [
        "Release all worries and embrace peace.",
        "Tomorrow is a blank canvas waiting for your masterpiece.",
        "Rest is sacred and you deserve it.",
        "Your dreams are messages from your soul."
      ],
      love: [
        "Love is the most powerful force in the universe.",
        "Your love makes the world a better place.",
        "Together we are stronger than apart.",
        "Love grows when shared freely."
      ],
      spiritual: [
        "You are a divine spark of the infinite.",
        "Your soul journey is perfectly unfolding.",
        "Trust in the divine timing of your life.",
        "You are surrounded by loving guidance."
      ]
    }

    const typeEnhancements = enhancements[messageType] || []
    if (typeEnhancements.length > 0 && Math.random() > 0.5) {
      const enhancement = this.getRandomElement(typeEnhancements)
      message += `\n\n${enhancement}`
    }

    return message
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  getFallbackMessage(messageType) {
    const fallbacks = {
      morning: "Good morning! May your day be filled with joy, peace, and beautiful moments. You are capable of amazing things, and today is your day to shine! ✨",
      night: "Good night! Rest well knowing you've done your best today. Tomorrow brings new opportunities and fresh beginnings. Sweet dreams! 🌙",
      love: "With all my love! You are precious, valued, and deeply loved. May your heart always know how special you are. 💖",
      spiritual: "Blessings of light and love be upon you! You are a divine being of infinite worth. Trust your journey and know you are guided. 🙏"
    }
    return fallbacks[messageType] || fallbacks.morning
  }

  clearCache() {
    this.cache.clear()
    this.generationCount = 0
  }
}

export default new TextGenerationService()
