/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundColor: {

        'bg-color': '#141414',
        'bg-light' : 'rgb(25 28 34)',
        'bg-light2' : 'rgb(35 39 46)',
        'bg-light3' : 'rgb(29 30 31)'
      },

      textColor: {

        'text-color-blue': '#05294B',
  
      },
      borderColor: {
        'border-dark-color': "#e6e9ef",
        'border-purple-color': "#460073",

      },


      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
       
      },
      backgroundImage: {
        'card-bg-image': "url('/assets/bg-pricing.svg')",
      }
    },
  },
  
  plugins: [],
}