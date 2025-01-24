/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate';
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ]
  ,
  theme: {
    extend: {
      colors: {
        primary: '#12b981',
        secondary: '#3270cd', // Agrega si tienes un secundario específico.
        background: '#101827',
        background2: '#17212f',
        neutralWhite: '#f8f8f9',
        gradientStart: '#30bb91',
        gradientEnd: '#3270cd'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [animate]
};
export default config;
