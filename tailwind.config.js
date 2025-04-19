/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0e2d6d',
          light: '#1e4da1',
          dark: '#0a1f4a',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.light'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.900'),
              fontWeight: '700',
            },
            img: {
              borderRadius: theme('borderRadius.lg'),
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.4'),
            },
            code: {
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.4em',
              borderRadius: theme('borderRadius.sm'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}