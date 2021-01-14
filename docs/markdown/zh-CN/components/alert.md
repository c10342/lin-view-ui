# Alert 警告

[[toc]]

---

## 基础用法

页面中的非浮层元素，不会自动消失。

:::demo

```vue
<template>
  <lin-alert type="success" title="提示文案"></lin-alert>
  <lin-alert type="info" title="提示文案"></lin-alert>
  <lin-alert type="warning" title="提示文案"></lin-alert>
  <lin-alert type="danger" title="提示文案"></lin-alert>
</template>
```

:::

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark` 。

:::demo

```vue
<template>
  <lin-alert effect="dark" type="success" title="提示文案"></lin-alert>
  <lin-alert effect="dark" type="info" title="提示文案"></lin-alert>
  <lin-alert effect="dark" type="warning" title="提示文案"></lin-alert>
  <lin-alert effect="dark" type="danger" title="提示文案"></lin-alert>
</template>
```

:::

## 自定义关闭按钮

在 Alert 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。`closable` 属性决定是否可关闭，接受 `boolean` ，默认为 `true` 。你可以使用 `close` 具名插槽来代替右侧的关闭图标。

:::demo

```vue
<template>
  <lin-alert closable type="success" title="不可关闭的 alert"></lin-alert>
  <lin-alert closable type="info" title="自定义">
    <template slot="close"><span>知道了</span></template>
  </lin-alert>
</template>
```

:::

## 带有 icon

表示某种状态时提升可读性。通过设置 `icon` 属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。

:::demo

```vue
<template>
  <lin-alert icon="lin-icon-chat" type="success" title="提示文案"></lin-alert>
  <lin-alert icon="lin-icon-chat" type="info" title="提示文案"></lin-alert>
  <lin-alert icon="lin-icon-chat" type="warning" title="提示文案"></lin-alert>
  <lin-alert icon="lin-icon-chat" type="danger" title="提示文案"></lin-alert>
</template>
```

:::

## 文字居中

使用 `center` 属性让文字水平居中。

:::demo

```vue
<template>
  <lin-alert
    center
    icon="lin-icon-chat"
    type="success"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    center
    icon="lin-icon-chat"
    type="info"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    center
    icon="lin-icon-chat"
    type="warning"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    center
    icon="lin-icon-chat"
    type="danger"
    title="提示文案"
  ></lin-alert>
</template>
```

:::

## 带有辅助性文字介绍

除了必填的 `title` 属性外，你可以设置 `description` 属性来帮助你更好地介绍，我们称之为辅助性文字。

:::demo

```vue
<template>
  <lin-alert
    description="文字说明文字说明文字说明"
    type="success"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    description="文字说明文字说明文字说明"
    type="info"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    description="文字说明文字说明文字说明"
    type="warning"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    description="文字说明文字说明文字说明"
    type="danger"
    title="提示文案"
  ></lin-alert>
</template>
```

:::

## 带有 icon 和辅助性文字介绍

最后，这是一个同时具有 icon 和辅助性文字的样例。

:::demo

```vue
<template>
  <lin-alert
    icon="lin-icon-chat"
    description="文字说明文字说明文字说明"
    type="success"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    icon="lin-icon-chat"
    description="文字说明文字说明文字说明"
    type="info"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    icon="lin-icon-chat"
    description="文字说明文字说明文字说明"
    type="warning"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    icon="lin-icon-chat"
    description="文字说明文字说明文字说明"
    type="danger"
    title="提示文案"
  ></lin-alert>
</template>
```

:::

## 属性

| 参数        | 说明           | 类型    | 可选值                      | 默认值  |
| ----------- | -------------- | ------- | --------------------------- | ------- |
| title       | 标题           | String  | —                           | —       |
| description | 辅助性文字     | String  | —                           | —       |
| icon        | 图标           | String  | —                           | —       |
| closable    | 是否可关闭     | Boolean | —                           | false   |
| type        | 主题           | String  | success/warning/info/danger | success |
| effect      | 选择提供的主题 | String  | light/dark                  | light   |
| center      | 文字是否居中   | Boolean | —                           | false   |

## 插槽

| 插槽名称    | 说明                 |
| ----------- | -------------------- |
| icon        | Alert icon 区的内容  |
| title       | Alert 标题区的内容   |
| description | Alert 描述区的内容   |
| close       | Alert 关闭按钮的内容 |

## 事件

| 事件名称 | 说明                    | 回调参数 |
| -------- | ----------------------- | -------- |
| close    | 关闭 Alert 时触发的事件 | —        |
