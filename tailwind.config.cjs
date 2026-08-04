module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0ea5a4',
        accent: '#7c3aed'
      },
      boxShadow: {
        card: '0 8px 20px rgba(2,6,23,0.08)'
      }
    }
  },
  plugins: []
};
