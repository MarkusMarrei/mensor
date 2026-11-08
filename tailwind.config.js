/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mensor: {
          red: '#E11D48',
          'red-dark': '#BE123C',
          'red-light': '#FFF1F2',
          bg: '#FAFAFA',
          surface: '#FFFFFF',
          dark: '#121214',
          gray: '#27272A',
          border: '#E4E4E7',
          muted: '#71717A',
          sage: '#F0FDF4',
          amber: '#FFFBEB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'float': '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
        'nav': '0 -4px 20px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
