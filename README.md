# Spiritual Message Generator ✨

A beautiful, interactive web application for creating inspiring spiritual messages with images and text. Generate personalized good morning, good night, love, and spiritual messages with stunning visuals and export them as high-quality images.

## 🌟 Features

### ✨ Interactive Message Generation
- **Dynamic Text Generation**: AI-enhanced inspirational messages with local fallbacks
- **Multiple Message Types**: Good Morning, Good Night, Love, and Spiritual messages
- **Real-time Preview**: See your message come to life instantly
- **Custom Text Input**: Add your own personal touch to any message

### 🎨 Beautiful Visual Design
- **Spiritual Theme**: Warm, calming color palette with divine energy
- **Glass Morphism**: Modern, translucent UI elements
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Engaging micro-interactions and transitions

### 🖼️ Image Integration
- **Multiple Sources**: Unsplash API, n8n webhooks, and local uploads
- **Smart Search**: Find the perfect image with intelligent search
- **Quick Selection**: Pre-curated sample images for instant use
- **Selection Feedback**: Visual indicators for chosen images

### 🎯 Enhanced User Experience
- **Selection Indicators**: Clear visual feedback for all interactions
- **Loading States**: Beautiful loading animations and progress indicators
- **Success Feedback**: Celebration animations for completed actions
- **Enhanced Interactions**: Hover effects, ripples, and micro-animations

### 🧘 Wellness & Mindfulness Features
- **Breathing Exercises**: Interactive breathing guide with visual feedback
- **Mood Tracking**: Express and track your emotional state
- **Daily Affirmations**: Inspirational quotes and positive messages
- **Wellness Tips**: Practical advice for spiritual and mental well-being

### 🚀 Serverless Architecture
- **No Server Required**: Works entirely in the browser
- **Enhanced Local Generation**: Rich text templates with variety
- **Optional Serverless API**: Vercel functions for advanced features
- **Deployment Ready**: Works on any static hosting platform

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Text-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎨 Customization

### Text Generation
The app uses enhanced local text generation with rich templates. Each message type includes:
- **Greetings**: Beautiful opening messages
- **Affirmations/Reflections**: Inspirational content
- **Blessings/Prayers**: Spiritual elements
- **Quotes**: Wisdom from various sources

### Styling Options
- **Fonts**: Dancing Script, Playfair Display, Inter
- **Colors**: White, Cream, Spiritual Orange, Black, Golden
- **Sizes**: Small, Medium, Large
- **Alignment**: Left, Center, Right

### Image Sources
- **Unsplash API**: High-quality stock photos
- **n8n Webhooks**: Custom image workflows
- **Local Upload**: Your own images
- **Sample Images**: Pre-curated spiritual images

## 🔧 Configuration

### Unsplash API (Optional)
For enhanced image search capabilities:

1. **Get an API key** from [Unsplash Developers](https://unsplash.com/developers)
2. **Add to environment** (optional - app works without it):
   ```bash
   VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

### n8n Integration (Optional)
For custom image workflows:

1. **Set up n8n** with the provided workflow example
2. **Configure webhook URL** in the Image Search component
3. **Customize** the workflow for your specific needs

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect your repository** to Vercel
2. **Deploy automatically** - no configuration needed
3. **Serverless functions** will be automatically deployed

### Netlify
1. **Connect your repository** to Netlify
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`

### GitHub Pages
1. **Push to main branch**
2. **Enable GitHub Pages** in repository settings
3. **Select source branch**: `main` or `gh-pages`

### Other Platforms
The app works on any static hosting platform:
- **Firebase Hosting**
- **AWS S3 + CloudFront**
- **Cloudflare Pages**
- **Any static file server**

## 📁 Project Structure

```
Text-generator/
├── src/
│   ├── components/
│   │   ├── TextCustomizer.jsx    # Text generation and styling
│   │   ├── ImageSearch.jsx       # Image search and selection
│   │   ├── PreviewCard.jsx       # Message preview and export
│   │   └── WellnessFeatures.jsx  # Wellness and mindfulness
│   ├── services/
│   │   └── textGenerationService.js  # Text generation logic
│   ├── App.jsx                   # Main application component
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles and animations
├── api/
│   └── generate-text.js          # Vercel serverless function
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md                    # This file
```

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and interactions
- **Lucide React**: Beautiful icon library
- **html2canvas**: Image export functionality
- **Unsplash API**: High-quality image search
- **n8n**: Workflow automation (optional)

## ⚡ Performance Optimizations

This application has been optimized for smooth performance and reduced lag:

### Cursor Optimizations
- **Throttled mouse tracking**: Mouse movements are throttled to 20ms intervals
- **Reduced trail effects**: Limited to 2 trail elements instead of 5
- **Smart text generation**: Reduced random text appearance from 10% to 1% chance
- **Memory cleanup**: Automatic cleanup of old trail elements
- **Mobile optimization**: Custom cursor disabled on mobile devices

### Animation Optimizations
- **Reduced floating elements**: From 4 to 2 floating spiritual elements
- **Slower animations**: Increased animation durations for better performance
- **CSS optimizations**: Added `will-change` properties for GPU acceleration
- **Motion preferences**: Respects user's `prefers-reduced-motion` setting
- **Mobile-friendly**: Heavy animations disabled on mobile devices

### General Performance
- **Throttled updates**: All frequent updates are properly throttled
- **Memory management**: Proper cleanup of intervals and timeouts
- **Lazy loading**: Images and heavy components load on demand
- **Performance monitoring**: Built-in FPS and memory monitoring (disabled by default)

### How to Enable Performance Monitoring
To enable performance monitoring for debugging, change this line in `src/App.jsx`:
```jsx
<PerformanceMonitor enabled={true} />
```

### Performance Tips
1. **For mobile users**: The app automatically disables heavy animations
2. **For users with motion sensitivity**: The app respects system motion preferences
3. **For low-end devices**: Animations are automatically reduced
4. **For debugging**: Enable the performance monitor to track FPS and memory usage

## 🎯 Key Features Explained

### Serverless Architecture
- **No Backend Required**: All functionality works in the browser
- **Enhanced Local Generation**: Rich text templates with variety
- **Optional API**: Vercel serverless functions for advanced features
- **Deployment Flexibility**: Works on any static hosting platform

### Spiritual Design
- **Warm Color Palette**: Spiritual orange and calming tones
- **Glass Morphism**: Modern, translucent UI elements
- **Floating Animations**: Subtle, peaceful movement
- **Spiritual Cursors**: Custom cursor designs
- **Particle Effects**: Background spiritual elements

### Interactive Elements
- **Ripple Effects**: Touch feedback on buttons
- **Hover Animations**: Smooth scale and color transitions
- **Loading States**: Beautiful spinners and progress indicators
- **Success Feedback**: Celebration animations
- **Selection Indicators**: Clear visual feedback

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for beautiful stock photos
- **Google Fonts** for typography
- **Lucide** for beautiful icons
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling

---

**Made with 💖 and divine inspiration | Spread love and light ✨**
