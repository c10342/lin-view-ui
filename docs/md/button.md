<style lang="scss" scoped>
.row {
  margin-top: 20px;
  .l-button {
    margin-right: 10px;
  }
}
</style>

# Button 按钮

---

## 基础用法

使用`type`、`plain`和`round`属性来定义 Button 的样式。

<div class="demo-block">
    <div class="row">
      <l-button>默认按钮</l-button>
      <l-button type="primary">主要按钮</l-button>
      <l-button type="success">成功按钮</l-button>
      <l-button type="info">信息按钮</l-button>
      <l-button type="warning">警告按钮</l-button>
      <l-button type="danger">危险按钮</l-button>
    </div>
    <div class="row">
      <l-button :plain="true" type="default">朴素按钮</l-button>
      <l-button :plain="true" type="primary">主要按钮</l-button>
      <l-button :plain="true" type="success">成功按钮</l-button>
      <l-button :plain="true" type="info">信息按钮</l-button>
      <l-button :plain="true" type="warning">警告按钮</l-button>
      <l-button :plain="true" type="danger">危险按钮</l-button>
    </div>
    <div class="row">
      <l-button :round="true" type="default">圆角按钮</l-button>
      <l-button :round="true" type="primary">主要按钮</l-button>
      <l-button :round="true" type="success">成功按钮</l-button>
      <l-button :round="true" type="info">信息按钮</l-button>
      <l-button :round="true" type="warning">警告按钮</l-button>
      <l-button :round="true" type="danger">危险按钮</l-button>
    </div>
    <div class="row">
      <l-button icon="l-icon-date" :circle="true" type="default"></l-button>
      <l-button icon="l-icon-thumbsup" :circle="true" type="primary"></l-button>
      <l-button icon="l-icon-chat" :circle="true" type="success"></l-button>
      <l-button icon="l-icon-upload" :circle="true" type="info"></l-button>
      <l-button icon="l-icon-search" :circle="true" type="warning"></l-button>
      <l-button icon="l-icon-delete" :circle="true" type="danger"></l-button>
    </div>
</div>

::: demo

```html
<div>
  <l-button>默认按钮</l-button>
  <l-button type="primary">主要按钮</l-button>
  <l-button type="success">成功按钮</l-button>
  <l-button type="info">信息按钮</l-button>
  <l-button type="warning">警告按钮</l-button>
  <l-button type="danger">危险按钮</l-button>
</div>
<div>
  <l-button :plain="true" type="default">朴素按钮</l-button>
  <l-button :plain="true" type="primary">主要按钮</l-button>
  <l-button :plain="true" type="success">成功按钮</l-button>
  <l-button :plain="true" type="info">信息按钮</l-button>
  <l-button :plain="true" type="warning">警告按钮</l-button>
  <l-button :plain="true" type="danger">危险按钮</l-button>
</div>
<div>
  <l-button :round="true" type="default">圆形按钮</l-button>
  <l-button :round="true" type="primary">主要按钮</l-button>
  <l-button :round="true" type="success">成功按钮</l-button>
  <l-button :round="true" type="info">信息按钮</l-button>
  <l-button :round="true" type="warning">警告按钮</l-button>
  <l-button :round="true" type="danger">危险按钮</l-button>
</div>
<div>
  <l-button
    icon="l-icon-date"
    :circle="true"
    type="default"
  ></l-button>
  <l-button icon="l-icon-thumbsup" :circle="true" type="primary"></l-button>
  <l-button icon="l-icon-chat" :circle="true" type="success"></l-button>
  <l-button icon="l-icon-upload" :circle="true" type="info"></l-button>
  <l-button icon="l-icon-search" :circle="true" type="warning"></l-button>
  <l-button icon="l-icon-delete" :circle="true" type="danger"></l-button>
</div>
```

:::

## 禁用状态

使用`disabled`属性来设置按钮为不可用状态。

<div class="demo-block row">
      <l-button :disabled="true" type="default">按钮</l-button>
      <l-button :disabled="true" type="primary">按钮</l-button>
      <l-button :disabled="true" type="success">按钮</l-button>
      <l-button :disabled="true" type="info">按钮</l-button>
      <l-button :disabled="true" type="warning">按钮</l-button>
      <l-button :disabled="true" type="danger">按钮</l-button>
</div>

::: demo

```html
<l-button :disabled="true" type="default">按钮</l-button>
<l-button :disabled="true" type="primary">按钮</l-button>
<l-button :disabled="true" type="success">按钮</l-button>
<l-button :disabled="true" type="info">按钮</l-button>
<l-button :disabled="true" type="warning">按钮</l-button>
<l-button :disabled="true" type="danger">按钮</l-button>
```

:::

## 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。
设置`icon`属性即可，icon 的列表可以参考 lin-vue-ui 的 icon 组件。

<div class="demo-block row">
  <l-button icon="l-icon-date" type="default"></l-button>
  <l-button icon="l-icon-thumbsup" type="primary"></l-button>
  <l-button icon="l-icon-chat" type="success"></l-button>
  <l-button icon="l-icon-upload" type="info">下载</l-button>
  <l-button icon="l-icon-search" type="warning">上传</l-button>
  <l-button icon="l-icon-delete" type="danger">搜索</l-button>
</div>

::: demo

```html
<l-button icon="l-icon-date" type="default"></l-button>
<l-button icon="l-icon-thumbsup" type="primary"></l-button>
<l-button icon="l-icon-chat" type="success"></l-button>
<l-button icon="l-icon-upload" type="info">下载</l-button>
<l-button icon="l-icon-search" type="warning">上传</l-button>
<l-button icon="l-icon-delete" type="danger">搜索</l-button>
```

:::

## 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
额外的尺寸：`medium`、`small`，通过设置`size`属性来配置它们。

<div class="demo-block row">
  <l-button size="default">默认尺寸</l-button>
  <l-button size="medium">中等按钮</l-button>
  <l-button size="small">小型按钮</l-button>
</div>

::: demo

```html
<l-button size="default">默认尺寸</l-button>
<l-button size="medium">中等按钮</l-button>
<l-button size="small">小型按钮</l-button>
```

:::

## 属性

| 参数     | 说明                         | 类型    | 可选值                                      | 默认值  |
| -------- | ---------------------------- | ------- | ------------------------------------------- | ------- |
| size     | 尺寸                         | String  | default,medium,small                        | default |
| type     | 类型                         | String  | default,primary,success,warning,danger,info | default |
| plain    | 是否朴素按钮                 | Boolean | —                                           | false   |
| disabled | 是否禁用状态                 | Boolean | —                                           | false   |
| icon     | 图标，已有的图标库中的图标名 | String  | —                                           | —       |
| round    | 是否圆角按钮                 | Boolean | —                                           | false   |
| circle   | 是否圆形按钮                 | Boolean | —                                           | false   |

## 事件

| 事件名称 | 说明           | 回调参数 |
| -------- | -------------- | -------- |
| click    | 点击按钮时触发 | —        |
