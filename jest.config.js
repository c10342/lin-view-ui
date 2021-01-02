const path = require('path');

module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    // 告诉 Jest 处理 `*.vue` 文件
    'vue',
  ],
  transform: {
    // 用 `vue-jest` 处理 `*.vue` 文件
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    'packages/(.*)$': '<rootDir>/packages/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  rootDir: path.join(__dirname),
  testMatch: [
    // 匹配测试用例的文件
    '<rootDir>/tests/**/*.test.js',
  ],
  // testPathIgnorePatterns: ['./node_modules/'],
  // transformIgnorePatterns: ["/node_modules/(?!vue-awesome)"],
};
