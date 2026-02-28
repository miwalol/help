/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './mdx-components.tsx',
    './app/**/*.tsx',
    './components/**/*.tsx',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
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
