const path = require('path');

module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    // 告诉 Jest 处理 `*.vue` 文件
    'vue'
  ],
  transform: {
    // 用 `vue-jest` 处理 `*.vue` 文件
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '\\.(css|scss)$': '<rootDir>/tests/__mocks__/styleTransformer.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js'
  },
  moduleNameMapper: {
    'packages/(.*)$': '<rootDir>/packages/$1',
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  rootDir: path.join(__dirname),
  testMatch: [
    // 匹配测试用例的文件
    '<rootDir>/tests/**/*.test.js'
  ],
  collectCoverageFrom: ['<rootDir>/packages/**/src/*.{js,vue}']
};
