const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'sm': '500px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      colors: {
        'black-primary': '#292524',
        'red-primary': '#dc2626',
        'blue-primary': '#0074D9',
        'blue-secondary': '#87CEEB'
      }
    },
  },
  plugins: [nextui()],
}