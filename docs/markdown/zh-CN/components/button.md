# Button 按钮

[[toc]]

---

## 基础用法

使用`type`、`plain`和`round`属性来定义 Button 的样式。

:::demo

```vue
<template>
  <div class="row">
    <lin-button>默认按钮</lin-button>
    <lin-button type="primary">主要按钮</lin-button>
    <lin-button type="success">成功按钮</lin-button>
    <lin-button type="info">信息按钮</lin-button>
    <lin-button type="warning">警告按钮</lin-button>
    <lin-button type="danger">危险按钮</lin-button>
  </div>
  <div class="row">
    <lin-button :plain="true" type="default">朴素按钮</lin-button>
    <lin-button :plain="true" type="primary">主要按钮</lin-button>
    <lin-button :plain="true" type="success">成功按钮</lin-button>
    <lin-button :plain="true" type="info">信息按钮</lin-button>
    <lin-button :plain="true" type="warning">警告按钮</lin-button>
    <lin-button :plain="true" type="danger">危险按钮</lin-button>
  </div>
  <div class="row">
    <lin-button :round="true" type="default">圆角按钮</lin-button>
    <lin-button :round="true" type="primary">主要按钮</lin-button>
    <lin-button :round="true" type="success">成功按钮</lin-button>
    <lin-button :round="true" type="info">信息按钮</lin-button>
    <lin-button :round="true" type="warning">警告按钮</lin-button>
    <lin-button :round="true" type="danger">危险按钮</lin-button>
  </div>
  <div class="row">
    <lin-button icon="lin-icon-date" :circle="true" type="default"></lin-button>
    <lin-button
      icon="lin-icon-thumbsup"
      :circle="true"
      type="primary"
    ></lin-button>
    <lin-button icon="lin-icon-chat" :circle="true" type="success"></lin-button>
    <lin-button icon="lin-icon-upload" :circle="true" type="info"></lin-button>
    <lin-button
      icon="lin-icon-search"
      :circle="true"
      type="warning"
    ></lin-button>
    <lin-button
      icon="lin-icon-delete"
      :circle="true"
      type="danger"
    ></lin-button>
  </div>
</template>
```

:::

## 禁用状态

使用`disabled`属性来设置按钮为不可用状态。

::: demo

```vue
<template>
  <div class="row">
    <lin-button :disabled="true" type="default">按钮</lin-button>
    <lin-button :disabled="true" type="primary">按钮</lin-button>
    <lin-button :disabled="true" type="success">按钮</lin-button>
    <lin-button :disabled="true" type="info">按钮</lin-button>
    <lin-button :disabled="true" type="warning">按钮</lin-button>
    <lin-button :disabled="true" type="danger">按钮</lin-button>
  </div>
</template>
```

:::

## 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。
设置`icon`属性即可，icon 的列表可以参考 lin-view-ui 的 icon 组件。

::: demo

```vue
<template>
  <div class="row">
    <lin-button icon="lin-icon-date" type="default"></lin-button>
    <lin-button icon="lin-icon-thumbsup" type="primary"></lin-button>
    <lin-button icon="lin-icon-chat" type="success"></lin-button>
    <lin-button icon="lin-icon-upload" type="info">下载</lin-button>
    <lin-button icon="lin-icon-search" type="warning">上传</lin-button>
    <lin-button icon="lin-icon-delete" type="danger">搜索</lin-button>
  </div>
</template>
```

:::

## 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
额外的尺寸：`medium`、`small`，通过设置`size`属性来配置它们。

::: demo

```vue
<template>
  <div class="row">
    <lin-button size="default">默认尺寸</lin-button>
    <lin-button size="medium">中等按钮</lin-button>
    <lin-button size="small">小型按钮</lin-button>
  </div>
</template>
```

:::

## 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。要设置为 `loading` 状态，只要设置 `loading` 属性为 `true` 即可。

::: demo

```vue
<template>
  <div class="row">
    <lin-button loading type="primary">主要</lin-button>
    <lin-button loading type="success">成功</lin-button>
    <lin-button loading type="info">信息</lin-button>
    <lin-button loading type="warning">警告</lin-button>
    <lin-button loading type="danger">危险</lin-button>
  </div>
</template>
```

:::

## 属性

| 参数         | 说明                         | 类型    | 可选值                                      | 默认值  |
| ------------ | ---------------------------- | ------- | ------------------------------------------- | ------- |
| size         | 尺寸                         | String  | default,medium,small                        | default |
| type         | 类型                         | String  | default,primary,success,warning,danger,info | default |
| plain        | 是否朴素按钮                 | Boolean | —                                           | false   |
| disabled     | 是否禁用状态                 | Boolean | —                                           | false   |
| icon         | 图标，已有的图标库中的图标名 | String  | —                                           | —       |
| round        | 是否圆角按钮                 | Boolean | —                                           | false   |
| circle       | 是否圆形按钮                 | Boolean | —                                           | false   |
| loading      | 是否加载中状态               | Boolean | —                                           | false   |
| loadingColor | 加载器颜色                   | String  | —                                           | #fff    |
| loadingSize  | 加载器大小                   | String  | —                                           | 14px    |

## 事件

| 事件名称 | 说明           | 回调参数 |
| -------- | -------------- | -------- |
| click    | 点击按钮时触发 | —        |

## 插槽

| 插槽名称 | 说明          |
| -------- | ------------- |
| —        | Button 的内容 |
