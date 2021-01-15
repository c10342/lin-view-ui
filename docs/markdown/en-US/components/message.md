# Message

[[toc]]

---

## Basic usage

Displays at the top, and disappears after 3 seconds.

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open1">Show message</lin-button>
</template>

<script>
export default {
  methods: {
    open1() {
      this.$Message("This is a message.");
    },
  },
};
</script>
```

:::

## Types

Used to show the feedback of Success, Warning, Message and Error activities.When you need more customizations, `Message` component can also take an object as parameter. For example, setting value of `type` can define different types, and its default is `info`. In such cases the main body is passed in as the value of `message`. Also, we have registered methods for different types, so you can directly call it without passing a type like `open5`.

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open2">success</lin-button>
  <lin-button :plain="true" @click="open3">warning</lin-button>
  <lin-button :plain="true" @click="open4">message</lin-button>
  <lin-button :plain="true" @click="open5">error</lin-button>
</template>

<script>
export default {
  methods: {
    open4() {
      this.$Message("This is a message.");
    },
    open2() {
      this.$Message({
        message: "Congrats, this is a success message.",
        type: "success",
      });
    },
    open3() {
      this.$Message({
        message: "Warning, this is a warning message.",
        type: "warning",
      });
    },

    open5() {
      this.$Message.error("Oops, this is a error message.");
    },
  },
};
</script>
```

:::

## Closable

A close button can be added.A default `Message` cannot be closed manually. If you need a closable `message`, you can set `showClose` field. Besides, same as notification, `message` has a controllable duration. Default duration is `3000` ms, and it won't disappear when set to `0`.

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open6">success</lin-button>
  <lin-button :plain="true" @click="open7">warning</lin-button>
  <lin-button :plain="true" @click="open8">message</lin-button>
  <lin-button :plain="true" @click="open9">error</lin-button>
</template>

<script>
export default {
  methods: {
    open8() {
      this.$Message({
        showClose: true,
        message: "This is a message.",
      });
    },
    open6() {
      this.$Message({
        showClose: true,
        message: "Congrats, this is a success message.",
        type: "success",
      });
    },
    open7() {
      this.$Message({
        showClose: true,
        message: "Warning, this is a warning message.",
        type: "warning",
      });
    },
    open9() {
      this.$Message({
        showClose: true,
        message: "Oops, this is a error message.",
        type: "error",
      });
    },
  },
};
</script>
```

:::

## Centered text

Use the `center` attribute to center the text.

:::demo

```vue
<template>
  <lin-button :plain="true" @click="openCenter">Centered text</lin-button>
</template>

<script>
export default {
  methods: {
    openCenter() {
      this.$Message({
        message: "Centered text",
        center: true,
      });
    },
  },
};
</script>
```

:::

## Use HTML string

`message` supports `HTML` string.Set `dangerouslyUseHTMLString` to `true` and `message` will be treated as an `HTML` string.

:::demo

```vue
<template>
  <lin-button :plain="true" @click="openHTML">Use HTML String</lin-button>
</template>

<script>
export default {
  methods: {
    openHTML() {
      this.$Message({
        dangerouslyUseHTMLString: true,
        message: "<strong>This is <i>HTML</i> string</strong>",
      });
    },
  },
};
</script>
```

:::

<br/>

Although message property supports HTML strings, dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to XSS attacks. So when dangerouslyUseHTMLString is on, please make sure the content of message is trusted, and never assign message to user-provided content.

## Global method

LinViewUI has added a global method \$message for Vue.prototype. So in a vue instance you can call Message like what we did in this page.

## Local import

Import `Message`：

```javascript
import { Message } from "lin-view-ui";
```

In this case you should call `Message(options)`. We have also registered methods for different `type`, e.g. `Message.success(options)`. You can call `Message.closeAll()` to manually close all the instances.

## Options

| Attribute                | Description                                                                    | Type     | Accepted Values               | Default |
| ------------------------ | ------------------------------------------------------------------------------ | -------- | ----------------------------- | ------- |
| message                  | message text                                                                   | String   | —                             | —       |
| type                     | message type                                                                   | String   | success，warning，info，error | info    |
| iconClass                | custom icon's class, overrides `type`                                          | String   | —                             | —       |
| dangerouslyUseHTMLString | whether `message` is treated as HTML string                                    | Boolean  | —                             | false   |
| customClass              | custom class name for Message                                                  | String   | —                             | —       |
| showClose                | whether to show a close button                                                 | Boolean  | —                             | false   |
| duration                 | display duration, millisecond. If set to 0, it will not turn off automatically | Number   | —                             | 3000    |
| center                   | whether to center the text                                                     | Boolean  | —                             | false   |
| onClose                  | callback function when closed                                                  | Function | —                             | —       |
| offset                   | set the distance to the top of viewport                                        | Number   | —                             | 20      |

## Methods

`Message` and `this.$message` returns the current `Message` instance. To manually close the instance, you can call `close` on it.

| Method | Description       |
| ------ | ----------------- |
| close  | close the Message |
