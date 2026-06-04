/** @type {import('tailwindcss').Config} */
export default {
  content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
    extend: {
      colors: {
        // Core backgrounds
        'bg-dark':   '#0d0d1a',
                  'bg-card':   '#13132a',
                  'bg-card2':  '#1a1a35',
                  // Accent palette
                  'accent':    '#e63946',
                  'accent2':   '#f4a261',
                  'purple':    '#7b2fff',
                  'teal':      '#2ec4b6',
                  'gold':      '#ffd700',
                  'yt-red':    '#ff0000',
                  // Text
                  'text-primary':   '#f0f0ff',
                  'text-secondary': '#a0a0c0',
                  // Border
                  'border-dim': '#2a2a50',
          },
                fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
                  rajdhani: ['Rajdhani', 'sans-serif'],
          },
                backgroundImage: {
        'gradient-anime':  'linear-gradient(135deg, #e63946, #7b2fff)',
                  'gradient-manga':  'linear-gradient(135deg, #f4a261, #e63946)',
                  'gradient-novels': 'linear-gradient(135deg, #2ec4b6, #7b2fff)',
                  'gradient-mixed':  'linear-gradient(135deg, #7b2fff, #2ec4b6)',
                  'gradient-hero':   'linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 50%, #0d0d1a 100%)',
          },
                animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
                  'slide-up': 'slideUp 0.3s ease-out',
          },
                keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
                      '100%': { opacity: '1' },
                },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
                      '100%': { opacity: '1', transform: 'translateY(0)' },
                },
        },
        },
                },
  plugins: [],
    }
    
