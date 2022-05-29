# Progress 进度条

[[toc]]

---

## 线形进度条

Progress 组件设置 `percent` 属性即可，表示进度条对应的百分比，必填，必须在 0-1。

:::demo
progress/base
:::

## 显示内外文字

百分比不占用额外控件，适用于文件上传等场景

:::demo
progress/text
:::

## 自定义颜色

可通过 `outColor` 和 `innerColor` 属性来设置进度条的颜色

:::demo
progress/color
:::

## 自定义提示文字

通过具名插槽 `text` 和 默认插槽 `default` 来自定义你想要的文字效果

:::demo
progress/tip
:::

## Progress 属性

| 参数        | 说明                  | 类型    | 可选值                         | 默认值  |
| ----------- | --------------------- | ------- | ------------------------------ | ------- |
| percent     | 百分比（必填）        | number  | 0-1                            | 0       |
| innerColor  | 进度条底层颜色        | string  | —                              | —       |
| outColor    | 进度条上层颜色        | string  | —                              | —       |
| height      | 进度条的高度，单位 px | number  |                                | 10      |
| radius      | 是否需要圆角          | Boolean | —                              | true    |
| textOutside | 进度条外面的提示文字  | string  | —                              | —       |
| textInside  | 进度条里面的提示文字  | string  | —                              | —       |
| type        | 进度条类型            | string  | primary,success,warning,danger | primary |

## 插槽

| 插槽名称 | 说明                    |
| -------- | ----------------------- |
| —        | Progress 外面提示的内容 |
| text     | Progress 里面提示的内容 |
