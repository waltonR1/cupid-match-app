/** @type {import('tailwindcss').Config} */
const semanticColors = require('./src/constants/color.json')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: semanticColors,
      backgroundImage: {
        'home-hero': `linear-gradient(135deg, ${semanticColors.page.inverse} 0%, ${semanticColors.page['inverse-blend']} 45%, ${semanticColors.page.inverse} 100%)`,
      },
      minWidth: {
        'btn-cta': '190px',
      },
      spacing: {
        'btn-cta-x': '1.5rem',
        'btn-cta-y': '1rem',
      },
      borderRadius: {
        button: '2px',
      },
      keyframes: {
        dropdownFade: {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -6px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, 0)',
          },
        },
      },
      animation: {
        dropdown: 'dropdownFade 0.18s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
}
