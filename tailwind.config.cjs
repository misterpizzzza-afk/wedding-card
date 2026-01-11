module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        slideDownUp: {
          '0%': { transform: 'translateY(-100%)', opacity: '1' },
          '10%': { transform: 'translateY(0)', opacity: '1' },
          '90%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '1' },
        },
      },
      animation: {
        slideDownUp: 'slideDownUp 2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
