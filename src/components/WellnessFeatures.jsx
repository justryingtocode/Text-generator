import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sun, Moon, Sparkles, Play, Pause, RotateCcw, Lightbulb, Smile } from 'lucide-react'

const WellnessFeatures = ({ messageType }) => {
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathCount, setBreathCount] = useState(0)
  const [currentMood, setCurrentMood] = useState('neutral')
  const [showAffirmation, setShowAffirmation] = useState(false)
  const [affirmation, setAffirmation] = useState('')

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', color: 'text-yellow-500' },
    { id: 'peaceful', emoji: '😌', label: 'Peaceful', color: 'text-blue-500' },
    { id: 'grateful', emoji: '🙏', label: 'Grateful', color: 'text-green-500' },
    { id: 'loved', emoji: '💖', label: 'Loved', color: 'text-pink-500' },
    { id: 'energized', emoji: '⚡', label: 'Energized', color: 'text-orange-500' }
  ]

  const affirmations = {
    morning: [
      "I am ready to embrace this beautiful new day with joy and gratitude.",
      "My potential is limitless, and I choose to shine my light today.",
      "I am worthy of love, success, and all the blessings that come my way.",
      "Every breath I take fills me with peace and positive energy.",
      "I trust in the journey of my life and embrace each moment with grace."
    ],
    night: [
      "I release all worries and embrace peaceful, restorative sleep.",
      "My mind and body are ready for deep, healing rest.",
      "I am safe, loved, and protected as I drift into peaceful dreams.",
      "Tomorrow holds new possibilities and fresh beginnings.",
      "I am grateful for this day and all the lessons it brought."
    ],
    love: [
      "I am surrounded by infinite love and compassion.",
      "My heart is open to giving and receiving love freely.",
      "I am worthy of deep, meaningful connections.",
      "Love flows through me and touches everyone I meet.",
      "I choose to see love in every moment and every person."
    ],
    spiritual: [
      "I am a divine being of light, connected to all that is.",
      "My soul knows the way, and I trust its guidance.",
      "I am exactly where I need to be on my spiritual journey.",
      "The universe conspires in my favor and supports my growth.",
      "I am a channel for divine love and wisdom."
    ]
  }

  const startBreathing = () => {
    setIsBreathing(true)
    setBreathCount(0)
  }

  const stopBreathing = () => {
    setIsBreathing(false)
  }

  const showRandomAffirmation = () => {
    const typeAffirmations = affirmations[messageType] || affirmations.morning
    const randomAffirmation = typeAffirmations[Math.floor(Math.random() * typeAffirmations.length)]
    setAffirmation(randomAffirmation)
    setShowAffirmation(true)
    setTimeout(() => setShowAffirmation(false), 5000)
  }

  useEffect(() => {
    let interval
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathCount(prev => prev + 1)
      }, 4000) // 4 seconds per breath cycle
    }
    return () => clearInterval(interval)
  }, [isBreathing])

  return (
    <div className="glass-effect rounded-2xl p-6">
      <h2 className="text-2xl font-serif font-semibold text-spiritual-800 mb-4 flex items-center gap-2">
        <Heart className="w-6 h-6" />
        Wellness & Mindfulness
      </h2>

      <div className="space-y-6">
        {/* Breathing Exercise */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-spiritual-700 mb-3">Breathing Exercise</h3>
          <div className="relative">
            <motion.div
              animate={isBreathing ? {
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{
                duration: 4,
                repeat: isBreathing ? Infinity : 0,
                ease: "easeInOut"
              }}
              className="w-24 h-24 mx-auto bg-spiritual-200 rounded-full flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-spiritual-700">
                {isBreathing ? (breathCount % 2 === 0 ? 'In' : 'Out') : '✨'}
              </span>
            </motion.div>
            
            <div className="mt-4 flex justify-center gap-2">
              {!isBreathing ? (
                <motion.button
                  onClick={startBreathing}
                  className="flex items-center gap-2 px-4 py-2 bg-spiritual-500 text-white rounded-lg hover:bg-spiritual-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-4 h-4" />
                  Start Breathing
                </motion.button>
              ) : (
                <motion.button
                  onClick={stopBreathing}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Pause className="w-4 h-4" />
                  Stop
                </motion.button>
              )}
            </div>
            
            {isBreathing && (
              <p className="text-sm text-spiritual-600 mt-2">
                Breath count: {breathCount}
              </p>
            )}
          </div>
        </div>

        {/* Mood Tracker */}
        <div>
          <h3 className="text-lg font-medium text-spiritual-700 mb-3">How are you feeling?</h3>
          <div className="grid grid-cols-5 gap-2">
            {moods.map((mood) => (
              <motion.button
                key={mood.id}
                onClick={() => setCurrentMood(mood.id)}
                className={`p-3 rounded-lg transition-all ${
                  currentMood === mood.id
                    ? 'bg-spiritual-500 text-white scale-110'
                    : 'bg-white/50 hover:bg-white/70 text-spiritual-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs font-medium">{mood.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Daily Affirmation */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-spiritual-700 mb-3">Daily Affirmation</h3>
          <motion.button
            onClick={showRandomAffirmation}
            className="flex items-center gap-2 px-4 py-2 bg-spiritual-500 text-white rounded-lg hover:bg-spiritual-600 transition-colors mx-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Lightbulb className="w-4 h-4" />
            Show Affirmation
          </motion.button>
          
          <AnimatePresence>
            {showAffirmation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 p-4 bg-gradient-to-r from-spiritual-100 to-spiritual-200 rounded-lg border border-spiritual-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-spiritual-600" />
                  <span className="text-sm font-medium text-spiritual-700">Today's Affirmation</span>
                </div>
                <p className="text-spiritual-800 font-medium italic">"{affirmation}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wellness Tips */}
        <div>
          <h3 className="text-lg font-medium text-spiritual-700 mb-3 flex items-center gap-2">
            <Smile className="w-5 h-5" />
            Wellness Tips
          </h3>
          <div className="space-y-2 text-sm text-spiritual-700">
            <div className="flex items-start gap-2">
              <span className="text-spiritual-500">•</span>
              <span>Take 3 deep breaths before starting your day</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-spiritual-500">•</span>
              <span>Practice gratitude by writing down 3 things you're thankful for</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-spiritual-500">•</span>
              <span>Spend 5 minutes in quiet reflection or meditation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-spiritual-500">•</span>
              <span>Share your positive energy with someone today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WellnessFeatures

