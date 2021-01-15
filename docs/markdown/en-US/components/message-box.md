# MessageBox

[[toc]]

---

By design MessageBox provides simulations of system's `alert`, `confirm` and `prompt`，so it's content should be simple. For more complicated contents, please use Dialog.

## Alert

Open an alert by calling the `$MessageBox.alert` method. It simulates the system's `alert`, and cannot be closed by pressing `ESC` or clicking outside the box. It is worth mentioning that when the box is closed, it returns a Promise object for further processing.

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open1"
    >Click to open the Message Box</lin-button
  >
</template>

<script>
export default {
  methods: {
    open1() {
      this.$MessageBox
        .alert({
          message: "This is a message",
          title: "Title",
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

## Confirm

Call `$MessageBox.confirm` method to open a confirm, and it simulates the system's confirm.The attribute type indicates the message type, and it's value can be success, error, info and warning. Here we use Promise to handle further processing.

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open2"
    >Click to open the Message Box</lin-button
  >
</template>

<script>
export default {
  methods: {
    open2() {
      this.$MessageBox
        .confirm({
          title: "Warning",
          message: "This will permanently delete the file. Continue?",
          type: "warning",
        })
        .then(() => {
          this.$Message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch((error) => {
          if (error.by === "cancelButton") {
            this.$Message({
              type: "info",
              message: "Delete canceled",
            });
          }
        });
    },
  },
};
</script>
```

:::

## Prompt

Call `$MessageBox.prompt` method to open a `prompt`, and it simulates the system's prompt. You can use `inputPattern` parameter to specify your own RegExp pattern. Use `inputValidator` to specify validation method, and it should return `Boolean` or `String`. Returning `false` or `String` means the validation has failed, and the string returned will be used as the `inputErrorMessage`. In addition, you can customize the placeholder of the input box with `inputPlaceholder` parameter.

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open3"
    >Click to open the Message Box</lin-button
  >
</template>

<script>
export default {
  methods: {
    open3() {
      this.$MessageBox
        .prompt({
          title: "Tip",
          message: "Please input your e-mail",
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: "Invalid Email",
        })
        .then((data) => {
          this.$Message({
            type: "success",
            message: "Your email is:" + data.value,
          });
        })
        .catch((error) => {
          this.$Message({
            type: "info",
            message: "Input canceled",
          });
        });
    },
  },
};
</script>
```

:::

## Customization

The three methods mentioned above are repackagings of the `$MessageBox` method. This example calls `$MessageBox` method directly using the `showCancelButton` attribute, which is used to indicate if a cancel button is displayed. Besides we can use `cancelButtonClass` to add a custom style and `cancelButtonText` to customize the button text (the confirm button also has these fields, and a complete list of fields can be found at the end of this documentation). This example also uses the `beforeClose` attribute. It is a method and will be triggered when the `MessageBox` instance will be closed, and its execution will stop the instance from closing. It has three parameters: data, instance and done. Using it enables you to manipulate the instance before it closes, e.g. activating loading for confirm button; you can invoke the done method to close the MessageBox instance (if done is not called inside beforeClose, the instance will not be closed).

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open4"
    >Click to open the Message Box</lin-button
  >
</template>

<script>
export default {
  methods: {
    open4() {
      this.$MessageBox({
        title: "Tip",
        message: "This is content",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
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

## Use HTML String

Set `dangerouslyUseHTMLString` to `true` and `message` will be treated as an HTML string.

:::demo

```vue
<template>
  <lin-button :plain="true" @click="open5"
    >Click to open the Message Box</lin-button
  >
</template>

<script>
export default {
  methods: {
    open5() {
      this.$MessageBox
        .alert({
          title: "HTML String",
          message: "'<strong>This is <i>HTML</i> string</strong>",
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

Although `message` property supports HTML strings, dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to `XSS attacks`. So when `dangerouslyUseHTMLString` is on, please make sure the content of `message` is trusted, and never assign `message` to user-provided content.

## Global method

If `LinViewUI` is fully imported, it will add the following global methods for Vue.prototype: `$MessageBox`. So in a Vue instance you can call MessageBox like what we did in this page. The parameters are:

- `$MessageBox(options)`
- `$MessageBox.alert(options)`
- `$MessageBox.confirm(options)`
- `$MessageBox.prompt(options)`

## Local import

If you prefer importing `MessageBox` on demand:

```javascript
import { MessageBox } from "lin-view-ui";
```

The corresponding methods are: `MessageBox`, `MessageBox.alert`, `MessageBox.confirm` and `MessageBox.prompt`. The parameters are the same as above.

## Options

| Attribute                | Description                                                                                                                              | Type                                                                                                                                                                                                        | Accepted Values                  | Default                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------ |
| title                    | title of the MessageBox                                                                                                                  | String                                                                                                                                                                                                      | —                                | —                                                |
| message                  | content of the MessageBox                                                                                                                | String                                                                                                                                                                                                      | —                                | —                                                |
| dangerouslyUseHTMLString | whether `message` is treated as HTML string                                                                                              | Boolean                                                                                                                                                                                                     | —                                | false                                            |
| type                     | message type, used for icon display                                                                                                      | String                                                                                                                                                                                                      | success , info , warning , error | —                                                |
| iconClass                | custom icon's class, overrides `type`                                                                                                    | String                                                                                                                                                                                                      | —                                | —                                                |
| customClass              | custom class name for MessageBox                                                                                                         | String                                                                                                                                                                                                      | —                                | —                                                |
| showClose                | whether to show close icon of MessageBox                                                                                                 | Boolean                                                                                                                                                                                                     | —                                | true                                             |
| beforeClose              | callback before MessageBox closes, and it will prevent MessageBox from closing                                                           | function(data, instance, done), where `data` have 'by' and 'value'; `instance` is the MessageBox instance, and you can access to that instance's attributes and methods; `done` is for closing the instance | —                                | —                                                |
| lockScroll               | whether to lock body scroll when MessageBox prompts                                                                                      | Boolean                                                                                                                                                                                                     | —                                | true                                             |
| showCancelButton         | whether to show a cancel button                                                                                                          | Boolean                                                                                                                                                                                                     | —                                | false (true when called with confirm and prompt) |
| showConfirmButton        | whether to show a confirm button                                                                                                         | Boolean                                                                                                                                                                                                     | —                                | true                                             |
| cancelButtonText         | text content of cancel button                                                                                                            | String                                                                                                                                                                                                      | —                                | Cancel                                           |
| confirmButtonText        | text content of confirm button                                                                                                           | String                                                                                                                                                                                                      | —                                | OK                                               |
| cancelButtonClass        | custom class name of cancel button                                                                                                       | String                                                                                                                                                                                                      | —                                | —                                                |
| confirmButtonClass       | custom class name of confirm button                                                                                                      | String                                                                                                                                                                                                      | —                                | —                                                |
| closeOnClickModal        | whether MessageBox can be closed by clicking the mask                                                                                    | Boolean                                                                                                                                                                                                     | —                                | true (false when called with alert)              |
| closeOnPressEscape       | whether MessageBox can be closed by pressing the ESC                                                                                     | Boolean                                                                                                                                                                                                     | —                                | true (false when called with alert)              |
| closeOnHashChange        | whether to close MessageBox when hash changes                                                                                            | Boolean                                                                                                                                                                                                     | —                                | true                                             |
| showInput                | whether to show an input                                                                                                                 | Boolean                                                                                                                                                                                                     | —                                | false (true when called with prompt)             |
| inputPlaceholder         | placeholder of input                                                                                                                     | String                                                                                                                                                                                                      | —                                | —                                                |
| inputType                | type of input                                                                                                                            | String                                                                                                                                                                                                      | —                                | text                                             |
| inputValue               | initial value of input                                                                                                                   | String                                                                                                                                                                                                      | —                                | —                                                |
| inputPattern             | regexp for the input                                                                                                                     | Regexp                                                                                                                                                                                                      | —                                | —                                                |
| inputValidator           | validation function for the input. Should returns a boolean or string. If a string is returned, it will be assigned to inputErrorMessage | Function                                                                                                                                                                                                    | —                                | —                                                |
| inputErrorMessage        | error message when validation fails                                                                                                      | String                                                                                                                                                                                                      | —                                | Illegal input!                                   |
| roundButton              | whether to use round button                                                                                                              | Boolean                                                                                                                                                                                                     | —                                | false                                            |
| drag                     | whether the MessageBox can be draged                                                                                                     | Boolean                                                                                                                                                                                                     | —                                | false                                            |
