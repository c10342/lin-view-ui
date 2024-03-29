module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: ["plugin:vue/essential", "standard", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    // ecmaFeatures: {
    //   jsx: true, // 启动JSX
    // },
    parser: "@babel/eslint-parser"
  },
  plugins: ["vue"],
  rules: {
    "import/extensions": ["error", "always"],
    "prefer-destructuring": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "consistent-return": "off",
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "import/no-named-as-default-member": "off",
    semi: ["error", "always"],
    "node/no-callback-literal": "off"
  }
};
