/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#09090b',
        'bg-surface': '#111114',
        'bg-card': 'rgba(18, 18, 22, 0.85)',
        'bg-glass': 'rgba(22, 22, 28, 0.65)',
        'accent-cyan': '#f97316',
        'accent-blue': '#ea580c',
        'accent-purple': '#fb923c',
        'accent-violet': '#f59e0b',
        'accent-magenta': '#ffedd5',
        'accent-orange': '#f97316',
        'text-primary': '#ffffff',
        'text-secondary': '#a1a1aa',
        'text-muted': '#71717a',
      },
      fontFamily: {
        main: ['Outfit', 'sans-serif'],
        display: ['Syne', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'btn-primary': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'nav-active': 'linear-gradient(90deg, #f97316, #fb923c)',
        'hero-name': 'linear-gradient(135deg, #ffffff 40%, #f4f4f5 70%, #d4d4d8 100%)',
      }
    },
  },
  plugins: [],
}
