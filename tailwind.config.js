/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens:{
      "sm":"640px",
      "md":"768px",
      "lg":"1024px",
      "lg1":"1060px",
      "lg2":"1140px",
      "xl":"1280px",
      "xl1":"1400px",
      "2xl":"1536px"
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/aspect-ratio'),
  ],

};
