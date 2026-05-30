/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#E2E0FF',
          DEFAULT: '#524FA1', // Deep purple from Figma
          dark: '#3A3875',
          bg: '#FCE7F3', // Light pink background
        }
      }
    },
  },
  plugins: [],
}
