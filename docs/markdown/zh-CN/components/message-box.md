# MessageBox 弹框

[[toc]]

---

从场景上说，MessageBox 的作用是美化系统自带的 `alert`、`confirm` 和 `prompt`，因此适合展示较为简单的内容。如果需要弹出较为复杂的内容，请使用 Dialog。

## 消息提示

调用 `$MessageBox.alert` 方法即可打开消息提示，它模拟了系统的 `alert`，无法通过按下 `ESC` 或点击框外关闭。值得一提的是，窗口被关闭后，它默认会返回一个 Promise 对象便于进行后续操作的处理。

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open1">点击打开 Message Box</lin-button>
</template>

<script>
export default {
  methods: {
    open1() {
      this.$MessageBox
        .alert({
          message: "这是一段内容",
          title: "标题名称",
        })
        .then((data) => {
          this.$Message(`action: ${data.by}`);
        })
        .catch((error) => {
          this.$Message.error(`action: ${error.by}`);
        });
    },
  },
};
</script>
```

:::

## 确认消息

调用 `$MessageBox.confirm` 方法即可打开消息提示，它模拟了系统的 confirm。Message Box 组件也拥有极高的定制性，我们可以传入 options，它是一个字面量对象。type 字段表明消息类型，可以为 success，error，info 和 warning，无效的设置将会被忽略。在这里我们用了 Promise 来处理后续响应。

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open2">点击打开 Message Box</lin-button>
</template>

<script>
export default {
  methods: {
    open2() {
      this.$MessageBox
        .confirm({
          title: "提示",
          message: "此操作将永久删除该文件, 是否继续?",
          type: "warning",
        })
        .then(() => {
          this.$Message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((error) => {
          if (error.by === "cancelButton") {
            this.$Message({
              type: "info",
              message: "已取消删除",
            });
          }
        });
    },
  },
};
</script>
```

:::

## 提交内容

调用 `$MessageBox.prompt` 方法即可打开消息提示，它模拟了系统的 `prompt`。可以用 `inputPattern` 字段自己规定匹配模式，或者用 `inputValidator` 规定校验函数，可以返回 `Boolean` 或 `String`，返回 `false` 或字符串时均表示校验未通过，同时返回的字符串相当于定义了`inputErrorMessage` 字段。此外，可以用 `inputPlaceholder` 字段来定义输入框的占位符。

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open3">点击打开 Message Box</lin-button>
</template>

