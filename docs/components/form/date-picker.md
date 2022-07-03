# DatePicker 日期选择器

[[toc]]

---

# 基础用法

`v-model` 绑定的值就是选中的日期

:::demo
date-picker/base
:::

## 禁用日期

`disabledBeforeDate` 可禁用小于等于该日期的日期。`disabledAfterDate` 可禁用大于等于该日期的日期。
`disabledRangeDate` 可禁用范围内的时间，它是一个数组，第一项为开始时间，第二项为结束时间，数组只有一项的时候，效果跟 `disabledAfterDate` 属性一样。`disabledDate` 禁用指定日期，它接收一个数组。

:::demo
date-picker/disabled-date
:::

## 禁用整个日期选择器

设置 `disabled` 属性为 `true` 即可禁用整个日期选择器

:::demo
date-picker/disabled
:::

## 自定义显示日期块

当你需要自定义显示日期块的样式和结构时，你可以设置 `renderInfo` ，并返回一个 jsx

:::demo
date-picker/render-info
:::

## 其他使用

当你需要日期选择一直显示并且隐藏输入框，你可以设置 `showAlways` 属性和 `showInput` 属性

:::demo
date-picker/show-always
:::

## 属性

| 参数               | 说明                                           | 类型                   | 可选值             | 默认值     |
| ------------------ | ---------------------------------------------- | ---------------------- | ------------------ | ---------- |
| radius             | 日期块是否为圆角                               | boolean                | —                  | false      |
| cellWidth          | 日期块宽度                                     | number                 | —                  | 32         |
| value / v-model    | 绑定值                                         | Date , string , number | —                  | —          |
| cellHeight         | 日期块高度                                     | number                 | —                  | 32         |
| labelHeight        | 头部标签的高度                                 | number                 | —                  | 32         |
| disabled           | 是否禁用                                       | boolean                | —                  | false      |
| placeholder        | 输入框占位符                                   | string                 | —                  | 请选择日期 |
| disabledBeforeDate | 禁用小于等于该日期的日期                       | Date , string , number | —                  | —          |
| disabledAfterDate  | 禁用大于等于该日期的日期                       | Date , string , number | —                  | —          |
| disabledRangeDate  | 禁用指定范围内的日期                           | Array                  | —                  | —          |
| disabledDate       | 禁用指定日期                                   | Array                  | —                  | —          |
| renderInfo         | 自定义渲染日期块。参数是日期对象。可以使用 jsx | Function               | —                  | —          |
| format             | 格式化 value/v-model 绑定值                    | string                 | string,number,Date | string     |
| showFormat         | 自定义输入框的显示内容                         | Function               | —                  | —          |
| showAlways         | 是否一直显示时间选择器                         | boolean                | —                  | false      |
| showInput          | 是否显示输入框                                 | boolean                | —                  | true       |

## 事件

| 事件名称  | 说明                 | 回调参数       |
| --------- | -------------------- | -------------- |
| prevYear  | 点击上一年按钮触发   | 日期对象       |
| nextYear  | 点击下一年按钮触发   | 日期对象       |
| prevMonth | 点击上一个月按钮触发 | 日期对象       |
| nextMonth | 点击下一个月按钮触发 | 日期对象       |
| select    | 选中日期时触发       | 选中的日期对象 |
| focus     | 日期选择器显示时触发 | —              |
| blur      | 日期选择器隐藏时触发 | —              |
