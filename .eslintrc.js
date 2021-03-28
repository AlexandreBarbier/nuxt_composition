module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  // add your custom rules here
  rules: {
    'no-unreachable': 1,
    'space-before-function-paren': ['error', 'always'],
    'no-extra-parens': 2, // https: //eslint.org/docs/rules/no-extra-parens
    'consistent-return': 2, // https: //eslint.org/docs/rules/consistent-return
    curly: 2, // https: //eslint.org/docs/rules/curly
    eqeqeq: 2, // https: //eslint.org/docs/rules/eqeqeq
    'comma-dangle': ['error', 'always-multiline'],
    'vue/max-attributes-per-line': 0, // https: //eslint.vuejs.org/rules/max-attributes-per-line.html
    'vue/attribute-hyphenation': 0, // https: //eslint.vuejs.org/rules/attribute-hyphenation.html
  },
}
