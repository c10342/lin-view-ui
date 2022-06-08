# Pagination 分页

[[toc]]

---

## 基础用法

设置 `layout` ，表示需要显示的内容，用逗号分隔，布局元素会依次显示。`prev` 表示上一页，`next` 为下一页，`pager` 表示页码列表，除此以外还提供了 `jumper` 和 `total` ，`jumper` 表示跳页元素，`total` 表示总条目数，`pageSize` 用于设置每页显示的页码数量。

:::demo
pagination/base
:::

## 设置最大页码按钮数

默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。通过 `pageCount` 属性可以设置最大页码按钮数。

:::demo
pagination/page-count
:::

## 带有背景色的分页

设置 `background` 属性可以为分页按钮添加背景色。

:::demo

pagination/background

:::

## 附加功能

:::demo

pagination/other

:::

## 属性

| 参数       | 说明                                     | 类型    | 可选值                                    | 默认值                          |
| ---------- | ---------------------------------------- | ------- | ----------------------------------------- | ------------------------------- |
| pageCount  | 页码按钮的数量，当总页数超过该值时会折叠 | number  | —                                         | 7                               |
| pageSize   | 每页显示条目个数                         | number  | —                                         | 10                              |
| total      | 总条目数                                 | number  | —                                         | 0                               |
| pageIndex / v-model  | 当前页数             | number  | —                                         | —                               |
| background | 是否为分页按钮添加背景色                 | boolean | —                                         | false                           |
| layout     | 组件布局，子组件名用逗号分隔             | string  | `prev`, `pager`, `next`, `jumper`,`total` | prev, pager, next, jumper,total |

## 事件

| 事件名称      | 说明                               | 回调参数 |
| ------------- | ---------------------------------- | -------- |
| change | pageIndex 改变时会触发             | 当前页   |
| prevClick     | 用户点击上一页按钮改变当前页后触发 | 当前页   |
| nextClick     | 用户点击下一页按钮改变当前页后触发 | 当前页   |
