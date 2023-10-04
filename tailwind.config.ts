import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        accent: '#ff5500',
        white: '#ffffff',
        lightGrey: '#f4f4f4',
        darkGrey: '#373737',
        superlight: '#fcfcfc',
        dark: '#141414',
        gold: '#a08338',
        secondGold: '#f3c85a'
      },
      screens: {
        md: {
          max: '768px'
        },
        sm: {
          max: '576px'
        }
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3'
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
export default config
