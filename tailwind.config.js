/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        milky: {
          50: '#FFFEFC',
          100: '#FDFBF7',
          200: '#FAF6EF',
          300: '#F6EFE3',
          400: '#EFE3CE',
        },
        bone: '#F9F6F0',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', '"Manrope"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Manrope"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
