module.exports = {
  content: [
    "index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark_red: '#FF0000',
        brown_lt: '#ECDACD',
        brown: '#8A562F',
        olive: '#7c8362ff',
        brown_200: '#C8B7B7',
        brown_100: '#E3C7AB',
        pink: '#BA8484',
        pink_lt: '#F4CCCC',
        pink_100: '#FFE9E9',
        blue: '#CCE5F4',
        blue_lt: '#E8F3FB',
        green: '#DEE4C5',
        green_lt: '#A6AE87',
        green_100: '#F0F6DB'
      },
      fontFamily: {
        italiana: ['Italiana', 'sans-serif'],
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
        pop: 'pop 0.6s ease-in-out forwards',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
         pop: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.3)' },
          '60%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
         blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};