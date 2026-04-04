/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        'gold-light': '#E8D5A3',
        'gold-dark': '#8B6914',
        'gold-pale': '#F5EDD8',
        'gold-muted': '#9B7B3A',
        ivory: '#FDFAF2',
        'wedding-text': '#2C1810',
        'wedding-soft': '#5C4033',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        arabic: ['var(--font-amiri)', 'serif'],
        malayalam: ['var(--font-noto-ml)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
