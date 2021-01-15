# Message 消息提示

[[toc]]

---

## 基础用法

从顶部出现，3 秒后自动消失。

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open1">打开消息提示</lin-button>
</template>

<script>
export default {
  methods: {
    open1() {
      this.$Message("这是一条消息提示");
    },
  },
};
</script>
```

:::

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。当需要自定义更多属性时，`Message` 也可以接收一个对象为参数。比如，设置 `type` 字段可以定义不同的状态，默认为 `info`。此时正文内容以 message 的值传入。同时，我们也为 `Message` 的各种 `type` 注册了方法，可以在不传入 `type` 字段的情况下像 `open5` 那样直接调用。

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open2">成功</lin-button>
  <lin-button :plain="true" @click="open3">警告</lin-button>
  <lin-button :plain="true" @click="open4">消息</lin-button>
  <lin-button :plain="true" @click="open5">错误</lin-button>
</template>

<script>
export default {
  methods: {
    open4() {
      this.$Message("这是一条消息提示");
    },
    open2() {
      this.$Message({
        message: "恭喜你，这是一条成功消息",
        type: "success",
      });
    },
    open3() {
      this.$Message({
        message: "警告哦，这是一条警告消息",
        type: "warning",
      });
    },

    open5() {
      this.$Message.error("错了哦，这是一条错误消息");
    },
  },
};
</script>
```

:::

## 可关闭

可以添加关闭按钮。默认的 `Message` 是不可以被人工关闭的，如果需要可手动关闭的 `Message`，可以使用 `showClose` 字段。`Message` 拥有可控的 `duration`，设置 `0` 为不会被自动关闭，默认为 `3000` 毫秒。

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open6">成功</lin-button>
  <lin-button :plain="true" @click="open7">警告</lin-button>
  <lin-button :plain="true" @click="open8">消息</lin-button>
  <lin-button :plain="true" @click="open9">错误</lin-button>
</template>

<script>
export default {
  methods: {
    open8() {
      this.$Message({
        showClose: true,
        message: "这是一条消息提示",
      });
    },
    open6() {
      this.$Message({
        showClose: true,
        message: "恭喜你，这是一条成功消息",
        type: "success",
      });
    },
    open7() {
      this.$Message({
        showClose: true,
        message: "警告哦，这是一条警告消息",
        type: "warning",
      });
    },
    open9() {
      this.$Message({
        showClose: true,
        message: "错了哦，这是一条错误消息",
        type: "error",
      });
    },
  },
};
</script>
```

:::

## 文字居中

使用 `center` 属性让文字水平居中。

:::demo

```vue
<template>
  <lin-button :plain="true" @click="openCenter">文字居中</lin-button>
</template>

<script>
export default {
  methods: {
    openCenter() {
      this.$Message({
        message: "居中的文字",
        center: true,
      });
    },
  },
};
</script>
```

:::

## 使用 HTML 片段

`message` 属性支持传入 `HTML` 片段。将 `dangerouslyUseHTMLString` 属性设置为 `true`，`message` 就会被当作 `HTML` 片段处理。

:::demo

```vue
<template>
  <lin-button :plain="true" @click="openHTML">使用 HTML 片段</lin-button>
</template>

<script>
export default {
  methods: {
    openHTML() {
      this.$Message({
        dangerouslyUseHTMLString: true,
        message: "<strong>这是 <i>HTML</i> 片段</strong>",
      });
    },
  },
};
</script>
```

:::

<br/>

message 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。因此在 dangerouslyUseHTMLString 打开的情况下，请确保 message 的内容是可信的，永远不要将用户提交的内容赋值给 message 属性。

## 全局方法

LinViewUI 为 Vue.prototype 添加了全局方法 \$Message。因此在 vue instance 中可以采用本页面中的方式调用 Message。

## 单独引用

单独引入 Message：

```javascript
import { Message } from "lin-view-ui";
```

此时调用方法为 `Message(options)`。我们也为每个 `type` 定义了各自的方法，如 `Message.success(options)`。并且可以调用 `Message.closeAll()` 手动关闭所有实例。

## 属性

| 参数                     | 说明                                  | 类型     | 可选值                        | 默认值 |
| ------------------------ | ------------------------------------- | -------- | ----------------------------- | ------ |
| message                  | 消息文字                              | String   | —                             | —      |
| type                     | 主题                                  | String   | success，warning，info，error | info   |
| iconClass                | 自定义图标的类名，会覆盖 `type`       | String   | —                             | —      |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | Boolean  | —                             | false  |
| duration                 | 显示时间, 毫秒。设为 0 则不会自动关闭 | Number   | —                             | 3000   |
| customClass              | 自定义类名                            | String   | —                             | —      |
| showClose                | 是否显示关闭按钮                      | Boolean  | —                             | false  |
| center                   | 文字是否居中                          | Boolean  | —                             | false  |
| onClose                  | 关闭时的回调函数                      | Function | —                             | —      |
| offset                   | Message 距离窗口顶部的偏移量          | Number   | —                             | 20     |

## 方法

调用 `Message` 或 `this.$Message` 会返回当前 `Message` 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。

| 方法名 | 说明               |
| ------ | ------------------ |
| close  | 关闭当前的 Message |
