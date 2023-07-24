/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' /* src folder, for example */],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
