# LoadingBar 加载进度条

[[toc]]

---

全局创建了一个用于显示页面加载、异步请求的加载进度条。

因为可复用性的关系，`LoadingBar` 只会全局创建一个实例，而且在 `app.config.globalProperties.` 中添加对象 `$loadingBar`

## 基础用法

通过调用 `$loadingBar` 提供的三种方法来控制全局的加载进度条 `start()`、`end()`、`error()`

::: demo
loading-bar/base
:::

## 常规配置

你可以通过`config`函数来配置全局的属性：

::: demo
loading-bar/config
:::

## 方法

| 方法名 | 说明         | 参数                              |
| ------ | ------------ | --------------------------------- |
| config | 设置全局配置 | config:RootData(详情见下文`参数`) |
| start  | 开始         | config:RootData(详情见下文`参数`) |
| end    | 结束         | —                                 |
| error  | 错误         | —                                 |

## 参数

| 参数        | 说明             | 类型    | 可选值                        | 默认值        |
| ----------- | ---------------- | ------- | ----------------------------- | ------------- |
| speed       | 加载速度         | number  | 0-100                         | 5             |
| easing      | spinner 加载动画 | string  | linear, ease, cubic-bezier... | linear        |
| percentNum  | 每次前进的百分比 | number  | 0-1                           | Math.random() |
| showSpinner | 是否显示 spinner | boolean | —                             | true          |
