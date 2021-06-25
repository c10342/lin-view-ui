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
    "^@lin-view-ui/(.*)$": "<rootDir>/packages/$1/index.js"
  },
  rootDir: path.join(__dirname),
  testMatch: [
    // 匹配测试用例的文件
    "<rootDir>/packages/**/__tests__/*.test.js"
  ],
  collectCoverageFrom: [
    // '<rootDir>/packages/**/src/*.{js,vue}'
    "<rootDir>/packages/alert/src/alert.vue",
    "<rootDir>/packages/backtop/src/backtop.vue",
    // '<rootDir>/packages/badge/src/badge.vue',
    // '<rootDir>/packages/button/src/button.vue',
    // '<rootDir>/packages/checkbox/src/checkbox.vue',
    // '<rootDir>/packages/checkbox-group/src/checkbox-group.vue',
    // '<rootDir>/packages/col/src/col.vue',
    // '<rootDir>/packages/dialog/src/dialog.vue',
    // '<rootDir>/packages/form/src/form.vue',
    // '<rootDir>/packages/form-item/src/form-item.vue',
    "<rootDir>/packages/image/src/image.vue",
    // '<rootDir>/packages/input/src/input.vue',
    "<rootDir>/packages/loading/src/*.{js,vue}"
    // '<rootDir>/packages/limit-textarea/src/limit-textarea.vue'
  ]
  // setupFiles: ['<rootDir>/tests/__mocks__/shim.js']
};
