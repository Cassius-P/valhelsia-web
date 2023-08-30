

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
      }
    },
    extend: {
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
    require('tailwind-scrollbar')({ nocompatible: true }),
    function ({ addBase, theme }) {
      addBase({
        '.dark': {
          '--tw-bg-opacity': '1',
          '--tw-text-opacity': '1',
          '--tw-border-opacity': '1',
          '--tw-divide-opacity': '1',
          '--tw-placeholder-opacity': '1',
          '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
          '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
          '--tw-ring-color': 'rgba(59, 130, 246, var(--tw-ring-opacity))',
          '--tw-ring-offset-width': '0px',
          '--tw-ring-offset-color': '#fff',
          '--tw-ring-opacity': '0.5',
          '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
          '--tw-shadow': '0 0 #0000',
          '--tw-border-opacity': '1',
          '--tw-bg-opacity': '1',
          '--tw-text-opacity': '1',
          '--tw-divide-opacity': '1',
          '--tw-placeholder-opacity': '1',
          color: `rgba(${theme('colors.gray.100')}, var(--tw-text-opacity))`,
          '[class~="border-opacity"]': {
            borderColor: `rgba(${theme('colors.gray.100')}, var(--tw-border-opacity))`,
          },
          '[class~="bg-opacity"]': {
            backgroundColor: `rgba(${theme('colors.gray.100')}, var(--tw-bg-opacity))`,
          },
          '[class~="text-opacity"]': {
            color: `rgba(${theme('colors.gray.100')}, var(--tw-text-opacity))`,
          },
        },
      });
    },
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