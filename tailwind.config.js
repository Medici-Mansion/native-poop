const { theme } = require('./theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './components/**/*.stories.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      ...theme,
    },
  },
};
