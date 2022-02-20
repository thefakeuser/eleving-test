module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  rules: {},
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-useless-constructor': 'off'
      }
    }
  ]
}
