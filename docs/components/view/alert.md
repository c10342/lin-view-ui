# Alert 提示

[[toc]]

---

## 基础用法

页面中的非浮层元素，不会自动消失。

:::demo
alert/base
:::

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark` 。

:::demo
alert/effect
:::

## 自定义关闭按钮

在 Alert 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。`closable` 属性决定是否可关闭，接受 `boolean` ，默认为 `true` 。你可以使用 `close` 具名插槽来代替右侧的关闭图标。

:::demo
alert/close
:::

## 带有 icon

表示某种状态时提升可读性。通过设置 `icon` 属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。

:::demo
alert/icon
:::

## 文字居中

使用 `center` 属性让文字水平居中。

:::demo
alert/center
:::

## 带有辅助性文字介绍

除了必填的 `title` 属性外，你可以设置 `description` 属性来帮助你更好地介绍，我们称之为辅助性文字。

:::demo
alert/des
:::

## 带有 icon 和辅助性文字介绍

最后，这是一个同时具有 icon 和辅助性文字的样例。

:::demo
alert/icon-des
:::

## 属性

| 参数        | 说明           | 类型    | 可选值                      | 默认值  |
| ----------- | -------------- | ------- | --------------------------- | ------- |
| title       | 标题           | string  | —                           | —       |
| description | 辅助性文字     | string  | —                           | —       |
| icon        | 图标           | string  | —                           | —       |
| closable    | 是否可关闭     | boolean | —                           | false   |
| type        | 主题           | string  | success,warning,info,danger | success |
| effect      | 选择提供的主题 | string  | light,dark                  | light   |
| center      | 文字是否居中   | boolean | —                           | false   |

## 插槽

| 插槽名称    | 说明           |
| ----------- | -------------- |
| icon        | icon 区的内容  |
| title       | 标题区的内容   |
| description | 描述区的内容   |
| close       | 关闭按钮的内容 |

## 事件

| 事件名称 | 说明             | 回调参数 |
| -------- | ---------------- | -------- |
| close    | 关闭时触发的事件 | —        |
