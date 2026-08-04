module.exports = {
  env: {
    browser: true,
    es2024: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  settings: {
    react: { version: 'detect' }
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': ['warn'],
    'react/prop-types': 'off'
  }
}
