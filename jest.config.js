const path = require("path");

module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  rootDir: path.join(__dirname),
  moduleNameMapper: {
    "packages/(.*)$": "<rootDir>/packages/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    // 匹配测试用例的文件
    "<rootDir>/tests/**/*.test.js",
  ],
};
