# Selector 选择器

[[toc]]

---

## 基础用法

`v-model` 的值为当前被选中的 `lin-selector-item` 的 `value` 属性值

:::demo
selector/base
:::

## 绑定值为对象

当绑定值为对象时，需要设置 `valueKey` 属性，作为 value 唯一标识的键名

:::demo
selector/obj-value
:::

## 使用 jsx

当你需要自定义标签栏和更多的样式和结构时，你可以设置 `renderMore` 和 `renderLabel` 属性，并返回一个 jsx

:::demo
selector/jsx
:::

## 禁用状态

为 `lin-selector-group` 设置 `disabled` 属性，则整个选择器不可用

## SelectorGroup 属性

| 参数            | 说明                                                                                                                  | 类型                               | 可选值 | 默认值 |
| --------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------ | ------ |
| width           | 选择器宽度                                                                                                            | string                             | —      | —      |
| labelWidth      | 标签宽度                                                                                                              | string                             | —      | 40px   |
| value / v-model | 绑定值                                                                                                                | boolean , string , number , Object | —      | —      |
| valueKey        | 作为 value 唯一标识的键名，绑定值为对象类型时必填                                                                     | string                             | —      | value  |
| renderMore      | 自定义渲染更多标签内容，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个是否展开或收起的状态值。可以使用 jsx | Function                           | —      | —      |
| renderLabel     | 自定义渲染头部标签内容，使用 Vue 的 Render 函数，参数是 h，可以使用 jsx                                               | Function                           | —      | —      |
| label           | 头部标签内容                                                                                                          | string                             | —      | —      |
| disabled        | 是否禁用                                                                                                              | boolean                            | —      | false  |

## SelectorGroup 事件

| 事件名称 | 说明                   | 回调参数     |
| -------- | ---------------------- | ------------ |
| show     | 标签全部显示时触发     | —            |
| hide     | 标签超出部分隐藏时触发 | —            |
| onChange | 选中值发生变化时触发   | 目前的选中值 |

## SelectorItem 属性

| 参数     | 说明     | 类型            | 可选值 | 默认值 |
| -------- | -------- | --------------- | ------ | ------ |
| label    | 标签内容 | string          | —      | —      |
| value    | 选项的值 | string , number | —      | —      |
| disabled | 是否禁用 | boolean         | —      | false  |

## SelectorItem 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 自定义标签内容 |
