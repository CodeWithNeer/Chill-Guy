/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Funnel Display"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};