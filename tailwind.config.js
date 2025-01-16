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
          50: "#e6eae9", //gris claro
          100: "#979ca2", //gris
          200: "#545b66", //gris oscuro
          300: "#2f77c3", //azul claro
          400: "#1126a5", //azul real
          500: "#16375f", //azul oscuro
          600: "#031730", //azul muy oscuro
          700: "#010a13", //azul casi negro
          800: "#242424", //negro gris
          900: "#ffffffbf" // blanco transparente
        },
      }
    },
  },
  plugins: [],
}

