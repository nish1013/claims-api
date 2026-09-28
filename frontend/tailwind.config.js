/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        page: token('page'),
        surface: token('surface'),
        raised: token('raised'),
        line: token('line'),
        ink: token('ink'),
        muted: token('muted'),
        accent: token('accent'),
        'accent-ink': token('accent-ink'),
        approved: token('approved'),
        rejected: token('rejected'),
        pending: token('pending'),
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
