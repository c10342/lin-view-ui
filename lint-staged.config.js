module.exports = {
  "*.{css,scss}": ["stylelint **/*.{css,scss} --fix"],
  "*.{ts,js,vue}": ["eslint --fix", "eslint"]
};
