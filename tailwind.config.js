/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['\'Outfit Variable\'', 'sans-serif'],
      },
      colors: {
        primary: '#504ACF',
        border: '#28282c',
        secondary: '#09090F',
      },
      aria: {
        current: 'current="true"',
      },
    },
  },
  plugins: [],
};
