/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': 'var(--bg-dark, #09090b)',
        'bg-surface': 'var(--bg-surface, #111114)',
        'bg-card': 'var(--bg-card, rgba(16, 16, 20, 0.85))',
        'bg-glass': 'var(--bg-glass, rgba(18, 18, 24, 0.7))',
        'accent-cyan': 'var(--accent-cyan, #f97316)',
        'accent-blue': 'var(--accent-blue, #ea580c)',
        'accent-purple': 'var(--accent-purple, #f97316)',
        'accent-violet': 'var(--accent-violet, #f97316)',
        'accent-magenta': 'var(--accent-magenta, #f97316)',
        'accent-orange': 'var(--accent-orange, #f97316)',
        'text-primary': 'var(--text-primary, #ffffff)',
        'text-secondary': 'var(--text-secondary, #a1a1aa)',
        'text-muted': 'var(--text-muted, #71717a)',
      },
      fontFamily: {
        main: ['Outfit', 'sans-serif'],
        display: ['Syne', 'Outfit', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        serifDisplay: ['"Playfair Display"', 'Cinzel', 'serif'],
        signature: ["'Alex Brush'", "'Great Vibes'", "'Dancing Script'", "'Caveat'", 'cursive'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'btn-primary': 'var(--grad-btn-primary, #f97316)',
        'nav-active': 'var(--grad-nav-active, #f97316)',
        'hero-name': 'linear-gradient(180deg, #ffffff 60%, #a1a1aa 100%)',
      }
    },
  },
  plugins: [],
}
