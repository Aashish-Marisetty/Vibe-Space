/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        classic: ['Merriweather', 'Georgia', 'serif'],
        elegant: ['Lora', 'Playfair Display', 'serif'],
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        classic: {
          navy: '#1a2233',
          cream: '#f8f5f0',
          gold: '#bfa14a',
          green: '#2e473b',
        },
        light: {
          background: '#f8fafc',
          surface: '#ffffff',
          text: '#1e293b',
          muted: '#64748b',
        },
      },
    },
  },
  plugins: [],
};
