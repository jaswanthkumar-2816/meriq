/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Gold Palette replacing default blue
        meriq: {
          50: '#fcf9ee',
          100: '#f7f0d4',
          200: '#eee0a7',
          300: '#e3ca73',
          400: '#d9b244',
          500: '#cc9c28',
          600: '#d4af37', // Pure Luxury Metallic Gold
          700: '#a37618',
          800: '#835c19',
          900: '#6d4c1a',
          950: '#3f280a',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
          pure: '#d4af37',
          metallic: '#e5c058',
        },
        dark: {
          bg: '#000000',
          surface: '#050505',
          card: '#0A0A0C',
          cardHover: '#111115',
          border: '#1C1C22',
          borderSubtle: '#2A2A32',
          muted: '#8E8EA0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.95), 0 2px 6px -1px rgba(0, 0, 0, 0.85)',
        'card-hover': '0 12px 30px -4px rgba(212, 175, 55, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'card-hover-dark': '0 12px 30px -4px rgba(212, 175, 55, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.9)',
        'glow-gold': '0 0 25px -3px rgba(212, 175, 55, 0.45)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
