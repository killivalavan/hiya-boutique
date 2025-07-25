/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        blinkGreen: {
          '0%, 50%, 100%': { color: 'white' },
          '50%': { color: '#8ac63e' }, // your green
        },
      },
      animation: {
        'blink-green': 'blinkGreen 1s infinite',
      },
    },
  },
  plugins: [],
};
