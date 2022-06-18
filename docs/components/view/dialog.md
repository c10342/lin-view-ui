# Dialog 对话框

[[toc]]

---

## 基础用法

需要设置`visible`属性，它接收`Boolean`，当为`true`时显示 `Dialog`。`Dialog` 分为两个部分：`body` 和 `footer`，`footer` 需要具名为 `footer` 的 `slot`。`title` 属性用于定义标题，它是可选的，默认值为提示。`width` 属性用于定义 `Dialog` 的宽度，默认值是 `50%`。`top` 属性用于定义 `Dialog` 距离浏览器顶部的距离，默认值是 `15vh`。

:::demo

dialog/base

:::

## 遮罩层不可点击

使用`closeOnClickModal`属性来设置遮罩层为不可点击状态

:::demo

dialog/close-on-click-modal

:::

## 判断是否需要关闭

使用`before-close`属性在 Dialog 关闭前判断是否需要关闭，`before-close`会传入一个函数作为参数，当调用该函数后， Dialog 会被关闭，否则不会被关闭掉。

:::demo

dialog/before-close
:::

## 自定义标题

使用 `slot` 具名插槽，插槽名为 `title`

:::demo

dialog/slot

:::

## 拖拽

设置 `drag` 属性为 `true`，即可对 `Dialog` 弹框进行拖拽

:::demo

dialog/drag
:::

## 属性

| 参数              | 说明                                            | 类型                                 | 可选值 | 默认值 |
| ----------------- | ----------------------------------------------- | ------------------------------------ | ------ | ------ |
| title             | Dialog 的标题，也可通过具名 slot （见下表）传入 | string                               | —      | —      |
| width             | Dialog 的宽度                                   | string                               | —      | 50%    |
| top               | Dialog CSS 中的 margin-top 值                   | string                               | —      | 15vh   |
| visible           | 是否显示 Dialog，支持 .sync 修饰符              | boolean                              | —      | false  |
| beforeClose       | 关闭前的回调，会暂停 Dialog 的关闭              | function(done)，done 用于关闭 Dialog | —      | —      |
| closeOnClickModal | 是否可以通过点击 modal 关闭 Dialog              | boolean                              | —      | true   |
| drag              | 是否可以对 Dialog 进行拖拽                      | boolean                              | —      | false  |

## 插槽

| 插槽名称 | 说明                    |
| -------- | ----------------------- |
| —        | Dialog 的内容           |
| title    | Dialog 标题区的内容     |
| footer   | Dialog 按钮操作区的内容 |

## 事件

| 事件名称 | 说明              | 回调参数 |
| -------- | ----------------- | -------- |
| close    | Dialog 关闭的回调 | —        |
