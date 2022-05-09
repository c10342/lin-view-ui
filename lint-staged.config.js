module.exports = {
  "*.{css,scss}": ["stylelint **/*.{css,scss} --fix"],
  "*.{ts,js}": ["prettier --write", "eslint --fix", "eslint"]
};
