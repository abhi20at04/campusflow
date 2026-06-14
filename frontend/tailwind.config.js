/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Manrope', 'Inter', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        background: '#F7F5F2',
        surface: {
          primary: '#FFFFFF',
          secondary: '#F1EEE8',
          card: '#FCFBF8',
        },
        terracotta: {
          DEFAULT: '#C96C4B',
          dark: '#B55E3F',
        },
        sage: {
          DEFAULT: '#7A8F7B',
          light: '#E8EEEA',
        },
        gold: {
          DEFAULT: '#D4A373',
        },
        dusty: {
          red: '#B85042',
        },
        text: {
          primary: '#2D2A26',
          secondary: '#6E6A64',
          muted: '#9B968F',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '20px',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.05)',
        hover: '0 8px 20px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
