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
        'sm': '0px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      colors: {
        'black-primary': '#292524',
        'gray-primary': '#a8a29e',
        'light-gray-primary': '#e7e5e4',
        'dark-gray-primary': '#57534e',
        'red-primary': '#dc2626',
        'blue-primary': '#0074D9',
        'blue-secondary': '#87CEEB'
      }
    },
  },
  plugins: [nextui()],
}