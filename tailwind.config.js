/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Beast Mode Color Palette 🔥
        beast: {
          50: '#fef2f2',   // Light red
          100: '#fee2e2',  // Very light red
          200: '#fecaca',  // Light red
          300: '#fca5a5',  // Medium light red
          400: '#f87171',  // Medium red
          500: '#ef4444',  // Base red
          600: '#dc2626',  // Dark red - PRIMARY BEAST RED
          700: '#b91c1c',  // Darker red
          800: '#991b1b',  // Very dark red
          900: '#7f1d1d',  // Deepest red
          950: '#450a0a'   // Almost black red
        },
        neon: {
          red: '#ff0040',     // Electric red
          orange: '#ff4000',  // Electric orange  
          yellow: '#ffff00',  // Electric yellow
          green: '#00ff40',   // Electric green
          blue: '#0040ff',    // Electric blue
          purple: '#8000ff',  // Electric purple
          pink: '#ff00ff',    // Electric pink
          cyan: '#00ffff'     // Electric cyan
        },
        dark: {
          900: '#0a0a0a',     // Almost black
          800: '#1a1a1a',     // Very dark gray
          700: '#2a2a2a',     // Dark gray
          600: '#3a3a3a',     // Medium dark gray
          500: '#4a4a4a',     // Medium gray
          400: '#6a6a6a',     // Light dark gray
          300: '#8a8a8a',     // Light gray
          200: '#aaaaaa',     // Lighter gray
          100: '#cccccc'      // Very light gray
        },
        arnold: {
          gold: '#ffd700',    // Arnold's signature gold
          bronze: '#cd7f32',  // Competition bronze
          iron: '#36454f',    // Iron gray
          steel: '#71797e'    // Steel gray
        }
      },
      fontFamily: {
        'beast': ['Inter', 'Bebas Neue', 'Impact', 'Arial Black', 'sans-serif'],
        'arnold': ['Bebas Neue', 'Impact', 'Arial Black', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Courier New', 'monospace']
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem', 
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
        'beast': '10rem',    // Massive text
        'arnold': '12rem'    // Arnold-sized text
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem'
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate',
        'beast-bounce': 'beast-bounce 1s ease-in-out infinite',
        'arnold-flex': 'arnold-flex 3s ease-in-out infinite',
        'power-surge': 'power-surge 0.5s ease-out',
        'text-glow': 'text-glow 2s ease-in-out infinite alternate',
        'blood-pump': 'blood-pump 1.5s ease-in-out infinite',
        'muscle-flex': 'muscle-flex 2s ease-in-out infinite alternate'
      },
      keyframes: {
        'neon-pulse': {
          '0%': { 
            boxShadow: '0 0 5px #ff0040, 0 0 10px #ff0040, 0 0 15px #ff0040',
            transform: 'scale(1)'
          },
          '100%': { 
            boxShadow: '0 0 10px #ff0040, 0 0 20px #ff0040, 0 0 30px #ff0040, 0 0 40px #ff0040',
            transform: 'scale(1.05)'
          }
        },
        'beast-bounce': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.1)' }
        },
        'arnold-flex': {
          '0%, 100%': { transform: 'scaleX(1) scaleY(1)' },
          '50%': { transform: 'scaleX(1.1) scaleY(0.9)' }
        },
        'power-surge': {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'text-glow': {
          '0%': { textShadow: '0 0 5px #ff0040, 0 0 10px #ff0040' },
          '100%': { textShadow: '0 0 10px #ff0040, 0 0 20px #ff0040, 0 0 30px #ff0040' }
        },
        'blood-pump': {
          '0%, 100%': { 
            backgroundColor: 'rgb(220, 38, 38)',
            transform: 'scale(1)' 
          },
          '50%': { 
            backgroundColor: 'rgb(255, 0, 64)',
            transform: 'scale(1.02)' 
          }
        },
        'muscle-flex': {
          '0%': { 
            borderColor: '#dc2626',
            boxShadow: '0 0 0 rgba(220, 38, 38, 0.5)'
          },
          '100%': { 
            borderColor: '#ff0040',
            boxShadow: '0 0 20px rgba(255, 0, 64, 0.8)'
          }
        }
      },
      backgroundImage: {
        'beast-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)',
        'neon-gradient': 'linear-gradient(135deg, #ff0040 0%, #ff4000 25%, #ffff00 50%, #ff4000 75%, #ff0040 100%)',
        'arnold-gradient': 'linear-gradient(135deg, #ffd700 0%, #cd7f32 50%, #ffd700 100%)',
        'iron-gradient': 'linear-gradient(135deg, #36454f 0%, #71797e 50%, #36454f 100%)',
        'power-gradient': 'linear-gradient(45deg, #dc2626 0%, #ff0040 25%, #dc2626 50%, #ff0040 75%, #dc2626 100%)',
        'dark-beast': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)'
      },
      boxShadow: {
        'beast': '0 25px 50px -12px rgba(220, 38, 38, 0.8)',
        'neon': '0 0 20px rgba(255, 0, 64, 0.8), 0 0 40px rgba(255, 0, 64, 0.4)',
        'arnold': '0 25px 50px -12px rgba(255, 215, 0, 0.6)',
        'dark-beast': '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
        'inner-beast': 'inset 0 2px 4px 0 rgba(220, 38, 38, 0.3)'
      },
      backdropBlur: {
        'beast': '12px'
      }
    },
  },
  plugins: [],
}