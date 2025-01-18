// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.cypress.json'] // Caminho para o novo arquivo tsconfig.cypress.json
  },
  rules: {
    // Suas regras personalizadas aqui
  }
};
