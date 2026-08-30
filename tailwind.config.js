/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#0d1117',
          raised: '#161b22',
          overlay: '#1c2128',
          border: '#30363d',
          subtle: '#21262d',
        },
        brand: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bfe3fe',
          300: '#93d2fd',
          400: '#60b8fa',
          500: '#3b97f6',
          600: '#2578eb',
          700: '#1d62d8',
          800: '#1e50af',
          900: '#1e458a',
          950: '#172b54',
        },
        accent: {
          400: '#f59e0b',
          500: '#f59e0b',
          600: '#d97706',
        },
        success: {
          400: '#3fb950',
          500: '#3fb950',
          600: '#2ea043',
        },
        warning: {
          400: '#d29922',
          500: '#d29922',
        },
        danger: {
          400: '#f85149',
          500: '#f85149',
          600: '#da3633',
        },
      },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.3)',
        glow: '0 0 0 1px rgba(59,151,246,0.3), 0 8px 30px rgba(59,151,246,0.15)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'slide-up': 'slide-up 0.5s ease-out both',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};
