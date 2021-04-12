module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'no-descending-specificity': null,
    'no-empty-source': null,
  },
};
