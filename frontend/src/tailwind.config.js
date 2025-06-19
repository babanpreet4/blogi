// tailwind.config.js - THE CORRECT WAY
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <-- This scans EVERYTHING inside src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}