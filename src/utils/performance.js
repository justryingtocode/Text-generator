// Performance optimization utilities

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Debounce function to delay execution until after a pause
 * @param {Function} func - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * Check if the device prefers reduced motion
 * @returns {boolean} - True if reduced motion is preferred
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Optimize animations based on device capabilities
 * @param {string} animationClass - CSS class name for animation
 * @param {boolean} forceDisable - Force disable animations
 */
export const optimizeAnimations = (animationClass, forceDisable = false) => {
  if (forceDisable || prefersReducedMotion()) {
    const elements = document.querySelectorAll(`.${animationClass}`)
    elements.forEach(el => {
      el.style.animation = 'none'
      el.style.transition = 'none'
    })
  }
}

/**
 * Lazy load images for better performance
 * @param {string} selector - CSS selector for images
 */
export const lazyLoadImages = (selector = 'img[data-src]') => {
  const images = document.querySelectorAll(selector)
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove('lazy')
        observer.unobserve(img)
      }
    })
  })

  images.forEach(img => imageObserver.observe(img))
}

/**
 * Optimize scroll performance
 * @param {Function} callback - Function to call on scroll
 * @param {number} throttleMs - Throttle time in milliseconds
 * @returns {Function} - Cleanup function
 */
export const optimizeScroll = (callback, throttleMs = 16) => {
  const throttledCallback = throttle(callback, throttleMs)
  window.addEventListener('scroll', throttledCallback, { passive: true })
  
  return () => {
    window.removeEventListener('scroll', throttledCallback)
  }
}

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} - True if element is in viewport
 */
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Optimize animations for better performance
 * @param {Element} element - DOM element to optimize
 */
export const optimizeElement = (element) => {
  if (element) {
    element.style.willChange = 'transform, opacity'
    
    // Clean up will-change after animation
    const cleanup = () => {
      element.style.willChange = 'auto'
      element.removeEventListener('animationend', cleanup)
      element.removeEventListener('transitionend', cleanup)
    }
    
    element.addEventListener('animationend', cleanup)
    element.addEventListener('transitionend', cleanup)
  }
}
