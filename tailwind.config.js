const daisyConfig = require('./lynx-scanner/daisy-ui.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...daisyConfig,
  content: [
    './index.html',
    'lynx-scanner/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'lynx-scanner/src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')]
}
