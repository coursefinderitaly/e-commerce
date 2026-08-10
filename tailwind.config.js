/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', '"Manrope"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Manrope"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
