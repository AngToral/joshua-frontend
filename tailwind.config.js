/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        joshua: {
          50: "#e6eae9", //gris claro - meet Joshua
          100: "#979ca2", //gris - services
          200: "#545b66", //gris oscuro - profile
          300: "#2f77c3", //azul claro
          400: "#1126a5", //azul real
          500: "#16375f", //azul oscuro - contact Form
          600: "#031730", //azul muy oscuro
          700: "#010a13", //azul casi negro - footer y login
          800: "#242424", //negro gris - setpassword - navbar
          900: "#ffffffbf" // blanco transparente
        },
      }
    },
  },
  plugins: [],
}

