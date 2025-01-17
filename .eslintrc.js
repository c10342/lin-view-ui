// eslint-disable-next-line
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  env: {
    node: true,
    browser: true
  },
  extends: [
    "airbnb-base",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: ["error", "double"],
    "comma-dangle": ["error", "never"],
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-shadow": "off",
    "linebreak-style": "off",
    "max-len": ["error", { code: 150 }],
    radix: "off",
    "no-restricted-syntax": "off",
    "no-alert": "off",
    "class-methods-use-this": "off",
    "implicit-arrow-linebreak": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-else-return": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "no-use-before-define": "off",
    "guard-for-in": "off",
    "consistent-return": "off",
    "prefer-destructuring": "off",
    "no-continue": "off",
    "default-case": "off",
    // 开启圈复杂度
    complexity: ["error", { max: 10 }],
    "vue/multi-word-component-names": "off",
    "vue/eqeqeq": "error",
    "vue/comma-dangle": "error",
    "vue/no-empty-component-block": "error",
    "vue/key-spacing": ["error", { afterColon: true }],
    "vue/no-mutating-props": "off",
    "vue/v-on-event-hyphenation": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/type-annotation-spacing": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
});
