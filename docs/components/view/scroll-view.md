# ScrollBar 滚动条

[[toc]]

---


## 基础用法

`ScrollBar` 组件需要一个固定的高度。你可以在最外层容器设置高度，`ScrollBar` 组件内部高度默认是 `100%`，当然你也可以给 `ScrollBar` 组件设置一个 `height` 属性，这样 `ScrollBar` 组件就不会依赖于外层容器的高度。如果你需要使用到 `min-height` 或者 `max-height` 来设置高度，那么你只能在 `ScrollBar` 组件中通过 `maxHeight` 或者 `minHeight` 属性来设置

:::demo
scroll-view/base
:::

## 滚动加载

添加 `scrollToBottom` 事件监听即可

:::demo
scroll-view/scroll-to-bottom
:::

## 属性

| 参数        | 说明                       | 类型    | 可选值 | 默认值 |
| ----------- | -------------------------- | ------- | ------ | ------ |
| hover       | 是否一直显示滚动条         | boolean | —      | false  |
| height      | 高度                       | string  | —      | 100%   |
| width       | 宽度                       | string  | —      | 100%   |
| maxHeight   | 最大高度                   | string  | —      | —      |
| minHeight   | 最小高度                   | string  | —      | —      |
| loading     | 是否正在加载，显示加载动画 | boolean | —      | false  |
| loadingText | 加载文案                   | string  | —      | —      |
| loadingSize | 加载器大小                 | string  | —      | —      |

## 插槽

| 插槽名称 | 说明               |
| -------- | ------------------ |
| —        | 滚动的内容         |
| loading  | 加载动画显示的内容 |

## 事件

| 事件名称       | 说明                 | 回调参数 |
| -------------- | -------------------- | -------- |
| scroll         | 容器正在滚动时触发   | e(Event) |
| scrollToBottom | 容器滚动到底部时触发 | e(Event) |
