/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 
  theme: {
    
    
    extend: {
      backgroundImage: {
        'header': "url('../MiniProjet/public/bgimage.jpg')"
        
      },
      colors: {
        'blue': '#004e98',
        'blueActive': '#044389',
        'orange': '#ff6d00',
        'orangeActive': '#f55200',
        'grey': '#f3f3f0',
        'greyTwo':'#f9f9f8',
        'greyLink': '#373d4f',
        'greyThree' : '#f7f7f7',
        'greyActive' : '#e7e7e2',
        'greytext' : '#6c757d',
        'greysec' : '#edecf0',
      },
      // colors: {
      //   'blue': '#004e98',
      //   'blueActive': '#044389',
      //   'orange': '#044389',
      //   'orangeActive': '#e54b4b',
      //   'grey': '#EDEDE9',
      //   'greyLink': '#373d4f',
      //   'greyActive' : '#CCCCCC'
      // },
      
      fontFamily : {
        'title':["Playfair Display", 'serif'],
        'body': ["Outfit", 'sans-serif']
      },
    }
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

