# 快速上手

[[toc]]

---

## 使用前准备

> 在使用之前，推荐学习 `Vue` 和 `ES2015` ，并正确配置 `Node.js` v6.x 或以上版本

`lin-view-ui` 基于 `Vue.js` 2.x+ 版本开发，所以有必要了解以下基础知识：

- [Vue 组件](https://cn.vuejs.org/v2/guide/components.html)
- [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)

## 基于模板工程开发

> `Vue.js` 提供一个官方命令行工具 `@vue/cli`，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。

```bash
> npm i -g @vue/cli

> mkdir my-project && cd my-project

> vue create mydemo

> npm i lin-view-ui --save
```

## 使用

实际项目中，往往会使用 `webpack`，`rollup` 或者 `gulp` 的工作流，大多可以做到按需加载页面用到的组件，所以不推荐直接使用 `<script>` 标签全局引入的方式使用。

### 全量引入

可以在项目的入口文件中引入所有组件

```js
import LinViewUi from "lin-view-ui"; // 引入组件库

import "lin-view-ui/lib/theme-chalk/index.css"; // 引入样式库

Vue.use(LinViewUi);
```

### 按需加载

借助 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```js
plugins: [
    [
      "component",
      {
        "libraryName": "lin-view-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
```

接下来，如果你只希望引入部分组件，比如 Button ，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from "vue";

import { Button } from "lin-view-ui";

import App from "./App.vue";

Vue.component(Button.name, Button);

/* 或写为
 *
 * Vue.use(Button)
 *
 */

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

### 单组件安装使用
由于我们的组件库是偏向业务组件的。在实际使用的时候，你可能只是需要使用其中的几个组件。所以我们为每个组件提供了单独安装使用的功能。

下面以`Button`组件为例:

- 安装
```
npm install @lin-view-ui/button -S
```
- 引入

```javascript
import Vue from 'vue';
import Button from '@lin-view-ui/button';
import '@lin-view-ui/button/dist/style.css'

Vue.use(Button);
```

### 自定义主题

`lin-view-ui` 各个组件的样式变量都存放在 `packages/theme-chalk` 目录中。用户可根据实际需要，自定义组件的样式
