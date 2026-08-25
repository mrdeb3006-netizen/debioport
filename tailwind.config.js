/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#07080f',
        'bg-surface': '#0d0f1a',
        'bg-card': 'rgba(13, 16, 28, 0.85)',
        'bg-glass': 'rgba(16, 20, 35, 0.65)',
        'accent-cyan': '#38bdf8',
        'accent-blue': '#2563eb',
        'accent-purple': '#818cf8',
        'accent-violet': '#6366f1',
        'accent-magenta': '#a855f7',
        'accent-orange': '#f59e0b',
        'text-primary': '#ffffff',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
      },
      fontFamily: {
        main: ['Outfit', 'sans-serif'],
        display: ['Syne', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'btn-primary': 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)',
        'nav-active': 'linear-gradient(90deg, #38bdf8, #6366f1)',
        'hero-name': 'linear-gradient(135deg, #ffffff 15%, #e2e8f0 45%, #93c5fd 80%, #a5b4fc 100%)',
      }
    },
  },
  plugins: [],
}
