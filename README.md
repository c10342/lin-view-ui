<div align='center' ><h1 style='font-weight: 700'>lin-view-ui</h1></div>

<p align="center">
  <a href='https://coveralls.io/github/c10342/lin-view-ui?branch=master'>
    <img src='https://coveralls.io/repos/github/c10342/lin-view-ui/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href="https://travis-ci.org/c10342/lin-view-ui">
    <img src="https://travis-ci.org/c10342/lin-view-ui.svg?branch=master">
  </a>
    <a href="https://www.npmjs.org/package/lin-view-ui">
    <img src="https://img.shields.io/npm/v/lin-view-ui.svg">
  </a>
    <a href="https://npmcharts.com/compare/lin-view-ui?minimal=true">
    <img src="http://img.shields.io/npm/dm/lin-view-ui.svg">
  </a>
  <br>
  <a href="http://img.badgesize.io/https://unpkg.com/lin-view-ui/lib/index.js?compression=gzip&label=gzip%20size:%20JS">
    <img src="http://img.badgesize.io/https://unpkg.com/lin-view-ui/lib/index.js?compression=gzip&label=gzip%20size:%20JS">
  </a>
  <a href="http://img.badgesize.io/https://unpkg.com/lin-view-ui/lib/style.css?compression=gzip&label=gzip%20size:%20CSS">
    <img src="http://img.badgesize.io/https://unpkg.com/lin-view-ui/lib/style.css?compression=gzip&label=gzip%20size:%20CSS">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

## 在线文档

[http://ui.linjiafu.top](http://ui.linjiafu.top)

## 简介

`lin-view-ui` 是一款基于 `Vue.js 2.0` 的前端 UI 组件库，主要集成了我平时在开发中使用到的 UI 组件

## 特性

- 基于 `Vue` 开发的 UI 组件
- 支持 typescript
- 使用 npm + webpack + babel 的工作流，支持 ES2015
- 提供友好的 API，可灵活的使用组件
- 支持按需引入，减少项目打包体积
- 偏向于业务组件
- 提供完善的文档
- 单元测试全面

## 安装

```
npm install lin-view-ui -S
```

## 快速开始

```javascript
import Vue from 'vue';
import LinUI from 'lin-view-ui';

Vue.use(LinUI);

// or
import {
  Input,
  Button
  // ...
} from 'lin-view-ui';

Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
```

## 浏览器支持

- 现代浏览器和 IE10 及以上
- [Electron](http://electron.atom.io/)

## 贡献

如果你在使用 `lin-view-ui` 时遇到问题，或者有好的建议，欢迎给我提 [Issue](https://github.com/c10342/lin-view-ui/issues)

## LICENSE

[MIT](LICENSE)
