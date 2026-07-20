/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgba(var(--color-ink-rgb), <alpha-value>)',
        paper: 'rgba(var(--color-paper-rgb), <alpha-value>)',
        bone: '#EDE7DC',
        rust: '#B2502B',
        indigo: '#3E4C6D',
        berry: '#8A3F56',
        sage: '#79876B',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
