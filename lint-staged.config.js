module.exports = {
  "*.{css,scss}": ["stylelint **/*.{css,scss} --fix"],
  "*.{jsx,js,vue,tsx,ts}": ["prettier --write", "eslint --fix", "eslint"]
};