<script>
export default {
  methods: {
    open3() {
      this.$MessageBox
        .prompt({
          title: "提示",
          message: "请输入邮箱",
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: "邮箱格式不正确",
        })
        .then((data) => {
          this.$Message({
            type: "success",
            message: "你的邮箱是: " + data.value,
          });
        })
        .catch((error) => {
          this.$Message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>
```

:::

## 自定义

以上三个方法都是对 `$MessageBox` 方法的再包装。本例直接调用 `$MessageBox` 方法，使用了 `showCancelButton` 字段，用于显示取消按钮。另外可使用 `cancelButtonClass` 为其添加自定义样式，使用 `cancelButtonText` 来自定义按钮文本（Confirm 按钮也具有相同的字段，在文末的字段说明中有完整的字段列表）。此例还使用了 `beforeClose` 属性，它的值是一个方法，会在 `MessageBox` 的实例关闭前被调用，同时暂停实例的关闭。它有三个参数：data、实例本身和 done 方法。使用它能够在关闭前对实例进行一些操作，比如为确定按钮添加 loading 状态等；此时若需要关闭实例，可以调用 done 方法（若在 beforeClose 中没有调用 done，则实例不会关闭）。

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open4">点击打开 Message Box</lin-button>
</template>

<script>
export default {
  methods: {
    open4() {
      this.$MessageBox({
        title: "消息",
        message: "我是内容",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (data, instance, done) => {
          if (data.by === "confirmButton") {
            instance.confirmButtonLoading = true;
            setTimeout(() => {
              instance.confirmButtonLoading = false;
              done();
            }, 3000);
          } else {
            done();
          }
        },
      })
        .then((data) => {
          this.$Message({
            type: "info",
            message: "action: " + data.by,
          });
        })
        .catch(() => {});
    },
  },
};
</script>
```

:::

## 使用 HTML 片段

将 `dangerouslyUseHTMLString` 属性设置为 `true`，`message` 就会被当作 HTML 片段处理。

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open5">点击打开 Message Box</lin-button>
</template>

<script>
export default {
  methods: {
    open5() {
      this.$MessageBox
        .alert({
          title: "HTML 片段",
          message: "<strong>这是 <i>HTML</i> 片段</strong>",
          dangerouslyUseHTMLString: true,
        })
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>
```

:::

<br/>

`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 `XSS 攻击`。因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，永远不要将用户提交的内容赋值给 `message` 属性。

## 全局方法

如果你完整引入了 `LinViewUI`，它会为 Vue.prototype 添加如下全局方法：`$MessageBox`。因此在 Vue instance 中可以采用本页面中的方式调用 MessageBox。调用参数为：

- `$MessageBox(options)`
- `$MessageBox.alert(options)`
- `$MessageBox.confirm(options)`
- `$MessageBox.prompt(options)`

## 单独引用

如果单独引入 `MessageBox`：

```javascript
import { MessageBox } from "lin-view-ui";
```

那么对应于上述四个全局方法的调用方法依次为：`MessageBox`, `MessageBox.alert`, `MessageBox.confirm` 和 `MessageBox.prompt`，调用参数与全局方法相同。

## 属性

| 参数                     | 说明                                                                                               | 类型                                                                                                                                                     | 可选值                           | 默认值                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------- |
| title                    | MessageBox 标题                                                                                    | String                                                                                                                                                   | —                                | —                                               |
| message                  | MessageBox 消息正文内容                                                                            | String                                                                                                                                                   | —                                | —                                               |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理                                                              | Boolean                                                                                                                                                  | —                                | false                                           |
| type                     | 消息类型，用于显示图标                                                                             | String                                                                                                                                                   | success , info , warning , error | —                                               |
| iconClass                | 自定义图标的类名，会覆盖 `type`                                                                    | String                                                                                                                                                   | —                                | —                                               |
| customClass              | MessageBox 的自定义类名                                                                            | String                                                                                                                                                   | —                                | —                                               |
| showClose                | MessageBox 是否显示右上角关闭按钮                                                                  | Boolean                                                                                                                                                  | —                                | true                                            |
| beforeClose              | MessageBox 关闭前的回调，会暂停实例的关闭                                                          | function(data, instance, done)，data 的值 by 和 value 字段；instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例 | —                                | —                                               |
| lockScroll               | 是否在 MessageBox 出现时将 body 滚动锁定                                                           | Boolean                                                                                                                                                  | —                                | true                                            |
| showCancelButton         | 是否显示取消按钮                                                                                   | Boolean                                                                                                                                                  | —                                | false（以 confirm 和 prompt 方式调用时为 true） |
| showConfirmButton        | 是否显示确定按钮                                                                                   | Boolean                                                                                                                                                  | —                                | true                                            |
| cancelButtonText         | 取消按钮的文本内容                                                                                 | String                                                                                                                                                   | —                                | 取消                                            |
| confirmButtonText        | 确定按钮的文本内容                                                                                 | String                                                                                                                                                   | —                                | 确定                                            |
| cancelButtonClass        | 取消按钮的自定义类名                                                                               | String                                                                                                                                                   | —                                | —                                               |
| confirmButtonClass       | 确定按钮的自定义类名                                                                               | String                                                                                                                                                   | —                                | —                                               |
| closeOnClickModal        | 是否可通过点击遮罩关闭 MessageBox                                                                  | Boolean                                                                                                                                                  | —                                | true（以 alert 方式调用时为 false）             |
| closeOnPressEscape       | 是否可通过按下 ESC 键关闭 MessageBox                                                               | Boolean                                                                                                                                                  | —                                | true（以 alert 方式调用时为 false）             |
| closeOnHashChange        | 是否在 hashchange 时关闭 MessageBox                                                                | Boolean                                                                                                                                                  | —                                | true                                            |
| showInput                | 是否显示输入框                                                                                     | Boolean                                                                                                                                                  | —                                | false（以 prompt 方式调用时为 true）            |
| inputPlaceholder         | 输入框的占位符                                                                                     | String                                                                                                                                                   | —                                | —                                               |
| inputType                | 输入框的类型                                                                                       | String                                                                                                                                                   | —                                | text                                            |
| inputValue               | 输入框的初始文本                                                                                   | String                                                                                                                                                   | —                                | —                                               |
| inputPattern             | 输入框的校验表达式                                                                                 | Regexp                                                                                                                                                   | —                                | —                                               |
| inputValidator           | 输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage | Function                                                                                                                                                 | —                                | —                                               |
| inputErrorMessage        | 校验未通过时的提示文本                                                                             | String                                                                                                                                                   | —                                | 输入的数据不合法!                               |
| roundButton              | 是否使用圆角按钮                                                                                   | Boolean                                                                                                                                                  | —                                | false                                           |
| drag                     | 是否可以对 MessageBox 进行拖拽                                                                     | Boolean                                                                                                                                                  | —                                | false                                           |
