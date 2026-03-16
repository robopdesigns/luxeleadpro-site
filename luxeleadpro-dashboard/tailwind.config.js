/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'luxe-dark': '#0f0f14',
        'luxe-darker': '#0a0a0f',
        'luxe-gold': '#d4af37',
        'luxe-gold-light': '#e5bf5c',
        'luxe-gold-dark': '#aa8c2c',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto'],
      },
    },
  },
  plugins: [],
};
