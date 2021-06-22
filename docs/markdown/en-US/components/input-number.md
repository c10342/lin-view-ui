# InputNumber

[[toc]]

---

## Basic usage

To use it, you only need to bind variables in the `lin-input-number` element by using `v-model`, and the initial value of the variable is default.

:::demo

```vue
<template>
  <lin-input-number v-model="value1" />
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
    };
  },
};
</script>
```

:::

## Disabled state

The `disabled` property accepts a `Boolean`. Setting it to `true` will disable the entire component

:::demo

```vue
<template>
  <lin-input-number v-model="value2" disabled />
</template>

<script>
export default {
  data() {
    return {
      value2: 0,
    };
  },
};
</script>
```

:::

## Steps

It is allowed to define the step number control of increasing and decreasing. Setting the `step` property can control the step size and accept a `Number`.

:::demo

```vue
<template>
  <lin-input-number v-model="value3" :step="2" />
</template>

<script>
export default {
  data() {
    return {
      value3: 0,
    };
  },
};
</script>
```

:::

## Strict steps

The `step-strictly` property accepts a `Boolean`. If this property is set to `true`, you can only enter a multiple of the number of steps.

:::demo

```vue
<template>
  <lin-input-number v-model="value4" :step="2" step-strictly />
</template>

<script>
export default {
  data() {
    return {
      value4: 0,
    };
  },
};
</script>
```

:::

## Attributes

| Attribute       | Description                                  | Type    | Accepted Values | Default   |
| --------------- | -------------------------------------------- | ------- | --------------- | --------- |
| value / v-model | Binding value                                | Number  | —               | —         |
| min             | Set the minimum allowed value of the counter | Number  | —               | -Infinity |
| max             | Set the maximum allowed value of the counter | Number  | —               | Infinity  |
| disabled        | Disable counter                              | Boolean | —               | false     |
| step            | Counter step size                            | Number  | —               | 1         |
| stepStrictly    | Can only multiple of step be entered         | Boolean | —               | false     |
| placeholder     | Input box default holder                     | String  | —               | —         |

## Events

| Event Name | Description                          | Parameters   |
| ---------- | ------------------------------------ | ------------ |
| reduce     | Triggered when the - sign is pressed | value:Number |
| plus       | Triggered when the + sign is pressed | value:Number |
