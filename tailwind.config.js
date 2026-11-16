/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12263A',
        mist: '#EDF1F5',
        teal: { DEFAULT: '#0E7C7B', dark: '#0A5E5D', light: '#D5EFEE' },
        signal: '#FFC93C',
        ember: '#E4572E',
      },
      fontFamily: {
        sans: ['"Noto Sans Georgian"', 'system-ui', 'sans-serif'],
        display: ['"Noto Serif Georgian"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
