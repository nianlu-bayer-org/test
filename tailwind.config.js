/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#82AAB1',
          800: '#8BBCBE',
          700: '#94CCCA',
          600: '#9dd9d2',
          500: '#A6E2DC',
          400: '#B1E9E5',
          300: '#BDEFED',
          200: '#C9F5F3',
          100: '#D7F9F9',
          50: '#E5FCFC',
          DEFAULT: '#9dd9d2',
        },
        secondary: '#f4d06f',
        neutral: '#fff8f0',
        dark: '#392f5a',
      }
    },
  },
  plugins: [],
}

