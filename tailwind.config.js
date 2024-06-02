/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '9/16': '9/16',
        '3/4': '3/4',
        '16/9': '16/9',
        '7/2': '7/2'
      }
    }
  },
  plugins: []
}
