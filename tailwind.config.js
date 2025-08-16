/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'cursive': ['Dancing Script', 'cursive'],
      },
      colors: {
        'spiritual': {
          50: '#fef7ee',
          100: '#fdedd6',
          200: '#fad7ac',
          300: '#f6bb77',
          400: '#f1943d',
          500: '#ed7516',
          600: '#de5a0c',
          700: '#b8430c',
          800: '#933512',
          900: '#762e12',
        }
      }
    },
  },
  plugins: [],
}
