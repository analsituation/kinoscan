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
        dark: '#141414'
      }
    }
  },
  plugins: []
}
export default config
