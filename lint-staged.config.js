module.exports = {
  "*.{vue,css,scss}": ["stylelint **/*.{html,vue,css,sass,scss} --fix"],
  "*.{js,jsx,vue}": ["prettier --write", "eslint --fix", "git add", "eslint"]
};
