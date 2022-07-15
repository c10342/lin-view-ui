# Tooltip 文字提示

[[toc]]

---

Tooltip 组件提供了一个 `v-tooltip` 指令，其效果跟 dom 标签的原生属性 title 类似，只是美化 title 的效果，并且定制了一系列属性

## 基础用法

在这里我们提供 4 种不同方向的展示方式，`v-tooltip`的绑定值就是提示的文字，默认是展示方向是下边

:::demo
tooltip/base
:::

## 偏移量

在绑定了 `v-tooltip` 指令的元素上添加 `lin-tooltip-top` 和 `lin-tooltip-left` 属性即可设置 tooltip 的偏移量

:::demo
tooltip/offset

:::

## 超出显示提示

在 `v-tooltip` 指令上添加 `auto` 修饰符。当文字超出容器宽度的时候，鼠标悬浮上去就会显示 tooltip 提示文字。当文字没有超出容器宽度的时候，鼠标悬浮上去不会显示 tooltip 提示文字

:::demo
tooltip/tip
:::

## 属性

| 参数             | 说明                                                                                | 类型    | 可选值 | 默认值 |
| ---------------- | ----------------------------------------------------------------------------------- | ------- | ------ | ------ |
| top              | `v-tooltip` 指令中的 `top` 修饰符，设置 tooltip 展示方向为上边                      | boolean | —      | false  |
| bottom           | `v-tooltip` 指令中的 `bottom` 修饰符，设置 tooltip 展示方向为下边                   | boolean | —      | true   |
| left             | `v-tooltip` 指令中的 `left` 修饰符，设置 tooltip 展示方向为左边                     | boolean | —      | false  |
| right            | `v-tooltip` 指令中的 `right` 修饰符，设置 tooltip 展示方向为右边                    | boolean | —      | false  |
| auto             | `v-tooltip` 指令中的 `auto` 修饰符，文字超出则显示 tooltip ，不超出则不显示 tooltip | boolean | —      | false  |
| lin-tooltip-top  | tooltip 距离屏幕上边的偏移量，在绑定了 `v-tooltip` 指令的元素上添加该属性           | string  | —      | —      |
| lin-tooltip-left | tooltip 距离屏幕左边的偏移量，在绑定了 `v-tooltip` 指令的元素上添加该属性           | string  | —      | —      |
