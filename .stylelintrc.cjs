const commonExtends = ['stylelint-config-property-sort-order-smacss']

module.exports = {
  extends: commonExtends,
  rules: {
    'color-named': 'always-where-possible',
    'order/properties-alphabetical-order': null,
    'property-no-unknown': [
      true,
      {
        ignoreSelectors: [':export'],
      },
    ],
    'selector-max-id': 1,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'export',
          // For Vue deep selector: `:deep`
          // See: https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
          'deep',
        ],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['export'],
      },
    ],
  },
  overrides: [
    {
      files: '**/*.css',
      extends: ['stylelint-config-recommended', ...commonExtends],
    },
    {
      files: '**/*.scss',
      extends: ['stylelint-config-recommended-scss', ...commonExtends],
    },
    {
      files: '**/*.vue',
      extends: ['stylelint-config-recommended-vue/scss', ...commonExtends],
      rules: {
        // For importing '.module.{css|scss}'
        'scss/at-import-partial-extension': null,
      },
    },
    {
      files: '**/*.tsx',
      customSyntax: '@stylelint/postcss-css-in-js',
      extends: ['stylelint-config-recommended-scss', ...commonExtends],
    },
  ],
}
