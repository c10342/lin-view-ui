# Tag 标签

[[toc]]

---

## 基础用法

由 `type` 属性来选择 tag 的类型，也可以通过 `color` 属性来自定义背景色。

:::demo
tag/base
:::

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。

:::demo
tag/closable
:::

## 不同主题

通过设置 `effect` 属性来改变主题，默认为 `light`。

:::demo
tag/effect
:::

## 不同尺寸

通过设置 `size` 属性来改变尺寸，可选值包括 `large` 和 `small`。

:::demo
tag/size
:::

## 属性

| 参数     | 说明       | 类型    | 可选值                              | 默认值  |
| -------- | ---------- | ------- | ----------------------------------- | ------- |
| type     | 类型       | string  | primary,success,info,warning,danger | primary |
| text     | 文本       | string  | —                                   | —       |
| color    | 背景色     | string  | —                                   | —       |
| closable | 是否可关闭 | boolean | —                                   | false   |
| effect   | 主题       | string  | dark , light , plain                | light   |
| size     | 尺寸       | string  | large , small                       | —       |

## 事件

| 事件名称 | 说明                  | 回调参数 |
| -------- | --------------------- | -------- |
| click    | 点击 Tag 时触发的事件 | —        |
| close    | 关闭 Tag 时触发的事件 | —        |
