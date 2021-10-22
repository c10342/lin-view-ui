const path = require("path");

module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: [
    "js",
    "jsx",
    "json",
    // 告诉 Jest 处理 `*.vue` 文件
    "vue"
  ],
  transform: {
    // 用 `vue-jest` 处理 `*.vue` 文件
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.jsx?$": "babel-jest"
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    //   '<rootDir>/tests/__mocks__/fileMock.js'
  },
  moduleNameMapper: {
    "^@packages/(.*)$": "<rootDir>/packages/$1/index.js",
    "^@src/(.*)$": "<rootDir>/src/$1/index.js",
    "^@lang/(.*)$": "<rootDir>/src/locale/src/lang/$1"
  },
  rootDir: path.join(__dirname),
  testMatch: [
    // 匹配测试用例的文件
    "<rootDir>/packages/**/__tests__/*.test.js"
  ],
  collectCoverageFrom: [
    "<rootDir>/packages/alert/src/alert.vue",
    "<rootDir>/packages/backtop/src/backtop.vue",
    "<rootDir>/packages/image/src/image.vue",
    "<rootDir>/packages/loading/src/*.{js,vue}",
    "<rootDir>/packages/upload/src/upload.vue"
  ]
  // setupFiles: ['<rootDir>/tests/__mocks__/shim.js']
};
