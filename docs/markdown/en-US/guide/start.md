# Start

---

## Preparation before use

> Before using, it is recommended to learn `Vue` and `es2015` and configure them correctly `Node.js` v6.x or above

`lin-view-ui` is based on `Vue.js` 2.x+ version development, so it is necessary to understand the following basic knowledge

- [Vue components](https://cn.vuejs.org/v2/guide/components.html)
- [Single file component](https://cn.vuejs.org/v2/guide/single-file-components.html)

## Based on template engineering development

> `Vue.js` Provide an official command line tool `@vue/cli`, which can be used to quickly build large single page applications. The tool provides out of the box build tool configuration, bringing a modern front-end development process. It takes just a few minutes to create and start a project with hot overloads, static checks on save, and build configurations available for production environments.

```bash
> npm i -g @vue/cli

> mkdir my-project && cd my-project

> vue create mydemo

> npm i lin-view-ui --save
```

## Use

In actual projects, the workflow of `webpack`, `rollup` or `gulp` is often used. Most of the components used in the page can be loaded on demand. Therefore, it is not recommended to directly use the `<script>` tag for global introduction.

### Total introduction

Full import can introduce all components into the project's entry file

```js
import LinUi from "lin-view-ui"; // Import component library

import "lin-view-ui/lib/style.css"; // Import style library

Vue.use(LinUi);
```

### Load on demand

With the help of [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component) We can only introduce the required components to reduce the project volume.

First,install babel-plugin-component

```bash
npm install babel-plugin-component -D
```

Then, modify .babelrc to read:

```js
plugins: [
    [
      "component",
      {
        "libraryName": "lin-view-ui"
      }
    ]
  ],
```

Next, if you only want to introduce some components, such as Button, you need to main.js Write the following:

```javascript
import Vue from "vue";

import { Button } from "lin-view-ui";

import App from "./App.vue";

Vue.component(Button.name, Button);

/* Or write as
 *
 * Vue.use(Button)
 *
 */

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

### Custom theme

The style variables of each component are stored in the `lin-view-ui/src/styles` directory. Users can customize the style of components according to their actual needs
