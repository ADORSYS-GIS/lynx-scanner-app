const daisyConfig = require('./lynx-scanner/daisy-ui.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...daisyConfig,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')]
}
