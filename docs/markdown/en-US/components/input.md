# Input

[[toc]]

---

Input is a controlled component, it always shows Vue binding value.

Under normal circumstances, `input` event should be handled. Its handler should update component's binding value (or use `v-model`). Otherwise, input box's value will not change.

Do not support `v-model` modifiers.

## Basic usage

Use `v-model` to bind the value of the input

:::demo

```vue
<template>
  <lin-input v-model="value1" placeholder="Please input"></lin-input>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
    };
  },
};
</script>
```

:::

## Essential attribute

Currently, three native attributes bound to the input field are supported, which are `name`,`maxlength`,`minlength`

:::demo

```vue
<template>
  <lin-input v-model="value2" placeholder="name" name="userName"></lin-input>
  <lin-input
    v-model="value7"
    placeholder="maxlength"
    :maxlength="10"
  ></lin-input>
  <lin-input
    v-model="value8"
    placeholder="minlength"
    :minlength="2"
  ></lin-input>
</template>

<script>
export default {
  data() {
    return {
      value2: "",
      value7: "",
      value8: "",
    };
  },
};
</script>
```

:::

## Disabled

Disable the Input with the `disabled` attribute.

:::demo

```vue
<template>
  <lin-input v-model="value3" placeholder="Please input" disabled></lin-input>
</template>

<script>
export default {
  data() {
    return {
      value3: "",
    };
  },
};
</script>
```

:::

## Clearable

Make the Input `clearable` with the clearable attribute.

:::demo

```vue
<template>
  <lin-input v-model="value4" placeholder="Please input" clearable></lin-input>
</template>

<script>
export default {
  data() {
    return {
      value4: "",
    };
  },
};
</script>
```

:::

## Password box

Make a toggleable password Input with the `showPassword` attribute.

:::demo

```vue
<template>
  <lin-input
    v-model="value5"
    placeholder="Please input"
    show-password
  ></lin-input>
</template>

<script>
export default {
  data() {
    return {
      value5: "",
    };
  },
};
</script>
```

:::

## Input with icon

Place icons through slots

:::demo

```vue
<template>
  <lin-input v-model="value6" placeholder="Please input">
    <i class="lin-icon-user"></i>
  </lin-input>
</template>

<script>
export default {
  data() {
    return {
      value6: "",
    };
  },
};
</script>
```

:::

## Attributes

| Attribute       | Description                               | Type    | Accepted Values | Default |
| --------------- | ----------------------------------------- | ------- | --------------- | ------- |
| placeholder     | placeholder of Input                      | String  | —               | —       |
| type            | type of input                             | String  | —               | text    |
| name            | same as `name` in native input            | String  | —               | —       |
| disabled        | whether Input is disabled                 | Boolean | —               | false   |
| value / v-model | binding value                             | String  | —               | —       |
| clearable       | whether to show clear button              | Boolean | —               | false   |
| showPassword    | whether to show toggleable password input | Boolean | —               | false   |

## Events

| Event Name | Description                                                     | Parameters     |
| ---------- | --------------------------------------------------------------- | -------------- |
| blur       | triggers when Input blurs                                       | (event: Event) |
| focus      | triggers when Input focuses                                     | (event: Event) |
| clear      | triggers when the Input is cleared by clicking the clear button | —              |

## Slots

| Name | Description                      |
| ---- | -------------------------------- |
| —    | Contents at the end of the input |
