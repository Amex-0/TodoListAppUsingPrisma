/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
        card: 'var(--card-bg)',
        surface: 'var(--surface)'
      },
      borderRadius: {
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)'
      },
      boxShadow: {
        md: 'var(--elevation-1)'
      }
    }
  },
  plugins: [],
}
