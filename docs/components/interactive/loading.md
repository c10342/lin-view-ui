# Loading 加载

[[toc]]

---

## 区域加载

在表格等容器中加载数据时显示。`Loading` 组件提供了两种调用 `Loading` 的方法：指令和服务。对于自定义指令 `v-loading`，只需要绑定 `Boolean` 即可。默认状况下，`Loading` 遮罩会插入到绑定元素的子节点，通过添加 `body` 修饰符，可以使遮罩插入至 `DOM` 中的 `body` 上。

:::demo
loading/base
:::

## 自定义

在绑定了 `v-loading` 指令的元素上添加 `lin-loading-text` 属性，其值会被渲染为加载文案，并显示在加载图标的下方。类似地，`lin-loading-textColor` 和 `lin-loading-background` 属性分别用来设定加载文案颜色和背景色值。

:::demo

loading/custom

:::

## 整页加载

页面数据加载时显示。当使用指令方式时，全屏遮罩需要添加 `fullscreen` 修饰符；当使用服务方式时，遮罩默认即为全屏，无需额外设置。

:::demo
loading/service
:::

## 服务

`Loading` 还可以以服务的方式调用。引入 `Loading` 服务：

```javascript
import { Loading } from "lin-view-ui";
```

在需要调用时：

```javascript
Loading.service.open(options);
```

其中 `options` 参数为 `Loading` 的配置项，具体见下表。

```javascript
Loading.service.open(options);
this.$nextTick(() => {
  // 以服务的方式调用的 Loading 需要异步关闭
  Loading.service.close();
});
```

需要注意的是，以服务的方式调用的全屏 Loading 是单例的

如果完整引入了 `lin-view-ui`，那么 `app.config.globalProperties` 上会有一个全局方法 `$loading`，它的调用方式为：`this.$loading.open(options)`

## 属性

| 参数         | 说明                                             | 类型    | 可选值 | 默认值        |
| ------------ | ------------------------------------------------ | ------- | ------ | ------------- |
| target       | Loading 需要覆盖的 DOM 节点。需传入一个 DOM 对象 | object  | —      | document.body |
| body         | 同 `v-loading` 指令中的 `body` 修饰符            | boolean | —      | false         |
| fullscreen   | 同 `v-loading` 指令中的 `fullscreen` 修饰符      | boolean | —      | true          |
| lock         | 同 `v-loading` 指令中的 `lock` 修饰符            | boolean | —      | false         |
| text         | 显示在加载图标下方的加载文案                     | string  | —      | —             |
| textColor    | 加载文案颜色                                     | string  | —      | —             |
| background   | 遮罩背景色                                       | string  | —      | —             |
| loadingColor | loading 颜色                                     | string  | —      | —             |
