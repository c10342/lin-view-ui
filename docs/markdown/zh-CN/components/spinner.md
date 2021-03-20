# Spinner 旋转

[[toc]]

---

## 基础用法

使用 `type` 属性来定义 Spinner 的主题色

:::demo

```vue
<template>
  <div class="spinner-group">
    <lin-spinner type="primary"></lin-spinner>
    <lin-spinner type="success"></lin-spinner>
    <lin-spinner type="info"></lin-spinner>
    <lin-spinner type="warning"></lin-spinner>
    <lin-spinner type="danger"></lin-spinner>
  </div>
</template>
```

:::

## 显示不同的弧度

`proportion` 属性可以设置不同的弧度。`1` 代表四分之三弧度，`2` 代表四分之二弧度，`3` 代表四分之一弧度

:::demo

```vue
<template>
  <div class="spinner-group">
    <lin-spinner proportion="1"></lin-spinner>
    <lin-spinner proportion="2"></lin-spinner>
    <lin-spinner proportion="3"></lin-spinner>
  </div>
</template>
```

:::

## 显示加载文案

`text` 属性设置加载文案，`vertical`属性设置对齐方向

:::demo

```vue
<template>
  <div class="spinner-block">
    <div>
      <p>水平对齐</p>
      <lin-spinner text="加载中" vertical="row"></lin-spinner>
    </div>
    <div>
      <p>垂直对齐</p>
      <lin-spinner text="加载中" vertical="col"></lin-spinner>
    </div>
  </div>
</template>
```

:::

## 其他

可通过 `loadingColor`，`size`，`strokeWidth`，`lineStyle` 等属性来设置 Spinner 的样式

:::demo

```vue
<template>
  <div class="spinner-block">
    <div>
      <p>自定义颜色</p>
      <lin-spinner loadingColor="red"></lin-spinner>
    </div>
    <div>
      <p>大小</p>
      <lin-spinner size="30px"></lin-spinner>
    </div>
    <div>
      <p>圆环宽度</p>
      <lin-spinner strokeWidth="2px"></lin-spinner>
    </div>
    <div>
      <p>线条样式</p>
      <lin-spinner lineStyle="dotted"></lin-spinner>
    </div>
    <div>
      <p>运动时长</p>
      <lin-spinner animationDuration="300ms"></lin-spinner>
    </div>
  </div>
</template>
```

:::

## 属性

| 参数              | 说明             | 类型           | 可选值                                                              | 默认值  |
| ----------------- | ---------------- | -------------- | ------------------------------------------------------------------- | ------- |
| type              | 主题类型         | String         | primary，success，info，warning， danger                            | primary |
| vertical          | 文案对齐方向     | String         | col，row                                                            | row     |
| proportion        | 弧度             | String,Number         | 1,2,3                                                               | 1       |
| loadingColor      | 显示器颜色       | String         | —                                                                   | —       |
| strokeWidth       | 圆环宽度         | String         | —                                                                   | —       |
| size              | 显示器大小       | String         | —                                                                   | —       |
| lineStyle         | 线条样式         | String         | dotted，dashed，solid，，double，groove，ridge，inset，outset       | —       |
| animationName     | css3 动画名称    | String         | —                                                                   | —       |
| animationDuration | 运动时长         | String         | —                                                                   | —       |
| timingFunction    | 运动方式         | String         | linear，ease，ease-in，ease-out，ease-in-out，cubic-bezier(n,n,n,n) | —       |
| iterationCount    | 运动次数         | String，Number | —                                                                   | —       |
| text              | 加载文案         | String         | —                                                                   | —       |
| textSize          | 加载文案字体大小 | String         | —                                                                   | —       |
| textColor         | 加载文案字体颜色 | String         | —                                                                   | —       |
