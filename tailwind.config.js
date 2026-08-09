/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',       // Dark background
        parchment: '#e8e4dd',     // Light textured background
        accent: '#c49a45',        // Vintage gold/mustard
        darkAccent: '#0a0a0a'
      },
      fontFamily: {
        display: ['"Carnevalee Freakshow"', 'serif'],
        'display-sc': ['"Playfair Display SC"', 'serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        body: ['"PT Serif"', 'serif']
      }
    },
  },
  plugins: [],
}
