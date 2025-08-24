/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary and secondary
        primary: '#ffffff', // white
        secondary: '#800080', // purple

        // Success and error
        success: '#22c55e', // green-500
        error: '#ef4444',   // red-500
      },
    },
    // Override default palette
    colors: {
      white: '#ffffff',
      purple: '#800080',
      green: '#22c55e',
      red: '#ef4444',
      blue: '#3b82f6',
      black: '#000000',
      transparent: 'transparent',
      current: 'currentColor',
    },
  },
  plugins: [],
};
