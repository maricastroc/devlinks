// .eslintrc.cjs
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',  // Integra o Prettier com ESLint
  ],
  rules: {
    'indent': ['error', 2],
    '@typescript-eslint/indent': ['error', 2],
    'prettier/prettier': ['error', { 'tabWidth': 2, 'useTabs': false }] // Regras do Prettier
  },
};