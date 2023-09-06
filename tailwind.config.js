/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mont', 'Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mont: ['Mont', 'sans'],
		montserrat: ['Montserrat', 'sans']
      },
      backgroundImage: {
        'default-avatar': 'linear-gradient(to bottom right, #f280a3, #c86ba0, #9b569d, #75619a, #4f6c97, #85a8d8)',
      },
      colors: {
        positive: '#6DCE5C',
        negative: '#CE5C6D'
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
