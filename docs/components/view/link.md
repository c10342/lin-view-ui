# Link 文字链接

[[toc]]

---

## 基础用法

基础的文字链接用法。

:::demo
link/base
:::

## 禁用状态

文字链接不可用状态。

:::demo
link/disabled
:::

## 下划线

文字链接下划线。

:::demo

link/underline

:::

## 图标

带图标的文字链接可增强辨识度。

:::demo

link/icon

:::

## 属性

| 参数      | 说明           | 类型    | 可选值                                      | 默认值 |
| --------- | -------------- | ------- | ------------------------------------------- | ------ |
| type      | 类型           | string  | primary , success , warning , danger , info | —      |
| underline | 是否下划线     | boolean | —                                           | true   |
| disabled  | 是否禁用状态   | boolean | —                                           | false  |
| href      | 原生 href 属性 | string  | —                                           | false  |
| icon      | 图标类名       | string  | —                                           | —      |

## 插槽

| 插槽名称 | 说明     |
| -------- | -------- |
| —        | 链接内容 |
