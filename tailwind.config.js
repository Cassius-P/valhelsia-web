

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'linear': 'linear',
      },
      transitionDuration: {
        '50': '50ms',
      },
      colors: {
        'gray': {
          100: '#8D8D8D',
          200: '#7C7C7C',
          300: '#6B6B6B',
          400: '#5A5A5A',
          500: '#494949',
          600: '#383838',
          700: '#272727',
          800: '#161616',
          900: '#050505',
        },
        'light-gray': {
          100: '#FFFFFF',
          200: '#F7F7F7',
          300: '#EFEFEF',
          400: '#E7E7E7',
          500: '#DFDFDF',
          600: '#D7D7D7',
          700: '#CFCFCF',
          800: '#C7C7C7',
          900: '#BFBFBF',
        },
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
  variants: {
    extend: {
      backgroundColor: ['dark'],
      borderColor: ['dark'],
      textColor: ['dark'],
    },
  },
  darkMode: 'class'
}