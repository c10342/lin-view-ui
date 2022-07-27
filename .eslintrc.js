const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  env: {
    node: true
  },
  parser: "vue-eslint-parser",
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  globals: {
    defineOptions: true
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "linebreak-style": "off",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "never"],
    "@typescript-eslint/no-unused-vars": "error",
    "object-curly-newline": "error",
    // "no-use-before-define": "error",
    // 'left' is already declared in the upper scope on line 158 column 7
    "no-shadow": "error",
    "symbol-description": "error",
    "lines-between-class-members": "error",
    "operator-linebreak": ["error", "before"],
    // "no-trailing-spaces": "error",
    "key-spacing": ["error", { afterColon: true }],
    "no-multi-spaces": "error",
    indent: ["error", 2],
    "spaced-comment": "error",
    // 空行
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "eqeqeq": "error",
    "vue/eqeqeq": "error",
    "vue/comma-dangle": "error"
    // 函数名和括号之间间隔
    // "space-before-function-paren":["error",'always']
    // "import/extensions": [
    //   "error",
    //   "ignorePackages",
    //   {
    //     js: "never",
    //     jsx: "never",
    //     ts: "never",
    //     tsx: "never",
    //     vue: "never"
    //   }
    // ],
    // "import/prefer-default-export": "off",
    // "no-plusplus": "off",
    // radix: "off",
    // "prefer-destructuring": "off",
    // "no-param-reassign": "off"
  }
  // settings: {
  //   "import/resolver": {
  //     node: {
  //       extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
  //     },
  //     alias: {
  //       map: [["@packages", "./packages"]],
  //       extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
  //     }
  //   }
  // }
});
