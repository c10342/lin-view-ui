# l-ui

## 在线文档

[http://ui.linjiafu.top](http://ui.linjiafu.top)

## 简介

`l-ui` 是一款基于 `Vue.js 2.0` 的前端 UI 组件库，主要是从我平时工作中和其他一些项目中提炼出来的主题组件

## 特性

- 基于 `Vue` 开发的 UI 组件
- 使用 npm + webpack + babel 的工作流，支持 ES2015
- 提供友好的 API，可灵活的使用组件
- 支持按需引入，减少项目打包体积
- 偏向于业务组件
- 提供完善的文档

## 安装

```
npm install l-ui -S
```

## 快速开始

```javascript
import Vue from "vue";
import LinUI from "l-ui";

Vue.use(LinUI);

// or
import {
  Input,
  Button,
  // ...
} from "l-ui";

Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
```

## 浏览器支持

- 现代浏览器和 IE10 及以上
- [Electron](http://electron.atom.io/)

## 贡献

如果你在使用 `l-ui` 时遇到问题，或者有好的建议，欢迎给我提 [Issue](https://github.com/c10342/l-ui/issues)

## LICENSE

[MIT](LICENSE)
