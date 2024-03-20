/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#008DDA',
        'secondary': '#41C9E2',
        'soft_bg': '#e6f6f6',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
  darkMode: "class",
};
