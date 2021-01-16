# Tag 标签

[[toc]]

---

## 基础用法

由 `type` 属性来选择 tag 的类型，也可以通过 `color` 属性来自定义背景色。

:::demo

```vue
<template>
  <lin-tag text="标签1"></lin-tag>
  <lin-tag text="标签2" type="success"></lin-tag>
  <lin-tag text="标签3" type="info"></lin-tag>
  <lin-tag text="标签4" type="warning"></lin-tag>
  <lin-tag text="标签5" type="danger"></lin-tag>
</template>
```

:::

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。

:::demo

```vue
<template>
  <lin-tag closable text="标签1"></lin-tag>
  <lin-tag closable text="标签2" type="success"></lin-tag>
  <lin-tag closable text="标签3" type="info"></lin-tag>
  <lin-tag closable text="标签4" type="warning"></lin-tag>
  <lin-tag closable text="标签5" type="danger"></lin-tag>
</template>
```

:::

## 不同主题

通过设置 `effect` 属性来改变主题，默认为 `light`。

:::demo

```vue
<template>
  <div class="tag-row">
    <lin-tag effect="dark" closable text="标签1"></lin-tag>
    <lin-tag effect="dark" closable text="标签2" type="success"></lin-tag>
    <lin-tag effect="dark" closable text="标签3" type="info"></lin-tag>
    <lin-tag effect="dark" closable text="标签4" type="warning"></lin-tag>
    <lin-tag effect="dark" closable text="标签5" type="danger"></lin-tag>
  </div>
  <div class="tag-row">
    <lin-tag effect="plain" closable text="标签1"></lin-tag>
    <lin-tag effect="plain" closable text="标签2" type="success"></lin-tag>
    <lin-tag effect="plain" closable text="标签3" type="info"></lin-tag>
    <lin-tag effect="plain" closable text="标签4" type="warning"></lin-tag>
    <lin-tag effect="plain" closable text="标签5" type="danger"></lin-tag>
  </div>
</template>
```

:::

## 属性

| 参数     | 说明       | 类型    | 可选值                              | 默认值  |
| -------- | ---------- | ------- | ----------------------------------- | ------- |
| type     | 类型       | String  | primary,success,info,warning,danger | primary |
| text     | 文本       | String  | —                                   | —       |
| color    | 背景色     | String  | —                                   | —       |
| closable | 是否可关闭 | Boolean | —                                   | false   |
| effect   | 主题       | String  | dark , light , plain                | light   |

## 事件

| 事件名称 | 说明                  | 回调参数 |
| -------- | --------------------- | -------- |
| click    | 点击 Tag 时触发的事件 | —        |
| close    | 关闭 Tag 时触发的事件 | —        |
