module.exports = {
  "*.{css,scss}": ["stylelint **/*.{css,scss} --fix"],
  "*.{ts,js,vue,jsx,tsx}": ["eslint --fix", "eslint"]
};
