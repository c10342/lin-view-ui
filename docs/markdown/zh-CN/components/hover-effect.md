# HoverEffect 悬浮效果

[[toc]]

---

## 霓虹效果

设置 `theme` 属性为 `neon` 即可

:::demo

```vue
<template>
  <div class="hover-group">
    <lin-hover-effect
      theme="neon"
      type="primary"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="neon"
      type="success"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="neon"
      type="info"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="neon"
      type="warning"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="neon"
      type="danger"
      text="hover-effect"
    ></lin-hover-effect>
  </div>
</template>
```

:::

## 边框效果

设置 `theme` 属性为 `border` 即可

:::demo

```vue
<template>
  <div class="hover-group">
    <lin-hover-effect
      theme="border"
      type="primary"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="border"
      type="success"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="border"
      type="info"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="border"
      type="warning"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="border"
      type="danger"
      text="hover-effect"
    ></lin-hover-effect>
  </div>
</template>
```

:::

## 圆角效果

设置 `theme` 属性为 `fillet` 即可

:::demo

```vue
<template>
  <div class="hover-group">
    <lin-hover-effect
      theme="fillet"
      type="primary"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="fillet"
      type="success"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="fillet"
      type="info"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="fillet"
      type="warning"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="fillet"
      type="danger"
      text="hover-effect"
    ></lin-hover-effect>
  </div>
</template>
```

:::

## 冰冻效果

设置 `theme` 属性为 `frozen` 即可

:::demo

```vue
<template>
  <div class="hover-group">
    <lin-hover-effect
      theme="frozen"
      type="primary"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="frozen"
      type="success"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="frozen"
      type="info"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="frozen"
      type="warning"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="frozen"
      type="danger"
      text="hover-effect"
    ></lin-hover-effect>
  </div>
</template>
```

:::

## 闪亮效果

设置 `theme` 属性为 `shiny` 即可

:::demo

```vue
<template>
  <div class="hover-group">
    <lin-hover-effect
      theme="shiny"
      type="primary"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="shiny"
      type="success"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="shiny"
      type="info"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="shiny"
      type="warning"
      text="hover-effect"
    ></lin-hover-effect>
    <lin-hover-effect
      theme="shiny"
      type="danger"
      text="hover-effect"
    ></lin-hover-effect>
  </div>
</template>
```

:::

## 属性

| 参数  | 说明     | 类型   | 可选值                              | 默认值  |
| ----- | -------- | ------ | ----------------------------------- | ------- |
| type  | 效果类型 | String | primary,success,warning,danger,info | primary |
| theme | 效果主题 | String | neon, border, fillet, frozen, shiny | false   |
| text  | 文本     | String | —                                   | —       |

## 事件

| 事件名称 | 说明       | 回调参数 |
| -------- | ---------- | -------- |
| click    | 点击时触发 | —        |

## 插槽

| 插槽名称 | 说明               |
| -------- | ------------------ |
| —        | HoverEffect 的内容 |
