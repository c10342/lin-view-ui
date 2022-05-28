# ShowMore 显示更多

[[toc]]

---

## 基础用法

文本超出显示长度，折叠起来，通过 len 属性显示从何处开始折叠。

::: demo
show-more/base
:::

## 高级用法

文本超出显示长度，折叠起来，展开后，可以通过`allow-fold`指定是否需要收起，也可通过`show-text`设置折叠时的文案，通过`hidden-text`设置收起的文案

::: demo
show-more/allow-fold
:::

## 属性

| 参数        | 说明               | 类型    | 可选值 | 默认值         |
| ----------- | ------------------ | ------- | ------ | -------------- |
| len         | 显示文本的长度     | number  | —      | -1(不进行折叠) |
| text        | 文本               | string  | —      | —              |
| show-text   | 折叠时需要显示文案 | string  | —      | 显示更多       |
| hidden-text | 隐藏时需要显示文案 | string  | —      | 隐藏           |
| allow-fold   | 是否需要收起       | boolean | —      | false          |
