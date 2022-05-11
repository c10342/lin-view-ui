# Button 按钮

[[toc]]

## 基础使用

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

:::demo
button/base
:::

## 禁用状态

使用 `disabled` 属性来定义按钮是否被禁用。

:::demo

button/disabled

:::

## 加载中

通过设置 `loading` 属性为 `true` 来显示加载中状态。

:::demo
button/loading
:::

## 图标按钮

使用 `icon` 属性来为按钮添加图标

:::demo
button/icon
:::

## 各种尺寸的按钮

使用 `size` 属性额外配置尺寸，可使用 `large` 和 `small` 两种值。

:::demo
button/size
:::

## 属性

| 参数      | 说明                  | 类型    | 可选值                         | 默认值 |
| --------- | --------------------- | ------- | ------------------------------ | ------ |
| size      | 尺寸                  | string  | large,small                    | —      |
| type      | 类型                  | string  | primary,success,warning,danger | —      |
| plain     | 是否为朴素按钮        | boolean | —                              | false  |
| round     | 是否为圆角按钮        | boolean | —                              | false  |
| circle    | 是否为圆形按钮        | boolean | —                              | false  |
| loading   | 是否为加载中状态      | boolean | —                              | false  |
| disabled  | 是否为禁用状态        | boolean | —                              | false  |
| autofocus | 原生 `autofocus` 属性 | boolean | —                              | false  |
| icon      | 图标                  | string  | —                              | —      |

## 事件

| 事件名称 | 说明           | 回调参数 |
| -------- | -------------- | -------- |
| click    | 点击按钮时触发 | —        |

## 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 自定义默认内容 |
