/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cs: {
          blue: '#1E3A5F',
          amber: '#D97706',
          'amber-light': '#FEF3C7',
          slate: '#1E293B',
          'slate-light': '#334155',
          cream: '#FAFAF7',
          'cream-dark': '#F0EFE9',
          green: '#059669',
          red: '#DC2626',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Source Serif 4"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        prose: '72ch',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
          },
        },
      },
    },
  },
  plugins: [],
}

