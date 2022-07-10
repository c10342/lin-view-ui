# LimitTextarea 限制输入域

[[toc]]

---

## 基础用法

LimitTextarea 可以控制用户输入的字符数，`placeholder` 指定初始输入的提示文案

::: demo
limit-textarea/base
:::

## 裁剪超出字符

如果超过了限制的字符数，可以通过设置`isCut`属性对超过部分进行裁剪

::: demo
limit-textarea/is-cut
:::

## 列高

通过 `rows` 属性指定高度

:::demo
limit-textarea/rows
:::

## 属性

| 参数            | 说明                     | 类型    | 可选值 | 默认值         |
| --------------- | ------------------------ | ------- | ------ | -------------- |
| rows            | 列高                     | number  | —      | 4              |
| max-len         | 最大长度限制             | number  | —      | -1(不限制长度) |
| is-cut          | 超出字符是否裁剪         | boolean | —      | false          |
| placeholder     | 输入时需要显示的提示文案 | string  | —      | 请输入内容     |
| value / v-model:value| 绑定值                   | string  | —      | —              |

## 事件

| 事件名称 | 说明                                                                                | 回调参数 |
| -------- | ----------------------------------------------------------------------------------- | -------- |
| overText | 超出限制长度并且 isCut 为 false 时触发                                              | content  |
| change   | 在 Input 值改变时触发，当 isCut 为 true 并且 value 值长度大于最大长度限制时不会触发 | value    |
